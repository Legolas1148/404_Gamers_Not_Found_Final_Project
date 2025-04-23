import { nonogramClass } from "../nonogramClass";
import { useState, useEffect } from "react";

function GameBoard({ gameState, setGameState }) {
  const [gameController] = useState(new nonogramClass(gameState.boardSize));

  // Initialize game state properly
  useEffect(() => {
    setGameState((prevState) => ({
      ...prevState,
      gameBoard: gameController.board,
      solutionBoard: gameController.solutionBoard,
    }));
  }, [gameController, setGameState]);

  return (
    <div className="game-board">
      {renderGameBoard({ gameState, setGameState }, gameController)}
    </div>
  );
}

function renderGameBoard({ gameState, setGameState }, gameController) {
  return (
    <>
      <div className="game-clue-row">
        <div className="ClueHeader">Clues</div>
        {gameController.clueCols.map((clue, index) => (
          <div className="col-clue-cell" key={`clue-col-${index}`}>
            {clue}
          </div>
        ))}
      </div>
      {gameState.gameBoard.map((row, rowIndex) => (
        <div className="game-row" key={`game-row-${rowIndex}`}>
          <div className="row-clue-cell" key={`clue-row-${rowIndex}`}>
            {gameController.clueRows[rowIndex]}
          </div>
          {row.map((cell, cellIndex) => (
            <div
              className="game-cell"
              key={`game-cell-${rowIndex}-${cellIndex}`}
              onClick={() => handleCellClick(rowIndex, cellIndex, gameController, gameState, setGameState)}
            >
              {cell}
            </div>
          ))}
        </div>
      ))}
    </>
  );
}

function handleCellClick(rowIndex, cellIndex, gameController, gameState, setGameState) {
  // Update the board based on the control
  const updatedBoard = [...gameController.board];
  updatedBoard[rowIndex][cellIndex] = gameState.control;

  // Update the game state
  setGameState((prevState) => ({
    ...prevState,
    gameBoard: updatedBoard,
  }));

  // Check for row/column completion and win condition
  if (gameController.determineFilledCol(cellIndex)) {
    setGameState((prevState) => ({
      ...prevState,
      gameBoard: gameController.board,
    }));
  }
  if (gameController.determineFilledRow(rowIndex)) {
    setGameState((prevState) => ({
      ...prevState,
      gameBoard: gameController.board,
    }));
  }
  if (gameController.determineWin()) {
    setGameState((prevState) => ({
      ...prevState,
      gameBoard: gameController.board,
      gameOver: true,
      gameWon: true,
    }));
  }
}

export default GameBoard;