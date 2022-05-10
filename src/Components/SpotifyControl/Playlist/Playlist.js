import PlaylistView from "./PlaylistView";
import {
  fetchPlaylistId, fetchPlaylistSongs,
  selectPlaylistSongs,
} from "Store/slices/playlist";
import { useEffect } from "react";
import { useDispatch, useSelector} from "react-redux";
import { selectSpotifyAccessToken } from "Store/slices/spotifyAuth";
import {contextSourcesMap} from "tailwindcss/lib/lib/sharedState";

/**
 * Component that displays the playlist of the game.
 */
const Playlist = function () {
  const accessToken = useSelector(selectSpotifyAccessToken);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPlaylistId({ accessToken })).unwrap().then(
      ()=> dispatch(fetchPlaylistSongs({ accessToken })))
  },[dispatch, accessToken]);

  const playlistSongs = useSelector(state => selectPlaylistSongs(state));
  return <PlaylistView songs={playlistSongs}/>
}

export default Playlist;
