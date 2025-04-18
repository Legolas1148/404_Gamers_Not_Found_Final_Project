import {RockPaperScissors} from "../RpsClass";
import { useState } from 'react';
import "../rps.css";

const GameView = ({userName, gameState, setGameState}) => {
  const [rps] = useState(new RockPaperScissors(userName));

  return (
    <div id="game-screen">
      <div id="score-tally">
        <p id="score"> {userName}: {gameState.userScore} v CPU: {gameState.cpuScore}</p>
      </div>

      <form id="game-form">
        <div className="form-group">
          <label htmlFor="user-selection">Select your choice: </label>
          <select
            className="custom-select"
            id="user-selection"
            name="user-selection"
          >
            <option id="rock" value="rock">
              Rock
            </option>
            <option id="paper" value="paper">
              Paper
            </option>
            <option id="scissors" value="scissors">
              Scissors
            </option>
          </select>
        </div>
        <button className="btn btn-success" type="button" id="go-button" onClick= {(e) => {
          e.preventDefault();
          const userSelection = document.querySelector("#user-selection");
          rps.play(userSelection.value);
          setGameState(gameState => (
            {
              ...gameState, 
              userChoice: userSelection.value,
              userScore: rps.score.user,
              cpuScore: rps.score.cpu,
              gameHistory: rps.gameHistoryLog
            }
          ));
          }}>
          Go!
        </button>
      </form>

      <p id="game-history"><pre>{gameState.gameHistory.join("\n")}</pre></p>
      <button id="reset-game-button" className="btn btn-secondary" onClick = {(e) => {
        e.preventDefault();
        setGameState(gameState => (
          {
            gameStart: false,
            userChoice: null,
            userScore: 0,
            cpuScore: 0,
            gameHistory: []
          }
        ));
      }}>
        Reset{" "}
      </button>
    </div>
  );
};

export default GameView;