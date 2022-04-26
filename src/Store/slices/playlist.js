import {
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import {getPlaylistId, getPlaylistSongs} from "Services/Spotify/spotifyAPI";
import {FULFILLED, IDLE, PENDING, REJECTED} from "Constants/promiseStatus";

/**
 * Action to fetch the playlistId and start the playlist
 * @param obj.accessToken Spotify access token
 */
export const fetchPlaylistId = createAsyncThunk(
  "playlist/fetchPlaylistId",
  ({accessToken}, {getState}) =>
    getPlaylistId(accessToken)
);

/**
 * Action to fetch the songs from the playlist
 * @param obj.accessToken Spotify access token
 */
export const fetchPlaylistSongs = createAsyncThunk(
  "playlist/fetchPlaylistSongs",
  ({accessToken}, {getState}) => {
    const playlistId = getState().playlist.playlistId;
    return getPlaylistSongs(accessToken, playlistId);
  }
);

/**
 * Initial state for {@link playlist}
 */
const initialState = {
  playlistId: null,
  playlistSongs: [],
  bannedSongs: [],
  status: IDLE,
  requestId: null,
  error: "",
  idStatus: IDLE,
  idRequestId: null,
  idError: ""
};

/**
 * Slice for interacting with the playlist state
 */
const playlist = createSlice({
  name: "playlist",
  initialState,
  reducers: {
    /**
     *  Action & reducer to set the playlist id
     * @param state - The current state of the store
     * @param payload - The playlistId to be set
     */
    setPlaylistId: (state, {payload}) => {
      state.playlistId = payload;
    },
    /**
     *  Action & reducer to set the playlist songs
     * @param state - The current state of the store
     * @param payload - The songs to be set
     */
    setPlaylistSongs: (state, {payload}) => {
      state.playlistSongs = payload;
    },

    /**
     * Action & reducer to append the banned songs
     * @param state - The current state of the store
     * @param payload - The songs to be set
     */
    appendBannedSongs: (state, {payload}) => {
      state.bannedSongs = [...state.bannedSongs, payload];
    }

  },
  extraReducers: {
    /**
     * Reducer for a newly pending playlist fetch
     */
    [fetchPlaylistSongs.pending]: (state, {meta}) => {
      state.status = PENDING;
      state.requestId = meta.requestId;
    },
    /**
     * Reducer for a newly fulfilled playlist fetch
     */
    [fetchPlaylistSongs.fulfilled]: (state, {payload, meta}) => {
      if (state.requestId === meta.requestId) {
        state.status = FULFILLED;
        state.playlistSongs = payload;
      }
    },
    /**
     * Reducer for a newly rejected playlist fetch
     */
    [fetchPlaylistSongs.rejected]: (state, {error, meta}) => {
      if (state.requestId === meta.requestId) {
        state.status = REJECTED;
        state.error = error.message;
      }
    },
    /**
     * Reducer for a newly pending playlistId fetch
     */
    [fetchPlaylistId.pending]: (state, {meta}) => {
      state.idStatus = PENDING;
      state.idRequestId = meta.requestId;
    },
    /**
     * Reducer for a newly fulfilled playlistId fetch
     */
    [fetchPlaylistId.fulfilled]: (state, {payload, meta}) => {
      if (state.idRequestId === meta.requestId) {
        state.idStatus = FULFILLED;
        state.playlistId = payload;
      }
    },
    /**
     * Reducer for a newly rejected playlistId fetch
     */
    [fetchPlaylistId.rejected]: (state, {error, meta}) => {
      if (state.idRequestId === meta.requestId) {
        state.idStatus = REJECTED;
        state.idError = error.message;
      }
    },
  },
});

export const {setPlaylistId, setPlaylistSongs} = playlist.actions;
export default playlist.reducer;

/**
 * Selector for the playlist id
 */
export const selectPlaylistId = state => state.playlist.playlistId;

/**
 * Selector for the playlist songs which are not played yet
 */
export const selectPlaylistSongs = state => {
  return state.playlist.playlistSongs.filter(song => !state.playback.playedSongs.includes(song.uri));
}

/**
 * Selector for playlist banned songs
 */
export const selectBannedSongs = state => state.playlist.bannedSongs;

