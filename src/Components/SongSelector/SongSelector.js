import { useDispatch, useSelector } from "react-redux";
import useSpotifyAuthData from "Store/selectors/useSpotifyAuthData";
import {
  cancelSelectedSong,
  confirmSelectedSong,
  selectSelectedSong,
  selectSongIsAlreadyChosen,
  selectSongIsConfirmed,
  setSelectedSong,
} from "Store/slices/selectedSongs";
import {
  fetchSearchResults,
  selectSearchResults,
  setSearchQuery,
} from "Store/slices/songSearch";
import SearchFormView from "./SearchFormView";
import SearchResultsView from "./SearchResultsView";
import SelectedSongView from "./SelectedSongView";
import styles from "./SongSelector.module.css";

const SongSelector = function ({ player }) {
  const { access_token } = useSpotifyAuthData();

  const dispatch = useDispatch();

  const selectedSong = useSelector((state) =>
    selectSelectedSong(state, player)
  );

  const songConfirmed = useSelector((state) =>
    selectSongIsConfirmed(state, player)
  );

  const songIsAlreadyChosen = useSelector((state) =>
    selectSongIsAlreadyChosen(state, player)
  );

  const searchResults = useSelector((state) =>
    selectSearchResults(state, player)
  );

  const handleSearch = (query) => {
    dispatch(setSearchQuery({ player, query }));
    dispatch(fetchSearchResults({ player, access_token }));
  };

  const handleSelectSong = (song) => {
    dispatch(setSelectedSong({ player, song }));
  };

  const handleConfirmSong = () => {
    dispatch(confirmSelectedSong({ player }));
  };

  const handleCancelSong = () => {
    dispatch(cancelSelectedSong({ player }));
  };

  return (
    <div className={styles.holder}>
      {!selectedSong ? (
        <>
          <SearchFormView onSearch={handleSearch} />
          <SearchResultsView
            songs={searchResults.songs}
            onSelectSong={handleSelectSong}
          />
        </>
      ) : (
        <SelectedSongView
          song={selectedSong}
          isConfirmed={songConfirmed}
          isAlreadyChosen={songIsAlreadyChosen}
          onConfirm={handleConfirmSong}
          onCancel={handleCancelSong}
        />
      )}
    </div>
  );
};

export default SongSelector;
