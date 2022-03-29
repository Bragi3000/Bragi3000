import {getPlaybackState, playSong, pauseSong} from "Services/Spotify/spotifyAPI";
import {useState, useEffect} from "react";
import useSpotifyAuth from "Store/selectors/useSpotifyAuthData"

import SpotifyControlView from "./SpotifyControlView";

const SpotifyControl = function () {
  const token = useSpotifyAuth();

  const [playBackState, setPlayBackState] = useState(null);
  const [data, setData] = useState({
    "image_src": null,
    "name": "temp",
    "is_playing": false,
  });
  const [isPlaying, setIsPlaying] = useState(null)

  useEffect(() => {
    if (token) {
      setPlayBackState(getPlaybackState(token.access_token).then(handleData));
    }
  }, [token]);

  const handleData = (playback_data) => {
    setData({
      "image_src": playback_data.body.item.album.images[0].url,
      "name": playback_data.body.item.name,
      "is_playing": playback_data.body.is_playing,
    });
    setIsPlaying(playback_data.body.is_playing);
    return playback_data.body;
  }

  useEffect(() => {
    console.log(data)
  }, [data]);

  const handlePlay = () => {
    isPlaying ? pauseSong(token.access_token) : playSong(token.access_token);
    setIsPlaying(!isPlaying);
    setPlayBackState(getPlaybackState(token.access_token));
  }


  return (
    <SpotifyControlView
      onModifyPlayback={handlePlay}
      data={data}
    />
    // <div><span>test</span></div>
  )
}

export default SpotifyControl;
