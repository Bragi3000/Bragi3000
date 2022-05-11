import SpotifyControl from "Components/SpotifyControl/SpotifyControl";
import GameController from "Components/GameController/GameController";
import SongSelector from "Components/SongSelector/SongSelector";
import { Link } from "react-router-dom";
import HelpButton from "Components/HelpButton/HelpButton";
import HelpModal from "Components/PopoverHelp/HelpModal";
import { LEFT_PLAYER, RIGHT_PLAYER } from "Constants/players";

/*
 * Main page of the app consisting of song selectors, song control and tic-tac-toe game.
 */
const AppPage = function () {
  return (
    <div className="flex flex-col h-screen">
      <div className="flex-auto overflow-auto">
        <div className="container mx-auto px-5">
          <div className="my-10 text-right">
            <HelpButton />
            <Link className="text-green-400 hover:underline" to="/settings">
              Settings
            </Link>
          </div>
        </div>
        <div className="flex justify-center min-w-min px-5">
          <SongSelector player={LEFT_PLAYER} />

          <GameController />

          <SongSelector player={RIGHT_PLAYER} />
        </div>
        <HelpModal />
      </div>
      <div className="flex-none">
        <SpotifyControl />
      </div>
    </div>
  );
};

export default AppPage;
