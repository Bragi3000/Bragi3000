import spotifyConfig from "../../Config/spotify";

// https://developer.spotify.com/documentation/web-api/reference/#/operations/start-a-users-playback
function treatHTTPResponse(response) {
  if (response.status === 200) {
    return response.json()
  }
  throw "API problem"
}

// response of this method will contain current song and link to image
function getPlaybackState(token) {
  return null;
}

function addSongToQueue(token, song) {
  return null;
}

function PauseSong(token) {
  return null;
}

function PlaySong(token) {
  return null;
}
