import { useEffect, useState } from 'react';
import React from 'react';


function Square({ value, onSquareClick, isWinningSquare }) {
  return (
    <button className={`square ${isWinningSquare ? 'highlight' : ''}`} onClick={onSquareClick}>
      {value}
    </button>
  );
}


let count = 10;
const timer = setInterval(() => {
  console.log(count);
  count--;
  if (count < 0) {
    clearInterval(timer);
    console.log("Time's up!");
  }
}, 1000); 

// Using setTimeout for a one-time delay
setTimeout(() => {
  console.log("This message appears after 5 seconds");
}, 5000); // 5000 milliseconds = 5 seconds



export function Board({ xIsNext, squares, onPlay, winningSquares }) {
  function handleClick(i) {
    
    if (calculateWinner(squares) || squares[i]) {
      return; 
    }
    const nextSquares = squares.slice();
    // Update the square based on the current player's turn
    if (xIsNext) {
      nextSquares[i] = 'X';
    } else {
      nextSquares[i] = 'O';
    }
    onPlay(nextSquares, i);
  }

  const winner = calculateWinner(squares);
  let status;

  // Update status to display the winner or draw
  if (winner) {
    status = 'Winner: ' + winner.winner; // Display the winner
  } else if (squares.every(square => square)) {
    status = 'Draw!'; // Display draw if all squares are filled and no winner
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O'); // Display next player
  }

  let boardArray = [];
  for (let i = 0; i < 3; i++) {
    let boardRows = [];
    for (let j = 0; j < 3; j++) {
      const index = i * 3 + j;
      boardRows.push(
        <Square key={index} value={squares[index]} onSquareClick={() => handleClick(index)} isWinningSquare={winningSquares.includes(index)}/>
      );
    }
    boardArray.push(
      <div key={i} className="board-row">
        {boardRows}
      </div>
    );
  }

  return (
    <>
      <div className="status">{status}</div>
      {boardArray}
    </>
  );
}


export default function Game() {
  const [history, setHistory] = useState([{ squares: Array(9).fill(null), location: { row: null, col: null } }]);
  const [currentMove, setCurrentMove] = useState(0);
  // const [order, setOrder] = useState('descending');
  const [order, setOrder] = useState(true);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove].squares; 

  function handlePlay(nextSquares, index) {
    const row = Math.floor(index / 3) + 1;  
    const col = index % 3 + 1;             
    const nextHistory = [...history.slice(0, currentMove + 1), { squares: nextSquares, location: { row, col } }];
    setHistory(nextHistory);  
    setCurrentMove(nextHistory.length - 1);  
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  function resetGame() {
    setHistory([{ squares: Array(9).fill(null), location: { row: null, col: null } }]); 
    setCurrentMove(0);
    setOrder(true);
  }

  const winnerInfo = calculateWinner(currentSquares);
  const winner = winnerInfo ? winnerInfo.winner : null;
  const winningSquares = winnerInfo ? winnerInfo.winningSquares : [];

  const moves = history.map((square, move) => {
    let description;
    const location = square.location;
    if (move > 0) {
      description = 'Go to move #' + move + ` (${location.row}, ${location.col})`;
    } else {
      description = 'Go to game start';
    }
    return (
      <div key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </div>
    );
  });

  const sortedMoves = order === true ? moves : [...moves].reverse();

  function changeSort() {
    setOrder(prevOrder => (prevOrder === true ? false : true));
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} winningSquares={winningSquares} />
      </div>
      <div className="game-info">
        <div> 
          <button onClick={changeSort}>Sort {order === true ? 'descending' : 'ascending'}</button> 
        </div>
        <div>
          {sortedMoves}
        </div>
        {(winner || (currentSquares.every(square => square) && !winner)) && (
          <div>
            <button onClick={resetGame}>Play Again</button>
          </div>
        )}
      </div>
    </div>
  );
}


function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return {winner: squares[a], winningSquares: [a, b, c]};
    }
  }
  return null;
}
