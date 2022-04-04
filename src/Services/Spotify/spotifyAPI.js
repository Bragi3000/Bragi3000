import SpotifyWebApi from "spotify-web-api-node";

/**
 * Method which calls the spotify API to get information about the playback state of the authenticated user
 * https://developer.spotify.com/documentation/web-api/reference/#/operations/get-information-about-the-users-current-playback
 * @param {String} accessToken valid spotify Bearer type access token
 * @returns {Promise} API response; example can be found in the link
 */
function getPlaybackState(accessToken) {
  return new SpotifyWebApi({ accessToken }).getMyCurrentPlaybackState();
}

/**
 * Method which calls the spotify API to add a song to the current queue of the authenticated user
 * https://developer.spotify.com/documentation/web-api/reference/#/operations/add-to-queue
 * @param {String} accessToken valid spotify Bearer type access token
 * @param {String} songUri songUri to be added to the queue
 * @returns {Promise} API response; example can be found in the link
 */
function addSongToQueue(accessToken, songUri) {
  return new SpotifyWebApi({ accessToken }).addToQueue(songUri);
}

/**
 * Method which calls the spotify API to pause the current song of the authenticated user
 * https://developer.spotify.com/documentation/web-api/reference/#/operations/pause-a-users-playback
 * @param {String} accessToken valid spotify Bearer type access token
 * @returns {Promise} API response; example can be found in the link
 */
function pauseSong(accessToken) {
  return new SpotifyWebApi({ accessToken }).pause();
}

/**
 * Method which calls the spotify API to resume the current song of the authenticated user
 * https://developer.spotify.com/documentation/web-api/reference/#/operations/start-a-users-playback
 * @param {String} accessToken valid spotify Bearer type access token
 * @returns {Promise} API response; example can be found in the link
 */
function playSong(accessToken) {
  return new SpotifyWebApi({ accessToken }).play();
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
  const response = await new SpotifyWebApi({ accessToken }).searchTracks(
    searchQuery || defaultSearchQuery
  );

  return response.body.tracks?.items ?? [];
}

export { getPlaybackState, addSongToQueue, playSong, pauseSong, searchSong };
