import { useRef } from "react";

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
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Search song" ref={query} onChange={handleChange} />
      <input type="submit" value="Search!" />
    </form>
  );
};

export default SearchFormView;
