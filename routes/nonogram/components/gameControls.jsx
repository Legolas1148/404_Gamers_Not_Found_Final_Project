function GameControls({ gameState, setGameState }) {
    return (
        <div className="game-controls">
            <button onClick={(e) => {
                e.preventDefault();
                setGameState((prevState) => ({
                    ...prevState,
                    setControl: 2, // CROSS
                }));
            }}>X</button>
            <button onClick={(e) => {
                e.preventDefault();
                setGameState((prevState) => ({
                    ...prevState,
                    setControl: 1, // FILL
                }));
            }}>Fill</button>
            <button onClick={(e) => {
                e.preventDefault();
                setGameState((prevState) => ({
                    ...prevState,
                    setControl: 0, // CLEAR
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