import styles from "./Playlist.module.css"
import PlaylistTimer from "./PlaylistTimer/PlaylistTimer";
import PlaylistSong from "./PlaylistSong/PlaylistSong";

/**
 * View for the playlist component.
 * @param songs - The songs to display.
 */
const PlaylistView = function ({songs = []}) {
  return (
    <div className={styles.playlist}>
      <PlaylistTimer />
      {songs.map((song, index) => {
        return <PlaylistSong song={song} index={index} key={index}/>
      })}
    </div>
  );
}

export default PlaylistView;
