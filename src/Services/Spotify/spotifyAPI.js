import spotifyConfig from "Config/spotify";

import SpotifyWebApi from "spotify-web-api-node";

function promiseDataHandler(data) {
  console.log(data);
  return data.body;
}

function promiseErrorHandler(err) {
  console.log(err);
  throw new Error(`API problem: ${err}`);
}

// https://developer.spotify.com/documentation/web-api/reference/#/operations/get-information-about-the-users-current-playback
function getPlaybackState(token) {
  return new SpotifyWebApi({token})
    .getMyCurrentPlaybackState()
    .then(promiseDataHandler)
    .catch(promiseErrorHandler);
}

// https://developer.spotify.com/documentation/web-api/reference/#/operations/add-to-queue
function addSongToQueue(token, songUri) {
  return new SpotifyWebApi({token})
    .addToQueue(songUri)
    .then(promiseDataHandler)
    .catch(promiseErrorHandler);
}

// https://developer.spotify.com/documentation/web-api/reference/#/operations/pause-a-users-playback
function pauseSong(token) {
  return new SpotifyWebApi({token})
    .pause()
    .then(promiseDataHandler)
    .catch(promiseErrorHandler);
}

// https://developer.spotify.com/documentation/web-api/reference/#/operations/start-a-users-playback
function playSong(token) {
  return new SpotifyWebApi({token})
    .play()
    .then(promiseDataHandler)
    .catch(promiseErrorHandler);
}

// https://developer.spotify.com/documentation/web-api/reference/#/operations/search
// method can be changed to include offset for infinite scroll, could also make method to search artist etc...
function searchSong(token, songName) {
  return new SpotifyWebApi({token})
    .searchTracks(songName)
    .then(promiseDataHandler)
    .catch(promiseErrorHandler);
}

export { getPlaybackState, addSongToQueue, playSong, pauseSong, searchSong };
