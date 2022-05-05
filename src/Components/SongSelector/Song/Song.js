import SongView from "./SongView";

/**
 * Component showing information of a single song
 * @param song Song to show the information of
 * @param onClick (Optional) event fired when the song is clicked
 * @returns The presenter for the component
 */
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
