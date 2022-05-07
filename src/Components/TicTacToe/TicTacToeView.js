import React from "react"
import styles from "./TicTacToe.module.css";
import {LEFT_PLAYER} from "../../Constants/players";
import PopoverHelp from "../PopoverHelp/PopoverHelp";
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
  if (value === "X") {
    squareStyle = styles.squareCross;
    square = <img src={icon} alt={"_"}/>;
  } else if (value === "O") {
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
 * @param {Function} circleIcon - Icon of the circle player
 * @param {Function} crossIcon - Icon of the cross player
 */
export default function TicTacToeView({squares, size, onSetSquare, circleIcon, crossIcon}) {
  const dynamicStyle = {
    gridTemplateRows: `repeat(${size}, 1fr)`,
    gridTemplateColumns: `repeat(${size}, 1fr)`
  }

  return (
    <PopoverHelp number={7} helperText={"After both players selected their song, the game is taking place here"}
      horizontal={"center"} vertical={"center"}
      helperImg={tictactoedemo}>
      <div style={dynamicStyle} className={styles.TicTacToe}>
        {squares.map((square, i) => (
          <Square value={square} key={i} onClick={() => onSetSquare(i)}
            icon={square === "X" ? crossIcon : circleIcon}/>
        )
        )}
      </div>
    </PopoverHelp>
  );
}

