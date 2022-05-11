import Song from "Components/Song/Song";

/**
 * View for the banned songs component.
 * @param songs - The songs to display.
 */
const BannedSongsView = function ({ songs = [] }) {
  return (
    <div className="w-80 max-h-128 flex flex-col">
      <h1 className="text-xl text-center p-4 flex-none">Banned Songs</h1>
      <div className="overflow-auto flex-auto pb-2">
        {songs.map((song) => (
          <Song key={song.id} song={song} />
        ))}
      </div>
    </div>
  );
};

export default BannedSongsView;
