function GameControls({ gameState, setGameState }) {
    return (
        <div className="game-controls">
            <button onClick={(e) => {
                e.preventDefault();
                setGameState((prevState) => ({
                    ...prevState,
                    setControl: gameState.control.CROSS, // CROSS
                }));
            }}>X</button>
            <button onClick={(e) => {
                e.preventDefault();
                setGameState((prevState) => ({
                    ...prevState,
                    setControl: gameState.control.FILL, // FILL
                }));
            }}>Fill</button>
            <button onClick={(e) => {
                e.preventDefault();
                setGameState((prevState) => ({
                    ...prevState,
                    setControl: gameState.control.CLEAR, // CLEAR
                }));
            }}>Clear</button>
            <button onClick={(e) => {
                e.preventDefault();
                setGameState((prevState) => ({
                    ...prevState,
                    gameStart: false,
                    gameOver: true,
                }));
            }}>Quit Game?</button>
        </div>
    );
}

export default GameControls;