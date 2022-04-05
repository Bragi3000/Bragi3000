import styles from "../SongSelector.module.css";

/**
 * View showing a currently selected song.
 * @param props.song The currently selected song
 * @param props.isConfirmed Whether the player has confirmed the selected song
 * @param props.isAlreadyChosen Whether another player has already confirmed the same song
 * @param props.onConfirm Event that fires when the confirm button is clicked
 * @param props.onCancel Event that fires when the cancel button is clicked
 */
const SelectedSongView = function ({
  song,
  isConfirmed = false,
  isAlreadyChosen = false,
  onConfirm = () => {},
  onCancel = () => {},
}) {
  return (
    <>
      <div className={styles.selectedSong}>
        <img
          className={styles.songImage}
          src={song.album.images[2].url}
          alt=""
        />
        <div className={styles.songDetails}>
          <span className={styles.songTitle}>{song.name}</span>
          <span>{song.artists.map((artist) => artist.name).join(", ")}</span>
        </div>
      </div>
      <button disabled={isConfirmed || isAlreadyChosen} onClick={() => onConfirm()}>
        Confirm
      </button>
      <button hidden={isConfirmed} onClick={() => onCancel()}>
        Cancel
      </button>
    </>
  );
};

export default SelectedSongView;
