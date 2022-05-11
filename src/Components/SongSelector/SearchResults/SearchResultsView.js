import Song from "Components/Song/Song";

/**
 * View showing song results after a search.
 * @param props.songs List of songs to show
 * @param props.onSelectSong Event that fires when clicking a song
 */
const SearchResultsView = function ({
  songs,
  onSelectSong,
}) {
  return (
    <div className="overflow-auto">
      {songs.map((song) => {
        return (
          <Song key={song.id} song={song} onClick={() => onSelectSong(song)} />
        );
      })}
    </div>
  );
};

export default SearchResultsView;
