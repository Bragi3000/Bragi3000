/* eslint-disable indent */
import { createSlice, createSelector } from "@reduxjs/toolkit";

/**
 * Initial state for {@link spotifyAuthSlice}
 */
const initialState = {
  accessToken: null,
  expireStamp: null,
  hasExpired: false,
  timeoutId: null,
};

/**
 * Slice for Spotify authentication token and expiry
 */
const spotifyAuthSlice = createSlice({
  name: "spotifyAuth",
  initialState,
  reducers: {
    set: (state, { payload }) => {
      clearTimeout(state.timeoutId);
      return { ...payload };
    },
    reset: (state) => {
      clearTimeout(state.timeoutId);
      return { ...initialState };
    },
    setExpired: (state) => {
      state.hasExpired = true;
    },
  },
  extraReducers: {
    RESET: () => initialState,
  },
});

/**
 * Action for setting the Spotify authentication data
 * @param accessToken Spotify access token
 * @param expireStamp Timestamp of access token expiry
 * @param hasExpired Whether the access token has expired
 * @returns Dispatchable action
 */
const setData = spotifyAuthSlice.actions.set;

/**
 * Action for removing the Spotify authentication data
 * @returns Dispatchable action
 */
export const resetSpotifyAuthData = spotifyAuthSlice.actions.reset;

/**
 * Action for setting the Spotify authentication token as expired
 * @returns Dispatchable action
 */
const setExpired = spotifyAuthSlice.actions.setExpired;

/**
 * Reducer for {@link spotifyAuthSlice}
 */
export default spotifyAuthSlice.reducer;

/**
 * Action to set the Spotify authentication data
 * @param accessToken Spotify access token
 * @param expireStamp Timestamp of access token expiry
 * @returns Dispatchable action
 */
export const setSpotifyAuthData =
  (accessToken, expireStamp = 0) =>
  (dispatch) => {
    const expiresIn = expireStamp - Date.now();

    dispatch(
      setData({
        accessToken,
        expireStamp,
        hasExpired: expiresIn < 0,
        timeoutId:
          expiresIn > 0
            ? setTimeout(() => {
                dispatch(setExpired());
              }, expiresIn)
            : null,
      })
    );
  };

/**
 * Base selector for this slice
 * @param state The root Redux store
 * @returns The data in {@link spotifyAuthSlice}
 */
const selectSpotifyAuth = (state) => state.spotifyAuth;

/**
 * Selector for the Spotify access token
 * @param state The root Redux store
 * @returns Access token
 */
export const selectSpotifyAccessToken = createSelector(
  selectSpotifyAuth,
  (data) => data.accessToken
);

/**
 * Selector for the Spotify access token expiry date
 * @param state The root Redux store
 * @returns Expiry date
 */
export const selectSpotifyTokenExpiryDate = createSelector(
  selectSpotifyAuth,
  (data) =>
    typeof data.expireStamp === "number" ? new Date(data.expireStamp) : null
);

/**
 * Selector for whether there is a valid (non-expired) Spotify access token
 * @param state The root Redux store
 * @returns Whether there is a valid access token
 */
export const selectHasValidSpotifyToken = createSelector(
  selectSpotifyAuth,
  (data) =>
    data.accessToken && !data.hasExpired && data.expireStamp > Date.now()
);
