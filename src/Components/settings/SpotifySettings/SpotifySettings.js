import spotifyConfig from "Config/spotify";
import {useDispatch, useSelector} from "react-redux";
import {
  resetSpotifyAuthData,
  selectHasValidSpotifyToken,
  selectSpotifyAccessToken,
  selectSpotifyTokenExpiryDate,
} from "Store/slices/spotifyAuth";
import SpotifySettingsView from "./SpotifySettingsView";
import {selectPlaylistId} from "Store/slices/playlist";
import {resetPlaylist} from "Services/Spotify/spotifyAPI";

/**
 * Settings section showing configuration for Spotify.
 * @returns The presenter for the component
 */
const SpotifySettings = function () {
  const dispatch = useDispatch();
  const accessToken = useSelector(selectSpotifyAccessToken);
  const expiryDate = useSelector(selectSpotifyTokenExpiryDate);
  const hasValidToken = useSelector(selectHasValidSpotifyToken);
  const playlistId = useSelector(selectPlaylistId);

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
    dispatch(resetSpotifyAuthData());
  };

  const resetSpotifyPlaylist = () => {
    resetPlaylist(accessToken, playlistId);
  }

  return (
    <SpotifySettingsView
      {...{accessToken, expiryDate, hasValidToken}}
      onLink={handleLink}
      onUnlink={handleUnlink}
      onReset={resetSpotifyPlaylist}
    />
  );
};

export default SpotifySettings;
