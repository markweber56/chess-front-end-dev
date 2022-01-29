import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import '../index.css';
import Board from './Board';
import { calculateWinner, getData } from '../util/Utils';

export default function Game() {
	const firstState = {
		history: [
			{
				squares: Array(9).fill(null)
			}
		],
		stepNumber: 0,
		xIsNext: true,
		winner: null
		// squares: Array(9).fill(null)
	};
	const [currentState, setBoardState] = useState(firstState);
		

  const handleClick = (i) => {
    const history = currentState.history.slice(0, currentState.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = currentState.xIsNext ? "X" : "O";
    setBoardState({
      history: history.concat([
        {
          squares: squares
        }
      ]),
      stepNumber: history.length,
      xIsNext: !currentState.xIsNext,
	  winner: calculateWinner(squares)
    });
  }

  const jumpTo = (step) => {
    setBoardState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
	  history: currentState.history.slice(0, step + 1)
    });
  }
  
  const gameStatus = (winner) => {
	  let gameStatus;
	  if (winner) {
		  gameStatus = "Winner: " + winner;
	  } else {
		  gameStatus = "Next player: " + (currentState.xIsNext ? "X" : "O");
	  }
	  return gameStatus;
  }

	const moves = () => {
		return (
		<>
			{ currentState.history.map((step, move) => (
				<li key={move}>
				  <button onClick={() => jumpTo(move)}>{move ? `Go to move #${move}` : `Go to game start`}</button>
				</li>
			))}
		</>
		)
	};
	
    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={currentState.history[currentState.stepNumber].squares}
            onClick={i => handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>sdfgsfdg {gameStatus(currentState.winner)}</div>
          <ol>{moves()}</ol>
        </div>
      </div>
    );
  }
