import {
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";

/**
 * Initial state for {@link playlist}
 */
const initialState = {
  playlistId: null,
  playlistSongs: []
};

/**
 * Slice for interacting with the playlist state
 */
const playlist= createSlice({
  name: "playlist",
  initialState,
  reducers: {
    /**
     *  Action & reducer to set the playlist id
     * @param state - The current state of the store
     * @param action - The action to be performed
     */
    setPlaylistId: (state, action) => ({
      ...state,
      playlistId: action.payload
    }),
    /**
     *  Action & reducer to set the playlist songs
     * @param state - The current state of the store
     * @param action - The action to be performed
     */
    setPlaylistSongs: (state, action) => ({
      ...state,
      playlistSongs: action.payload
    })
  },
});

export const { setPlaylistId, setPlaylistSongs } = playlist.actions;
export default playlist.reducer;

/**
 * Selector for the playlist id
 */
export const selectPlaylistId = state => state.playlist.playlistId;

/**
 * Selector for the playlist songs
 */
export const selectPlaylistSongs = state => state.playlist.playlistSongs;
