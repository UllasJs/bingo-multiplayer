import React, { useState } from "react";
import Board from "./board/board";

function Game({ channel }) {
  const [playersjoined, setPlayersJoined] = useState(
    channel.state.watcher_count === 2
  );

  channel.on("user.watching.start",(e) => {
    setPlayersJoined(e.watcher_count === 2)
  })

  if (!playersjoined) {
    return <h1>Waiting for other player to join</h1>;
  } else {
    return <div className="gameContainer">
      <Board />
      {/* Chat */}
      {/* leave game btn */}
    </div>;
  }
}

export default Game;
