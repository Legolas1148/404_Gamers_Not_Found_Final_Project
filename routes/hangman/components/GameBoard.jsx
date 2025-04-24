import LetterButtons from "./LetterButtons";

function GameBoard({
  hangman,
  guessedLetters,
  incorrectGuesses,
  gameOver,
  gameWon,
  onGuess,
  onReset,
}) {
  return (
    <div className="game">
      <p>Player 2: Guess the word!</p>

      {/* Display the word with blanks */}
      <h2>{hangman.getWordDisplay(guessedLetters)}</h2>

      {/* Display incorrect guesses */}
      <p>Incorrect Guesses: {incorrectGuesses.join(", ")}</p>
      <p>Remaining Attempts: {hangman.getRemainingAttempts(incorrectGuesses)}</p>

      {/* Display game status */}
      {gameWon && <p>🎉 Player 2 won! 🎉</p>}
      {gameOver && !gameWon && <p>💀 Player 2 lost! The word was: {hangman.wordToGuess}</p>}

      {/* Letter buttons */}
      {!gameOver && <LetterButtons guessedLetters={guessedLetters} incorrectGuesses={incorrectGuesses} onGuess={onGuess} />}

      {/* Reset button */}
      {gameOver && <button onClick={onReset}>Play Again</button>}
    </div>
  );
}

export default GameBoard;