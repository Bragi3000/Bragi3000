import LogoutButton from "Components/LogoutButton/LogoutButton";
import SpotifyLoginButton from "Components/SpotifyLoginButton/SpotifyLoginButton";
import { Navigate } from "react-router";
import useAuthentication from "Services/firebase/useAuthentication";
import useSpotifyAuthData from "Store/selectors/useSpotifyAuthData";
import useTitle from "Utils/useTitle";

const SettingsPage = function () {
  useTitle("Bragi 3000 - Settings");

  const { authReady, loggedIn, user } = useAuthentication();

  const spotifyAuthData = useSpotifyAuthData();

  if (!authReady)
    return (
      <span>Waiting for auth...</span>
    );

  if (!loggedIn)
    return (
      <Navigate replace to="/login" />
    );

  return (
    <div>
      <span>Your token: {user.uid}</span>
      <br />
      <span>Your email: {user.email}</span>
      <br />
      <span>{JSON.stringify(spotifyAuthData)}</span>
      <br />
      <SpotifyLoginButton />
      <br />
      <LogoutButton />
    </div>
  );
};

export default SettingsPage;
