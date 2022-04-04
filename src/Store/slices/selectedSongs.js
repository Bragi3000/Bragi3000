import { createSelector, createSlice } from "@reduxjs/toolkit";

import { LEFT_PLAYER, RIGHT_PLAYER } from "Constants/players";

const initialState = {
  [LEFT_PLAYER]: {
    song: null,
    confirmed: false,
  },
  [RIGHT_PLAYER]: {
    song: null,
    confirmed: false,
  },
};

const selectedSongsSlice = createSlice({
  name: "selectedSongs",
  initialState,
  reducers: {
    setSelectedSong: (state, { payload: { player, song } }) => ({
      ...state,
      [player]: {
        song,
        confirmed: false,
      },
    }),
    confirmSelectedSong: (state, { payload: { player } }) => ({
      ...state,
      [player]: {
        ...state[player],
        confirmed: true,
      },
    }),
    cancelSelectedSong: (state, { payload: { player } }) => ({
      ...state,
      [player]: initialState[player],
    }),
    resetSelectedSongs: () => initialState,
  },
});

export const {
  setSelectedSong,
  confirmSelectedSong,
  cancelSelectedSong,
  resetSelectedSongs,
} = selectedSongsSlice.actions;

export default selectedSongsSlice.reducer;

const selectPlayer = (state, player) => state.selectedSongs[player];
const selectOtherPlayer = (state, player) =>
  state.selectedSongs[player === LEFT_PLAYER ? RIGHT_PLAYER : LEFT_PLAYER];

export const selectSelectedSong = createSelector(
  selectPlayer,
  (player) => player.song
);

export const selectSongIsConfirmed = createSelector(
  selectPlayer,
  (player) => player.confirmed
);

export const selectSongIsAlreadyChosen = createSelector(
  selectPlayer,
  selectOtherPlayer,
  (player, otherPlayer) =>
    otherPlayer.confirmed && player?.song?.id === otherPlayer?.song?.id
);
