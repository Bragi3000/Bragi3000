import {getPlaybackState, playSong, pauseSong} from "Services/Spotify/spotifyAPI";
import {useState, useEffect} from "react";
import useSpotifyAuth from "Store/selectors/useSpotifyAuthData"
import bragiIcon from "Assets/images/bragi-icon.png"
import SpotifyControlView from "./SpotifyControlView";

const SpotifyControl = function () {
  const token = useSpotifyAuth();
  const [playbackState, setPlaybackState] = useState({
    image_src: bragiIcon, name: "Bragi", artists: "3000", is_playing: false,
  });

  useEffect(() => {
    if (token) {
      getPlaybackState(token.access_token)
        .then((newData) => {
          if (newData.statusCode === 200) setPlaybackState(handleData(newData.body));
        });
    }
  }, [token]);

  const handleData = (newData) => {
    return {
      image_src: newData.item.album.images[0].url,
      name: newData.item.name,
      artists: newData.item.artists.map((artist) => artist.name).join(", "),
      is_playing: newData.is_playing,
    };
  }

  const updatePlaybackState = () => {
    getPlaybackState(token.access_token)
      .then((newData) => {
        if (newData.statusCode === 200) setPlaybackState(handleData(newData.body));
      }).catch((err) => {
        console.log(err);
      });
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
