import React from 'react';
import ReactDOM from 'react-dom';
import { FaStar } from "react-icons/fa";
import './index.css';


function Square({value, onClick}) {
	return (
		<button className="square" onClick={onClick}>
			{value}
		</button>
	);
}


function Board({onClick, squares}) {
    return (
      <div>
        <div className="board-row">
		  <Square value={squares[0]} onClick={() => onClick(0)} />
          <Square value={squares[1]} onClick={() => onClick(1)} />
          <Square value={squares[2]} onClick={() => onClick(2)} />
        </div>
        <div className="board-row">
		  <Square value={squares[3]} onClick={() => onClick(3)} />
          <Square value={squares[4]} onClick={() => onClick(4)} />
          <Square value={squares[5]} onClick={() => onClick(5)} />
        </div>
        <div className="board-row">
		  <Square value={squares[6]} onClick={() => onClick(6)} />
          <Square value={squares[7]} onClick={() => onClick(7)} />
          <Square value={squares[8]} onClick={() => onClick(8)} />
        </div>
		<FaStar color="red" />
      </div>
    );
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null)
        }
      ],
      stepNumber: 0,
      xIsNext: true
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? "X" : "O";
    this.setState({
      history: history.concat([
        {
          squares: squares
        }
      ]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    console.log("getting data");
    getData();

    const moves = history.map((step, move) => {
      const desc = move ?
        'Go to move #' + move :
        'Go to game start';
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    let status;
    if (winner) {
      status = "Winner: " + winner;
    } else {
      status = "Next player mod: " + (this.state.xIsNext ? "X" : "O");
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={i => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
        <div className="additional">
          <p>an additional paragraph</p>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(<Game />, document.getElementById("root"));

async function getData() {
  try {
    const response = await fetch(
      'https://mw-chess-game.herokuapp.com/data'
    );
    const data = await response.json();
    console.log("data: ", data);
  } catch(error) {
    console.error(error);
  }
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
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
