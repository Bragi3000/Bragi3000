import { LEFT_PLAYER, RIGHT_PLAYER } from "Constants/players";
import cx from "Utils/classNames";

/**
 * View component for the TicTacToe game.
 * @param squares - Board consisting of squares array
 * @param currentPlayer - The player currently in turn
 * @param leftIcon - Icon of the left player
 * @param rightIcon - Icon of the right player
 * @param onSetSquare - Callback function to be called when a square is clicked
 */
export default function TicTacToeView({
  squares,
  currentPlayer,
  leftIcon,
  rightIcon,
  onSetSquare,
}) {
  return (
    <div className="grid grid-cols-3 grid-rows-3 w-11/12 aspect-square mx-auto border-2 border-solid border-gray-900">
      {squares.map((square, i) => {
        const player = square || currentPlayer;

        return (
          <button
            key={i}
            className="bg-gray-700 border-solid border-2 border-gray-900 flex justify-center items-center"
            onClick={() => onSetSquare(i)}
            disabled={!!square}
          >
            <img
              className={cx([
                "border-solid border-4 w-5/6",
                player === LEFT_PLAYER && "border-blue-400 rounded-xl",
                player === RIGHT_PLAYER && "border-green-400 rounded-full",
                !square && "opacity-0 hover:opacity-50 transition-opacity"
              ])}
              src={player === LEFT_PLAYER ? leftIcon : rightIcon}
              alt=""
            />
          </button>
        );
      })}
    </div>
  );
}
