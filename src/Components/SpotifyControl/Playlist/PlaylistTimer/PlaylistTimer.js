import PlaylistTimerView from './PlaylistTimerView.js';
import {useSelector} from "react-redux";
import {selectPlaylistSongs} from "Store/slices/playlist";
import {selectPlayback} from "Store/slices/playback";
import {useEffect, useState} from "react";

/**
 * Function to calculate string representation of remaining time
 * @param playtimeMs - time in milliseconds
 * @returns {`${string}:${string}:${string}`}
 */
export const createPlaybackTimeString = function (playtimeMs) {
  const seconds = Math.floor((playtimeMs / 1000) % 60);
  const minutes = Math.floor((playtimeMs / 1000 / 60) % 60);
  const hours = Math.floor((playtimeMs / 1000 / 60 / 60) % 24);
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};

/**
 * Component that calculates the remaining playtime of the bragi playlist
 */
const PlaylistTimer = function () {

  const [time, setTime] = useState(0); // remaining time in milliseconds
  const playbackState = useSelector(state => selectPlayback(state));
  const playlistSongs = useSelector(state => selectPlaylistSongs(state));

  useEffect(() => {
    const queuePlaytime = playlistSongs.reduce((accumulate, track) => {
      return accumulate + track.duration_ms
    }, 0);
    const playbackStatePlaytime = playbackState.duration_ms - playbackState.progress_ms;
    const totalPlaytime = queuePlaytime + playbackStatePlaytime;
    setTime(totalPlaytime);
  }, [playbackState, playlistSongs])

  return <PlaylistTimerView remainingTime={createPlaybackTimeString(time)}/>;
}

export default PlaylistTimer;
