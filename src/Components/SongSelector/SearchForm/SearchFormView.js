import { useRef } from "react";
import styles from "../SongSelector.module.css";

/**
 * View showing a search form for songs.
 * @param props.query The current search query
 * @param props.onQueryChange Event that fires when the search query changes
 * @param props.onSearch Event that fires when the search button is clicked
 */
const SearchFormView = function ({
  query = "",
  onQueryChange = (query) => {},
  onSearch = (query) => {},
}) {
  const queryElement = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(queryElement.current.value);
  };

  const handleChange = (e) => {
    onQueryChange(e.target.value);
  };

  return (
    <form className={styles.searchForm} onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search song"
        value={query}
        ref={queryElement}
        onChange={handleChange}
      />
      <input type="submit" value="Search!" />
    </form>
  );
};

export default SearchFormView;
