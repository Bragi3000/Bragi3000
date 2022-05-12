import { child, get, onValue, set } from "firebase/database";
import { selectBannedSongs, setBannedSongs } from "Store/slices/playlist";
import { setPlayedSongs } from "Store/slices/playback";

function arrayEquals(a, b) {
  return (
    Array.isArray(a) &&
    Array.isArray(b) &&
    a.length === b.length &&
    a.every((val, index) => val === b[index])
  );
}

const toFirebase = function (state, prevState, dbRef) {
  const bannedSongs = state.playlist.bannedSongs;
  const bannedSongsPrev = prevState.playlist.bannedSongs;
  const playedSongs = state.playback.playedSongs;
  const playedSongsPrev = prevState.playback.playedSongs;

  if (
    bannedSongs !== bannedSongsPrev &&
    !arrayEquals(bannedSongs, bannedSongsPrev)
  ) {
    set(child(dbRef, "bannedSongs"), bannedSongs);
  }

  if (
    playedSongs !== playedSongsPrev &&
    !arrayEquals(playedSongs, playedSongsPrev)
  ) {
    set(child(dbRef, "playedSongs"), playedSongs);
  }
};

const fromFirebaseOnce = async function (_, dispatch, dbRef) {
  const snapshot = await get(dbRef);
  const data = snapshot.val();

  if (data?.bannedSongs) dispatch(setBannedSongs(data.bannedSongs));
  if (data?.playedSongs) dispatch(setPlayedSongs(data.playedSongs));
};

const fromFirebaseSub = function (state, dispatch, dbRef) {
  return onValue(dbRef, (snapshot) => {
    const data = snapshot.val();

    if (
      data?.bannedSongs &&
      !arrayEquals(data.bannedSongs, selectBannedSongs(state))
    ) {
      dispatch(setBannedSongs(data.bannedSongs));
    }

    if (
      data?.playedSongs &&
      !arrayEquals(data.playedSongs, state.playback.playedSongs)
    ) {
      dispatch(setPlayedSongs(data.playedSongs));
    }
  });
};

const persistPlaylist = {
  toFirebase,
  fromFirebaseOnce,
  fromFirebaseSub,
};

export default persistPlaylist;
