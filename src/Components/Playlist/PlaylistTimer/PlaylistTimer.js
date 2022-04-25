import PlaylistTimerView from './PlaylistTimerView.js';
import {useSelector} from "react-redux";
import {selectPlaylistSongs} from "Store/slices/playlist";
import {selectPlayback} from "Store/slices/playback";
import store from "Store/store";
import {useEffect, useState} from "react";

/**
 * Function to calculate string representation of remaining time
 * @param playtimeMs - time in milliseconds
 * @returns {`${string}:${string}:${string}`}
 */
const createPlaybackTimeString = function (playtimeMs) {
  const seconds = Math.floor((playtimeMs / 1000) % 60);
  const minutes = Math.floor((playtimeMs / 1000 / 60) % 60);
  const hours = Math.floor((playtimeMs / 1000 / 60 / 60) % 24);
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};

/**
 * Component that calculates the remaining playtime of the bragi playlist
 */
const PlaylistTimer = function () {

  const [time, setTime] = useState("00:00:00");
  const playbackState = useSelector(state => selectPlayback(state));
  const playlistSongs = useSelector(state => selectPlaylistSongs(state));

  useEffect(() => {
    const queuePlaytime = playlistSongs.reduce((accumulate, track) => {
      return accumulate + track.duration_ms
    }, 0);
    const playbackStatePlaytime = playbackState.duration_ms - playbackState.progress_ms;
    const totalPlaytime = queuePlaytime + playbackStatePlaytime;
    const playbackTimeString = createPlaybackTimeString(totalPlaytime);
    setTime(playbackTimeString);
  }, [playbackState, playlistSongs])

  return <PlaylistTimerView remainingTime={time}/>;
}

/**
 * Function to calculate the remaining time until the song is played.
 * @param song - to calculate the remaining time in the playlist
 * @returns string representing the remaining time
 */
export const getTimeUntilSong = function (song) {
  const state = store.getState();
  const playlistSongs = state.playlist.playlistSongs.filter(song => !state.playback.playedSongs.includes(song.uri));
  const playlistSongIndex = playlistSongs.findIndex(playlistSong => playlistSong.uri === song.uri);
  const queuePlaytime = playlistSongs.slice(0, playlistSongIndex).reduce((accumulate, track) => {
    return accumulate + track.duration_ms
  }, 0);
  const playbackStatePlaytime = state.playback.duration_ms - state.playback.progress_ms;
  let totalPlaytime = queuePlaytime + playbackStatePlaytime;
  return createPlaybackTimeString(totalPlaytime);
}

export default PlaylistTimer;
