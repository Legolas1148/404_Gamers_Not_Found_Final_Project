import { nonogramClass } from "../nonogramClass";
import { useState } from "react";

function GameBoard({gameState, setGameState})
{
    const [gameController] = useState(
        new nonogramClass(gameState.boardSize)
    );

    gameState.gameBoard = gameController.board;
    gameState.solutionBoard = gameController.solutionBoard;

    return (
        <div className="game-board">
            {
                renderGameBoard({gameState, setGameState}, gameController) 
            }
        </div>
    );
}

function renderGameBoard({gameState, setGameState}, gameController)
{
    return(
        <>
            <div className = "game-clue-row">
                <div className='ClueHeader'>Clues</div>
                {
                    gameController.clueCols.map((row, index) => (
                        <div className = "col-clue-cell">{gameController.clueCols[index]}</div>
                    ))
                }
            </div>
            {
                gameState.GameBoard.map((row, index) => {
                    <div className = "row-clue-cell">{gameController.clueRows[index]}</div>
                    return (
                        <div className = "game-row" key={index}>
                            {
                                row.map((cell, cellIndex) => (
                                    <div className = "game-cell" key={cellIndex} onClick={() => {
                                        gameController.board[index][cellIndex] = gameState.control;
                                        setGameState(
                                            gameState => ({...gameState, gameBoard: gameController.board})
                                        );
                                        if(gameController.determineFilledCol(cellIndex))
                                        {
                                            setGameState(
                                                gameState => ({...gameState, gameBoard: gameController.board})
                                            );
                                        }
                                        if(gameController.determineFilledRow(index))
                                        {
                                            setGameState(
                                                gameState => ({...gameState, gameBoard: gameController.board})
                                            );
                                        }
                                        if(gameController.determineWin())
                                        {
                                            setGameState(
                                                gameState => ({...gameState, gameBoard: gameController.board, gameOver: true, gameWon: true})
                                            );
                                        }
                                    }}>
                                        {cell}
                                    </div>
                                ))
                            }
                        </div>
                    )
                })
            }
        </>
    )
}

export default GameBoard;