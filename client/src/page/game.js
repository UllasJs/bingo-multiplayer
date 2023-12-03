import React, { useState } from "react";
import Board from "./board/board";

function Game({ channel }) {
  const [playersjoined, setPlayersJoined] = useState(
    channel.state.watcher_count === 2
  );
  const [result, setResult] = useState({ winner: "none", state: "none" });

  channel.on("user.watching.start", (e) => {
    setPlayersJoined(e.watcher_count === 2);
  });

  if (!playersjoined) {
    return (
      <h1
        style={{
          fontSize: "40px",
          fontFamily: "'Poppins', san-serif",
        }}
      >
        Waiting for other player to join
      </h1>
    );
  } else {
    return (
      <div className="gameContainer">
        <Board result={result} setResult={setResult} />
        {/* Chat */}
        {/* leave game btn */}
      </div>
    );
  }
}

export default Game;
