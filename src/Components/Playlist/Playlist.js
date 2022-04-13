import useSpotifyAuth from "Store/selectors/useSpotifyAuthData"
import PlaylistView from "./PlaylistView";
import {
  selectPlaylistSongs,
  setPlaylistId,
  setPlaylistSongs,
} from "Store/slices/playlist";
import { useEffect } from "react";
import { useDispatch, useSelector} from "react-redux";
import {getAvailableDevices, getPlaylistId, getPlaylistSongs, startPlaylist} from "Services/Spotify/spotifyAPI";


const Playlist = function () {
  const token = useSpotifyAuth();
  const dispatch = useDispatch();

  // TODO replace with dispatch(fetPlaylistSongs(token))
  useEffect(() => {
    getPlaylistId(token.access_token).then(playlistId => {
      console.log(playlistId);
      dispatch(setPlaylistId(playlistId));
      getPlaylistSongs(token.access_token, playlistId).then(
        (songs) => dispatch(setPlaylistSongs(songs)));

      getAvailableDevices(token.access_token).then(
        (devices) => {
          // check if one of the devices is active
          const activeDevice = devices.find(device => device.is_active);
          if (activeDevice) {
            startPlaylist(token.access_token);
          } else {
            console.log("No active devices available");
          }
        }
      );
    });
  },[]);

  const playlistSongs = useSelector(state => selectPlaylistSongs(state));
  return <PlaylistView songs={playlistSongs}/>
}

export default Playlist;
