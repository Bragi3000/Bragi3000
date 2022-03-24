import React, {useMemo, useState} from "react"
import TicTacToeView from "./TicTacToeView";


export function checkWin(squares, size) {

  // transform the array of squares into a 2D array
  const matrix = [];
  for (let i = 0; i < size; i++) {
    matrix.push(squares.slice(i * size, i * size + size));
  }

  // check rows for win
  for (let i = 0; i < size; i++) {
    const row = matrix[i];
    if (row.every(e => e === row[0])) {
      return row[0];
    }
  }

  // check columns for win
  for (let i = 0; i < size; i++) {
    const column = [];
    for (let j = 0; j < size; j++) {
      column.push(matrix[j][i]);
    }
    if (column.every(e => e === column[0])) {
      return column[0];
    }
  }

  // check diagonals for win
  const first_diagonal = [];
  const second_diagonal = [];
  for (let i = 0; i < size; i++) {
    first_diagonal.push(matrix[i][i]);
    second_diagonal.push(matrix[size - i - 1][size - i - 1]);
  }
  if (first_diagonal.every(e => e === first_diagonal[0])) {
    return first_diagonal[0];
  }
  if (second_diagonal.every(e => e === second_diagonal[0])) {
    return second_diagonal[0];
  }

  return null;
}


export default function TicTacToe({size = 4}) {
  const [board, setBoard] = useState(Array(size * size).fill(null));
  const [currPlayer, setCurrPlayer] = useState(true);
  const winner = useMemo(() => checkWin(board, size), [board, size]);

  if (winner) {
    console.log(`Winner: ${winner}`)
    setBoard(Array(size * size).fill(null));
  }

  function handleSetSquare(i) {
    const boardCopy = [...board];
    if (winner || boardCopy[i]) {
      return;
    }
    boardCopy[i] = currPlayer ? "X" : "O";
    setBoard(boardCopy);
    setCurrPlayer(!currPlayer);
  }

  return <TicTacToeView squares={board} size={size} onSetSquare={handleSetSquare}/>
}
