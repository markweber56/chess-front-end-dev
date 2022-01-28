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
};

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

export { calculateWinner, getData }