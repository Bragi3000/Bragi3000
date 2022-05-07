import { useDispatch, useSelector } from "react-redux";
import { endGame } from "Store/slices/game";
import { selectSpotifyAccessToken } from "Store/slices/spotifyAuth";
import MiniGameView from "./MiniGameView";

/**
 * Component that wraps the minigame, handling app-wide events.
 * @returns The presenter for the component
 */
const MiniGame = function () {
  const dispatch = useDispatch();
  const accessToken = useSelector(selectSpotifyAccessToken);

  const handleWin = (winner) => {
    dispatch(endGame({ winner, accessToken }));
  };

  return <MiniGameView onWin={handleWin} />;
};

export default MiniGame;
