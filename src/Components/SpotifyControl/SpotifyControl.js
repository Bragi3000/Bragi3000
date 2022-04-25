import {playSong, pauseSong, startPlaylist} from "Services/Spotify/spotifyAPI";
import { useEffect} from "react";
import useSpotifyAuth from "Store/selectors/useSpotifyAuthData"
import SpotifyControlView from "./SpotifyControlView";
import {useDispatch, useSelector} from "react-redux";
import {
  fetchPlaybackState,
  selectActiveDevice,
  selectPlayback,
  setStartedPlaylist,
  togglePlayPause
} from "Store/slices/playback";
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
        await startPlaylist(token.access_token, playlistId);
        dispatch(setStartedPlaylist(true));
      } else {
        // TODO
        console.log("Please select a device to play music");
        return;
      }
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
