import {getPlaybackState, playSong, pauseSong} from "Services/Spotify/spotifyAPI";
import {useState, useEffect, useCallback} from "react";
import useSpotifyAuth from "Store/selectors/useSpotifyAuthData"
import bragiIcon from "Assets/images/bragi-icon.png"
import SpotifyControlView from "./SpotifyControlView";

/**
 * Component for current song information showing play/pause button, cover image, name of song and artists
 * @returns {JSX.Element} SpotifyControlView with current song information
 */
const SpotifyControl = function () {
  const token = useSpotifyAuth();
  const [playbackState, setPlaybackState] = useState({
    image_src: bragiIcon,
    name: "Bragi",
    artists: "3000",
    is_playing: false,
    progress_ms: 0,
    duration_ms: 42069,
  });

  useEffect(() => {
    if (token) {
      getPlaybackState(token.access_token)
        .then((newData) => {
          if (newData.statusCode === 200) setPlaybackState(handleData(newData.body));
        });
    }
  }, [token]);

  const updatePlaybackState = useCallback(() => {
    getPlaybackState(token.access_token)
      .then((newData) => {
        if (newData.statusCode === 200) setPlaybackState(handleData(newData.body));
      }).catch((err) => {
        console.log(err);
      });
  }, [token.access_token]);

  useEffect(() => {
    const interval = setInterval(() => {
      updatePlaybackState();
    }, Math.min(playbackState.duration_ms - playbackState.progress_ms, 15000));
    return () => clearInterval(interval);
  }, [playbackState, updatePlaybackState]);

  const handleData = (newData) => {
    return {
      image_src: newData.item.album.images[0].url,
      name: newData.item.name,
      artists: newData.item.artists.map((artist) => artist.name).join(", "),
      is_playing: newData.is_playing,
      progress_ms: newData.progress_ms,
      duration_ms: newData.item.duration_ms,
    };
  }

  const handlePlay = () => {
    if (playbackState.is_playing) {
      pauseSong(token.access_token).then(updatePlaybackState);
    } else {
      playSong(token.access_token).then(updatePlaybackState);
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
