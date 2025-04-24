function LetterButtons({ guessedLetters, incorrectGuesses, onGuess }) {
  return (
    <div className="letter-buttons">
      {"ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map((letter) => (
        <button
          key={letter}
          onClick={() => onGuess(letter)}
          disabled={guessedLetters.includes(letter) || incorrectGuesses.includes(letter)}
        >
          {letter}
        </button>
      ))}
    </div>
  );
}

export default LetterButtons;