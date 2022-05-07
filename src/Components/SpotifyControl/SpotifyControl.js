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
  selectActiveDevice
} from "Store/slices/devices";
import {selectPlaylistId} from "../../Store/slices/playlist";
import { selectSpotifyAccessToken } from "Store/slices/spotifyAuth";

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
    if (!playbackState.started_playlist && !playbackState.is_playing) {
      if (activeDevice) {
        // start playing bragi3000 playlist
        await startPlaylist(accessToken, playlistId);
        dispatch(setStartedPlaylist(true));
      } else {
        // TODO
        console.log("Please select a device to play music");
        return;
      }
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
