import Song from "Components/Song/Song";

/**
 * View showing a currently selected song.
 * @param props.song The currently selected song
 * @param props.isConfirmed Whether the player has confirmed the selected song
 * @param props.isAlreadyChosen Whether another player has already confirmed the same song
 * @param props.isBanned Whether the song was banned before
 * @param props.onConfirm Event that fires when the confirm button is clicked
 * @param props.onCancel Event that fires when the cancel button is clicked
 */
const SelectedSongView = function ({
  song,
  isConfirmed,
  isAlreadyChosen,
  isBanned,
  onConfirm,
  onCancel,
}) {
  return (
    <div className="flex flex-col h-full justify-center pb-16 overflow-auto">
      <Song song={song} />

      {!isConfirmed && isAlreadyChosen && (
        <p className="text-red-500 text-center p-3">
          This song has already been chosen by the other player!
        </p>
      )}

      {!isConfirmed && isBanned && (
        <p className="text-red-500 text-center p-3">
          This song has lost before and was banned!
        </p>
      )}

      {!isConfirmed && !isAlreadyChosen && !isBanned && (
        <button
          className="block text-green-400 m-3 hover:underline"
          onClick={() => onConfirm()}
        >
          Confirm selection
        </button>
      )}

      {!isConfirmed && (
        <button
          className="text-gray-400 hover:underline"
          onClick={() => onCancel()}
        >
          Select another song
        </button>
      )}
    </div>
  );
};

export default SelectedSongView;
