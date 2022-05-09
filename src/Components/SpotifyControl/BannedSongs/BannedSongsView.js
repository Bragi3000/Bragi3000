import BannedSong from "./BannedSong/BannedSong";

/**
 * View for the playlist component.
 * @param songs - The songs to display.
 */
const BannedSongsView = function ({ songs = [] }) {
  return (
    <div className="w-96 h-128">
      <h1 className="text-xl text-center p-4">Banned Songs</h1>
      {songs.map((song, index) => {
        return <BannedSong song={song} index={index} key={index} />;
      })}
    </div>
  );
};

export default BannedSongsView;
