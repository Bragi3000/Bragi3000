import { Navigate } from "react-router";
import { useSelector } from "react-redux";
import { selectHasValidSpotifyToken } from "Store/slices/spotifyAuth";

/**
 * Component restrict to users with a non-expired Spotify token in the store.
 * @param children the access restricted content
 * @param reverse reverse the behavior, ensures there is no token in the store
 */
const RequireSpotifyToken = function ({ children }) {
  const hasValidToken = useSelector(selectHasValidSpotifyToken);

  if (!hasValidToken) return <Navigate replace to="/settings" />;

  return children;
};

export default RequireSpotifyToken;
