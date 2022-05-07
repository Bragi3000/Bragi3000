import TicTacToe from "./TicTacToe/TicTacToe";

/**
 * Component that wraps the minigame, handling app-wide events.
 * This view is only meant to be used by the presenter.
 * @param onWin Event fired when a player wins the game
 * @returns The view for the component
 */
const MiniGameView = function ({ onWin }) {
  return <TicTacToe size={3} onWin={onWin} />;
};

export default MiniGameView;
