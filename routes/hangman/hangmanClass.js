export class hangmanClass {
  constructor(wordToGuess) {
    this.wordToGuess = wordToGuess.toUpperCase(); // Word to guess
    this.maxAttempts = 6; // Maximum incorrect guesses allowed
  }

  // Check if a guessed letter is in the word
  guessLetter(letter) {
    letter = letter.toUpperCase();
    return {
      correct: this.wordToGuess.includes(letter),
    };
  }

  // Get the word display with blanks for unguessed letters
  getWordDisplay(guessedLetters) {
    return this.wordToGuess
      .split("")
      .map((letter) => (guessedLetters.includes(letter) ? letter : "_"))
      .join(" ");
  }

  // Get the remaining attempts
  getRemainingAttempts(incorrectGuesses) {
    return this.maxAttempts - incorrectGuesses.length;
  }

  // Check if the game is won
  isGameWon(guessedLetters) {
    return this.wordToGuess.split("").every((letter) => guessedLetters.includes(letter));
  }

  // Check if the game is lost
  isGameLost(incorrectGuesses) {
    return incorrectGuesses.length >= this.maxAttempts;
  }
}