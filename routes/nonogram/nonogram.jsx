import GameBoard from './components/GameBoard.jsx';
import GameControls from './components/GameControls.jsx';
import WelcomeScreen from './components/WelcomeScreen.jsx';
import { useState } from 'react';

function Nonogram()
{
    const [gameState, setGameState] = useState(
        {
            gameStart: false,
            userName: null,
            gameBoard: [[]],
            gameSolution: [[]],
            boardSize: 0,
            gameOver: false,
            gameWon: false,
            control: {CLEAR: 0, FILL: 1, CROSS: 2},
            setControl: 0
        }
    );   

    return (
        <div className="nonogram">
            <h1 className="mainHeader">Nonogram</h1>
            <h2 className="subHeader">Hello {gameState.userName}</h2>
            <div className="gameContainer">
                {gameState.gameStart?
                (
                    <>
                    <GameBoard gameState = {gameState} setGameState = {setGameState}></GameBoard>
                    <GameControls gameState = {gameState} setGameState = {setGameState}></GameControls>
                    </>
                )   
                :
                (
                    <WelcomeScreen gameState = {gameState} setGameState = {setGameState}></WelcomeScreen>
                )
                }
                
            </div>
        </div>
    );
}

export default Nonogram;