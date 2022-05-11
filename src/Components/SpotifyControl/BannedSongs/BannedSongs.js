import BannedSongsView from "./BannedSongsView";
import { selectBannedSongs } from "Store/slices/playlist";
import { connect } from "react-redux";

/**
 * Component that displays the banned songs.
 */
const BannedSongs = connect((state) => ({
  songs: selectBannedSongs(state),
}))(BannedSongsView);

export default BannedSongs;
