// Square.js
import React, { useState } from "react";

function Square({ chooseSquare, val }) {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(!clicked);
    chooseSquare(val); // Notify the parent component about the click
  };

  return (
    <p
      className={`square ${clicked ? "clicked" : ""}`}
      onClick={handleClick}
    >
      {val}
    </p>
  );
}

export default Square;
