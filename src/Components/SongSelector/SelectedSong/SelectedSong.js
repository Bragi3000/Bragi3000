import { connect } from "react-redux";
import {
  cancelSelectedSong,
  confirmSelectedSong,
  selectSelectedSong,
  selectSongIsAlreadyChosen,
  selectSongIsConfirmed,
} from "Store/slices/selectedSongs";
import SelectedSongView from "./SelectedSongView";

/**
 * Component showing a currently selected song.
 * Presenter for {@link SelectedSongView}, wiring it to the store.
 * @param props.player The player for whom the component is
 */
const SelectedSong = connect(
  (state, { player }) => ({
    song: selectSelectedSong(state, player),
    isConfirmed: selectSongIsConfirmed(state, player),
    isAlreadyChosen: selectSongIsAlreadyChosen(state, player),
  }),
  (dispatch, { player }) => ({
    onConfirm: () => dispatch(confirmSelectedSong({ player })),
    onCancel: () => dispatch(cancelSelectedSong({ player })),
  })
)(SelectedSongView);

export default SelectedSong;
