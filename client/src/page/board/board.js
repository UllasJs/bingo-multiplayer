import React, { useState, useEffect } from "react";
import Square from "./square"; // Import the Square component
import "./board.css"; // Import your board styles if needed
import { useChannelStateContext, useChatContext } from "stream-chat-react";
import { Pattern } from "./patterns";
import ClickSound from "../../assets/soundeffects/game-click.wav";
import WinnerSound from '../../assets/soundeffects/game-over.wav'

function Board({ result, setResult }) {
  const [board, setBoard] = useState([]);
  const [player, setPlayer] = useState(false);
  const [turn, setTurn] = useState(false);
  const { channel } = useChannelStateContext();
  const { client } = useChatContext();
  // const [loser, setLoser] = useState(false)

  let idx;
  const chooseSquare = async (val) => {
    // console.log("square clicked", val);

    const clickaudio = new Audio(ClickSound)

    clickaudio.play();

    for (let i = 0; i < board.length; i++) {
      if (board[i] === val && board[i] !== "X") {
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

      // Update the turn
      setTurn(!turn);
      // setPlayer(!player)
      await channel.sendEvent({
        type: "game-move",
        data: { val, player },
      });
      // Set the new board state

      setBoard(updatedBoard);
      checkPatterns(updatedBoard);
      // if (winner) {
      //   winnerText = "Winner!"
      // }
    }
  };

  channel.on((event) => {
    // console.log(event.data.val);
    const currentPlayer = event.data.player === player;
    setPlayer(!currentPlayer);
    let idx2;
    if (event.type === "game-move" && event.user.id !== client.userID) {
      for (let i = 0; i < board.length; i++) {
        if (board[i] === event.data.val && board[i] !== "X") {
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

      // if (loser) {
      //   alert("Loser")
      // }
      // Update the turn
      // Set the new board state
      setTurn(!currentPlayer);

      setBoard(updatedBoard);
      checkPatterns(updatedBoard);
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
  }, []);

  // create each combination function ?
  const [bSliced, setBsliced] = useState(false);
  const [iSliced, setIsliced] = useState(false);
  const [nSliced, setGsliced] = useState(false);
  const [gSliced, setNsliced] = useState(false);
  const [oSliced, setOsliced] = useState(false);

  const [pat0, setPat0] = useState(false);
  const [pat1, setPat1] = useState(false);
  const [pat2, setPat2] = useState(false);
  const [pat3, setPat3] = useState(false);
  const [pat4, setPat4] = useState(false);
  const [pat5, setPat5] = useState(false);
  const [pat6, setPat6] = useState(false);
  const [pat7, setPat7] = useState(false);
  const [pat8, setPat8] = useState(false);
  const [pat9, setPat9] = useState(false);
  const [pat10, setPat10] = useState(false);
  const [pat11, setPat11] = useState(false);

  let matchedPatterns = [
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ];

  const b = document.querySelector(".b");
  const i = document.querySelector(".i");
  const n = document.querySelector(".n");
  const g = document.querySelector(".g");
  const o = document.querySelector(".o");

  function checkwinner() {
    if (pat0) {
      console.log("Pattern 0");
      matchedPatterns[0] = pat0;
    }
    if (pat1) {
      console.log("Pattern 1");
      matchedPatterns[1] = pat1;
    }
    if (pat2) {
      console.log("Pattern 2");
      matchedPatterns[2] = pat2;
    }
    if (pat3) {
      console.log("Pattern 3");
      matchedPatterns[3] = pat3;
    }
    if (pat4) {
      console.log("Pattern 4");
      matchedPatterns[4] = pat4;
    }
    if (pat5) {
      console.log("Pattern 5");
      matchedPatterns[5] = pat5;
    }
    if (pat6) {
      console.log("Pattern 6");
      matchedPatterns[6] = pat6;
    }
    if (pat7) {
      console.log("Pattern 7");
      matchedPatterns[7] = pat7;
    }
    if (pat8) {
      console.log("Pattern 8");
      matchedPatterns[8] = pat8;
    }
    if (pat9) {
      console.log("Pattern 9");
      matchedPatterns[9] = pat9;
    }
    if (pat10) {
      console.log("Pattern 10");
      matchedPatterns[10] = pat10;
    }
    if (pat11) {
      console.log("Pattern 11");
      matchedPatterns[11] = pat11;
    }

    let consecutiveTrueCount = 0;

    for (let i = 0; i < matchedPatterns.length; i++) {
      if (matchedPatterns[i] === true) {
        consecutiveTrueCount++;
        if (consecutiveTrueCount === 5) {
          console.log("Found 5 true values!");
          // setLoser(true)
          
          alert("Winner");
          const gameOver = new Audio(WinnerSound)
          gameOver.play()
          // setWinner(true)
          // You can perform additional actions here
          break; // Break out of the loop once you find the sequence
        }
      }
    }
  }

  useEffect(() => {
    checkwinner();
  }, [board]);

  const checkPatterns = (board) => {
    if (pat0 === false) {
      if (Pattern[0]) {
        if (
          board[0] === "X" &&
          board[1] === "X" &&
          board[2] === "X" &&
          board[3] === "X" &&
          board[4] === "X"
        ) {
          if (bSliced === false) {
            b.classList.add("slice");
            setBsliced(true);
            setPat0(true);
          } else if (iSliced === false) {
            i.classList.add("slice");
            setIsliced(true);
            setPat0(true);
          } else if (nSliced === false) {
            n.classList.add("slice");
            setNsliced(true);
            setPat0(true);
          } else if (gSliced === false) {
            g.classList.add("slice");
            setGsliced(true);
            setPat0(true);
          } else if (oSliced === false) {
            o.classList.add("slice");
            setOsliced(true);
            setPat0(true);
          } else {
            setPat0(false);
            console.log("Pattern not Complete!");
          }
        }
      }
    }

    if (pat1 === false) {
      if (Pattern[1]) {
        if (
          board[5] === "X" &&
          board[6] === "X" &&
          board[7] === "X" &&
          board[8] === "X" &&
          board[9] === "X"
        ) {
          if (bSliced === false) {
            b.classList.add("slice");
            setBsliced(true);
            setPat1(true);
          } else if (iSliced === false) {
            i.classList.add("slice");
            setIsliced(true);
            setPat1(true);
          } else if (nSliced === false) {
            n.classList.add("slice");
            setNsliced(true);
            setPat1(true);
          } else if (gSliced === false) {
            g.classList.add("slice");
            setGsliced(true);
            setPat1(true);
          } else if (oSliced === false) {
            o.classList.add("slice");
            setOsliced(true);
            setPat1(true);
          } else {
            setPat1(false);
            console.log("Pattern not Complete!");
          }
        }
      }
    }

    if (pat2 === false) {
      if (Pattern[2]) {
        if (
          board[10] === "X" &&
          board[11] === "X" &&
          board[12] === "X" &&
          board[13] === "X" &&
          board[14] === "X"
        ) {
          if (bSliced === false) {
            b.classList.add("slice");
            setBsliced(true);
            setPat2(true);
          } else if (iSliced === false) {
            i.classList.add("slice");
            setIsliced(true);
            setPat2(true);
          } else if (nSliced === false) {
            n.classList.add("slice");
            setNsliced(true);
            setPat2(true);
          } else if (gSliced === false) {
            g.classList.add("slice");
            setGsliced(true);
            setPat2(true);
          } else if (oSliced === false) {
            o.classList.add("slice");
            setOsliced(true);
            setPat2(true);
          } else {
            setPat2(false);
            console.log("Pattern not Complete!");
          }
        }
      }
    }

    if (pat3 === false) {
      if (Pattern[3]) {
        if (
          board[15] === "X" &&
          board[16] === "X" &&
          board[17] === "X" &&
          board[18] === "X" &&
          board[19] === "X"
        ) {
          if (bSliced === false) {
            b.classList.add("slice");
            setBsliced(true);
            setPat3(true);
          } else if (iSliced === false) {
            i.classList.add("slice");
            setIsliced(true);
            setPat3(true);
          } else if (nSliced === false) {
            n.classList.add("slice");
            setNsliced(true);
            setPat3(true);
          } else if (gSliced === false) {
            g.classList.add("slice");
            setGsliced(true);
            setPat3(true);
          } else if (oSliced === false) {
            o.classList.add("slice");
            setOsliced(true);
            setPat3(true);
          } else {
            setPat3(false);
            console.log("Pattern not Complete!");
          }
        }
      }
    }

    if (pat4 === false) {
      if (Pattern[4]) {
        if (
          board[20] === "X" &&
          board[21] === "X" &&
          board[22] === "X" &&
          board[23] === "X" &&
          board[24] === "X"
        ) {
          if (bSliced === false) {
            b.classList.add("slice");
            setBsliced(true);
            setPat4(true);
          } else if (iSliced === false) {
            i.classList.add("slice");
            setIsliced(true);
            setPat4(true);
          } else if (nSliced === false) {
            n.classList.add("slice");
            setNsliced(true);
            setPat4(true);
          } else if (gSliced === false) {
            g.classList.add("slice");
            setGsliced(true);
            setPat4(true);
          } else if (oSliced === false) {
            o.classList.add("slice");
            setOsliced(true);
            setPat4(true);
          } else {
            setPat4(false);
            console.log("Pattern not Complete!");
          }
        }
      }
    }
    if (pat5 === false) {
      if (Pattern[5]) {
        if (
          board[0] === "X" &&
          board[5] === "X" &&
          board[10] === "X" &&
          board[15] === "X" &&
          board[20] === "X"
        ) {
          if (bSliced === false) {
            b.classList.add("slice");
            setBsliced(true);
            setPat5(true);
          } else if (iSliced === false) {
            i.classList.add("slice");
            setIsliced(true);
            setPat5(true);
          } else if (nSliced === false) {
            n.classList.add("slice");
            setNsliced(true);
            setPat5(true);
          } else if (gSliced === false) {
            g.classList.add("slice");
            setGsliced(true);
            setPat5(true);
          } else if (oSliced === false) {
            o.classList.add("slice");
            setOsliced(true);
            setPat5(true);
          } else {
            setPat5(false);
            console.log("Pattern not Complete!");
          }
        }
      }
    }
    if (pat6 === false) {
      if (Pattern[6]) {
        if (
          board[1] === "X" &&
          board[6] === "X" &&
          board[11] === "X" &&
          board[16] === "X" &&
          board[21] === "X"
        ) {
          if (bSliced === false) {
            b.classList.add("slice");
            setBsliced(true);
            setPat6(true);
          } else if (iSliced === false) {
            i.classList.add("slice");
            setIsliced(true);
            setPat6(true);
          } else if (nSliced === false) {
            n.classList.add("slice");
            setNsliced(true);
            setPat6(true);
          } else if (gSliced === false) {
            g.classList.add("slice");
            setGsliced(true);
            setPat6(true);
          } else if (oSliced === false) {
            o.classList.add("slice");
            setOsliced(true);
            setPat6(true);
          } else {
            setPat6(false);
            console.log("Pattern not Complete!");
          }
        }
      }
    }
    if (pat7 === false) {
      if (Pattern[7]) {
        if (
          board[2] === "X" &&
          board[7] === "X" &&
          board[12] === "X" &&
          board[17] === "X" &&
          board[22] === "X"
        ) {
          if (bSliced === false) {
            b.classList.add("slice");
            setBsliced(true);
            setPat7(true);
          } else if (iSliced === false) {
            i.classList.add("slice");
            setIsliced(true);
            setPat7(true);
          } else if (nSliced === false) {
            n.classList.add("slice");
            setNsliced(true);
            setPat7(true);
          } else if (gSliced === false) {
            g.classList.add("slice");
            setGsliced(true);
            setPat7(true);
          } else if (oSliced === false) {
            o.classList.add("slice");
            setOsliced(true);
            setPat7(true);
          } else {
            setPat7(false);
            console.log("Pattern not Complete!");
          }
        }
      }
    }
    if (pat8 === false) {
      if (Pattern[8]) {
        if (
          board[3] === "X" &&
          board[8] === "X" &&
          board[13] === "X" &&
          board[18] === "X" &&
          board[23] === "X"
        ) {
          if (bSliced === false) {
            b.classList.add("slice");
            setBsliced(true);
            setPat8(true);
          } else if (iSliced === false) {
            i.classList.add("slice");
            setIsliced(true);
            setPat8(true);
          } else if (nSliced === false) {
            n.classList.add("slice");
            setNsliced(true);
            setPat8(true);
          } else if (gSliced === false) {
            g.classList.add("slice");
            setGsliced(true);
            setPat8(true);
          } else if (oSliced === false) {
            o.classList.add("slice");
            setOsliced(true);
            setPat8(true);
          } else {
            setPat8(false);
            console.log("Pattern not Complete!");
          }
        }
      }
    }
    if (pat9 === false) {
      if (Pattern[9]) {
        if (
          board[4] === "X" &&
          board[9] === "X" &&
          board[14] === "X" &&
          board[19] === "X" &&
          board[24] === "X"
        ) {
          if (bSliced === false) {
            b.classList.add("slice");
            setBsliced(true);
            setPat9(true);
          } else if (iSliced === false) {
            i.classList.add("slice");
            setIsliced(true);
            setPat9(true);
          } else if (nSliced === false) {
            n.classList.add("slice");
            setNsliced(true);
            setPat9(true);
          } else if (gSliced === false) {
            g.classList.add("slice");
            setGsliced(true);
            setPat9(true);
          } else if (oSliced === false) {
            o.classList.add("slice");
            setOsliced(true);
            setPat9(true);
          } else {
            setPat9(false);
            console.log("Pattern not Complete!");
          }
        }
      }
    }
    if (pat10 === false) {
      if (Pattern[10]) {
        if (
          board[0] === "X" &&
          board[6] === "X" &&
          board[12] === "X" &&
          board[18] === "X" &&
          board[24] === "X"
        ) {
          if (bSliced === false) {
            b.classList.add("slice");
            setBsliced(true);
            setPat10(true);
          } else if (iSliced === false) {
            i.classList.add("slice");
            setIsliced(true);
            setPat10(true);
          } else if (nSliced === false) {
            n.classList.add("slice");
            setNsliced(true);
            setPat10(true);
          } else if (gSliced === false) {
            g.classList.add("slice");
            setGsliced(true);
            setPat10(true);
          } else if (oSliced === false) {
            o.classList.add("slice");
            setOsliced(true);
            setPat10(true);
          } else {
            setPat10(false);
            console.log("Pattern not Complete!");
          }
        }
      }
    }
    if (pat11 === false) {
      if (Pattern[11]) {
        if (
          board[4] === "X" &&
          board[8] === "X" &&
          board[12] === "X" &&
          board[16] === "X" &&
          board[20] === "X"
        ) {
          if (bSliced === false) {
            b.classList.add("slice");
            setBsliced(true);
            setPat11(true);
          } else if (iSliced === false) {
            i.classList.add("slice");
            setIsliced(true);
            setPat11(true);
          } else if (nSliced === false) {
            n.classList.add("slice");
            setNsliced(true);
            setPat11(true);
          } else if (gSliced === false) {
            g.classList.add("slice");
            setGsliced(true);
            setPat11(true);
          } else if (oSliced === false) {
            o.classList.add("slice");
            setOsliced(true);
            setPat11(true);
          } else {
            setPat11(false);
            console.log("Pattern not Complete!");
          }
        }
      }
    }
  };

  return (
    <div className="board">
      <h1>
        <span className="b">B</span>
        <span className="i">I</span>
        <span className="n">N</span>
        <span className="g">G</span>
        <span className="o">O</span>
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
