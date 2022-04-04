import styles from "./SongSelector.module.css";

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
