import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import { LEFT_PLAYER, RIGHT_PLAYER } from "Constants/players";
import { FULFILLED, IDLE, PENDING, REJECTED } from "Constants/promiseStatus";
import { searchSong } from "Services/Spotify/spotifyAPI";

export const fetchSearchResults = createAsyncThunk(
  "songSearch/fetchSearchResults",
  ({ player, accessToken }, { getState }) =>
    searchSong(accessToken, getState().songSearch[player].query)
);

const initialState = {
  [LEFT_PLAYER]: {
    query: "",
    status: IDLE,
    requestId: null,
    songs: [],
    error: "",
  },
  [RIGHT_PLAYER]: {
    query: "",
    status: IDLE,
    requestId: null,
    songs: [],
    error: "",
  },
};

const songSearchSlice = createSlice({
  name: "songSearch",
  initialState,
  reducers: {
    setSearchQuery: (state, { payload: { player, query } }) => {
      state[player].query = query;
    },
    resetSearch: () => initialState,
  },
  extraReducers: {
    [fetchSearchResults.pending]: (state, { meta }) => {
      state[meta.arg.player].status = PENDING;
      state[meta.arg.player].requestId = meta.requestId;
    },
    [fetchSearchResults.fulfilled]: (state, { payload, meta }) => {
      if (state[meta.arg.player].requestId === meta.requestId) {
        state[meta.arg.player].status = FULFILLED;
        state[meta.arg.player].songs = payload;
      }
    },
    [fetchSearchResults.rejected]: (state, { error, meta }) => {
      if (state[meta.arg.player].requestId === meta.requestId) {
        state[meta.arg.player].status = REJECTED;
        state[meta.arg.player].error = error.message;
      }
    },
  },
});

export const { setSearchQuery, resetSearch } = songSearchSlice.actions;

export default songSearchSlice.reducer;

const selectPlayer = (state, player) => state.songSearch[player];

export const selectSearchQuery = createSelector(
  selectPlayer,
  (player) => player.query
);

export const selectSearchResults = createSelector(
  selectPlayer,
  ({ status, songs, error }) => ({ status, songs, error })
);
