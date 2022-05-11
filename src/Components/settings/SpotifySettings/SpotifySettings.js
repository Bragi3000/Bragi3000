import spotifyConfig from "Config/spotify";
import { useDispatch, useSelector } from "react-redux";
import {
  resetSpotifyAuthData,
  selectHasValidSpotifyToken,
  selectSpotifyAccessToken,
  selectSpotifyTokenExpiryDate,
} from "Store/slices/spotifyAuth";
import SpotifySettingsView from "./SpotifySettingsView";

/**
 * Settings section showing configuration for Spotify.
 * @returns The presenter for the component
 */
const SpotifySettings = function () {
  const dispatch = useDispatch();
  const accessToken = useSelector(selectSpotifyAccessToken);
  const expiryDate = useSelector(selectSpotifyTokenExpiryDate);
  const hasValidToken = useSelector(selectHasValidSpotifyToken);

  const onLink = () => {
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

  const onUnlink = () => {
    dispatch(resetSpotifyAuthData());
  };

  return (
    <SpotifySettingsView
      {...{ accessToken, expiryDate, hasValidToken, onLink, onUnlink }}
    />
  );
};

export default SpotifySettings;
