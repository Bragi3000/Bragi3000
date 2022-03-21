import spotifyConfig from "Config/spotify";

const SpotifyWebApi = require('spotify-web-api-node');

const spotifyApi = new SpotifyWebApi({
  clientId: spotifyConfig.clientId,
  clientSecret: spotifyConfig.clientSecret,
  redirectUri: spotifyConfig.redirectUri,
});

// https://developer.spotify.com/documentation/web-api/reference/#/operations/start-a-users-playback

function promiseDataHandler(data){
  console.log(data);
  return data.body;
}

function promiseErrorHandler(err) {
  console.log(err);
}

// response of this method will contain current song and link to image
function getPlaybackState(token) {
  spotifyApi.setAccessToken(token);
  spotifyApi.getMyCurrentPlaybackState()
    .then(function (data) {
      if (data.body && data.body.is_playing) {
        // console.log("User is currently playing something!");
        // console.log(data.body);
        return data.body;
      }
    })
    .catch(promiseErrorHandler)
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
    .catch(promiseErrorHandler);
}

function playSong(token) {
  spotifyApi.setAccessToken(token);
  spotifyApi.play()
    .then(promiseDataHandler)
    .catch(promiseErrorHandler);
}

// method can be changed to include offset for infinite scroll, could also make method to search artist etc...
function searchSong(token, songName) {
  spotifyApi.setAccessToken(token);
  spotifyApi.searchTracks(songName)
    .then(promiseDataHandler)
    .catch(promiseErrorHandler);
}

export {getPlaybackState, addSongToQueue, playSong, pauseSong, searchSong};
