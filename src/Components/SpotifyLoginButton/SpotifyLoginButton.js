import spotifyConfig from "Config/spotify";
import SpotifyLoginButtonView from "./SpotifyLoginButtonView";

/**
 * Component for Spotify login button.
 */
const SpotifyLoginButton = function() {
  const urlParams = new URLSearchParams({
    client_id: spotifyConfig.clientId,
    redirect_uri: spotifyConfig.redirectUri,
    scope: spotifyConfig.scopes.join(" "),
    response_type: "token",
    show_dialog: "true"
  });

  const url = `${spotifyConfig.authEndpoint}?${urlParams.toString()}`;

  return <SpotifyLoginButtonView url={url} />;
};

export default SpotifyLoginButton;
