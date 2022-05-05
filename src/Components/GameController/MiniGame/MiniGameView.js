import TicTacToe from "./TicTacToe/TicTacToe";

const MiniGameView = function ({ onWin }) {
  return <TicTacToe size={3} onWin={onWin} />;
};

export default MiniGameView;
