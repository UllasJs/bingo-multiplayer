import React, { useEffect, useState } from "react";
import Board from "./board/board";
import gameMusic from "../assets/soundeffects/gameMusic.mp3";

const gamemusic = new Audio(gameMusic);

function Game({ channel, setChannel, player1, player2 }) {
  // console.log("p1",player1);
  // console.log("p2",player2);

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
  const [result, setResult] = useState("");

  channel.on("user.watching.start", (e) => {
    // console.log(e.user.name);
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
        <h1 id="wiinerR"></h1>
        {player2 && (
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
              {player2 + " "}
            </span>
            has joined the game
          </p>
        )}
        <Board
          result={result}
          setResult={setResult}
          player1={player1}
          player2={player2}
        />
        <button
          onClick={async () => {
            await channel.stopWatching();
            setChannel(null);
          }}
        >
          Leave Game
        </button>
      </div>
    );
  }
}

export default Game;
