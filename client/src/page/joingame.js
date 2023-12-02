import { useState } from "react";
import "./style.css/joingame.css";
import Game from "./game";
import { useChatContext, Channel } from "stream-chat-react";

function JoinGame() {
  const [rivalname, setRivalName] = useState("");
  const { client } = useChatContext();
  const [channel, setChannel] = useState(null);
  const createChannel = async (e) => {
    e.preventDefault();
    const response = await client.queryUsers({ name: { $eq: rivalname } });

    console.log(response);

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
          <Game channel={channel} />
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
          <button onClick={createChannel}>Join/Start Game</button>
        </div>
      )}
    </>
  );
}

export default JoinGame;
