function GameControls({gameState, setGameState})
{
    return (
        <div className="game-controls">
            <button onClick={(e) => {
                e.preventDefault();
                setGameState(
                    gameState => ({...gameState, setControl : gameState.control.CROSS}));
            }}>X</button>
            <button onClick={(e) => {
                e.preventDefault();
                setGameState(
                    gameState => ({...gameState, setControl : gameState.control.FILL}));
            }}>Fill</button>
            <button onClick={(e) => {
                e.preventDefault();
                setGameState(
                    gameState => ({...gameState, gameStart : false, gameOver: true}));
            }}>Quit Game?</button>            
        </div>
    )
}

export default GameControls;