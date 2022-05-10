import ResetPlaylistModalView from "./ResetPlaylistModalView";

/**
 * Pop-up modal to confirm playlist reset
 * @param setShowConfirmation change the state of the modal being shown
 * @param onReset function to reset the playlist
 */
const ResetPlaylistModal = ({setShowConfirmation, onReset}) => {

  const onConfirm = () => {
    onReset();
    setShowConfirmation(false);
  }

  const onCancel = () => {
    setShowConfirmation(false);
  }


  return (
    <ResetPlaylistModalView onCancel={onCancel} onConfirm={onConfirm}/>
  )
}

export default ResetPlaylistModal;
