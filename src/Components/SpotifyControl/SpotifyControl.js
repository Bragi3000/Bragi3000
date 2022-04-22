import {playSong, pauseSong, getAvailableDevices, setActiveDevice, startPlaylist} from "Services/Spotify/spotifyAPI";
import { useEffect} from "react";
import useSpotifyAuth from "Store/selectors/useSpotifyAuthData"
import SpotifyControlView from "./SpotifyControlView";
import {useDispatch, useSelector} from "react-redux";
import {fetchPlaybackState, selectPlayback, setStartedPlaylist, togglePlayPause} from "Store/slices/playback";
import {selectPlaylistId} from "../../Store/slices/playlist";

/**
 * Component for current song information showing play/pause button, cover image, name of song and artists
 * @returns {JSX.Element} SpotifyControlView with current song information
 */
const SpotifyControl = function () {
  const token = useSpotifyAuth();
  const dispatch = useDispatch();
  const accessToken = token.access_token;

  useEffect(() => {
    dispatch(fetchPlaybackState({ accessToken }));
  }, [accessToken, dispatch]);

  const playbackState = useSelector(state => selectPlayback(state));
  const playlistId = useSelector(state => selectPlaylistId(state));

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(fetchPlaybackState({ accessToken }));
    }, Math.min(playbackState.duration_ms - playbackState.progress_ms, 15000));
    return () => clearInterval(interval);
  }, [accessToken, dispatch, playbackState]);

  const handlePlay = async () => {
    if (!playbackState.started_playlist) {
      const devices = await getAvailableDevices(token.access_token);
      if (devices.length === 0) return; // if no devices available, do nothing
      const activeDevice = devices.find(device => device.is_active);

      // if devices but no active device, try setting active device
      if (!activeDevice) {
        console.log(devices);
        if (devices.length === 1) {
          await setActiveDevice(token.access_token, devices[0].id);
        } else {
          // TODO let user choose device
          await setActiveDevice(token.access_token, devices[0].id);
        }
      }
      // start bragi playlist
      await startPlaylist(token.access_token, playlistId);
      dispatch(setStartedPlaylist(true));

    } else {
      const togglePlayPauseFunc = playbackState.is_playing ? pauseSong : playSong;
      await togglePlayPauseFunc(token.access_token);
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
