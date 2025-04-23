function createGameBoardArray(size) {
    const board = new Array(size).fill(null).map(() => new Array(size).fill(0));
    return board;
}

function WelcomeScreen({gameState, setGameState})
{
    return (
        <div className="welcome-screen">            
            <div>
                <input type="text" id="username" name="username" required placeholder="Enter Name Here..." onInput={(e) => {
                    e.preventDefault();
                    setGameState(
                        gameState => ({...gameState, userName: e.target.value}));
                }}/>
            </div>    
            <div>
                <h1 className="mainHeader">Welcome to Nonogram</h1>
                <h2 className="subHeader">Select a board size to start the game</h2>
                
                <button onClick={(e) =>
                    {
                        e.preventDefault();
                        setGameState(
                            gameState => ({...gameState, gameStart: true, boardSize: 5, gameBoard : createGameBoardArray(5)}));
                    }
                }>
                5 X 5                            
                </button>
                <button onClick={(e) =>
                    {
                        e.preventDefault();
                        setGameState(
                            gameState => ({...gameState, gameStart: true, boardSize: 10, gameBoard : createGameBoardArray(10)}));
                    }
                }>
                10 X 10
                </button>
                <button onClick={(e) =>
                    {
                        e.preventDefault();
                        setGameState(
                            gameState => ({...gameState, gameStart: true, boardSize: 15, gameBoard : createGameBoardArray(15)}));
                    }
                }>
                15 X 15
                </button>
            </div>
        </div>
    );   
}

export default WelcomeScreen;