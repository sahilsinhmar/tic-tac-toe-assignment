import { useState, useEffect } from "react";

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [turn, setTurn] = useState("Blue");
  const [winner, setWinner] = useState(null);
  const [scores, setScores] = useState({
    Blue: parseInt(localStorage.getItem("scoreBlue")) || 0,
    Red: parseInt(localStorage.getItem("scoreRed")) || 0,
  });

  const wins = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const handleClick = (index) => {
    if (winner || board[index]) return;

    const newBoard = [...board];
    newBoard[index] = turn === "Blue" ? "X" : "O";
    setBoard(newBoard);

    checkWinner(newBoard);
    setTurn(turn === "Blue" ? "Red" : "Blue");
  };

  const checkWinner = (board) => {
    for (let i = 0; i < wins.length; i++) {
      const condition = wins[i];
      let cellA = board[condition[0]];
      let cellB = board[condition[1]];
      let cellC = board[condition[2]];

      if (cellA === null || cellB === null || cellC === null) {
        continue;
      }

      if (cellA === cellB && cellB === cellC) {
        setWinner(turn);
        updateScore(turn);
        return;
      }
    }
    if (!board.includes(null)) {
      setWinner("Draw");
    }
  };

  const updateScore = (winner) => {
    setScores((prevScores) => ({
      ...prevScores,
      [winner]: prevScores[winner] + 1,
    }));
  };

  useEffect(() => {
    localStorage.setItem("scoreBlue", scores.Blue);
    localStorage.setItem("scoreRed", scores.Red);
  }, [scores]);

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setWinner(null);
    setTurn("Blue");
  };

  return (
    <div className="game">
      <h1>TicTacToe Game</h1>
      <div className="board-container">
        <div className="square-container">
          {board.map((square, index) => (
            <div
              className="square"
              key={index}
              onClick={() => handleClick(index)}
            >
              {board[index]}
            </div>
          ))}
        </div>
        <div className="info">
          <div className="status">
            {winner ? `Winner: ${winner}` : `Next player: ${turn}`}
          </div>
          <div className="scores">
            <div>Player Blue: {scores.Blue}</div>
            <div>Player Red: {scores.Red}</div>
          </div>
          <button onClick={resetGame}>Reset Game</button>
        </div>
      </div>
    </div>
  );
};

export default TicTacToe;
