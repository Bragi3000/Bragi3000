import useSpotifyAuth from "Store/selectors/useSpotifyAuthData"
import PlaylistView from "./PlaylistView";
import {
  selectPlaylistSongs,
  setPlaylistId,
  setPlaylistSongs,
} from "Store/slices/playlist";
import { useEffect } from "react";
import { useDispatch, useSelector} from "react-redux";
import {getPlaylistId, getPlaylistSongs} from "Services/Spotify/spotifyAPI";


const Playlist = function () {
  const token = useSpotifyAuth();
  const dispatch = useDispatch();

  // TODO replace with dispatch(fetPlaylistSongs(token))
  useEffect(() => {
    getPlaylistId(token.access_token).then(playlistId => {
      dispatch(setPlaylistId(playlistId));
      getPlaylistSongs(token.access_token, playlistId).then(
        (songs) => dispatch(setPlaylistSongs(songs)));
    });
  },[]);

  const playlistSongs = useSelector(state => selectPlaylistSongs(state));
  return <PlaylistView songs={playlistSongs}/>
}

export default Playlist;
