import PlaylistSongView from "./PlaylistSongView";
import { createPlaybackTimeString } from "../PlaylistTimer/PlaylistTimer";
import { useState } from "react";
import store from "Store/store";

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


/**
* Component that represents a song in the playlist
 * @param song - The song to be displayed
 * @param index - Index of the song in the playlist
*/
const PlaylistSong = function ({ song, index }) {
  const [hover, setHover] = useState(false);
  const timeUntilSong = hover ? getTimeUntilSong(song) : null;
  return <PlaylistSongView song={song} key={index} index={index} onHoverSong={setHover} timeUntilSong={timeUntilSong}/>
}

export default PlaylistSong;
