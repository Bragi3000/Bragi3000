import React from "react"
import styles from "./TicTacToe.module.css";

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

export default function TicTacToeView({squares, size, onSetSquare, circleIcon, crossIcon}) {
  const dynamicStyle = {
    gridTemplateRows: `repeat(${size}, 1fr)`,
    gridTemplateColumns: `repeat(${size}, 1fr)`
  }

  return (
    <div style={dynamicStyle} className={styles.TicTacToe}>
      {squares.map((square, i) => (
        <Square value={square} key={i} onClick={() => onSetSquare(i)}
          icon={square === "X" ? crossIcon : circleIcon}/>
      )
      )}
    </div>
  );
}

