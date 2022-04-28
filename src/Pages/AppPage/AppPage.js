import SpotifyControl from "Components/SpotifyControl/SpotifyControl";
import { Outlet } from "react-router";
import { Link } from "react-router-dom";

/*
 * Main page of the app consisting of song selectors, song control and tic-tac-toe game.
 */
const AppPage = function () {
  return (
    <>
      <div className="pb-28 overflow-clip">
        <Link to="/settings">Settings</Link>

        <Outlet />
      </div>
      <div className="fixed bottom-0 left-0 right-0">
        <SpotifyControl />
      </div>
    </>
  );
};

export default AppPage;
