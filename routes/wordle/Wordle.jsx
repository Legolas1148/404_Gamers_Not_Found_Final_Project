import React, { useState } from "react";
import WordleGrid from "./components/WordleGrid";
import Keyboard from "./components/Keyboard";
import Header from "./components/Header";
import "./style.css";

const Wordle = () => {
  const wordList = ["REACT", "STATE", "HOOKS", "ROUTE", "REDUX"];
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [solution, setSolution] = useState(wordList[currentWordIndex]);
  const [guesses, setGuesses] = useState(Array(5).fill("")); 
  const [currentGuess, setCurrentGuess] = useState(""); 
  const [currentRow, setCurrentRow] = useState(0); 
  const [gameOver, setGameOver] = useState(false); 
  const [gameWon, setGameWon] = useState(false); 


  const handleKeyPress = (letter) => {
    if (gameOver || currentGuess.length >= 5) return;

    setCurrentGuess((prev) => prev + letter);
  };


  const handleBackspace = () => {
    if (gameOver || currentGuess.length === 0) return;

    setCurrentGuess((prev) => prev.slice(0, -1));
  };

  
  const handleEnter = () => {
    if (gameOver || currentGuess.length !== 5) return;

    const updatedGuesses = [...guesses];
    updatedGuesses[currentRow] = currentGuess;

    setGuesses(updatedGuesses);

    if (currentGuess === solution) {
      setGameWon(true);
      setGameOver(true);
    } else if (currentRow === 4) {
      setGameOver(true);
    } else {
      setCurrentRow((prev) => prev + 1);
    }

    setCurrentGuess("");
  };

  const handleNextWord = () => {
    if (currentWordIndex < wordList.length - 1) {
      const newIndex = currentWordIndex + 1;
      setCurrentWordIndex(newIndex);
      setSolution(wordList[newIndex]); 
      setGuesses(Array(5).fill("")); 
      setCurrentGuess(""); 
      setCurrentRow(0); 
      setGameOver(false);
      setGameWon(false); 
    } else {
      alert("All words have been guessed!"); 
    }
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
                <button onClick={handleNextWord} className="next-button">
            {currentWordIndex < wordList.length - 1 ? "Next Word" : "Finish Game"}
          </button>
        </div>
      )}
    </div>
  );
};

export default Wordle;
