import spotifyConfig from "Config/spotify";

import SpotifyWebApi from "spotify-web-api-node";

/**
 * Method which calls the spotify API to get information about the playback state of the authenticated user
 * https://developer.spotify.com/documentation/web-api/reference/#/operations/get-information-about-the-users-current-playback
 * @param {String} token valid spotify Bearer type access token
 * @returns {Promise} API response; example can be found in the link
 */
function getPlaybackState(token) {
  return new SpotifyWebApi({'accessToken':token})
    .getMyCurrentPlaybackState()
}

/**
 * Method which calls the spotify API to add a song to the current queue of the authenticated user
 * https://developer.spotify.com/documentation/web-api/reference/#/operations/add-to-queue
 * @param {String} token valid spotify Bearer type access token
 * @param {String} songUri songUri to be added to the queue
 * @returns {Promise} API response; example can be found in the link
 */
function addSongToQueue(token, songUri) {
  return new SpotifyWebApi({'accessToken':token})
    .addToQueue(songUri)
}

/**
 * Method which calls the spotify API to pause the current song of the authenticated user
 * https://developer.spotify.com/documentation/web-api/reference/#/operations/pause-a-users-playback
 * @param {String} token valid spotify Bearer type access token
 * @returns {Promise} API response; example can be found in the link
 */
function pauseSong(token) {
  return new SpotifyWebApi({'accessToken':token})
    .pause()
}

/**
 * Method which calls the spotify API to resume the current song of the authenticated user
 * https://developer.spotify.com/documentation/web-api/reference/#/operations/start-a-users-playback
 * @param {String} token valid spotify Bearer type access token
 * @returns {Promise} API response; example can be found in the link
 */
function playSong(token) {
  return new SpotifyWebApi({'accessToken':token})
    .play()
}

/**
 * Method which calls the spotify API to search for songs
 * https://developer.spotify.com/documentation/web-api/reference/#/operations/search
 * method can be changed to include offset for infinite scroll, could also make method to search artist etc...
 * @param {String} token valid spotify Bearer type access token
 * @param {String} songName song to be searched for on spotify
 * @returns {Promise} API response; example can be found in the link
 */
function searchSong(token, songName) {
  return new SpotifyWebApi({'accessToken':token})
    .searchTracks(songName)
}

export { getPlaybackState, addSongToQueue, playSong, pauseSong, searchSong };
