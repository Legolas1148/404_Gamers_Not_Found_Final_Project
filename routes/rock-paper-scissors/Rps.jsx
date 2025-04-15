import "./rps.css";
import GameView from "./components/GameView";
import WelcomeView from "./components/WelcomeView";
import { useState } from "react";

function Rps() {
  const [userName, setUserName] = useState("");
  const [gameState, setGameState] = useState(
    {gameStart: false,
    userChoice: null,
    userScore: 0,
    cpuScore: 0,
    gameHistory: []
    });
  
  return (
    <div className="container">
      <h1 className="mainHeader">Rock Paper Scissors in React</h1>
      {
        gameState.gameStart
        ?<GameView userName = {userName} gameState = {gameState} setGameState = {setGameState}/>
        :<WelcomeView userName = {userName} setUserName = {setUserName} gameState = {gameState} setGameState = {setGameState}/>
      }
    </div>
  );
}

export default Rps;
