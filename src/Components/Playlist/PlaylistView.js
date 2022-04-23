import styles from "./Playlist.module.css"
import PlaylistTimer from "./PlaylistTimer/PlaylistTimer";

/**
 * View for the playlist component.
 * @param songs - The songs to display.
 */
const PlaylistView = function ({songs = [], onClickSong}) {
  return (
    <div className={styles.playlist}>
      {songs.map((song, index) => {
        return (
          <button
            className={styles.resultSong}
            key={song.id + index}
            onClick={() => onClickSong(song)}
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
          </button>
        );
      })}
      <PlaylistTimer />
    </div>
  );
}

export default PlaylistView;
