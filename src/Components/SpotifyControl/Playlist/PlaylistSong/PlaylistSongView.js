import styles from "./PlaylistSongView.module.css";

/**
 *  View to render a song in the playlist
 * @param song - song to render
 * @param index - index of the song in the playlist
 * @param onHoverSong - callback to handle hover event
 * @param timeUntilSong - time until the song starts
 */
const PlaylistSongView = ({song, index, onHoverSong, timeUntilSong}) => {
  return (
    <button
      className={styles.resultSong}
      key={song.uri + index}
      onMouseOver={() => onHoverSong(true)}
      onMouseOut={() => onHoverSong(false)}
    >
      <img
        className={styles.songImage}
        src={song.album.images[2].url}
        alt=""
      />
      <div className={styles.songDetails}>
        <span className={styles.songTitle}>{song.name}</span>
        <span className={styles.songArtists}>
          {song.artists.map((artist) => artist.name).join(", ")}
        </span>
        {timeUntilSong && (
          <span className={styles.songTime}>
            Time until song: {timeUntilSong}
          </span>
        )}
      </div>
    </button>
  );
};

export default PlaylistSongView;
