import styles from "./SongSelector.module.css";

const SearchResultsView = function ({
  songs = [],
  onSelectSong: onSongSelect = (song) => {},
}) {
  return (
    <div className={styles.searchResults}>
      {songs.map((song) => {
        const handleClick = (e) => {
          e.preventDefault();
          onSongSelect(song);
        };

        return (
          <a
            className={styles.resultSong}
            key={song.id}
            href="_"
            onClick={handleClick}
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
};

export default SearchResultsView;
