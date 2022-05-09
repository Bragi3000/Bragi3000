import tictactoedemo from "Assets/images/tictactoedemo.gif";
import PopoverHelp from "Components/PopoverHelp/PopoverHelp";

/**
 * Component that shows information before the game has started (when picking songs)
 * This view is only meant to be used by the presenter.
 * @returns The view for the component
 */
const WaitingForGameView = function () {
  return <PopoverHelp number={6} helperHeading={"Game Area"}
    helperText={"After both players selected and confirmed their songs you can start the game. " +
                 "The winner song will be added to the playlist to the playlist."}
    horizontal={"center"} vertical={"center"}
    helperImg={tictactoedemo}>
    <div className="w-72 mx-auto text-center">
    Please select and confirm your songs to start a new game!
    </div>
  </PopoverHelp>;
};

export default WaitingForGameView;
