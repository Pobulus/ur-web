import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useEffect, useState } from "react";

function InstallPrompt() {
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    setIsIOS(/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream);

    setIsStandalone(window.matchMedia("(display-mode: standalone)").matches);
  }, []);

  if (isStandalone) {
    return null; // Don't show install button if already installed
  }

  return (
    <div>
      <h3>Install App</h3>
      <button>Add to Home Screen</button>
      {isIOS && (
        <p>
          To install this app on your iOS device, tap the share button
          <span role="img" aria-label="share icon">
            {" "}
            ⎋{" "}
          </span>
          and then "Add to Home Screen"
          <span role="img" aria-label="plus icon">
            {" "}
            ➕{" "}
          </span>
          .
        </p>
      )}
    </div>
  );
}

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>The Royal Game of UR</title>
        <link rel="manifest" href="/manifest.json" />

        <link rel="stylesheet" href="/global.css" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="apple-touch-icon" sizes="192x192" href="/icon192x192.png" />
        <link rel="apple-touch-icon" sizes="512x512" href="/apple-touch-icon.png" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="theme-color" content="#0D84E4" />
      </Head>
      <main className="dark">
        <h1 className={styles.title}>The Royal Game of Ur</h1>

        <p className={styles.description}>Please select game mode</p>

        <div className={styles.grid}>
          <a href="/local?ai=1" className={styles.card}>
            <h3>Local Singleplayer</h3>
            <p>Play locally against an AI opponent</p>
          </a>

          <a href="local" className={styles.card}>
            <h3>Local Multiplayer</h3>
            <p>Play with friends on this machine</p>
          </a>

          <a href="online" className={styles.card}>
            <h3>Online Multiplayer</h3>
            <p>Start a server or join a friend with an invitation code</p>
          </a>
          <a href="https://en.wikipedia.org/wiki/Royal_Game_of_Ur" className={styles.card}>
            <h3>About the game</h3>
            <p>Learn about the fascinating history of this game</p>
          </a>
        </div>
        {/* <InstallPrompt /> */}
      </main>

      


    </div>
  );
}
