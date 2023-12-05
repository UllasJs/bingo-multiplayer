import React, { useEffect, useState } from "react";
import Board from "./board/board";
import gameMusic from "../assets/soundeffects/gameMusic.mp3";

const gamemusic = new Audio(gameMusic);

function Game({ channel }) {
  const [playerJoined, setPlayerjoined] = useState(null);

  useEffect(() => {
    // Play the game music
    gamemusic.volume = 0.4;
    gamemusic.play();

    // Set up an event listener for when the music ends
    const handleMusicEnd = () => {
      // Restart the music when it ends to create a loop
      gamemusic.currentTime = 0;
      gamemusic.play();
    };

    // Attach the event listener
    gamemusic.addEventListener("ended", handleMusicEnd);

    // Clean up the event listener when the component unmounts
    return () => {
      gamemusic.removeEventListener("ended", handleMusicEnd);
    };
  }, []);

  const [playersjoined, setPlayersJoined] = useState(
    channel.state.watcher_count === 2
  );
  const [result, setResult] = useState({ winner: "none", state: "none" });

  channel.on("user.watching.start", (e) => {
    console.log(e.user.name);
    setPlayerjoined(e.user.name);
    setPlayersJoined(e.watcher_count === 2);
    // console.log(e.watcher_count.name);
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
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 20,
        }}
        className="gameContainer"
      >
        {playerJoined && (
          <p
            style={{
              fontSize: 20,
              fontWeight: "bold",
            }}
          >
            Player{" "}
            <span
              style={{
                color: "#0092ff",
              }}
            >
              {playerJoined + " "}
            </span>
            has joined the game
          </p>
        )}
        <Board result={result} setResult={setResult} />
        {/* Chat */}
        {/* leave game btn */}
      </div>
    );
  }
}

export default Game;
