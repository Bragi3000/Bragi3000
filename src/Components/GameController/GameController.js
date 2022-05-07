import { connect } from "react-redux";
import { selectGameStage } from "Store/slices/game";
import GameControllerView from "./GameControllerView";

/**
 * Component that handles the part of the app where the minigame is located,
 * showing the game or other informations/actions depending on the stage.
 * @param stage Stage of the game flow
 * @returns The presenter for the component
 */
const GameController = connect((state) => ({
  stage: selectGameStage(state),
}))(GameControllerView);

export default GameController;
