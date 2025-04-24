import "./rps.css";
import GameView from "./components/GameView";
import WelcomeView from "./components/WelcomeView";
import { useState } from "react";
import { GameProvider, useGameContext } from "./GameContext.jsx";

function Rps() {
  return (
    <GameProvider>
      <div className="container">
        <h2 className="mainHeader">Rock Paper Scissors in React</h2>
        <GameContent />
      </div>
    </GameProvider>
  );
}

const GameContent = () => {
  const { gameState, setGameState, userName, roomId } = useGameContext();

  return (
    <>
      {gameState.gameStart ? (
        <GameView userName={userName} roomId={roomId} gameState={gameState} setGameState={setGameState} />
      ) : (
        <WelcomeView gameState={gameState} setGameState={setGameState} />
      )}
    </>
  );
};

export default Rps;