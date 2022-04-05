import { connect } from "react-redux";
import {
  fetchSearchResults,
  selectSearchQuery,
  setSearchQuery,
} from "Store/slices/songSearch";
import SearchFormView from "./SearchFormView";

/**
 * Component showing a search form for songs.
 * Presenter for {@link SearchFormView}, wiring it to the store.
 * @param props.player The player for whom the component is
 * @param props.accessToken Spotify access token
 */
const SearchForm = connect(
  (state, { player }) => ({
    query: selectSearchQuery(state, player),
  }),
  (dispatch, { player, accessToken }) => ({
    onQueryChange: (query) => {
      dispatch(setSearchQuery({ player, query }));
    },
    onSearch: (query) => {
      dispatch(setSearchQuery({ player, query }));
      dispatch(fetchSearchResults({ player, accessToken }));
    },
  })
)(SearchFormView);

export default SearchForm;
