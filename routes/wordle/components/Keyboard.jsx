import React from "react";

const Keyboard = ({ onKeyPress, onBackspace, onEnter }) => {
  const rows = [
    "QWERTYUIOP",
    "ASDFGHJKL",
    "ZXCVBNM",
  ];

  return (
    <div id="keyboard">
      {rows.map((row, rowIndex) => (
        <div key={rowIndex} className="keyboard-row">
          {row.split("").map((letter) => (
            <button
              key={letter}
              onClick={() => onKeyPress(letter)}
              className="keyboard-key"
            >
              {letter}
            </button>
          ))}
        </div>
      ))}
      <div className="keyboard-row">
        <button onClick={onBackspace} className="keyboard-key">
          ⌫
        </button>
        <button onClick={onEnter} className="keyboard-key">
          Enter
        </button>
      </div>
    </div>
  );
};

export default Keyboard;