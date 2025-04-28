import { useState, useEffect } from "react";
import { RockPaperScissors } from "../RpsClass";
import { useGameContext } from "../GameContext.jsx";
import "../rps.css";

const GameView = ({ userName, roomId, gameState, setGameState }) => {
  const [rps, setRps] = useState(null);

  useEffect(() => {
    setRps(new RockPaperScissors(userName));
  }, [userName]);

  const handlePlay = (userSelection) => {
    if (!rps) return;

    rps.play(userSelection);

    const updatedGameState = {
      gameStart: true,
      userChoice: userSelection,
      userScore: rps.score.user,
      cpuScore: rps.score.cpu,
      gameHistory: rps.gameHistoryLog,
    };

    setGameState(updatedGameState);

    fetch(`https://game-room-api.fly.dev/api/rooms/${roomId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ gameState: updatedGameState }),
    });
  };

  const handleResetGame = () => {
    setGameState({
      gameStart: false,
      userChoice: null,
      userScore: 0,
      cpuScore: 0,
      gameHistory: [],
    });
  };

  return (
    <div id="game-screen">
      <div id="score-tally">
        <p id="score">
          {userName}: {gameState.userScore} v CPU: {gameState.cpuScore}
        </p>
      </div>

      <form id="game-form">
        <div className="form-group">
          <label htmlFor="user-selection">Select your choice: </label>
          <select className="custom-select" id="user-selection" name="user-selection">
            <option id="rock" value="rock">Rock</option>
            <option id="paper" value="paper">Paper</option>
            <option id="scissors" value="scissors">Scissors</option>
          </select>
        </div>
        <button
          className="btn btn-success"
          type="button"
          id="go-button"
          onClick={(e) => {
            e.preventDefault();
            const userSelection = document.querySelector("#user-selection");
            handlePlay(userSelection.value);
          }}
        >
          Go!
        </button>
      </form>

      <div id="game-history">
        <pre>{gameState.gameHistory.join("\n")}</pre>
      </div>
      
      <button id="reset-game-button" className="btn btn-secondary" onClick={handleResetGame}>
        Reset
      </button>
    </div>
  );
};

export default GameView;