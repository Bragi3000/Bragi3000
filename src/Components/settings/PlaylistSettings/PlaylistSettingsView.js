import ResetPlaylistModal from "./ResetPlaylistModal/ResetPlaylistModal";

/**
 * Settings section showing configuration for the playlist.
 * This view is only meant to be used by the presenter.
 * @param hasValidToken Whether there is a valid Spotify token
 * @param onReset Event fired when the playlist is reset
 * @param showConfirmation Whether the reset playlist confirmation is shown
 * @param setShowConfirmation Event to control the showing of the reset playlist confirmation
 * @returns The view for the component
 */
const PlaylistSettingsView = function ({
  hasValidToken,
  onReset,
  showConfirmation,
  setShowConfirmation,
}) {
  return (
    hasValidToken && (
      <div className="my-10">
        <h1 className="text-3xl mb-3">Your playlist</h1>
        <p className="font-bold">
          Time for a new party?{" "}
          <button
            className="text-green-400 hover:underline"
            onClick={() => setShowConfirmation(true)}
          >
            Reset playlist
          </button>
        </p>
        {showConfirmation && (
          <ResetPlaylistModal
            onReset={onReset}
            setShowConfirmation={setShowConfirmation}
          />
        )}
      </div>
    )
  );
};

export default PlaylistSettingsView;
