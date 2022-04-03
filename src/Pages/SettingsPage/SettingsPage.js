import LogoutButton from "Components/LogoutButton/LogoutButton";
import SpotifyLoginButton from "Components/SpotifyLoginButton/SpotifyLoginButton";
import useUserData from "Services/firebase/useUserData";
import useSpotifyAuthData from "Store/selectors/useSpotifyAuthData";
import useTitle from "Utils/useTitle";
import { Link } from "react-router-dom";

const SettingsPage = function () {
  useTitle("Bragi 3000 - Settings");

  const user = useUserData();

  const spotifyAuthData = useSpotifyAuthData();

  return (
    <div>
      <span>Your UID: {user.uid}</span>
      <br />
      <span>Your email: {user.email}</span>
      <br />
      <span>{JSON.stringify(spotifyAuthData)}</span>
      <br />
      <SpotifyLoginButton />
      <br />
      <LogoutButton />
      <br />
      <br />
      <Link to="/app">Start playing</Link>
    </div>
  );
};

export default SettingsPage;
