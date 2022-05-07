import { connect } from "react-redux";
import { selectSelectedSong } from "Store/slices/selectedSongs";
import { selectSpotifyAccessToken } from "Store/slices/spotifyAuth";
import SongSelectorView from "./SongSelectorView";

/**
 * Component that allows the user to search for and select songs.
 * Presenter for {@link SongSelectorView}, wiring it to the store.
 * @param props.player The player for whom the component is
 * @param props.selectedSong The currently selected song (if any)
 */
const SongSelector = connect((state, { player }) => ({
  selectedSong: selectSelectedSong(state, player),
  accessToken: selectSpotifyAccessToken(state),
}))(SongSelectorView);

export default SongSelector;
