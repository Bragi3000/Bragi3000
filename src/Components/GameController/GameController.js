import { connect } from "react-redux";
import { selectGameStage } from "Store/slices/game";
import GameControllerView from "./GameControllerView";

const GameController = connect((state) => ({
  stage: selectGameStage(state),
}))(GameControllerView);

export default GameController;
