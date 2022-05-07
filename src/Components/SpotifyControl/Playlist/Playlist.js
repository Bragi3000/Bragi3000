import PlaylistView from "./PlaylistView";
import {
  fetchPlaylistId, fetchPlaylistSongs,
  selectPlaylistSongs,
} from "Store/slices/playlist";
import { useEffect } from "react";
import { useDispatch, useSelector} from "react-redux";
import { selectSpotifyAccessToken } from "Store/slices/spotifyAuth";

/**
 * Component that displays the playlist of the game.
 */
const Playlist = function () {
  const token = useSelector(selectSpotifyAccessToken);
  const dispatch = useDispatch();

  useEffect(() => {
    const accessToken = token.access_token;
    dispatch(fetchPlaylistId({ accessToken })).unwrap().then(
      ()=> dispatch(fetchPlaylistSongs({ accessToken })))
  },[dispatch, token.access_token]);

  const playlistSongs = useSelector(state => selectPlaylistSongs(state));
  return <PlaylistView songs={playlistSongs}/>
}

export default Playlist;
