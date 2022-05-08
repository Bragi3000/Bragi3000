import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import { LEFT_PLAYER, RIGHT_PLAYER } from "Constants/players";
import { FULFILLED, IDLE, PENDING, REJECTED } from "Constants/promiseStatus";
import { searchSong } from "Services/Spotify/spotifyAPI";

/**
 * Action to fetch search results for the current query and store them
 * @param obj.player Player to fetch results for
 * @param obj.accessToken Spotify access token
 */
export const fetchSearchResults = createAsyncThunk(
  "songSearch/fetchSearchResults",
  ({ player, accessToken }, { getState }) =>
    searchSong(accessToken, getState().songSearch[player].query)
);

/**
 * Initial state for {@link songSearchSlice}
 */
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

/**
 * Slice for song searching, containing logic for reducers and actions
 */
const songSearchSlice = createSlice({
  name: "songSearch",
  initialState,
  reducers: {
    /**
     * Action & reducer to set the current search query
     * @param obj.player Player to set the query for
     * @param obj.query The query to set
     */
    setSearchQuery: (state, { payload: { player, query } }) => {
      state[player].query = query;
    },
    /**
     * Action & reducer action to reset the slice
     */
    resetSearch: () => initialState,
  },
  extraReducers: {
    /**
     * Reducer for a newly pending search result request
     */
    [fetchSearchResults.pending]: (state, { meta }) => {
      state[meta.arg.player].status = PENDING;
      state[meta.arg.player].requestId = meta.requestId;
    },
    /**
     * Reducer for a newly fulfilled search result request
     */
    [fetchSearchResults.fulfilled]: (state, { payload, meta }) => {
      if (state[meta.arg.player].requestId === meta.requestId) {
        state[meta.arg.player].status = FULFILLED;
        state[meta.arg.player].songs = payload;
      }
    },
    /**
     * Reducer for a newly rejected search result request
     */
    [fetchSearchResults.rejected]: (state, { error, meta }) => {
      if (state[meta.arg.player].requestId === meta.requestId) {
        state[meta.arg.player].status = REJECTED;
        state[meta.arg.player].error = error.message;
      }
    },
    RESET: () => initialState,
  },
});

export const { setSearchQuery, resetSearch } = songSearchSlice.actions;

export default songSearchSlice.reducer;

const selectPlayer = (state, player) => state.songSearch[player];

/**
 * Selector for the search query of a player
 * @param state The state of the complete store
 * @param player The player to get the query for
 */
export const selectSearchQuery = createSelector(
  selectPlayer,
  (player) => player.query
);

/**
 * Selector for the search results of a player
 * @param state The state of the complete store
 * @param player The player to get the results for
 */
export const selectSearchResults = createSelector(
  selectPlayer,
  ({ status, songs, error }) => ({ status, songs, error })
);
