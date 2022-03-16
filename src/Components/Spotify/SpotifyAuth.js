import spotifyConfig from "../../Config/spotify.example";


const SpotifyAuth = function () {
  return (
    <a className={""}
       href={`${spotifyConfig.authEndpoint}?client_id=${spotifyConfig.clientId}&redirect_uri=${spotifyConfig.redirectUri}&scope=${spotifyConfig.scopes.join("%20")}&response_type=token&show_dialog=true`}>
      Login to Spotify
    </a>
  )
}

export default SpotifyAuth;
