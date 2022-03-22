import { useEffect } from "react";
import { Navigate } from "react-router";
import useAuthentication from "Services/firebase/useAuthentication";
import useSetSpotifyAuthData from "Store/updaters/useSetSpotifyAuthData";
import useHashParams from "Utils/useHashParams";

const SpotifyCallbackPage = function () {
  const { authReady, loggedIn } = useAuthentication();
  const params = useHashParams();
  const setSpotifyAuthData = useSetSpotifyAuthData();

  useEffect(() => {
    if (authReady && loggedIn && params.get("access_token")) {
      setSpotifyAuthData({
        access_token: params.get("access_token"),
        token_type: params.get("token_type"),
        expires: Date.now() + (parseInt(params.get("expires_in") * 1000))
      });
    }
  }, [authReady, loggedIn, params, setSpotifyAuthData]);

  if (!authReady)
    return <span>Waiting for auth...</span>;

  if (!loggedIn)
    return <Navigate replace to="/login" />;

  return <Navigate replace to="/settings" />;
}

export default SpotifyCallbackPage;
