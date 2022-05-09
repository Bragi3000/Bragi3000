import SpotifyWebApi from "spotify-web-api-node";
import bragi_icon_b64 from "Assets/images/bragi-icon-b64";

/**
 * Method which calls the spotify API to get information about the playback state of the authenticated user
 * https://developer.spotify.com/documentation/web-api/reference/#/operations/get-information-about-the-users-current-playback
 * @param {String} accessToken valid spotify Bearer type access token
 * @returns {Promise} API response; example can be found in the link
 */
function getPlaybackState(accessToken) {
  return new SpotifyWebApi({accessToken}).getMyCurrentPlaybackState();
}

/**
 * Method which calls the spotify API to add a song to the current queue of the authenticated user
 * https://developer.spotify.com/documentation/web-api/reference/#/operations/add-to-queue
 * @param {String} accessToken valid spotify Bearer type access token
 * @param {String} songUri songUri to be added to the queue
 * @returns {Promise} API response; example can be found in the link
 */
function addSongToQueue(accessToken, songUri) {
  return new SpotifyWebApi({accessToken}).addToQueue(songUri);
}

/**
 * Method which calls the spotify API to pause the current song of the authenticated user
 * https://developer.spotify.com/documentation/web-api/reference/#/operations/pause-a-users-playback
 * @param {String} accessToken valid spotify Bearer type access token
 * @returns {Promise} API response; example can be found in the link
 */
function pauseSong(accessToken) {
  return new SpotifyWebApi({accessToken}).pause();
}

/**
 * Method which calls the spotify API to resume the current song of the authenticated user
 * https://developer.spotify.com/documentation/web-api/reference/#/operations/start-a-users-playback
 * @param {String} accessToken valid spotify Bearer type access token
 * @returns {Promise} API response; example can be found in the link
 */
function playSong(accessToken) {
  return new SpotifyWebApi({accessToken}).play();
}

/** A nice default in case the given query is empty */
const defaultSearchQuery = window.atob(
  "YXJ0aXN0OlJpY2sgQXN0bGV5IGFsYnVtOldoZW5ldmVyIFlvdSBOZWVkIFNvbWVib2R5IHRyYWNrOk5ldmVyIEdvbm5hIEdpdmUgWW91IFVw"
);

/**
 * Method which calls the spotify API to search for songs
 * https://developer.spotify.com/documentation/web-api/reference/#/operations/search
 * method can be changed to include offset for infinite scroll, could also make method to search artist etc...
 * @param {String} accessToken valid spotify Bearer type access token
 * @param {String} searchQuery query to be searched for on spotify
 * @returns {Promise} Promise for the list of tracks returned by the API (tracks.items part of the API response)
 * @throws Will reject if the response status code is not 200
 */
async function searchSong(accessToken, searchQuery) {
  const response = await new SpotifyWebApi({accessToken}).searchTracks(
    searchQuery || defaultSearchQuery
  );

  return response.body.tracks?.items ?? [];
}

const playlistName = "bragi3000"

/**
 * Method which calls the spotify API to create a playlist
 * https://developer.spotify.com/documentation/web-api/reference/#create-playlist
 * @param {String} accessToken valid spotify Bearer type access token
 * @param {String} playlistName name of the playlist to be created - standard is bragi3000
 * @returns {Promise} Promise for the spotify user object returned by the API (user part of the API response)
 * @throws Will reject if the response status code is not 201
 */
function getSpotifyUser(accessToken) {
  return new SpotifyWebApi({accessToken}).getMe();
}


/**
 * Method which calls the spotify API to get a list of playlists of the authenticated user
 * https://developer.spotify.com/documentation/web-api/reference/#get-a-list-of-current-users-playlistso
 * @param {String} accessToken valid spotify Bearer type access token
 * @param {String} userId id of the user whose playlists are to be retrieved
 * @returns {Promise} Promise for the list of playlists returned by the API
 */
function getUserPlaylists(accessToken, userId) {
  return new SpotifyWebApi({accessToken}).getUserPlaylists(userId);
}


/**
 * Method which calls the spotify API to create a playlist.
 * https://developer.spotify.com/documentation/web-api/reference/#create-playlist
 * @param {String} accessToken valid spotify Bearer type access token
 * @returns {Promise} Promise for the newly created playlist object returned by the API
 */
function createPlaylist(accessToken) {
  return new SpotifyWebApi({accessToken}).createPlaylist(playlistName, {'public': false});
}

/**
 * Method which calls the spotify API to get a playlist.
 * https://developer.spotify.com/documentation/web-api/reference/#get-playlist-tracks
 * @param {String} accessToken valid spotify Bearer type access token
 * @param {String} playlistId id of the playlist to be retrieved
 * @returns {Promise} Promise for the playlist object returned by the API
 */
function getPlaylist(accessToken, playlistId) {
  return new SpotifyWebApi({accessToken}).getPlaylist(playlistId);
}

/**
 * Method which calls the spotify API to add a track to a playlist.
 * @param accessToken valid spotify Bearer type access token
 * @param playlistId id of the playlist to song will be added to
 * @param trackUri uri of the track to be added
 * @returns {Promise} Promise for the songs added to the playlist
 */
function addSongToPlaylist(accessToken, playlistId, trackUri) {
  return new SpotifyWebApi({accessToken}).addTracksToPlaylist(playlistId, [trackUri]);
}

/**
 * Method which calls the spotify API to delete multiple tracks from a playlist.
 * @param accessToken valid spotify Bearer type access token
 * @param playlistId id of the playlist to songs will be deleted from
 * @param trackUris uris of the tracks to be deleted
 * @param snapshotId id of the playlist snapshot
 * @returns {Promise} Promise for the songs deleted from the playlist
 */
function removeSongsFromPlaylist(accessToken, playlistId, trackUris, snapshotId) {
  return new SpotifyWebApi({accessToken}).removeTracksFromPlaylist(playlistId, trackUris, {snapshot_id: snapshotId});
}

/**
 * Function to get the playlist id of the playlist.
 * If the playlist does not exist, it will be created.
 * @param accessToken {string} - The access token to use
 * @returns {Promise} - A promise that resolves to the playlist id
 */
function getPlaylistId(accessToken) {
  return getSpotifyUser(accessToken).then(
    (resp) => {
      return getUserPlaylists(accessToken, resp.body.id).then(
        (resp) => {
          const playlists = resp.body.items;
          // check if playlist exists
          const playlist = playlists.find(playlist => playlist.name === playlistName);
          if (playlist) {
            return playlist.id;
          } else {
            // otherwise, create playlist
            return createPlaylist(accessToken).then(
              (resp) => {
                uploadPlaylistImage(accessToken, resp.body.id);
                return resp.body.id;
              });
          }
        }
      )
    }
  );
}

/**
 * Function to get all the songs in the playlist.
 * @param accessToken {string} - The access token to use
 * @param playlistId {string} - The id of the playlist to get the songs from
 * @returns {Promise} - A promise that resolves into an array of song objects
 */
function getPlaylistSongs(accessToken, playlistId) {
  return getPlaylist(accessToken, playlistId).then(
    (resp) => {
      return resp.body.tracks.items.map(song => song.track);
    })
}

/**
 * Function to delete all songs from a playlist
 * @param accessToken {string} - The access token to use
 * @param playlistId {string} - The id of the playlist to delete from
 * @returns {Promise} - A promise that resolves when the songs have been deleted
 */
function resetPlaylist(accessToken, playlistId) {
  return getPlaylist(accessToken, playlistId)
    .then(resp => resp.body)
    .then((body) => {
      const uris = body.tracks.items.map((song) => {
        return {uri: song.track.uri}
      });
      removeSongsFromPlaylist(accessToken, playlistId, uris, body.snapshot_id).then(() => true).catch(() => false);
    });
}


/**
 * Function to start the bragi3000 playlist.
 * @param accessToken {string} - The access token to use
 * @param playlistId - The id of the playlist to start
 * @returns {Promise} - A promise that resolves when the playlist has started
 */
function startPlaylist(accessToken, playlistId) {
  turnShuffleOff(accessToken);
  return new SpotifyWebApi({accessToken}).play({
    context_uri: `spotify:playlist:${playlistId}`,
    offset: {
      position: 0
    }
  });
}

/**
 * Function to set the current playback device.
 * @param accessToken - The access token to use
 * @param deviceId - The id of the device to set as the current playback device
 * @returns {Promise} - A promise that resolves when the device has been set
 */
function setActiveDevice(accessToken, deviceId) {
  return new SpotifyWebApi({accessToken}).transferMyPlayback([deviceId]);
}

/**
 * Get the currently available devices for the user.
 * @param accessToken - The access token to use
 * @returns {Promise} - A promise that resolves to an array of devices
 */
function getAvailableDevices(accessToken) {
  return new SpotifyWebApi({accessToken}).getMyDevices().then(
    (resp) => {
      return resp.body.devices;
    }
  );
}

/**
 * Replace the image used to represent a specific playlist.
 * @param accessToken - The access token to use
 * @param playlistId - playlistID receiving custom image
 * @returns {Promise} Promise that resolves once picture is uploaded
 */
function uploadPlaylistImage(accessToken, playlistId) {
  return new SpotifyWebApi({accessToken}).uploadCustomPlaylistCoverImage(playlistId, bragi_icon_b64);
}


/**
 * Turn off shuffle
 * @param accessToken - The access token to use
 * @returns {Promise} Promise that resolves once shuffle is turned off
 */
function turnShuffleOff(accessToken) {
  return new SpotifyWebApi({accessToken}).setShuffle(false);
}


export {
  getPlaybackState,
  addSongToQueue,
  playSong,
  pauseSong,
  searchSong,
  createPlaylist,
  getPlaylist,
  addSongToPlaylist,
  getSpotifyUser,
  getUserPlaylists,
  removeSongsFromPlaylist,
  getPlaylistId,
  resetPlaylist,
  getPlaylistSongs,
  startPlaylist,
  getAvailableDevices,
  setActiveDevice
};
