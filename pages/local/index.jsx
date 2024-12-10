import { useSearchParams } from "next/navigation";
import Game from "../../app/components/game";
import { useEffect, useState } from "react";
import PlayerPrompt from "../../app/components/playerPrompt";
import Head from "next/head";
import { useMediaQuery } from "react-responsive";

function LocalGame() {
  const searchParams = useSearchParams();
  const aiPlayer = searchParams.get("ai");
  const [isPortrait, setIsPortrait] = useState(false);
  const isPortraitData = useMediaQuery({ orientation: "portrait" })
  const [showPrompt, setShowPrompt] = useState(true);
  const [playerColors, setPlayerColors] = useState(["#ffaaff", "#5555bb"]);
  const [playerNames, setPlayerNames] = useState(["Player1", "Player2"]);
  useEffect(() => {
    if (aiPlayer) setPlayerNames(["You", "AI"]);
  }, [setPlayerNames, aiPlayer]);
  
  useEffect(() => {
    setIsPortrait(isPortraitData);
  }, [setIsPortrait, isPortraitData]);
  return (
    <>
      <Head>
        <title>{aiPlayer ? "Local singleplayer" : "Local multiplayer"}</title>
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="theme-color" content="#0D84E4" />
      </Head>
      <a href="/">
        <h2
          style={{
            textAlign: "center",
            color: "#eee",
            position: "absolute",
            width: isPortrait ? "100%" : "40%",
          }}
        >
          The Royal Game of Ur
        </h2>
      </a>

      {showPrompt && (
        <PlayerPrompt
          playerColors={playerColors}
          playerNames={playerNames}
          setPlayerNames={setPlayerNames}
          setPlayerColors={setPlayerColors}
          setShow={setShowPrompt}
        />
      )}
      <Game
        playerColors={playerColors}
        playerNames={playerNames}
        aiPlayer={aiPlayer}
        setShow={setShowPrompt}
        portrait={isPortrait}
      />
    </>
  );
}

export default LocalGame;
