import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { FULFILLED, IDLE, REJECTED } from "Constants/promiseStatus";
import {
  getAvailableDevices as apiGetAvailableDevices,
  setActiveDevice as apiSetActiveDevice,
} from "Services/Spotify/spotifyAPI";

/**
 * Action to fetch the available devices
 * @param accessToken Spotify access token
 */
export const fetchDevices = createAsyncThunk(
  "devices/fetchDevices",
  ({ accessToken }) => apiGetAvailableDevices(accessToken)
);

/**
 * Action to set the active device in Spotify & state
 * @param accessToken Spotify access token
 * @param deviceId Id of the device to set as active
 */
export const setActiveDevice = createAsyncThunk(
  "devices/setActiveDevice",
  ({ accessToken, deviceId}, {getState}) => {
    const playlistId = getState().playlist.playlistId;
    return apiSetActiveDevice(accessToken, deviceId, playlistId);
  }
);

/**
 * Initial state for {@link devices}
 */
const initialState = {
  available: {
    data: [],
    status: IDLE,
    requestId: null,
    erorr: "",
  },

  active: {
    data: null,
    status: IDLE,
    requestId: null,
    error: "",
  },
};

/**
 * Slice for the devices state
 */
const devices = createSlice({
  name: "devices",
  initialState,
  reducers: {
    /**
     *  Action & reducer to set the active device
     * @param state - The current state of the store
     * @param payload - The active device to bet set
     */
    setActiveDeviceState: (state, {payload}) => {
      state.active.data = payload
    }
  },
  extraReducers: {
    /**
     * Reducer for a pending fetchDevices request
     */
    [fetchDevices.pending]: (state, { meta }) => {
      state.available.requestId = meta.requestId;
    },

    /**
     * Reducer for a fulfilled fetchDevices request
     */
    [fetchDevices.fulfilled]: (state, { payload, meta }) => {
      if (state.available.requestId === meta.requestId) {
        state.available.status = FULFILLED;
        state.available.data = payload;

        state.active.data =
          payload.find((device) => device.is_active)?.id || null;
      }
    },

    /**
     * Reducer for a rejected fetchDevices request
     */
    [fetchDevices.rejected]: (state, { error, meta }) => {
      if (state.available.requestId === meta.requestId) {
        state.available.status = REJECTED;
        state.available.error = error.message;
      }
    },

    /**
     * Reducer for a pending setActiveDevice request
     */
    [setActiveDevice.pending]: (state, { meta }) => {
      state.active.requestId = meta.requestId;
    },

    /**
     * Reducer for a fulfilled setActiveDevice request
     */
    [setActiveDevice.fulfilled]: (state, { meta }) => {
      if (state.active.requestId === meta.requestId) {
        state.active.status = FULFILLED;
      }
    },

    /**
     * Reducer for a rejected setActiveDevice request
     */
    [setActiveDevice.rejected]: (state, { error, meta }) => {
      if (state.active.requestId === meta.requestId) {
        state.active.status = REJECTED;
        state.active.error = error.message;
      }
    },
    RESET: () => initialState,
  },
});

export default devices.reducer;
export const {setActiveDeviceState} = devices.actions;

/**
 * Selector for devices in the playback state
 */
export const selectDevices = (state) => state.devices.available.data;

/**
 * Selector for active device
 */
export const selectActiveDevice = (state) => state.devices.active.data;
