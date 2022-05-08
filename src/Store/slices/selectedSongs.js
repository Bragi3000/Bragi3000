import { createSelector, createSlice } from "@reduxjs/toolkit";

import { LEFT_PLAYER, RIGHT_PLAYER } from "Constants/players";

/**
 * Initial state for {@link selectedSongsSlice}
 */
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

/**
 * Slice for selecting player songs, containing logic for reducers and actions
 */
const selectedSongsSlice = createSlice({
  name: "selectedSongs",
  initialState,
  reducers: {
    /**
     * Action & reducer to select a song for a player
     * @param obj.player The player to select the song for
     * @param obj.song The song to select
     */
    setSelectedSong: (state, { payload: { player, song } }) => ({
      ...state,
      [player]: {
        song,
        confirmed: false,
      },
    }),
    /**
     * Action & reducer to confirm the selected song
     * @param obj.player Player to confirm the song for
     */
    confirmSelectedSong: (state, { payload: { player } }) => ({
      ...state,
      [player]: {
        ...state[player],
        confirmed: true,
      },
    }),
    /**
     * Action & reducer to unset the selected song
     * @param obj.player Player to unset the song for
     */
    cancelSelectedSong: (state, { payload: { player } }) => ({
      ...state,
      [player]: initialState[player],
    }),
    /**
     * Action & reducer to reset the slice
     */
    resetSelectedSongs: () => initialState,
  },
  extraReducers: {
    RESET: () => initialState,
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

/**
 * Selector for the selected song of a player
 * @param state The state of the complete store
 * @param player The player to get the selected song for
 */
export const selectSelectedSong = createSelector(
  selectPlayer,
  (player) => player.song
);

/**
 * Selector for whether the song of a player is confirmed
 * @param state The state of the complete store
 * @param player The player to get the confirmation status for
 */
export const selectSongIsConfirmed = createSelector(
  selectPlayer,
  (player) => player.confirmed
);

/**
 * Selector for whether the song of a player is already confirmed by the other
 * @param state The state of the complete store
 * @param player The player to check the song for
 */
export const selectSongIsAlreadyChosen = createSelector(
  selectPlayer,
  selectOtherPlayer,
  (player, otherPlayer) =>
    otherPlayer.confirmed && player?.song?.id === otherPlayer?.song?.id
);
