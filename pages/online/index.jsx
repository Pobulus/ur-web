import { useSearchParams } from "next/navigation";
import Game from "../../app/components/game";
import { useEffect, useState } from "react";
import PlayerPrompt from "../../app/components/playerPrompt";
import Head from "next/head";
import socket from "../../app/utils/socket";
import OnlineGame from "../../app/components/onlineGame";
import OnlinePlayerPrompt from "../../app/components/onlinePrompt";
import YouIndicator from "../../app/components/youIndicator";
import { useMediaQuery } from "react-responsive";
import { randomColor } from "../../app/utils/colors";
import { randomPlayer } from "../../app/utils/word";

function LocalGame() {

  const [isPortrait, setIsPortrait] = useState(false);
  const isPortraitData = useMediaQuery({ orientation: "portrait" })
  const [showPrompt, setShowPrompt] = useState(true);
  const [playerID, setPlayerID] = useState(undefined);
  const [playerColors, setPlayerColors] = useState([randomColor(), "#5555bb"]);
  const [playerNames, setPlayerNames] = useState([randomPlayer(), "Player2"]);
  useEffect(() => {
    setIsPortrait(isPortraitData);
  }, [setIsPortrait, isPortraitData]);
  return (
    <>
      <Head>
        <title>Online multiplayer</title>
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="theme-color" content="#0D84E4" />
      </Head>
      <a href="/">
        <h1
          style={{ textAlign: "center", color: "#eee", position: "absolute",            width: isPortrait ? "100%" : "30%", }}
        >
          The Royal Game of Ur
        </h1>
      </a>

      {showPrompt && (
        <OnlinePlayerPrompt
          playerColors={playerColors}
          playerNames={playerNames}
          setPlayerNames={setPlayerNames}
          setPlayerID={setPlayerID}
          setPlayerColors={setPlayerColors}
          setShow={setShowPrompt}
        />
      )}
      <OnlineGame
        playerColors={playerColors}
        playerNames={playerNames}
        aiPlayer={false}
        setShow={setShowPrompt}
        portrait={isPortrait}
        playerID={playerID}
      />
      <YouIndicator
        color={playerColors?.[playerID]}
        name={playerNames?.[playerID]}
      />
    </>
  );
}

export default LocalGame;
