import {getPlaybackState, playSong, pauseSong} from "Services/Spotify/spotifyAPI";
import {useState, useEffect} from "react";
import useSpotifyAuth from "Store/selectors/useSpotifyAuthData"
import bragiIcon from "Assets/images/bragi-icon.png"
import SpotifyControlView from "./SpotifyControlView";

const SpotifyControl = function () {
  const token = useSpotifyAuth();

  const [playBackState, setPlayBackState] = useState(null);
  const [data, setData] = useState({
    "image_src": bragiIcon,
    "name": "Bragi",
    "artist": "3000",
    "is_playing": false,
  });
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    if (token) {
      setPlayBackState(getPlaybackState(token.access_token).then(handleData));
    }
  }, [token]);

  const handleData = (playbackData) => {
    if (playbackData.statusCode === 200) {
      setData({
        "image_src": playbackData.body.item.album.images[0].url,
        "name": playbackData.body.item.name,
        "artist": playbackData.body.item.artists.map((artist)=>artist.name).join(", "),
        "is_playing": playbackData.body.is_playing,
      });
      setIsPlaying(playbackData.body.is_playing);
      return playbackData.body;
    }
  }

  const handlePlay = () => {
    isPlaying ? pauseSong(token.access_token) : playSong(token.access_token);
    setPlayBackState(getPlaybackState(token.access_token));
    setData({...data, "is_playing": !isPlaying})
    setIsPlaying(!isPlaying);
  }

  return (
    <SpotifyControlView
      onModifyPlayback={handlePlay}
      data={data}
    />
  )
}

export default SpotifyControl;
