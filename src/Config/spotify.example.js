/**
 * Copy the client id from the Spotify for developers dashboard,
 * and rename to spotify.js
 */

const spotifyConfig = {
  clientId: "???",
  authEndpoint: 'https://accounts.spotify.com/authorize',
  redirectUri: "http://localhost:3000/auth",
  // https://developer.spotify.com/documentation/general/guides/authorization/scopes/
  scopes: [
    "user-read-currently-playing",
    "user-read-playback-state",
    "user-modify-playback-state",
    "playlist-modify-private",
    "ugc-image-upload",
  ],
}

export default spotifyConfig;
