import {playSong, pauseSong, startPlaylist} from "Services/Spotify/spotifyAPI";
import { useEffect} from "react";
import SpotifyControlView from "./SpotifyControlView";
import {useDispatch, useSelector} from "react-redux";
import {
  fetchPlaybackState,
  selectPlayback,
  setStartedPlaylist,
  togglePlayPause
} from "Store/slices/playback";
import {
  selectActiveDevice, setActiveDeviceState
} from "Store/slices/devices";
import {selectPlaylistId} from "../../Store/slices/playlist";
import { selectSpotifyAccessToken } from "Store/slices/spotifyAuth";
import {infoToast} from "Components/Toast/Toast";

/**
 * Controlbar for showing playback information and controlling it.
 * @returns The presenter for the component
 */
const SpotifyControl = function () {
  const accessToken = useSelector(selectSpotifyAccessToken);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPlaybackState({ accessToken }));
  }, [accessToken, dispatch]);

  const playbackState = useSelector(state => selectPlayback(state));
  const playlistId = useSelector(state => selectPlaylistId(state));
  const activeDevice = useSelector(state => selectActiveDevice(state));
  const playlistSongs = useSelector(state => state.playlist.playlistSongs);

  /* eslint-disable */
  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(fetchPlaybackState({ accessToken }));
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  /* eslint-enable */

  /**
   * Callback function when the play/pause button is clicked
   */
  const handlePlay = async () => {
    if (!playbackState.is_playing && !playbackState.started_playlist && playlistSongs.length === 0) {
      infoToast("Your playlist is still empty");
      return;
    }
    if (!activeDevice) {
      infoToast("Please select a a device first");
      return;
    }
    if (!playbackState.started_playlist && !playbackState.is_playing) {
      // start playing bragi3000 playlist
      await startPlaylist(accessToken, playlistId, activeDevice);
      await dispatch(setActiveDeviceState(activeDevice));
      dispatch(setStartedPlaylist(true));
    } else {
      const togglePlayPauseFunc = playbackState.is_playing ? pauseSong : playSong;
      await togglePlayPauseFunc(accessToken);
    }
    dispatch(togglePlayPause());
  }

  return (<SpotifyControlView
    onModifyPlayback={handlePlay}
    imageSrc={playbackState.image_src}
    name={playbackState.name}
    artists={playbackState.artists}
    is_playing={playbackState.is_playing}
  />)
}

export default SpotifyControl;
