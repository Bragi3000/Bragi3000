import { playSong, pauseSong, getAvailableDevices } from "Services/Spotify/spotifyAPI";
import { useEffect} from "react";
import useSpotifyAuth from "Store/selectors/useSpotifyAuthData"
import SpotifyControlView from "./SpotifyControlView";
import {useDispatch, useSelector} from "react-redux";
import {fetchPlaybackState, selectPlayback, togglePlayPause } from "Store/slices/playback";

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

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(fetchPlaybackState({ accessToken }));
    }, Math.min(playbackState.duration_ms - playbackState.progress_ms, 15000));
    return () => clearInterval(interval);
  }, [accessToken, dispatch, playbackState]);

  const handlePlay = () => {
    if (playbackState.is_playing) {
      pauseSong(token.access_token).then(()=>
        dispatch(togglePlayPause())
      );
    } else {
      getAvailableDevices(token.access_token).then(
        (devices) => {
          // check if one of the devices is active
          const activeDevice = devices.find(device => device.is_active);
          if (activeDevice) {
            playSong(token.access_token).then(()=>
              dispatch(togglePlayPause())
            );
          } else {
            console.log("No active devices available");
          }
        }
      );
    }
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
