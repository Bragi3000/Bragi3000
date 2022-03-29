import styles from "./SpotifyControl.module.css"
import playIcon from "Assets/images/play-icon.png";
import pauseIcon from "Assets/images/pause-icon.png";


const SpotifyControlView = function ({onModifyPlayback, data}) {
  return (
    <div className={styles.controlBar}>
      <img src={data.image_src} alt={"_"}/>
      <div className={styles.containerRow}>
        <span className={"title"}> {data.name} </span>
        <span className={"artist"}> {data.artist} </span>
      </div>
      <img src={data.is_playing ? pauseIcon : playIcon} alt={"_"} onClick={onModifyPlayback}/>
    </div>
  )
}

export default SpotifyControlView;
