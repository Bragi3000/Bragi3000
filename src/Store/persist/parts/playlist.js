import { set } from "firebase/database";
import {setBannedSongs, setPlaylistId} from "Store/slices/playlist";

function arrayEquals(a, b) {
  return Array.isArray(a) &&
    Array.isArray(b) &&
    a.length === b.length &&
    a.every((val, index) => val === b[index]);
}

const toFirebase = function (state, prevState, dbRef) {
  const playlistId = state.playlist.playlistId;
  const bannedSongs = state.playlist.bannedSongs;

  if (playlistId !== prevState.playlist.playlistId ||
    (!arrayEquals(bannedSongs, prevState.playlist.bannedSongs))) {
    set(dbRef, {
      playlistId,
      bannedSongs,
    });
  }
};

const fromFirebase = function (state, dispatch, data) {
  if (
    data &&
    data.playlistId &&
    data.bannedSongs &&
    state.playlist.playlistId !== data.playlistId &&
    !arrayEquals(state.playlist.bannedSongs, data.bannedSongs)) {
    dispatch(setPlaylistId(data.playlistId));
    dispatch(setBannedSongs(data.bannedSongs));
  }
};

const persistPlaylist = {
  toFirebase,
  fromFirebase,
};

export default persistPlaylist;
