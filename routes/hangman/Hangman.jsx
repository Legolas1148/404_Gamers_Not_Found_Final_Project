import { useState, useEffect } from "react";
import { hangmanClass } from "./HangmanClass";
import SetWord from "./components/SetWord";
import GameBoard from "./components/GameBoard";

function Hangman() {
  const [hangman, setHangman] = useState(null); 
  const [isWordSet, setIsWordSet] = useState(false); 
  const [guessedLetters, setGuessedLetters] = useState([]); 
  const [incorrectGuesses, setIncorrectGuesses] = useState([]); 
  const [gameOver, setGameOver] = useState(false); 
  const [gameWon, setGameWon] = useState(false); 

  const handleSetWord = (word) => {
    setHangman(new hangmanClass(word.trim().toUpperCase()));
    setIsWordSet(true);
  };

  const handleGuess = (letter) => {
    if (guessedLetters.includes(letter) || incorrectGuesses.includes(letter)) {
      return; 
    }

    const result = hangman.guessLetter(letter);

    if (result.correct) {
      setGuessedLetters((prev) => [...prev, letter]);
    } else {
      setIncorrectGuesses((prev) => [...prev, letter]);
    }

    if (hangman.isGameWon(guessedLetters.concat(letter))) {
      setGameWon(true);
      setGameOver(true);
    } else if (hangman.isGameLost(incorrectGuesses.concat(letter))) {
      setGameOver(true);
    }
  };


  const resetGame = () => {
    setHangman(null);
    setIsWordSet(false);
    setGuessedLetters([]);
    setIncorrectGuesses([]);
    setGameOver(false);
    setGameWon(false);
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      const letter = event.key.toUpperCase();
      if (/^[A-Z]$/.test(letter)) {
        handleGuess(letter);
      }
    };

    if (isWordSet && !gameOver) {
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isWordSet, gameOver, guessedLetters, incorrectGuesses]);


  return (
    <div className="hangman">
      <h1>Two-Player Hangman Game</h1>
      {!isWordSet ? (
        <SetWord onSetWord={handleSetWord} />
      ) : (
        <GameBoard
          hangman={hangman}
          guessedLetters={guessedLetters}
          incorrectGuesses={incorrectGuesses}
          gameOver={gameOver}
          gameWon={gameWon}
          onGuess={handleGuess}
          onReset={resetGame}
        />
      )}
    </div>
  );
}

export default Hangman;
