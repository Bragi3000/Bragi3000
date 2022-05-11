import { LEFT_PLAYER } from "Constants/players";
import SearchForm from "./SearchForm/SearchForm";
import SearchResults from "./SearchResults/SearchResults";
import SelectedSong from "./SelectedSong/SelectedSong";
import cx from "Utils/classNames";
import PopoverHelp from "../PopoverHelp/PopoverHelp";
import songSearchPlayer1 from "Assets/images/songsearchPlayer1.gif";
import songSearchPlayer2 from "Assets/images/songsearchPlayer2.gif";
import {
  HELP_SONG_SELECT_LEFT,
  HELP_SONG_SELECT_RIGHT,
} from "Constants/helpPopovers";

/**
 * View that allows the user to search for and select songs.
 * @param props.player The player for whom the component is
 * @param props.selectedSong The currently selected song (if any)
 * @param props.accessToken The Spotify Access token
 */
const SongSelectorView = function ({ player, selectedSong, accessToken }) {
  return (
    <PopoverHelp
      name={
        player === LEFT_PLAYER ? HELP_SONG_SELECT_LEFT : HELP_SONG_SELECT_RIGHT
      }
      helperHeading={"Song Selector"}
      helperText={
        "Search your song by entering the title or artist and remember to confirm your song."
      }
      helperImg={player === LEFT_PLAYER ? songSearchPlayer1 : songSearchPlayer2}
    >
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
            <SearchForm player={player} accessToken={accessToken} />
            <SearchResults player={player} />
          </>
        ) : (
          <SelectedSong player={player} />
        )}
      </div>
    </PopoverHelp>
  );
};

export default SongSelectorView;
