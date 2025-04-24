import React, { createContext, useState, useContext } from "react";

const GameContext = createContext();

export const GameProvider = ({ children }) => {
    const [userName, setUserName] = useState("");
    const [roomId, setRoomId] = useState("");
    const [gameState, setGameState] = useState({
    gameStart: false,
    userChoice: null,
    userScore: 0,
    cpuScore: 0,
    gameHistory: [],
    });

    return (
    <GameContext.Provider value={{ userName, setUserName, roomId, setRoomId, gameState, setGameState }}>
        {children}
    </GameContext.Provider>
    );
};

export const useGameContext = () => useContext(GameContext);