import React, { useState } from "react";

const initialBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function GameBoard({ activePlayerSymbol, onSelectPlayer }) {
  const [gameBoard, setGameBoard] = useState(initialBoard);

  function handleSelection(rowIndex, colIndex) {
    if (gameBoard[rowIndex][colIndex] !== null) return;

    setGameBoard((prevGameBoard) => {
      const updatedBoard = prevGameBoard.map((row) => [...row]);
      updatedBoard[rowIndex][colIndex] = activePlayerSymbol;
      return updatedBoard;
    });

    onSelectPlayer();
  }

  return (
    <ol id="game-board">
      {gameBoard.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {row.map((move, colIndex) => (
              <li key={colIndex}>
                <button onClick={() => handleSelection(rowIndex, colIndex)}>
                  {move}
                </button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
}

export default GameBoard;
