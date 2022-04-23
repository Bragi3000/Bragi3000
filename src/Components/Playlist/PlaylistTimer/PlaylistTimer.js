import PlaylistTimerView from './PlaylistTimerView.js';
import { useSelector } from "react-redux";
import { selectPlaylistSongs } from "Store/slices/playlist";
import { selectPlayback } from "Store/slices/playback";


const PlaylistTimer = function () {

  const playbackState = useSelector(state => selectPlayback(state));
  const playlistSongs = useSelector(state => selectPlaylistSongs(state));

  const queuePlaytime = playlistSongs.reduce((accumulate, track) => {
    return accumulate + track.duration_ms
  }, 0);

  const playbackStatePlaytime = playbackState.duration_ms - playbackState.progress_ms;
  let totalPlaytime = queuePlaytime + playbackStatePlaytime;

  const createPlaybackTimeString = function (playtimeMs) {
    const seconds = Math.floor((playtimeMs / 1000) % 60);
    const minutes = Math.floor((playtimeMs / 1000 / 60) % 60);
    const hours = Math.floor((playtimeMs / 1000 / 60 / 60) % 24);
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const playbackTimeString = createPlaybackTimeString(totalPlaytime);
  return <PlaylistTimerView remainingTime={playbackTimeString}/>;
}

export default PlaylistTimer;
