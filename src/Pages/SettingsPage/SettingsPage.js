import LogoutButton from "Components/LogoutButton/LogoutButton";
import SpotifyLoginButton from "Components/SpotifyLoginButton/SpotifyLoginButton";
import { Navigate } from "react-router";
import useAuthentication from "Services/firebase/useAuthentication";

const SettingsPage = function () {
  const { authReady, loggedIn, user } = useAuthentication();

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
      <span>Your email: {user.email}</span>
      <br />
      <SpotifyLoginButton />
      <br />
      <LogoutButton />
    </div>
  );
};

export default SettingsPage;
