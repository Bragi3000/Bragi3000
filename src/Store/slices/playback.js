import bragiIcon from "Assets/images/bragi-icon.png"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getPlaybackState } from "Services/Spotify/spotifyAPI";
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
  is_playing: false,
  progress_ms: 0,
  duration_ms: 42069,
  status: IDLE,
  requestId: null,
  error: "",
};

/**
 * Slice for the playback state
 */
const playback = createSlice({
  name: "playback",
  initialState,
  reducers: {
    togglePlayPause: (state) => {
      state.is_playing = !state.is_playing;
    },
    resetPlaybackState: () => initialState
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
  },
});

export const { togglePlayPause, resetPlaybackState } = playback.actions;
export default playback.reducer;

/**
 * Selector for the playback state
 */
export const selectPlayback = state => state.playback;

