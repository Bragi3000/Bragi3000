import ResetPlaylistModalView from "./ResetPlaylistModalView";
import { infoToast } from "Components/Toast/Toast";

/**
 * Pop-up modal to confirm playlist reset
 * @param setShowConfirmation change the state of the modal being shown
 * @param onReset function to reset the playlist
 */
const ResetPlaylistModal = ({ setShowConfirmation, onReset }) => {
  const onConfirm = () => {
    onReset();
    setShowConfirmation(false);
    infoToast("Playlist has been reset");
  };

  const onCancel = () => {
    setShowConfirmation(false);
  };

  return <ResetPlaylistModalView onCancel={onCancel} onConfirm={onConfirm} />;
};

export default ResetPlaylistModal;
