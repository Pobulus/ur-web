'use-client'
import { useState } from "react";
import styles from "../../styles/game.module.css";
import { useEffect } from "react";
import engine from "../utils/engine";
import Dice from "./dice";
import Board from "./board";
import useSound from "use-sound";
import Indicator from "./indicator";
import { contrastingColor } from "../utils/colors";
import { delay } from "../utils/time";
import TransparentButton from "./transparentButton";
import CoolButton from "./coolButton";

export default function Game({aiPlayer, playerColors, playerNames, setShow, portrait}) {
  

  const [emsg, setEMsg] = useState(null);
  const [ai, setAI] = useState(false);
  const [data, setData] = useState(JSON.parse(engine.getObject()));

  const [playDiceSound] = useSound("/dice.mp3");
  const [playPieceSound] = useSound("/piece.mp3");

  const boardStructure = [
    [1,0,0,0,null,null,1,0],
    [0,0,0,1,0,0,0,0],
    [1,0,0,0,null,null,1,0],
  ]

  const onReset = () => {
    engine.reset();
    setData(JSON.parse(engine.getObject()));
  };

  const aiLogic = async () => {
    if(aiPlayer ===  null) return;
    console.log("performing ai logic");
    let aiData = JSON.parse(engine.getObject());
    // assumes that AI is the 2nd player
    setAI(true);
    while (aiData.player && aiData.stage !== "over") {
      console.log("stage is", aiData.stage);
      await delay(500);
      if (aiData.board.slice(7, 15).filter(field => field.length === 2).length) {console.log('FOUND IT!'); return;}
      if (aiData.stage === "move") {
        if (!aiData.validMoves.length) { console.log('ai can not move'); return; }
        const index = aiData.validMoves[Math.floor(Math.random() * aiData.validMoves.length)]
        onTileClick(index);
        console.log("ai is thinking about clicking", index);
      } else if (aiData.stage === "roll" || aiData.stage === "preroll") {
        onRoll();
        console.log("ai rolls");
      }
      aiData = JSON.parse(engine.getObject());
      
    }
    setAI(false);
    console.log("ai logic done");
  };

  const onTileClick = (index) => {
    try {
      engine.click(index);
      playPieceSound();
      setEMsg(null);
    } catch (err) {
      setEMsg(err.message);
    }
    setData(JSON.parse(engine.getObject()));
    console.log(engine.getObject());
  };
  const onRoll = () => {
    if (data.stage === "over") return;
    try {
      engine.roll();
      playDiceSound();
      setEMsg(null);
    } catch (err) {
      setEMsg(err.message);
    }
    setData(JSON.parse(engine.getObject()));
    console.log(engine.getObject());
    engine.printBoard();
  };

  return (
    <>

      <div className={styles.container}>
        {emsg && (
          <h3
            style={{
              position: "absolute",
              zIndex: 1001,
              backgroundColor: "#ee4400",
              borderRadius: "1em",
              padding: "1em",
            }}
          >
            {emsg}
          </h3>
        )}
        {data.winner !== null && (
          <div
            style={{
              position: "absolute",
              zIndex: 1001,
              backgroundColor: `${playerColors[data.winner]}`,
              borderRadius: "1em",
              padding: "1em",
              textAlign: "center",
              color: `${contrastingColor(playerColors[data.winner])}`,
            }}
          >
            <h1>{playerNames[data.winner]} won!</h1>
            <CoolButton onClick={onReset}>Play again?</CoolButton>
          </div>
        )}
        <Board
          onTileClick={(index) => {onTileClick(index); aiLogic();}}
          structure={boardStructure}
          pieces={data.board}
          colors={playerColors}
          valid={data.validMoves}
          blocked={ai}
          transposed={portrait}
        />
        <TransparentButton onClick={() => {onRoll(); aiLogic();}} >
          <Dice highlight={!data.validMoves.length} values={data.dice} blocked={ai} />
        </TransparentButton>
        <div style={{ position: "absolute", left: "5%", bottom: "5%" }}>
          <h1
            style={{
              textAlign: "center",
              color: playerColors[data.player],
              filter: "drop-shadow(1px 1px 0px #000)",
            }}
          >
            {playerNames[data.player]}
          </h1>
          <TransparentButton onClick={() => setShow(true)} >
          <Indicator
            stage={data.stage}
            color={playerColors[data.winner ?? data.player]}
            win={data.winner !== null}
          />
          </TransparentButton>
        </div>
      </div>
      <style jsx global>{`
        html,
        body {
          background-color: #0D84E4;
          color: #efefef;
          font-family:
            -apple-system,
            BlinkMacSystemFont,
            Segoe UI,
            Roboto,
            Oxygen,
            Ubuntu,
            Cantarell,
            Fira Sans,
            Droid Sans,
            Helvetica Neue,
            sans-serif;
        }
        * {
          box-sizing: border-box;
        }
        .prevent-select {
          -webkit-user-select: none; /* Safari */
          -ms-user-select: none; /* IE 10 and IE 11 */
          user-select: none; /* Standard syntax */
        }
        .square {
          position: absolute;
          width: max(5vh, 5vw);
          height: max(5vh, 5vw);
          left: 50%;
          top: -100%;
          transform: translate(-50%, 100%);
          mask-mode: revert;
        }
        #top {
          border-radius: 100%;
        }
        #bottom {
          filter: brightness(0.6);
          border-radius: 0% 0% 100% 100%;
          transform: translate(-50%, 150%);
        }
        #piece {
          transform: scale(1, 0.45);
          cursor: pointer;
        }
        #pieceCount {
          position: absolute;
          transform: translate(-50%, 90%) scale(100%, 200%);
          left: 50%;

          font-size: max(2.5vw, 2.5vh);
          color: white;
          filter: drop-shadow(0 0 0.5rem black);
          z-index: 1000;
          cursor: pointer;
        }
      `}</style>
    </>
  );
}
