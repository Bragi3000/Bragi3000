import spotifyConfig from "Config/spotify";

const SpotifyWebApi = require('spotify-web-api-node');

const spotifyApi = new SpotifyWebApi({
  clientId: spotifyConfig.clientId,
  clientSecret: spotifyConfig.clientSecret,
  redirectUri: spotifyConfig.redirectUri,
});

// https://developer.spotify.com/documentation/web-api/reference/#/operations/start-a-users-playback

function promiseDataHandler(){
  return null;
}

function promiseErrorHandler() {
  return null;
}

// response of this method will contain current song and link to image
function getPlaybackState(token) {
  spotifyApi.setAccessToken(token);
  spotifyApi.getMyCurrentPlaybackState()
    .then(function (data) {
      // Output items
      if (data.body && data.body.is_playing) {
        console.log("User is currently playing something!");
        console.log(data.body);
        return data.body;
      } else {
        console.log("User is not playing anything, or doing so in private.");
      }
    })
    .catch(function (err) {
      console.log('Something went wrong!', err);
    });
  // return null;
}

function addSongToQueue(token, songUri) {
  spotifyApi.setAccessToken(token);
  spotifyApi.addToQueue(songUri)
    .then(promiseDataHandler)
    .catch(promiseErrorHandler);
}

function pauseSong(token) {
  spotifyApi.setAccessToken(token);
  spotifyApi.pause()
    .then(promiseDataHandler)
    .catch(promiseErrorHandler)
}

function playSong(token) {
  spotifyApi.setAccessToken(token);
  spotifyApi.play()
    .then(promiseDataHandler)
    .catch(promiseErrorHandler)
}

function searchSong(token, songName) {
  spotifyApi.setAccessToken(token);
  spotifyApi.searchTracks(songName)
    .then(promiseDataHandler)
    .catch(promiseErrorHandler)
}

export {getPlaybackState, addSongToQueue, playSong, pauseSong, searchSong};
