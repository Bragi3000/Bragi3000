import SongSelector from "Components/SongSelector/SongSelector";
import TicTacToe from "Components/TicTacToe/TicTacToe";
import { LEFT_PLAYER, RIGHT_PLAYER } from "Constants/players";

const AppGamePage = function () {
  return (
    <>
      <SongSelector player={LEFT_PLAYER} />

      <TicTacToe size={3} />

      <SongSelector player={RIGHT_PLAYER} />
    </>
  );
};

export default AppGamePage;
