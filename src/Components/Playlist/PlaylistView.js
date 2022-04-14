import styles from "./Playlist.module.css"

/**
 * View for the playlist component.
 * @param songs - The songs to display.
 */
const PlaylistView = function ({songs = []}) {
  return (
    <div className={styles.playlist}>
      {songs.map((song) => {
        return (
          <a
            className={styles.resultSong}
            key={song.id}
            href="_"
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
            </div>
          </a>
        );
      })}
    </div>
  );
}

export default PlaylistView;
