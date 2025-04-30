import React, { useState } from "react";
import WordleGrid from "./components/WordleGrid";
import Keyboard from "./components/Keyboard";
import Header from "./components/Header";
import "./style.css";

const Wordle = () => {
  const [solution] = useState("REACT"); // The word to guess
  const [guesses, setGuesses] = useState(Array(6).fill("")); // Array of guesses
  const [currentGuess, setCurrentGuess] = useState(""); // Current guess being typed
  const [currentRow, setCurrentRow] = useState(0); // Current row in the grid
  const [gameOver, setGameOver] = useState(false); // Whether the game is over
  const [gameWon, setGameWon] = useState(false); // Whether the player has won

  // Handle letter input
  const handleKeyPress = (letter) => {
    if (gameOver || currentGuess.length >= 5) return;

    setCurrentGuess((prev) => prev + letter);
  };

  // Handle backspace
  const handleBackspace = () => {
    if (gameOver || currentGuess.length === 0) return;

    setCurrentGuess((prev) => prev.slice(0, -1));
  };

  // Handle enter key
  const handleEnter = () => {
    if (gameOver || currentGuess.length !== 5) return;

    const updatedGuesses = [...guesses];
    updatedGuesses[currentRow] = currentGuess;

    setGuesses(updatedGuesses);

    if (currentGuess === solution) {
      setGameWon(true);
      setGameOver(true);
    } else if (currentRow === 5) {
      setGameOver(true);
    } else {
      setCurrentRow((prev) => prev + 1);
    }

    setCurrentGuess("");
  };

  return (
    <div id="game">
      <Header />
      <WordleGrid id="word"
        guesses={guesses}
        solution={solution}
        currentGuess={currentGuess}
        onKeyPress={handleKeyPress}
        onBackspace={handleBackspace}
        onEnter={handleEnter}
      />
      <Keyboard
        onKeyPress={handleKeyPress}
        onBackspace={handleBackspace}
        onEnter={handleEnter}
      />
      {gameOver && (
        <div className="game-over">
                  {gameWon ? "You Won!" : `Game Over! The word was: ${solution}`}
                  <button onClick={() => window.location.reload()} className="restart-button">Play Again</button>  
        </div>
      )}
    </div>
  );
};

export default Wordle;