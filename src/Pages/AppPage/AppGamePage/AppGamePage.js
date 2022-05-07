import GameController from "Components/GameController/GameController";
import SongSelector from "Components/SongSelector/SongSelector";
import { LEFT_PLAYER, RIGHT_PLAYER } from "Constants/players";
import { Link } from "react-router-dom";

const AppGamePage = function () {
  return (
    <>
      <div className="container mx-auto px-5">
        <div className="my-10 text-right">
          <Link className="text-green-400 hover:underline" to="/settings">
            Settings
          </Link>
        </div>
      </div>
      <div className="flex justify-center px-5">
        <SongSelector player={LEFT_PLAYER} />

        <GameController />

        <SongSelector player={RIGHT_PLAYER} />
      </div>
    </>
  );
};

export default AppGamePage;
