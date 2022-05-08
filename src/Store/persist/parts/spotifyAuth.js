import { set } from "firebase/database";
import { setSpotifyAuthData } from "Store/slices/spotifyAuth";

const toFirebase = function (state, prevState, dbRef) {
  const accessToken = state.spotifyAuth.accessToken;

  if (accessToken !== prevState.spotifyAuth.accessToken) {
    set(dbRef, {
      accessToken,
      expireStamp: state.spotifyAuth.expireStamp || 0,
    });
  }
};

const fromFirebase = function (state, dispatch, data) {
  if (
    data &&
    data.accessToken &&
    state.spotifyAuth.accessToken !== data.accessToken
  ) {
    dispatch(setSpotifyAuthData(data.accessToken, data.expireStamp));
  }
};

const persistSpotifyAuth = {
  toFirebase,
  fromFirebase,
};

export default persistSpotifyAuth;
