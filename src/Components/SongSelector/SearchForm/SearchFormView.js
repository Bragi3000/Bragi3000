import { useRef } from "react";

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
    <form className="flex mb-3 px-3 space-x-3" onSubmit={handleSubmit}>
      <input
        className="flex-auto bg-transparent border-0 border-b-2 border-gray-400 focus:ring-0 focus:border-gray-100 px-0.5 placeholder:text-gray-400"
        type="text"
        placeholder="Song or artist"
        defaultValue={query}
        ref={queryElement}
        onChange={handleChange}
      />
      <button className="text-green-400 hover:underline">Search!</button>
    </form>
  );
};

export default SearchFormView;
