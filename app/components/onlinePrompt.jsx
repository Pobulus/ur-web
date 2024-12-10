import { useEffect, useState } from "react";
import socket from "../utils/socket";
import TransparentButton from "./transparentButton";
import CoolInput from "./coolInput";
import CoolButton from "./coolButton";
import styles from "../../styles/Home.module.css";
import { useSearchParams } from "next/navigation";
import QRCode from "react-qr-code";

function OnlinePlayerPrompt({
  playerColors,
  playerNames,
  setPlayerNames,
  setPlayerColors,
  setPlayerID,
  setShow,
}) {
  const searchParams = useSearchParams();
  const gameId = searchParams.get("gameId");
  const [code, setCode] = useState("");
  useEffect(() => {
    setCode(gameId);
  }, [setCode, gameId]);
  const [disableJoin, setDisableJoin] = useState(false);
  const startNewGame = () => {
    socket.emit("setInfo", playerNames[0], playerColors[0]);
    socket.emit("startGame");
    setDisableJoin(true)
  };
  const joinGame = () => {
    socket.emit("setInfo", playerNames[0], playerColors[0]);
    socket.emit("joinGame", code.toUpperCase());
  };
  useEffect(() => {
    socket.on("gameId", (id) => setCode(id));
    socket.on("playerUpdate", (playerData) => {
      console.log("got.playerData", playerData);
      console.log("id", socket.id);
      setPlayerID(+(playerData[1].id === socket.id));
      setPlayerNames(playerData.map((pl) => pl.name));
      setPlayerColors(playerData.map((pl) => pl.color));
      setShow(false);
    });
  }, [socket, setShow]);
  return (
    <div className={styles.prompt}>
      <h1>Setup online play</h1>
      <div className={styles.grid} style={{position: 'relative', left: '50%', transform:  'translate(-45%)'}}>
        <div className={styles.invisCard}>
          <h2>Player 1 name</h2>
          <CoolInput
            onChange={(val) =>
              setPlayerNames((old) => [val.target.value, old[1]])
            }
            value={playerNames[0]}
          />
        </div>
        <div className={styles.invisCard}>
          <h2>Player 1 color</h2>
          <CoolInput
            type="color"
            onChange={(val) =>
              setPlayerColors((old) => [val.target.value, val[1]])
            }
            value={playerColors[0]}
          />
        </div>
        <div className={styles.invisCard}>

          <CoolInput
              onChange={(val) => { setCode(val.target.value); setDisableJoin(false); }}
              value={code}
              placeholder="Game code"
            />
        </div>
        <div className={styles.invisCard}>
          <CoolButton disabled={disableJoin} onClick={() => joinGame()}>Join</CoolButton>
        </div>
        <div className={styles.invisCard}>
          <CoolButton  onClick={() => startNewGame()}>Host</CoolButton>
        </div>
        {code && disableJoin &&
        <div className={styles.invisCard}>
          <h3>Share this link with your friend:</h3>
          <TransparentButton onClick={() => {navigator.clipboard.writeText(`${window.location.host}${window.location.pathname}?gameId=${code}`)}}>
            <h4 style={{color: '#eee'}}><u>{`${window.location.host}${window.location.pathname}?gameId=${code}`}</u></h4>
            <QRCode value={`https://${window.location.host}${window.location.pathname}?gameId=${code}`} />
          </TransparentButton>
        </div>
        }
      </div>
     
    </div>
 
  );
}
export default OnlinePlayerPrompt;
