import useSpotifyAuthData from "Store/selectors/useSpotifyAuthData";
import SearchForm from "./SearchForm/SearchForm";
import SearchResults from "./SearchResults/SearchResults";
import SelectedSong from "./SelectedSong/SelectedSong";
import styles from "./SongSelector.module.css";

/**
 * View that allows the user to search for and select songs.
 * @param props.player The player for whom the component is
 * @param props.selectedSong The currently selected song (if any)
 */
const SongSelectorView = function ({ player, selectedSong }) {
  // TODO: Should not be in the view (authData should be changed to redux slice)
  const { access_token } = useSpotifyAuthData();

  return (
    <div className={styles.holder}>
      {!selectedSong ? (
        <>
          <SearchForm player={player} accessToken={access_token} />
          <SearchResults player={player} />
        </>
      ) : (
        <SelectedSong player={player} />
      )}
    </div>
  );
};

export default SongSelectorView;
