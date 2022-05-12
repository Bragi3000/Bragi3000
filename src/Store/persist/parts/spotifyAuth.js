import { get, onValue, set } from "firebase/database";
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

const snapshotDataToStore = async function (state, dispatch, data) {
  if (data?.accessToken && state.spotifyAuth.accessToken !== data.accessToken) {
    dispatch(setSpotifyAuthData(data.accessToken, data.expireStamp));
  }
};

const fromFirebaseOnce = async function (state, dispatch, dbRef) {
  const snapshot = await get(dbRef);
  await snapshotDataToStore(state, dispatch, snapshot.val());
};

const fromFirebaseSub = function (state, dispatch, dbRef) {
  return onValue(dbRef, (snapshot) => {
    snapshotDataToStore(state, dispatch, snapshot.val());
  });
};

const persistSpotifyAuth = {
  toFirebase,
  fromFirebaseOnce,
  fromFirebaseSub,
};

export default persistSpotifyAuth;
