import spotifyConfig from "../../Config/spotify";


const SpotifyAuth = function () {
  const urlParams = new URLSearchParams({
    client_id: spotifyConfig.clientId,
    redirect_uri: spotifyConfig.redirectUri,
    scope: spotifyConfig.scopes.join(" "),
    response_type: "token",
    show_dialog: "true"
  });

  return (
    <a href={`${spotifyConfig.authEndpoint}?${urlParams.toString()}`}>
      Login to Spotify
    </a>
  )
}

export default SpotifyAuth;
