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
          <div className="row-clue-cell">{gameController.clueRows[rowIndex]}</div>
          {row.map((cell, cellIndex) => (
            <div
              className="game-cell"
              key={`game-cell-${rowIndex}-${cellIndex}`}
              onClick={() =>
                handleCellClick(rowIndex, cellIndex, gameController, gameState, setGameState)
              }
            >
              {renderCellContent(cell)}
            </div>
          ))}
        </div>
      ))}
      {gameState.gameWon}?<h3>Congratulations! You Won</h3>:;
    </>
  );
}

function renderCellContent(cell) {
  switch (cell) {
    case 0:
      return ""; // Empty cell
    case 1:
      return "●"; // Filled cell
    case 2:
      return "X"; // Crossed cell
    default:
      return "";
  }
}

function handleCellClick(rowIndex, cellIndex, gameController, gameState, setGameState) {
  // Create a deep copy of the board
  const updatedBoard = gameState.gameBoard.map((row) => [...row]);

  // Update the cell based on the current control
  updatedBoard[rowIndex][cellIndex] = gameState.setControl;

  // Check for row completion
  if (gameController.determineFilledRow(rowIndex)) {
    for (let i = 0; i < gameController.size; i++) {
      updatedBoard[rowIndex][i] = gameController.solutionBoard[rowIndex][i];
    }
  }

  // Check for column completion
  if (gameController.determineFilledCol(cellIndex)) {
    for (let i = 0; i < gameController.size; i++) {
      updatedBoard[i][cellIndex] = gameController.solutionBoard[i][cellIndex];
    }
  }

  // Check for win condition
  const gameWon = gameController.determineWin();

  // Update the game state
  setGameState((prevState) => ({
    ...prevState,
    gameBoard: updatedBoard,
    gameOver: gameWon,
    gameWon: gameWon,
  }));
}

export default GameBoard;