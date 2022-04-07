import WaitingView from "Components/WaitingView/WaitingView";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import useSetSpotifyAuthData from "Store/updaters/useSetSpotifyAuthData";
import useHashParams from "Utils/useHashParams";

/*
 * Page to sign in to Spotify account.
 */
const SpotifyCallbackPage = function () {
  const navigate = useNavigate();
  const params = useHashParams();
  const setSpotifyAuthData = useSetSpotifyAuthData();

  useEffect(() => {
    if (params.get("access_token")) {
      setSpotifyAuthData({
        access_token: params.get("access_token"),
        token_type: params.get("token_type"),
        expires: Date.now() + parseInt(params.get("expires_in") * 1000),
      }).then(() => {
        navigate("/settings");
      });
    }
  }, [params, setSpotifyAuthData, navigate]);

  return <WaitingView text="Updating token data" />;
};

export default SpotifyCallbackPage;
