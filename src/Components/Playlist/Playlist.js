import useSpotifyAuth from "Store/selectors/useSpotifyAuthData"
import {
  addSongToPlaylist,
  getPlaylist,
  removeSongsFromPlaylist,
  getSpotifyUser,
  getUserPlaylists,
  createPlaylist,
} from "Services/Spotify/spotifyAPI";
import PlaylistView from "./PlaylistView";
import {useEffect, useState} from "react";

const playlistName = "bragi3000";

/**
 * Function to delete all songs from a playlist
 * @param playlistId {string} - The id of the playlist to delete from
 * @param accessToken {string} - The access token to use
 * @returns {Promise} - A promise that resolves when the songs have been deleted
 */
function resetPlaylist(playlistId, accessToken) {
  return getPlaylist(accessToken, playlistId)
    .then(resp => resp.body)
    .then((body) => {
      const uris = body.tracks.items.map((song) => {
        return {uri: song.track.uri}});
      removeSongsFromPlaylist(accessToken, playlistId, uris, body.snapshot_id).then(() => true).catch(() => false);
    });
}

/**
 * Function to get the playlist id of the playlist.
 * If the playlist does not exist, it will be created.
 * @param accessToken {string} - The access token to use
 * @returns {Promise} - A promise that resolves to the playlist id
 */
function getPlaylistId (accessToken) {
  return getSpotifyUser(accessToken).then(
    (resp) => {
      return getUserPlaylists(accessToken, resp.body.id).then(
        (resp) => {
          const playlists = resp.body.items;
          // check if playlist exists
          const playlist = playlists.find(playlist => playlist.name === playlistName);
          if (playlist) {
            // resetPlaylist(playlist.id, accessToken);
            return playlist.id;
          } else {
            // otherwise, create playlist
            createPlaylist(accessToken).then(
              (resp) => {
                return resp.body.id
              });
          }
        }
      )
    }
  );
}


const Playlist = function () {
  const token = useSpotifyAuth();
  // TODO move to application state
  const [playlistId, setPlaylistId] = useState(null);
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    getPlaylistId(token.access_token).then((playlistId) => {
      setPlaylistId(playlistId);
      getPlaylist(token.access_token, playlistId).then(
        (resp) => {
          console.log(resp.body.tracks.items)
          setSongs(resp.body.tracks.items.map(song => song.track));
        })}
    );
  },[])

  // addSongToPlaylist(token.access_token, playlistID, "spotify:track:4iV5W9uYEdYUVa79Axb7Rh").then(resp => console.log(resp));
  return <PlaylistView songs={songs}/>
}

export default Playlist;
