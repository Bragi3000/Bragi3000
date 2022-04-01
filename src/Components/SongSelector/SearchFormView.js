import { useRef } from "react";
import styles from "./SongSelector.module.css";

const SearchFormView = function ({
  onQueryChange = (query) => {},
  onSearch = (query) => {},
}) {
  const query = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query.current.value);
  };

  const handleChange = (e) => {
    onQueryChange(e.target.value);
  };

  return (
    <form className={styles.searchForm} onSubmit={handleSubmit}>
      <input type="text" placeholder="Search song" ref={query} onChange={handleChange} />
      <input type="submit" value="Search!" />
    </form>
  );
};

export default SearchFormView;
