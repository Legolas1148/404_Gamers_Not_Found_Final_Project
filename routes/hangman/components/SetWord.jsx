import { useState } from "react";

function SetWord({ onSetWord }) {
  const [wordInput, setWordInput] = useState("");

  const handleSetWord = () => {
    if (wordInput.trim() === "") return;
    onSetWord(wordInput);
    setWordInput("");
  };

  return (
    <div className="set-word">
      <p>Player 1: Enter the word to guess</p>
      <input
        type="text"
        value={wordInput}
        onChange={(e) => setWordInput(e.target.value)}
        placeholder="Enter a word"
      />
      <button onClick={handleSetWord}>Set Word</button>
    </div>
  );
}

export default SetWord;