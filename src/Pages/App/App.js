import LogoutButton from "Components/LogoutButton/LogoutButton";
import { Navigate } from "react-router";
import { Link } from "react-router-dom";
import useAuthentication from "Services/firebase/useAuthentication";
import SpotifyControl from "../../Components/SpotifyControl/SpotifyControl";

const App = function () {
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
    <div className="App">
      <span>Hello there, {user.email}!</span>

      <LogoutButton />

      <Link to="/settings">Settings</Link>

      <SpotifyControl/>
    </div>
  );
};

export default App;
