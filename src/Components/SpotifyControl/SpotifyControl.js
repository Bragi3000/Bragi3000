import {getPlaybackState, playSong, pauseSong} from "Services/Spotify/spotifyAPI";
import {useState, useEffect} from "react";
import useSpotifyAuth from "Store/selectors/useSpotifyAuthData"

import SpotifyControlView from "./SpotifyControlView";

// we might want a function to access the token from firebase instead of passing it to the component
const SpotifyControl = function () {
  const {access_token} = useSpotifyAuth();
  const [playBackState, setPlayBackState] = useState(getPlaybackState(access_token));
  const [data, setData] = useState(null);
  const [isPlaying, setIsPlaying] = useState(null)

  const handleData = () => {
    setData({
      "image_src": playBackState.item.images[0].url,
      "name": playBackState.item.name,
      "is_playing": isPlaying,
    })
  }
  useEffect(handleData, [playBackState]);

  const handlePlay = (isPlaying) => {
    isPlaying ? pauseSong(access_token) : playSong(access_token);
    setIsPlaying(!isPlaying);
    setPlayBackState(getPlaybackState(access_token));
  }

  return (
    <SpotifyControlView
      onModifyPlayback={handlePlay}
      playBackState={data}
    />
  )
}

export default SpotifyControl;
