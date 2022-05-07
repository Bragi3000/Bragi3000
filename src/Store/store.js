import { configureStore } from "@reduxjs/toolkit";
import selectedSongs from "./slices/selectedSongs";
import songSearch from "./slices/songSearch";
import playlist from "./slices/playlist";
import playback from "./slices/playback";
import devices from "./slices/devices";
import game from "./slices/game";
import spotifyAuth from "./slices/spotifyAuth";
import {
  firebaseReducer,
  getFirebase,
  actionTypes as rrfActionTypes,
} from "react-redux-firebase";

/**
 * The complete Redux store used by the app. Includes custom reducer slices,
 * as well as a Firebase reducer from React-Redux-Firebase.
 * Middleware is provided by Redux Toolkit to allow for dispatching thunks,
 * immutability in reducers without worrying, and extra checks.
 */
const store = configureStore({
  reducer: {
    firebase: firebaseReducer,
    selectedSongs,
    songSearch,
    playlist,
    playback,
    devices,
    game,
    spotifyAuth,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: Object.keys(rrfActionTypes).map(
          (type) => `@@reactReduxFirebase/${type}`
        ),
        ignoredPaths: ["firebase", "firestore"],
      },
      thunk: {
        extraArgument: {
          getFirebase,
        },
      },
    }),
});

export default store;
