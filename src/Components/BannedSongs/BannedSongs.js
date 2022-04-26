import SearchResultsView from "Components/SongSelector/SearchResults/SearchResultsView";
import { connect } from "react-redux";
import {selectBannedSongs} from "Store/slices/playlist";

/**
 * Component showing banned songs
 * Presenter for showing banned songs using {@link SearchResultsView}, wiring it to the store.
 */
const BannedSongs = connect(
  (state) => ({
    songs: selectBannedSongs(state),
  }),
)(SearchResultsView);

export default BannedSongs;
