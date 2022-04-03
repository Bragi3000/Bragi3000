import styles from "./SpotifyControl.module.css"
import playIcon from "Assets/images/play-icon.png";
import pauseIcon from "Assets/images/pause-icon.png";

/**
 * Simple song information view showing play/pause button, cover image, name of song and artists
 * @param {function} onModifyPlayback Modifies current playback state
 * @param {string} name current song name
 * @param {string} imageSrc cover image for the current song
 * @param {boolean} is_playing playing status of current song
 * @param {string} artists artists of the current song
 * @returns {JSX.Element} View with current song information
 * @constructor
 */
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
