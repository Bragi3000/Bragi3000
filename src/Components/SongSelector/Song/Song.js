import SongView from "./SongView";

const Song = function ({ song, onClick }) {
  return (
    <SongView
      title={song.name}
      artists={song.artists.map((artist) => artist.name)}
      image={song.album.images[2].url}
      onClick={onClick}
    />
  );
};

export default Song;
