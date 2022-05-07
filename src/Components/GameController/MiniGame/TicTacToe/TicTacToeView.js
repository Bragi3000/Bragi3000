import { LEFT_PLAYER, RIGHT_PLAYER } from "Constants/players";

/**
 * Subcomponent representing one square of the TicTacToe board.
 * @param  {String} value - The value of the square "X", "O", or " "
 * @param {Function} onClick - Callback function to be called when the square is clicked
 * @param {String} icon - The icon to be displayed in the square
 */
function Square({value, onClick, icon}) {
  let square;
  if (value === LEFT_PLAYER) {
    square = <img src={icon} alt={"_"} className="border-solid border-4 border-[#818cf8] w-24 hover:scale-110"/>;
  } else if (value === RIGHT_PLAYER) {
    square = <img src={icon} alt={"_"} className="border-solid border-4 border-green-400 w-24 hover:scale-110 rounded-full"/>;
  } else {
    square = <></>;
  }
  return (
    <button className={`bg-gray-700 border-solid border-2 border-gray-900 flex justify-center items-center`} onClick={onClick}>
      {square}
    </button>
  )
}

/**
 * View component for the TicTacToe game.
 * @param {Array} squares - Board consisting of squares array
 * @param {Integer} size - Size of the board
 * @param {Function} onSetSquare - Callback function to be called when a square is clicked
 * @param {Function} leftIcon - Icon of the left player
 * @param {Function} rightIcon - Icon of the right player
 */
export default function TicTacToeView({squares, size, onSetSquare, leftIcon, rightIcon}) {
  return (
    <div className={`grid grid-cols-3 grid-rows-3 w-[500px] h-[500px] flex-none border-2 border-solid border-gray-900`}>
      {squares.map((square, i) => (
        <Square value={square} key={i} onClick={() => onSetSquare(i)} className="border-solid border-2"
          icon={square === LEFT_PLAYER ? leftIcon : rightIcon}/>
      )
      )}
    </div>
  );
}

