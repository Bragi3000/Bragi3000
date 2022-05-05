import { useDispatch } from "react-redux";
import { setWinner } from "Store/slices/game";
import MiniGameView from "./MiniGameView";

const MiniGame = function () {
  const dispatch = useDispatch();

  const handleWin = (winner) => {
    dispatch(setWinner(winner));
  };

  return <MiniGameView onWin={handleWin} />;
};

export default MiniGame;
