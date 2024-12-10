import CoolButton from "./coolButton";
import CoolInput from "./coolInput";
import styles from "../../styles/Home.module.css";

function PlayerPrompt({
  playerColors,
  playerNames,
  setPlayerNames,
  setPlayerColors,
  setShow,
}) {
  return (
    <div className={styles.prompt}>
      <h1>Setup players</h1>
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
          <h2>Player 2 name</h2>
          <CoolInput
            onChange={(val) =>
              setPlayerNames((old) => [old[0], val.target.value])
            }
            value={playerNames[1]}
          />
        </div>
        <div className={styles.invisCard}>
          <h2>Player 2 color</h2>
          <CoolInput
            type="color"
            onChange={(val) =>
              setPlayerColors((old) => [old[0], val.target.value])
            }
            value={playerColors[1]}
          />
        </div>
        <div className={styles.invisCard}>
          <CoolButton onClick={() => setShow(false)}>Begin!</CoolButton>
        </div>
      </div>
     
    </div>
  );
}
export default PlayerPrompt;
