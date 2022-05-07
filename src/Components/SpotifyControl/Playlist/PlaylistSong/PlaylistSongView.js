/**
 *  View to render a song in the playlist
 * @param song - song to render
 * @param index - index of the song in the playlist
 * @param onHoverSong - callback to handle hover event
 * @param timeUntilSong - time until the song starts
 */
const PlaylistSongView = ({song, index, onHoverSong, timeUntilSong}) => {
  return (
    <button
      className={"flex-row flex mb-2 w-full"}
      key={song.uri + index}
      onMouseOver={() => onHoverSong(true)}
      onMouseOut={() => onHoverSong(false)}
    >
      <img
        className={"flex w-[64px] ml-2 rounded-md"}
        src={song.album.images[2].url}
        alt=""
      />
      <div className={"overflow-hidden justify-evenly flex-col flex mx-auto"}>
        <span className={"overflow-hidden overflow-ellipsis whitespace-nowrap"}>{song.name}</span>
        <span className={"overflow-hidden overflow-ellipsis whitespace-nowrap"}>
          {song.artists.map((artist) => artist.name).join(", ")}
        </span>
        {timeUntilSong && (
          <span className={""}>
            Time until song: {timeUntilSong}
          </span>
        )}
      </div>
    </button>
  );
};

export default PlaylistSongView;
