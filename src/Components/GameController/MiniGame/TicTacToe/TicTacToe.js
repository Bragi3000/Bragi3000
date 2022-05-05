import { LEFT_PLAYER, RIGHT_PLAYER } from "Constants/players";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectSelectedSong } from "Store/slices/selectedSongs";
import TicTacToeView from "./TicTacToeView";

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
    secondDiagonal.push(squares[size - 1 + i * (size - 1)]);
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
    if (line.every((square) => square === LEFT_PLAYER)) return LEFT_PLAYER;
    if (line.every((square) => square === RIGHT_PLAYER)) return RIGHT_PLAYER;
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
  const occupiedFields = squares.filter((x) => x !== null).length;
  if (occupiedFields === size * size) return true;

  // check if win still possible
  const lines = getLines(squares, size);
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    // line does not contain LEFT_PLAYER
    if (!line.some((e) => e === LEFT_PLAYER)) {
      return false;
    }
    // line does not contain RIGHT_PLAYER
    if (!line.some((e) => e === RIGHT_PLAYER)) {
      return false;
    }
  }
  return true;
}

/**
 * Component for the TicTacToe game.
 * @param size - Size of the board
 * @param onWin Event emitted when a player wins the game
 */
export default function TicTacToe({ size, onWin }) {
  const leftIcon = useSelector(
    (state) => selectSelectedSong(state, LEFT_PLAYER).album.images[2].url
  );
  const rightIcon = useSelector(
    (state) => selectSelectedSong(state, RIGHT_PLAYER).album.images[2].url
  );

  const [board, setBoard] = useState(Array(size * size).fill(null));
  const [player, setPlayer] = useState(LEFT_PLAYER);

  const handleSetSquare = (index) => {
    if (board[index]) return;

    const newBoard = [...board];
    newBoard[index] = player;

    if (checkWin(newBoard, size)) onWin(player);
    else if (checkTie(newBoard, size)) setBoard([...newBoard].fill(null));

    setBoard(newBoard);
    setPlayer(player === LEFT_PLAYER ? RIGHT_PLAYER : LEFT_PLAYER);
  };

  // const winner = useMemo(() => checkWin(board, size), [board, size]);
  // const tie = useMemo(() => checkTie(board, size), [board, size]);

  // const playlistId = useSelector((state) => selectPlaylistId(state));
  // const token = useSpotifyAuth();
  // const dispatch = useDispatch();

  // if (winner) {
  //   const winner_uri = winner === "X" ? rightSong.uri : leftSong.uri;
  //   const loser_song = winner === "X" ? leftSong : rightSong;
  //   addSongToPlaylist(token.access_token, playlistId, winner_uri).then(() => {
  //     // update the playlist
  //     dispatch(fetchPlaylistSongs({ accessToken: token.access_token }));
  //     // reset song selection
  //     dispatch(resetSearch());
  //     dispatch(resetSelectedSongs());
  //     dispatch(appendBannedSongs(loser_song));
  //   });
  //   setBoard(Array(size * size).fill(null));
  // } else if (tie) {
  //   console.log(`Tie`);
  //   setBoard(Array(size * size).fill(null));
  // }

  return (
    <TicTacToeView
      squares={board}
      size={size}
      onSetSquare={handleSetSquare}
      leftIcon={leftIcon}
      rightIcon={rightIcon}
    />
  );
}
