import { FINISHED, PICK_SONGS, PLAYING } from "Constants/gameStages";
import FinishedGame from "./FinishedGame/FinishedGame";
import MiniGame from "./MiniGame/MiniGame";
import WaitingForGame from "./WaitingForGame/WaitingForGame";

const GameControllerView = function ({ stage }) {
  return (
    <div className="bg-gray-800 flex-1 min-w-[24rem] max-w-[32rem] p-3">
      {stage === PICK_SONGS && <WaitingForGame />}
      {stage === PLAYING && <MiniGame />}
      {stage === FINISHED && <FinishedGame />}
    </div>
  );
};

export default GameControllerView;
