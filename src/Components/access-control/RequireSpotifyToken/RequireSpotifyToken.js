import { isEmpty, isLoaded } from "react-redux-firebase";
import { Navigate } from "react-router";
import useSpotifyAuthData from "Store/selectors/useSpotifyAuthData";
import WaitingView from "Components/WaitingView/WaitingView";

const RequireSpotifyToken = function ({ children }) {
  const spotifyAuthData = useSpotifyAuthData();

  if (!isLoaded(spotifyAuthData))
    return <WaitingView text="Waiting for Spotify data" />;

  if (
    isEmpty(spotifyAuthData) ||
    !spotifyAuthData.access_token ||
    spotifyAuthData.expires < Date.now()
  )
    return <Navigate replace to="/settings" />;

  return children;
};

export default RequireSpotifyToken;
