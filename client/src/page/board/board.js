import React, { useState, useEffect } from "react";
import Square from "./square"; // Import the Square component
import "./board.css"; // Import your board styles if needed
import { useChannelStateContext, useChatContext } from "stream-chat-react";
import { Pattern } from "./patterns";

function Board() {
  const [board, setBoard] = useState([]);
  const [player, setPlayer] = useState(false);
  const [turn, setTurn] = useState(false);
  const { channel } = useChannelStateContext();
  const { client } = useChatContext();

  let idx;
  const chooseSquare = async (val) => {
    // console.log("square clicked", val);

    for (let i = 0; i < board.length; i++) {
      if (board[i] === val) {
        idx = i;
      }
    }

    // let cell = document.querySelectorAll(".cells");

    // cell.forEach((cel) => {
    //   cel.classList.add("marked");
    // });

    if (turn === player && board[idx] !== 0) {
      setTurn(player === false ? true : false);
      // Update the board value to 0
      const updatedBoard = [...board];
      updatedBoard[idx] = "X";

      checkrow1(idx);

      // Update the turn
      setTurn(!turn);
      // setPlayer(!player)
      await channel.sendEvent({
        type: "game-move",
        data: { val, player },
      });
      // Set the new board state
      setBoard(updatedBoard);
      // checkTextCut(idx);
    }
  };

  channel.on((event) => {
    // console.log(event.data.val);
    const currentPlayer = event.data.player === player;
    setPlayer(!currentPlayer);

    let idx2;
    if (event.type === "game-move" && event.user.id !== client.userID) {
      for (let i = 0; i < board.length; i++) {
        if (board[i] === event.data.val) {
          idx2 = i;
        }
      }
      // let cell = document.querySelectorAll(".cells");

      // cell.forEach((cel) => {
      //   cel.classList.add("marked");
      // });

      // console.log("idx2", idx2);
      // Update the board value to 0
      const updatedBoard = [...board];
      updatedBoard[idx2] = "X";

      // Update the turn
      // Set the new board state
      setTurn(!currentPlayer);
      setBoard(updatedBoard);
      // setPlayer(!player)
      // checkTextCut(idx2);
    }
  });

  function generateRandomArray() {
    if (25 > 25 - 1 + 1) {
      throw new Error(
        "Cannot generate unique random array with given length and range"
      );
    }

    const randomArray = [];
    const allNumbers = Array.from(
      { length: 25 - 1 + 1 },
      (_, index) => index + 1
    );

    for (let i = 0; i < 25; i++) {
      const randomIndex = Math.floor(Math.random() * allNumbers.length);
      const randomNumber = allNumbers[randomIndex];
      allNumbers.splice(randomIndex, 1); // Remove selected number to avoid repetition
      randomArray.push(randomNumber);
    }

    setBoard(randomArray);
    // console.log(randomArray);
  }

  useEffect(() => {
    generateRandomArray();
  }, [1]);

  // create each combination function ?

  const checkrow1 = (index) => {
    console.log(index);
    let matchPats = [];
    for (let i = 0; i < Pattern.length; i++) {
      const row = Pattern[i];
      for (let j = 0; j < row.length; j++) {
        if (row[j] === index) {
          console.log(row);
          matchPats.push(row);
        }
      }
    }
    console.log(matchPats);
    for (let i = 0; i < matchPats.length; i++) {
      const col = matchPats[i];
      for (let j = 0; j < col.length; j++) {
        if (board[col[j]] === "X") {
          for (let k = col[j]; k < col.length; k++) {
            if (board[k] === "X") {
              document.querySelector(".bingo").classList.add("slice");
            }
          }
        }
      }
    }
  };

  return (
    <div className="board">
      <h1>
        <span className="bingo">B</span>
        <span className="bingo">I</span>
        <span className="bingo">N</span>
        <span className="bingo">G</span>
        <span className="bingo">O</span>
      </h1>
      <table className="bingo-table">
        <tbody>
          <tr>
            <td className="cells">
              <Square chooseSquare={chooseSquare} val={board[0]} />
            </td>
            <td className="cells">
              <Square chooseSquare={chooseSquare} val={board[1]} />
            </td>
            <td className="cells">
              <Square chooseSquare={chooseSquare} val={board[2]} />
            </td>
            <td className="cells">
              <Square chooseSquare={chooseSquare} val={board[3]} />
            </td>
            <td className="cells">
              <Square chooseSquare={chooseSquare} val={board[4]} />
            </td>
          </tr>
          <tr>
            <td className="cells">
              <Square chooseSquare={chooseSquare} val={board[5]} />
            </td>
            <td className="cells">
              <Square chooseSquare={chooseSquare} val={board[6]} />
            </td>
            <td className="cells">
              <Square chooseSquare={chooseSquare} val={board[7]} />
            </td>
            <td className="cells">
              <Square chooseSquare={chooseSquare} val={board[8]} />
            </td>
            <td className="cells">
              <Square chooseSquare={chooseSquare} val={board[9]} />
            </td>
          </tr>
          <tr>
            <td className="cells">
              <Square chooseSquare={chooseSquare} val={board[10]} />
            </td>
            <td className="cells">
              <Square chooseSquare={chooseSquare} val={board[11]} />
            </td>
            <td className="cells">
              <Square chooseSquare={chooseSquare} val={board[12]} />
            </td>
            <td className="cells">
              <Square chooseSquare={chooseSquare} val={board[13]} />
            </td>
            <td className="cells">
              <Square chooseSquare={chooseSquare} val={board[14]} />
            </td>
          </tr>
          <tr>
            <td className="cells">
              <Square chooseSquare={chooseSquare} val={board[15]} />
            </td>
            <td className="cells">
              <Square chooseSquare={chooseSquare} val={board[16]} />
            </td>
            <td className="cells">
              <Square chooseSquare={chooseSquare} val={board[17]} />
            </td>
            <td className="cells">
              <Square chooseSquare={chooseSquare} val={board[18]} />
            </td>
            <td className="cells">
              <Square chooseSquare={chooseSquare} val={board[19]} />
            </td>
          </tr>
          <tr>
            <td className="cells">
              <Square chooseSquare={chooseSquare} val={board[20]} />
            </td>
            <td className="cells">
              <Square chooseSquare={chooseSquare} val={board[21]} />
            </td>
            <td className="cells">
              <Square chooseSquare={chooseSquare} val={board[22]} />
            </td>
            <td className="cells">
              <Square chooseSquare={chooseSquare} val={board[23]} />
            </td>
            <td className="cells">
              <Square chooseSquare={chooseSquare} val={board[24]} />
            </td>
          </tr>
        </tbody>
      </table>

      {/* <button onClick={() => generateRandomArray(25, 1, 25)}>Random</button> */}
    </div>
  );
}

export default Board;
