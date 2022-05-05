import PlaylistTimer from "./PlaylistTimer/PlaylistTimer";
import PlaylistSong from "./PlaylistSong/PlaylistSong";

/**
 * View for the playlist component.
 * @param songs - The songs to display.
 */
const PlaylistView = function ({ songs = [] }) {
  return (
    <div className="w-96 h-128">
      <h1 className="text-xl text-center p-4">Playlist</h1>
      <PlaylistTimer />
      {songs.map((song, index) => {
        return <PlaylistSong song={song} index={index} key={index} />;
      })}
    </div>
  );
};

export default PlaylistView;
