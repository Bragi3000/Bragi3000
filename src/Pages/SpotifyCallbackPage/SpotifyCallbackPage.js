import WaitingView from "Components/WaitingView/WaitingView";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { selectSpotifyAccessToken, setSpotifyAuthData } from "Store/slices/spotifyAuth";
import useHashParams from "Utils/useHashParams";

/*
 * Page to sign in to Spotify account.
 */
const SpotifyCallbackPage = function () {
  const navigate = useNavigate();
  const params = useHashParams();
  const dispatch = useDispatch();
  const currentAccessToken = useSelector(selectSpotifyAccessToken);

  useEffect(() => {
    const accessToken = params.get("access_token");
    const tokenType = params.get("token_type");
    const expiresIn = parseInt(params.get("expires_in"));

    if (accessToken && tokenType === "Bearer" && accessToken !== currentAccessToken) {
      dispatch(
        setSpotifyAuthData(
          accessToken,
          Date.now() + (expiresIn - 10) * 1000
        )
      );
    }

    navigate("/settings");
  }, [navigate, params, dispatch, currentAccessToken]);

  return <WaitingView text="Updating token data" />;
};

export default SpotifyCallbackPage;
