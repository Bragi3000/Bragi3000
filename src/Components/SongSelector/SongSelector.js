import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchSong } from "Services/Spotify/spotifyAPI";
import useSpotifyAuthData from "Store/selectors/useSpotifyAuthData";
import {
  cancelSelectedSong,
  confirmSelectedSong,
  selectSelectedSong,
  selectSongIsAlreadyChosen,
  selectSongIsConfirmed,
  setSelectedSong,
} from "Store/slices/selectedSongs";
import SearchFormView from "./SearchFormView";
import SearchResultsView from "./SearchResultsView";
import SelectedSongView from "./SelectedSongView";
import styles from "./SongSelector.module.css";

const defaultSearchQuery = window.atob(
  "YXJ0aXN0OlJpY2sgQXN0bGV5IGFsYnVtOldoZW5ldmVyIFlvdSBOZWVkIFNvbWVib2R5IHRyYWNrOk5ldmVyIEdvbm5hIEdpdmUgWW91IFVw"
);

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

  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = (query) => {
    searchSong(access_token, query || defaultSearchQuery).then((data) => {
      if (data.statusCode === 200) setSearchResults(data.body.tracks.items);
    });
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
            songs={searchResults}
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
