import { connect } from "react-redux";
import { selectSelectedSong } from "Store/slices/selectedSongs";
import SongSelectorView from "./SongSelectorView";

/**
 * Component that allows the user to search for and select songs.
 * Presenter for {@link SongSelectorView}, wiring it to the store.
 * @param props.player The player for whom the component is
 * @param props.selectedSong The currently selected song (if any)
 */
const SongSelector = connect((state, { player }) => ({
  selectedSong: selectSelectedSong(state, player),
}))(SongSelectorView);

export default SongSelector;
