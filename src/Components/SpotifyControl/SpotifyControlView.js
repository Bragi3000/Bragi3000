import styles from "./SpotifyControl.module.css"
import playIcon from "Assets/images/play-icon.png";
import pauseIcon from "Assets/images/pause-icon.png";


const SpotifyControlView = function ({onModifyPlayback, name, imageSrc, is_playing, artists}) {
  return (
    <div className={styles.controlBar}>
      <img src={imageSrc} alt={"_"}/>
      <div className={styles.containerRow}>
        <span className={"title"}> {name} </span>
        <span className={"artist"}> {artists} </span>
      </div>
      <img src={is_playing ? pauseIcon : playIcon} alt={"_"} onClick={onModifyPlayback}/>
    </div>
  )
}

export default SpotifyControlView;
