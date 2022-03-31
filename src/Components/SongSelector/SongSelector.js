import SearchFormView from "./SearchFormView";
import SearchResultsView from "./SearchResultsView";
import SelectedSongView from "./SelectedSongView";

const SongSelector = function () {
  return (
    <>
      <SearchFormView />
      <SearchResultsView />
      <SelectedSongView />
    </>
  );
};

export default SongSelector;
