import React, { useEffect } from "react";

const WordleGrid = ({ guesses, solution, currentGuess, onKeyPress, onBackspace, onEnter }) => {
  const getCellClass = (letter, index, row) => {
    if (row >= guesses.length || guesses[row] === "") return "";

    const solutionArray = solution.split("");
    if (letter === solutionArray[index]) return "correct";
    if (solutionArray.includes(letter)) return "misplaced";
    return "incorrect";
  };

  // Add keyboard event listeners
  useEffect(() => {
    const handleKeyDown = (event) => {
      const { key } = event;

      if (key === "Enter") {
        onEnter();
      } else if (key === "Backspace") {
        onBackspace();
      } else if (/^[a-zA-Z]$/.test(key)) {
        onKeyPress(key.toUpperCase());
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onKeyPress, onBackspace, onEnter]);

  return (
    <div id="wordle-grid">
      {guesses.map((guess, rowIndex) => (
        <div class= "wordle-row" key={rowIndex}>
          {Array.from({ length: 5 }).map((_, colIndex) => {
            const letter =
              rowIndex === guesses.indexOf("") ? currentGuess[colIndex] || "" : guess[colIndex] || "";
            return (
              <div
                key={`${rowIndex}-${colIndex}`}
                className={`letter ${getCellClass(letter, colIndex, rowIndex)}`}
              >
                {letter}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default WordleGrid;