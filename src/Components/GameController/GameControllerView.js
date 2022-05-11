import { FINISHED, PICK_SONGS, PLAYING } from "Constants/gameStages";
import { HELP_MINIGAME } from "Constants/helpPopovers";
import FinishedGame from "./FinishedGame/FinishedGame";
import MiniGame from "./MiniGame/MiniGame";
import WaitingForGame from "./WaitingForGame/WaitingForGame";
import tictactoedemo from "Assets/images/tictactoedemo.gif"
import PopoverHelp from "Components/PopoverHelp/PopoverHelp";

/**
 * Component that handles the part of the app where the minigame is located,
 * showing the game or other informations/actions depending on the stage.
 * This view is only meant to be used by the presenter.
 * @param stage Stage of the game flow
 * @returns The view for the component
 */
const GameControllerView = function ({ stage }) {
  return (
    <div className="bg-gray-800 flex-1 min-w-[24rem] max-w-[32rem] p-3">
      <PopoverHelp
        name={HELP_MINIGAME}
        helperHeading={"Game Area"}
        helperText={
          "After both players selected and confirmed their songs you can start the game. " +
          "The winner song will be added to the playlist to the playlist."
        }
        horizontal={"center"}
        vertical={"center"}
        helperImg={tictactoedemo}
      >
        {stage === PICK_SONGS && <WaitingForGame />}
        {stage === PLAYING && <MiniGame />}
        {stage === FINISHED && <FinishedGame />}
      </PopoverHelp>
    </div>
  );
};

export default GameControllerView;
