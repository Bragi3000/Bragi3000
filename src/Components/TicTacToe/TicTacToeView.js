import React from "react"
import styles from "./TicTacToe.module.css";

function Square({value, onClick}) {
  let squareStyle;
  if (value === "X") {
    squareStyle = styles.squareCross;
  } else if (value === "O") {
    squareStyle = styles.squareCircle
  } else {
    squareStyle = styles.squareEmpty;
  }
  return (
    <button className={squareStyle} onClick={onClick}>
      {value}
    </button>
  )
}

export default function TicTacToeView({squares, size, onSetSquare}) {
  const dynamicStyle = {
    gridTemplateRows: `repeat(${size}, 1fr)`,
    gridTemplateColumns: `repeat(${size}, 1fr)`
  }

  return (
    <div style={dynamicStyle} className={styles.TicTacToe}>
      {squares.map((square, i) => (
        <Square value={square} key={i} onClick={() => onSetSquare(i)}/>
      )
      )}
    </div>
  );
}

