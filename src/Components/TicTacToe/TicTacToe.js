import React, {useMemo, useState} from "react"
import TicTacToeView from "./TicTacToeView";
import bragiIcon from "Assets/images/bragi-icon.png"
import {
  resetSelectedSongs,
  selectSelectedSong,
  selectSongIsConfirmed,
} from "Store/slices/selectedSongs";
import { resetSearch} from "Store/slices/songSearch";
import useSpotifyAuth from "Store/selectors/useSpotifyAuthData"
import {fetchPlaylistSongs, selectPlaylistId} from "Store/slices/playlist";
import { LEFT_PLAYER, RIGHT_PLAYER } from "Constants/players";
import {useDispatch, useSelector} from "react-redux";
import { addSongToPlaylist} from "Services/Spotify/spotifyAPI"


/**
 * Get all the lines of the board which can be used to win the game.
 * @param {Array} squares - Array of the squares of the board
 * @param {Integer} size - Size of the board
 * @return {Array} lines - Array containing all the lines of the board
 */
function getLines(squares, size) {
  const lines = [];
  // add rows
  for (let i = 0; i < size; i++) {
    lines.push(squares.slice(i * size, i * size + size));
  }
  // add columns
  for (let i = 0; i < size; i++) {
    const tmp = [];
    for (let j = 0; j < size; j++) {
      tmp.push(squares[i + j * size]);
    }
    lines.push(tmp);
  }
  // add diagonals
  const firstDiagonal = [];
  const secondDiagonal = [];
  for (let i = 0; i < size; i++) {
    firstDiagonal.push(squares[i * (size + 1)]);
    secondDiagonal.push(squares[(size - 1) + i * (size - 1)]);
  }
  lines.push(firstDiagonal);
  lines.push(secondDiagonal);

  return lines;
}

/**
 * Check if one of the players has won the game.
 * @param {Array} squares - Array of the squares of the board
 * @param {Integer} size - Size of the board
 */
function checkWin(squares, size) {
  const lines = getLines(squares, size);
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.every(e => e === line[0])) {
      return line[0];
    }
  }
}

/**
 * Check if the game is a draw. This is the case if the game is not won
 * but there exists not line which only contains O or X.
 * @param {Array} squares - Array of the squares of the board
 * @param {Integer} size - Size of the board
 */
function checkTie(squares, size) {
  // check if all fields are occupied
  const occupiedFields = squares.filter(x => x !== null).length
  if (occupiedFields === size * size) return true;

  // check if win still possible
  const lines = getLines(squares, size);
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    // line does not contain X
    if (!line.some(e => e === 'X')) {
      return false;
    }
    // line does not contain O
    if (!line.some(e => e === 'O')) {
      return false;
    }
  }
  return true;
}

/**
 * Component for the TicTacToe game.
 * @param {Integer} size - Size of the board (default: 4)
 * @param {String} circleIcon - Path of Icon for the circlePlayer
 * @param {String} crossIcon - Icon for the crossPlayer
 */
export default function TicTacToe({size = 4, circleIcon = bragiIcon, crossIcon = bragiIcon}) {
  const [board, setBoard] = useState(Array(size * size).fill(null));
  const [currPlayer, setCurrPlayer] = useState(true);
  const winner = useMemo(() => checkWin(board, size), [board, size]);
  const tie = useMemo(() => checkTie(board, size), [board, size]);

  let leftSongConfirmed = useSelector(state => selectSongIsConfirmed(state, LEFT_PLAYER));
  let rightSongConfirmed = useSelector(state => selectSongIsConfirmed(state, RIGHT_PLAYER));
  let leftSong = useSelector(state => selectSelectedSong(state, LEFT_PLAYER));
  let rightSong = useSelector(state => selectSelectedSong(state, RIGHT_PLAYER));

  const playlistId = useSelector(state => selectPlaylistId(state));
  const token = useSpotifyAuth();
  const dispatch = useDispatch();

  if (leftSongConfirmed && rightSongConfirmed) {
    circleIcon = leftSong.album.images[0].url;
    crossIcon = rightSong.album.images[0].url;
  }

  if (winner) {
    const winner_uri = winner === 'X' ? rightSong.uri : leftSong.uri;
    addSongToPlaylist(token.access_token, playlistId, winner_uri).then(() => {
      // update the playlist
      dispatch(fetchPlaylistSongs({ accessToken: token.access_token }));
      // reset song selection
      dispatch(resetSearch());
      dispatch((resetSelectedSongs()));
    });
    setBoard(Array(size * size).fill(null));
  } else if (tie) {
    console.log(`Tie`);
    setBoard(Array(size * size).fill(null));
  }

  /**
   * Callback to handle the click on a square.
   * @param {Integer} i - Index of the square
   */
  function handleSetSquare(i) {
    const boardCopy = [...board];
    if (winner || boardCopy[i] || !(leftSongConfirmed && rightSongConfirmed)) {
      return;
    }
    boardCopy[i] = currPlayer ? "X" : "O";
    setBoard(boardCopy);
    setCurrPlayer(!currPlayer);
  }

  return <TicTacToeView squares={board} size={size} onSetSquare={handleSetSquare}
    circleIcon={circleIcon} crossIcon={crossIcon}/>
}
