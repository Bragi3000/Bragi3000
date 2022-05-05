import SongSelector from "Components/SongSelector/SongSelector";
import TicTacToe from "Components/TicTacToe/TicTacToe";
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
      <div className="flex justify-center px-5 space-x-3">
        <SongSelector player={LEFT_PLAYER} />

        <TicTacToe size={3} />

        <SongSelector player={RIGHT_PLAYER} />
      </div>
    </>
  );
};

export default AppGamePage;
