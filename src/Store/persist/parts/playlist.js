import { set } from "firebase/database";
import {setBannedSongs} from "Store/slices/playlist";
import {setPlayedSongs} from "Store/slices/playback";

function arrayEquals(a, b) {
  return Array.isArray(a) &&
    Array.isArray(b) &&
    a.length === b.length &&
    a.every((val, index) => val === b[index]);
}

const toFirebase = function (state, prevState, dbRef) {
  const bannedSongs = state.playlist.bannedSongs;
  const playedSongs = state.playback.playedSongs;

  if (!arrayEquals(bannedSongs, prevState.playlist.bannedSongs) ||
  !arrayEquals(playedSongs, prevState.playback.playedSongs)) {
    set(dbRef, {
      bannedSongs,
      playedSongs,
    });
  }
};

const fromFirebase = function (state, dispatch, data) {
  if (
    data &&
    data.bannedSongs &&
    data.playedSongs &&
    (!arrayEquals(state.playlist.bannedSongs, data.bannedSongs) ||
    !arrayEquals(state.playback.playedSongs, data.playedSongs))) {
    dispatch(setBannedSongs(data.bannedSongs));
    dispatch(setPlayedSongs(data.playedSongs));
  }
};

const persistPlaylist = {
  toFirebase,
  fromFirebase,
};

export default persistPlaylist;
