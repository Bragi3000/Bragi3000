import React, {useMemo, useState} from "react"
import TicTacToeView from "./TicTacToeView";

function getLines(squares, size) {
  const lines = [];
  // add rows
  for (let i = 0; i < size; i++) {
    lines.push(squares.slice(i * size, i * size + size));
  }
  // add columns
  for (let i = 0; i < size; i++) {
    const tmp = [];
    for (let j = 0; i < size; j++) {
      tmp.push(i + j * size);
    }
    lines.push(tmp);
  }
  // add diagonals
  const firstDiagonal = [];
  const secondDiagonal = [];
  for (let i = 0; i < size; i++) {
    firstDiagonal.push(squares[i * (size + 1)]);
    secondDiagonal.push(squares[(size - 1) + i * (size - 1)]);
  }
  lines.push(firstDiagonal);
  lines.push(secondDiagonal);

  return lines;
}

function checkWin(squares, size) {
  const lines = getLines(squares, size);
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.every(e => e === line[0])) {
      return line[0];
    }
  }
}

function checkTie(squares, size) {
  // check if all fields are occupied
  const occupiedFields = squares.filter(x => x !== null).length
  if (occupiedFields === size * size) return true;

  // check if win still possible
  const lines = getLines(squares, size);
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (!line.some(e => e === 'X')) {
      return false;
    }
    if (!line.some(e => e === 'O')) {
      return false;
    }
  }
}

export default function TicTacToe({size = 4}) {
  const [board, setBoard] = useState(Array(size * size).fill(null));
  const [currPlayer, setCurrPlayer] = useState(true);
  const winner = useMemo(() => checkWin(board, size), [board, size]);
  const tie = useMemo(() => checkTie(board, size), [board, size]);

  if (winner) {
    console.log(`Winner: ${winner}`)
    setBoard(Array(size * size).fill(null));
  } else if (tie) {
    console.log(`Tie`);
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
