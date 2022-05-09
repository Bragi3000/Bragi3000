import BannedSongsView from "./BannedSongsView";
import {selectBannedSongs} from "Store/slices/playlist";
import {useSelector} from "react-redux";

/**
 * Component that displays the playlist of the game.
 */
const BannedSongs = function () {
  const bannedSongs = useSelector(state => selectBannedSongs(state));
  return <BannedSongsView songs={bannedSongs}/>
}

export default BannedSongs;
