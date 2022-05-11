import bragiIcon from "Assets/images/bragi-icon.png"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {getPlaybackState} from "Services/Spotify/spotifyAPI";
import { FULFILLED, IDLE, PENDING, REJECTED} from "Constants/promiseStatus";

/**
 * Action to fetch the current playback state
 * @param obj.accessToken Spotify access token
 */
export const fetchPlaybackState = createAsyncThunk(
  "playback/fetchPlaybackState",
  ({ accessToken }, {getState}) =>
    getPlaybackState(accessToken)
);

/**
 * Initial state for {@link playback}
 */
const initialState = {
  image_src: bragiIcon,
  name: "Bragi",
  artists: "3000",
  uri: null,
  is_playing: false,
  progress_ms: 0,
  duration_ms: 0,
  status: IDLE,
  requestId: null,
  error: "",
  started_playlist: false,
  playedSongs: [],
};

/**
 * Slice for the playback state
 */
const playback = createSlice({
  name: "playback",
  initialState,
  reducers: {
    /**
     * Action & reducer to toggle between playing and paused
     */
    togglePlayPause: (state, action) => {
      state.is_playing = !state.is_playing;
    },
    /**
     * Action & reducer to reset the playback state
     */
    resetPlaybackState: () => initialState,
    /**
     * Action & reducer to set if the bragi3000 playlist was started
     */
    setStartedPlaylist: (state, action) => {
      state.started_playlist = action.payload;
    },
    /**
     * Action & reducer to set the played songs.
     */
    setPlayedSongs: (state, action) => {
      state.playedSongs = action.payload;
    },
  },
  extraReducers: {
    /**
     * Reducer for a newly pending playback request
     */
    [fetchPlaybackState.pending]: (state, { meta }) => {
      state.status = PENDING;
      state.requestId = meta.requestId;
    },
    /**
     * Reducer for a newly fulfilled playback request
     */
    [fetchPlaybackState.fulfilled]: (state, { payload, meta }) => {
      if (state.requestId === meta.requestId) {
        state.status = FULFILLED;
        if (payload.statusCode === 200 && payload.body.item) {
          state.image_src=payload.body.item.album.images[0].url;
          state.name=payload.body.item.name;
          state.artists=payload.body.item.artists.map((artist) => artist.name).join(", ");
          state.is_playing=payload.body.is_playing;
          state.progress_ms=payload.body.progress_ms;
          state.duration_ms=payload.body.item.duration_ms;
          state.uri=payload.body.item.uri;
          if (!state.playedSongs.includes(payload.body.item.uri)) {
            state.playedSongs = [...state.playedSongs, payload.body.item.uri];
          }
        }
      }
    },
    /**
     * Reducer for a newly rejected playback request
     */
    [fetchPlaybackState.rejected]: (state, { error, meta }) => {
      if (state.requestId === meta.requestId) {
        state.status = REJECTED;
        state.error = error.message;
      }
    },
    RESET: () => initialState,
  },
});

export const { togglePlayPause, setStartedPlaylist, setPlayedSongs } = playback.actions;
export default playback.reducer;

/**
 * Selector for the playback state
 */
export const selectPlayback = state => state.playback;

