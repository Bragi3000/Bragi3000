import styles from "./PlaylistTimer.module.css"


const PlaylistTimerView = function ( {remainingTime} ) {
  return (
    <div className={styles.Timer}>
      Remaining Playtime: {remainingTime}
    </div>
  );
};

export default PlaylistTimerView;
