import "../rps.css";
import { useState } from "react";
import { useGameContext } from "../GameContext.jsx";

const WelcomeView = ({ gameState, setGameState }) => {
  const { setUserName, setRoomId } = useGameContext();
  const [step, setStep] = useState(1);
  const [userInput, setUserInput] = useState("");
  const [roomInput, setRoomInput] = useState("");

  const handleUsernameSubmit = (e) => {
    e.preventDefault();
    if (userInput.trim().length >= 2) {
      setUserName(userInput.trim());
      setStep(2);
    }
  };

  const handleJoinRoom = async () => {
    if (!roomInput.trim()) return;

    try {
      const res = await fetch(`https://game-room-api.fly.dev/api/rooms/${roomInput.trim()}`);
      if (!res.ok) throw new Error("Room not found");
      setRoomId(roomInput.trim());
      setGameState({ ...gameState, gameStart: true });
    } catch (err) {
      alert("Room not found. Please check the ID or create a new one.");
    }
  };

  const handleCreateRoom = async () => {
    const res = await fetch("https://game-room-api.fly.dev/api/rooms", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        initialState: {
          userName: userInput,
          score: { user: 0, cpu: 0 },
          gameHistoryLog: [],
        },
      }),
    });
    const data = await res.json();
    setRoomId(data.roomId);
    setGameState({ ...gameState, gameStart: true });
  };

  return (
    <div id="welcome-screen">
      {step === 1 && (
        <form onSubmit={handleUsernameSubmit}>
          <div className="form-group">
            <label htmlFor="username">Type your name: </label>
            <input
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              className="form-control"
              type="text"
              id="username"
              placeholder="Enter Name Here..."
              minLength="2"
              maxLength="15"
              required
            />
          </div>
          <button className="btn btn-primary" type="submit">Next</button>
        </form>
      )}

      {step === 2 && (
        <div className="form-group">
          <label htmlFor="roomid">Enter Room ID (if existing or create new room): </label>
          <input
            value={roomInput}
            onChange={(e) => setRoomInput(e.target.value)}
            className="form-control"
            type="text"
            id="roomid"
            placeholder="Room ID (blank if new)"
          />
          <div>
            <button className="btn btn-success" onClick={handleJoinRoom}>
              Join Game
            </button>
            <button className="btn btn-secondary" onClick={handleCreateRoom}>
              Create New Room
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default WelcomeView;