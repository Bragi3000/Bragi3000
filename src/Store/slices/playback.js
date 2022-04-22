import bragiIcon from "Assets/images/bragi-icon.png"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {getAvailableDevices, getPlaybackState} from "Services/Spotify/spotifyAPI";
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

/*
 * Action to fetch the available devices
 * @param obj.accessToken Spotify access token
 */
export const fetchDevices = createAsyncThunk(
  "playback/fetchDevices",
  ({ accessToken }, {getState}) =>
    getAvailableDevices(accessToken)
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
  started_playlist: false,
  devices: [],
  active_device: null,
  deviceRequestId: null,
  deviceError: "",
  deviceStatus: IDLE,
};

/**
 * Slice for the playback state
 */
const playback = createSlice({
  name: "playback",
  initialState,
  reducers: {
    togglePlayPause: (state, action) => {
      state.is_playing = !state.is_playing;
    },
    resetPlaybackState: () => initialState,

    setStartedPlaylist: (state, action) => {
      state.started_playlist = action.payload;
    },
    setDevices: (state, action) => {
      state.devices = action.payload;
    },
    setActiveDeviceState: (state, action) => {
      state.active_device = action.payload;
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
    [fetchDevices.pending]: (state, { meta }) => {
      state.deviceRequestId = meta.requestId;
    },
    [fetchDevices.fulfilled]: (state, { payload, meta }) => {
      if (state.deviceRequestId=== meta.requestId) {
        state.deviceStatus= FULFILLED;
        state.devices = payload;
        const activeDevice = state.devices.find((device) => device.is_active);
        state.active_device = activeDevice ? activeDevice.id : null;
      }
    },
    [fetchDevices.rejected]: (state, { error, meta }) => {
      if (state.deviceRequestId=== meta.requestId) {
        state.deviceStatus= REJECTED;
        state.deviceError= error.message;
      }
    },
  },
});

export const { togglePlayPause, setStartedPlaylist, setActiveDeviceState } = playback.actions;
export default playback.reducer;

/**
 * Selector for the playback state
 */
export const selectPlayback = state => state.playback;

/**
 * Selector for devices in the playback state
 */
export const selectDevices = state => state.playback.devices;

/**
 * Selector for active device
 */
export const selectActiveDevice = state => state.playback.active_device;

