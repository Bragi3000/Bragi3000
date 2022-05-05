import spotifyConfig from "Config/spotify";
import useSpotifyAuthData from "Store/selectors/useSpotifyAuthData";
import useSetSpotifyAuthData from "Store/updaters/useSetSpotifyAuthData";
import SpotifySettingsView from "./SpotifySettingsView";

/**
 * Settings section showing configuration for Spotify.
 * @returns The presenter for the component
 */
const SpotifySettings = function () {
  const authData = useSpotifyAuthData();
  const setAuthData = useSetSpotifyAuthData();

  const handleLink = () => {
    const urlParams = new URLSearchParams({
      client_id: spotifyConfig.clientId,
      redirect_uri: spotifyConfig.redirectUri,
      scope: spotifyConfig.scopes.join(" "),
      response_type: "token",
      show_dialog: "true",
    });

    window.location.href = `${
      spotifyConfig.authEndpoint
    }?${urlParams.toString()}`;
  };

  const handleUnlink = () => {
    setAuthData({});
  };

  return (
    <SpotifySettingsView
      token={authData && authData.access_token}
      expireStamp={authData && authData.expires}
      onLink={handleLink}
      onUnlink={handleUnlink}
    />
  );
};

export default SpotifySettings;
