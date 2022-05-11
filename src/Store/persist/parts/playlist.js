import { set } from "firebase/database";
import {setBannedSongs} from "Store/slices/playlist";

function arrayEquals(a, b) {
  return Array.isArray(a) &&
    Array.isArray(b) &&
    a.length === b.length &&
    a.every((val, index) => val === b[index]);
}

const toFirebase = function (state, prevState, dbRef) {
  const bannedSongs = state.playlist.bannedSongs;

  if (!arrayEquals(bannedSongs, prevState.playlist.bannedSongs)) {
    set(dbRef, {
      bannedSongs,
    });
  }
};

const fromFirebase = function (state, dispatch, data) {
  if (
    data &&
    data.bannedSongs &&
    !arrayEquals(state.playlist.bannedSongs, data.bannedSongs)) {
    dispatch(setBannedSongs(data.bannedSongs));
  }
};

const persistPlaylist = {
  toFirebase,
  fromFirebase,
};

export default persistPlaylist;
