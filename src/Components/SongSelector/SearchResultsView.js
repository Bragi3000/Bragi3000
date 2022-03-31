const SearchResultsView = function ({
  songs = [],
  onSelectSong: onSongSelect = (song) => {},
}) {
  return (
    <div>
      {songs.map((song) => {
        const handleClick = (e) => {
          e.preventDefault();
          onSongSelect(song);
        };

        return (
          <a key={song.id} href="_" onClick={handleClick}>
            <div>
              <img src={song.album.images[2].url} alt="" />
              <span>{song.name}</span>
              <br />
              <span>
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
