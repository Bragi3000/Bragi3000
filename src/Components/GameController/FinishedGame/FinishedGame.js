import { connect } from "react-redux";
import { resetGame, selectEndGameStatus, selectWinner } from "Store/slices/game";
import FinishedGameView from "./FinishedGameView";

/**
 * Component that shows information and actions after the minigame has ended.
 * @returns The presenter for the component
 */
const FinishedGame = connect((state) => ({
  winner: selectWinner(state),
  endGameStatus: selectEndGameStatus(state),
}), (dispatch) => ({
  onContinue: () => dispatch(resetGame())
}))(FinishedGameView);

export default FinishedGame;
