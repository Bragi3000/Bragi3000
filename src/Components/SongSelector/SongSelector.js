import { useState } from "react";
import { searchSong } from "Services/Spotify/spotifyAPI";
import useSpotifyAuthData from "Store/selectors/useSpotifyAuthData";
import SearchFormView from "./SearchFormView";
import SearchResultsView from "./SearchResultsView";
import SelectedSongView from "./SelectedSongView";
import styles from "./SongSelector.module.css";

const SongSelector = function () {
  const { access_token } = useSpotifyAuthData();

  const [searchResults, setSearchResults] = useState([]);
  const [selectedSong, setSelectedSong] = useState(null);
  const [songConfirmed, setSongConfirmed] = useState(false);

  const handleSearch = (query) => {
    query = query ? query : "Never Gonna Give You Up Rick Astley";
    searchSong(access_token, query).then((data) => {
      if (data.statusCode === 200) setSearchResults(data.body.tracks.items);
    });
  };

  const handleSelectSong = (song) => {
    setSelectedSong(song);
  };

  const handleConfirmSong = () => {
    setSongConfirmed(true);
  }

  const handleCancelSong = () => {
    setSelectedSong(null);
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
          onConfirm={handleConfirmSong}
          onCancel={handleCancelSong}
        />
      )}
    </div>
  );
};

export default SongSelector;
