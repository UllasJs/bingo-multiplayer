import { useState } from "react";
import "./style.css/joingame.css";
import Game from "./game";
import { useChatContext, Channel } from "stream-chat-react";

function JoinGame() {
  const [rivalname, setRivalName] = useState("");
  const { client } = useChatContext();
  const [channel, setChannel] = useState(null);
  const [player1, setPlayer1] = useState("");
  const [player2, setPlayer2] = useState("");

  const createChannel = async (e) => {
    e.preventDefault();
    const response = await client.queryUsers({ name: { $eq: rivalname } });

    // console.log(client.user.name);

    try {
      setPlayer2(response.users[0].name);
      setPlayer1(client.user.name);
    } catch (error) {
      // console.log(error);
    }

    if (response.users.length === 0) {
      alert("Rival Not found");
      return;
    }

    const newChannel = await client.channel("messaging", {
      members: [client.userID, response.users[0].id],
    });

    await newChannel.watch();
    setChannel(newChannel);
  };

  return (
    <>
      {channel ? (
        <Channel channel={channel}>
          <Game
            channel={channel}
            setChannel={setChannel}
            player1={player1}
            player2={player2}
          />
        </Channel>
      ) : (
        <div className="joingame">
          <h4>Create/Join Game</h4>
          <input
            type="text"
            placeholder="Username of your Rival..."
            onChange={(event) => {
              setRivalName(event.target.value);
            }}
          />
          <button className="joinbtn" onClick={createChannel}>
            Join/Start Game
          </button>
        </div>
      )}
    </>
  );
}

export default JoinGame;
