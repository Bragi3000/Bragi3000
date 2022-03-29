import spotifyConfig from "Config/spotify";

import SpotifyWebApi from "spotify-web-api-node";

// https://developer.spotify.com/documentation/web-api/reference/#/operations/get-information-about-the-users-current-playback
function getPlaybackState(token) {
  return new SpotifyWebApi({'accessToken':token})
    .getMyCurrentPlaybackState()
}

// https://developer.spotify.com/documentation/web-api/reference/#/operations/add-to-queue
function addSongToQueue(token, songUri) {
  return new SpotifyWebApi({'accessToken':token})
    .addToQueue(songUri)
}

// https://developer.spotify.com/documentation/web-api/reference/#/operations/pause-a-users-playback
function pauseSong(token) {
  return new SpotifyWebApi({'accessToken':token})
    .pause()
}

// https://developer.spotify.com/documentation/web-api/reference/#/operations/start-a-users-playback
function playSong(token) {
  return new SpotifyWebApi({'accessToken':token})
    .play()
}

// https://developer.spotify.com/documentation/web-api/reference/#/operations/search
// method can be changed to include offset for infinite scroll, could also make method to search artist etc...
function searchSong(token, songName) {
  return new SpotifyWebApi({'accessToken':token})
    .searchTracks(songName)
}

export { getPlaybackState, addSongToQueue, playSong, pauseSong, searchSong };
