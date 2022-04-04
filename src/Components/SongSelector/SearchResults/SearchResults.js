import { connect } from "react-redux";
import { setSelectedSong } from "Store/slices/selectedSongs";
import { selectSearchResults } from "Store/slices/songSearch";
import SearchResultsView from "./SearchResultsView";

/**
 * Component showing song results after a search.
 * Presenter for {@link SearchResultsView}, wiring it to the store.
 * @param props.player The player for whom the component is
 */
const SearchResults = connect(
  (state, { player }) => ({
    songs: selectSearchResults(state, player).songs,
  }),
  (dispatch, { player }) => ({
    onSelectSong: (song) => dispatch(setSelectedSong({ player, song })),
  })
)(SearchResultsView);

export default SearchResults;
