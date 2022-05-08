/* eslint-disable indent */
import {
  createSlice,
  createSelector,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import { FULFILLED, IDLE, PENDING, REJECTED } from "Constants/promiseStatus";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

export const authenticate = createAsyncThunk(
  "auth/authenticate",
  async (
    { email, password, passwordConfirm, signup },
    { extra: { firebaseApp } }
  ) => {
    if (signup && password !== passwordConfirm)
      throw new Error("Password and its confirmation are not the same!");

    const auth = getAuth(firebaseApp);

    const userCredential = signup
      ? await createUserWithEmailAndPassword(auth, email, password)
      : await signInWithEmailAndPassword(auth, email, password);

    return { uid: userCredential.user.uid, email: userCredential.user.email };
  }
);

/**
 * Initial state for {@link authSlice}
 */
const initialState = {
  user: {
    uid: null,
    email: null,
  },

  firebaseReady: false,

  authenticate: {
    status: IDLE,
    requestId: null,
    error: "",
  },
};

/**
 * Slice for Spotify authentication token and expiry
 */
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, { payload }) => {
      state.user.uid = payload.uid;
      state.user.email = payload.email;
    },
    resetStatus: (state) => {
      state.authenticate.status = IDLE;
    },
    setFirebaseReady: (state) => {
      state.firebaseReady = true;
    },
  },
  extraReducers: {
    [authenticate.pending]: (state, { meta }) => {
      state.authenticate.requestId = meta.requestId;
      state.authenticate.status = PENDING;
    },
    [authenticate.rejected]: (state, { meta, error }) => {
      if (state.authenticate.requestId !== meta.requestId) return;

      state.authenticate.status = REJECTED;
      state.authenticate.error = error.message;
    },
    [authenticate.fulfilled]: (state, { meta, payload }) => {
      if (state.authenticate.requestId !== meta.requestId) return;

      state.authenticate.status = FULFILLED;
      state.user.uid = payload.uid;
      state.user.email = payload.email;
    },
    RESET: () => initialState,
  },
});

export const resetAuthenticationStatus = authSlice.actions.resetStatus;
const setUser = authSlice.actions.setUser;
const setFirebaseReady = authSlice.actions.setFirebaseReady;

export const listenToAuthenticationChanges =
  () =>
  (dispatch, _, { firebaseApp }) => {
    const auth = getAuth(firebaseApp);

    onAuthStateChanged(auth, (user) => {
      dispatch(setFirebaseReady());

      if (user) dispatch(setUser({ uid: user.uid, email: user.email }));
    });
  };

export const logout =
  () =>
  (dispatch, _, { firebaseApp }) => {
    dispatch({ type: "RESET" });
    // dispatch(setUser({ uid: null, email: null }));

    signOut(getAuth(firebaseApp));
  };

// /**
//  * Action for setting the Spotify authentication data
//  * @param accessToken Spotify access token
//  * @param expireStamp Timestamp of access token expiry
//  * @param hasExpired Whether the access token has expired
//  * @returns Dispatchable action
//  */
// const setData = spotifyAuthSlice.actions.set;

// /**
//  * Action for removing the Spotify authentication data
//  * @returns Dispatchable action
//  */
// export const resetSpotifyAuthData = spotifyAuthSlice.actions.reset;

// /**
//  * Action for setting the Spotify authentication token as expired
//  * @returns Dispatchable action
//  */
// const setExpired = spotifyAuthSlice.actions.setExpired;

/**
 * Reducer for {@link authSlice}
 */
export default authSlice.reducer;

// /**
//  * Action to set the Spotify authentication data
//  * @param accessToken Spotify access token
//  * @param expireStamp Timestamp of access token expiry
//  * @returns Dispatchable action
//  */
// export const setSpotifyAuthData =
//   (accessToken, expireStamp = 0) =>
//   (dispatch) => {
//     const expiresIn = expireStamp - Date.now();

//     dispatch(
//       setData({
//         accessToken,
//         expireStamp,
//         hasExpired: expiresIn < 0,
//         timeoutId:
//           expiresIn > 0
//             ? setTimeout(() => {
//                 dispatch(setExpired());
//               }, expiresIn)
//             : null,
//       })
//     );
//   };

/**
 * Base selector for this slice
 * @param state The root Redux store
 * @returns The data in {@link authSlice}
 */
const selectAuth = (state) => state.auth;

export const selectUser = createSelector(selectAuth, (data) => data.user);

export const selectAuthenticationIsWaiting = createSelector(
  selectAuth,
  (data) => data.authenticate.status === PENDING
);

export const selectAuthenticationError = createSelector(selectAuth, (data) =>
  data.authenticate.status === REJECTED ? data.authenticate.error : null
);

export const selectFirebaseAuthenticationReady = createSelector(
  selectAuth,
  (data) => data.firebaseReady
);

// /**
//  * Selector for the Spotify access token
//  * @param state The root Redux store
//  * @returns Access token
//  */
// export const selectSpotifyAccessToken = createSelector(
//   selectSpotifyAuth,
//   (data) => data.accessToken
// );

// /**
//  * Selector for the Spotify access token expiry date
//  * @param state The root Redux store
//  * @returns Expiry date
//  */
// export const selectSpotifyTokenExpiryDate = createSelector(
//   selectSpotifyAuth,
//   (data) =>
//     typeof data.expireStamp === "number" ? new Date(data.expireStamp) : null
// );

// /**
//  * Selector for whether there is a valid (non-expired) Spotify access token
//  * @param state The root Redux store
//  * @returns Whether there is a valid access token
//  */
// export const selectHasValidSpotifyToken = createSelector(
//   selectSpotifyAuth,
//   (data) =>
//     data.accessToken && !data.hasExpired && data.expireStamp > Date.now()
// );
