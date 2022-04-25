import SpotifyControl from "Components/SpotifyControl/SpotifyControl";
import { Outlet } from "react-router";
import { Link } from "react-router-dom";
import useUserData from "Services/firebase/useUserData";
import DeviceSelector from "../../Components/DeviceSelector/DeviceSelector";

/*
 * Main page of the app consisting of song selectors, song control and tic-tac-toe game.
 */
const AppPage = function () {
  const user = useUserData();

  return (
    <div className="App">
      <span>Hello there, {user.email}!</span>

      <Link to="/settings">Settings</Link>

      <Outlet />

      <SpotifyControl />

      <DeviceSelector />
    </div>
  );
};

export default AppPage;
