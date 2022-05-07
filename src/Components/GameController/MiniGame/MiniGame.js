import { useDispatch } from "react-redux";
import useSpotifyAuthData from "Store/selectors/useSpotifyAuthData";
import { endGame } from "Store/slices/game";
import MiniGameView from "./MiniGameView";

const MiniGame = function () {
  const dispatch = useDispatch();
  const { access_token: accessToken } = useSpotifyAuthData();

  const handleWin = (winner) => {
    dispatch(endGame({ winner, accessToken }));
  };

  return <MiniGameView onWin={handleWin} />;
};

export default MiniGame;
