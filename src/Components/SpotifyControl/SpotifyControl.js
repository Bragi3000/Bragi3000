import {getPlaybackState, playSong, pauseSong} from "Services/Spotify/spotifyAPI";
import {useState, useEffect} from "react";
import useSpotifyAuth from "Store/selectors/useSpotifyAuthData"
import bragiIcon from "Assets/images/bragi-icon.png"
import SpotifyControlView from "./SpotifyControlView";

const SpotifyControl = function () {
  const token = useSpotifyAuth();

  const [playbackState, setPlaybackState] = useState({
    image_src: bragiIcon,
    name: "Bragi",
    artist: "3000",
    isPlaying: false,
  });

  useEffect(() => {
    if (token) {
      getPlaybackState(token.access_token)
        .then((newData) => {
          if (newData.statusCode === 200)
            setPlaybackState(newData.body);
        });
    }
  }, [token]);

  // const handleData = (playbackData) => {
  //   if (playbackData.statusCode === 200) {
  //     setPlaybackState({
  //       image_src: playbackData.item.album.images[0].url,
  //       name: playbackData.item.name,
  //       artist: playbackData.item.artists.map((artist)=>artist.name).join(", "),
  //       is_playing: playbackData.is_playing,
  //     });
  //     return playbackData.body;
  //   }
  // }

  const handlePlay = () => {
    playbackState.is_playing ? pauseSong(token.access_token) : playSong(token.access_token);
    getPlaybackState(token.access_token)
      .then((newData) => {
        if (newData.statusCode === 200)
          setPlaybackState(newData.body);
      });
  }

  return (
    <SpotifyControlView
      onModifyPlayback={handlePlay}
      imageSrc = {playbackState.item.album.images[0].url}
      name = {playbackState.name}
      artists = {playbackState.item.artists.map((artist)=>artist.name).join(", ")}
      is_playing = {playbackState.is_playing}
    />
  )
}

export default SpotifyControl;
