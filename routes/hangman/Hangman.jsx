import { useState } from "react";
import { hangmanClass } from "./hangmanClass";
import SetWord from "./components/SetWord";
import GameBoard from "./components/GameBoard";

function Hangman() {
  const [hangman, setHangman] = useState(null); // Hangman game instance
  const [isWordSet, setIsWordSet] = useState(false); // Whether the word has been set
  const [guessedLetters, setGuessedLetters] = useState([]); // Track guessed letters
  const [incorrectGuesses, setIncorrectGuesses] = useState([]); // Track incorrect guesses
  const [gameOver, setGameOver] = useState(false); // Track if the game is over
  const [gameWon, setGameWon] = useState(false); // Track if the game is won

  // Handle setting the word by Player 1
  const handleSetWord = (word) => {
    setHangman(new hangmanClass(word.trim().toUpperCase()));
    setIsWordSet(true);
  };

  // Handle letter guesses by Player 2
  const handleGuess = (letter) => {
    if (guessedLetters.includes(letter) || incorrectGuesses.includes(letter)) {
      return; // Ignore if the letter has already been guessed
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

  // Reset the game
  const resetGame = () => {
    setHangman(null);
    setIsWordSet(false);
    setGuessedLetters([]);
    setIncorrectGuesses([]);
    setGameOver(false);
    setGameWon(false);
  };

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
