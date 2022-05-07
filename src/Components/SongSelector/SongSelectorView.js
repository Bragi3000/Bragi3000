import {LEFT_PLAYER} from "Constants/players";
import useSpotifyAuthData from "Store/selectors/useSpotifyAuthData";
import SearchForm from "./SearchForm/SearchForm";
import SearchResults from "./SearchResults/SearchResults";
import SelectedSong from "./SelectedSong/SelectedSong";
import cx from "Utils/classNames";
import PopoverHelp from "../PopoverHelp/PopoverHelp";
import songsearch from "Assets/images/songsearch.gif";

/**
 * View that allows the user to search for and select songs.
 * @param props.player The player for whom the component is
 * @param props.selectedSong The currently selected song (if any)
 */
const SongSelectorView = function ({player, selectedSong}) {
  // TODO: Should not be in the view (authData should be changed to redux slice)
  const {access_token} = useSpotifyAuthData();

  return (
    <PopoverHelp number={player === LEFT_PLAYER ? 4 : 5} helperText={"This is the album cover"} helperImg={songsearch} horizontal={"right"} vertical={"bottom"}>
      <div className="bg-gray-900 w-80 flex-none h-128 flex flex-col">
        <h1
          className={cx([
            "text-2xl m-3 flex-none",
            player === LEFT_PLAYER ? "text-right" : "text-left",
          ])}
        >
          {player === LEFT_PLAYER ? "Player 1" : "Player 2"}
        </h1>
        {!selectedSong ? (
          <>
            <SearchForm player={player} accessToken={access_token}/>
            <SearchResults player={player}/>
          </>
        ) : (
          <SelectedSong player={player}/>
        )}
      </div>
    </PopoverHelp>
  );
};

export default SongSelectorView;
