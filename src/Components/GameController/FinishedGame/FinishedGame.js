import { connect } from "react-redux";
import { resetGame, selectEndGameStatus, selectWinner } from "Store/slices/game";
import FinishedGameView from "./FinishedGameView";

const FinishedGame = connect((state) => ({
  winner: selectWinner(state),
  endGameStatus: selectEndGameStatus(state),
}), (dispatch) => ({
  onContinue: () => dispatch(resetGame())
}))(FinishedGameView);

export default FinishedGame;
