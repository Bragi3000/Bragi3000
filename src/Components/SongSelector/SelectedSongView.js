const SelectedSongView = function ({
  song,
  isConfirmed = false,
  onConfirm = () => {},
  onCancel = () => {},
}) {
  return (
    <div>
      <img src={song.album.images[2].url} alt="" />
      <span>{song.name}</span>
      <br />
      <span>{song.artists.map((artist) => artist.name).join(", ")}</span>
      <br />
      <button disabled={isConfirmed} onClick={() => onConfirm()}>Confirm</button>
      <button hidden={isConfirmed} onClick={() => onCancel()}>Cancel</button>
    </div>
  );
};

export default SelectedSongView;
