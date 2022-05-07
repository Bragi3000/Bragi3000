import {LEFT_PLAYER, RIGHT_PLAYER} from "Constants/players";
import styles from "./TicTacToe.module.css";
import PopoverHelp from "Components/PopoverHelp/PopoverHelp";
import tictactoedemo from "Assets/images/tictactoedemo.gif"

/**
 * Subcomponent representing one square of the TicTacToe board.
 * @param  {String} value - The value of the square "X", "O", or " "
 * @param {Function} onClick - Callback function to be called when the square is clicked
 * @param {String} icon - The icon to be displayed in the square
 */
function Square({value, onClick, icon}) {
  let squareStyle;
  let square;
  if (value === LEFT_PLAYER) {
    squareStyle = styles.squareCross;
    square = <img src={icon} alt={"_"}/>;
  } else if (value === RIGHT_PLAYER) {
    squareStyle = styles.squareCircle;
    square = <img src={icon} alt={"_"}/>;
  } else {
    squareStyle = styles.squareEmpty;
    square = <></>;
  }
  return (
    <button className={squareStyle} onClick={onClick}>
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
  const dynamicStyle = {
    gridTemplateRows: `repeat(${size}, 1fr)`,
    gridTemplateColumns: `repeat(${size}, 1fr)`
  }

  return (
    <PopoverHelp number={6} helperHeading={"Game Area"}
      helperText={"After both players selected and confirmed their songs you can start the game. " +
                   "The winner song will be added to the playlist to the playlist."}
      horizontal={"center"} vertical={"center"}
      helperImg={tictactoedemo}>
      <div style={dynamicStyle} className={styles.TicTacToe}>
        {squares.map((square, i) => (
          <Square value={square} key={i} onClick={() => onSetSquare(i)}
            icon={square === LEFT_PLAYER ? leftIcon : rightIcon}/>
        )
        )}
      </div>
    </PopoverHelp>

  );
}

