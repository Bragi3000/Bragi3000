import SpotifyControl from "Components/SpotifyControl/SpotifyControl";
import { Outlet } from "react-router";

/*
 * Main page of the app consisting of song selectors, song control and tic-tac-toe game.
 */
const AppPage = function () {
  return (
    <div className="flex flex-col h-screen">
      <div className="flex-auto overflow-auto">
        <Outlet />
      </div>
      <div className="flex-none">
        <SpotifyControl />
      </div>
    </div>
  );
};

export default AppPage;
