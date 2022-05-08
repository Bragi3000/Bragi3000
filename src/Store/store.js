import { configureStore, createAction } from "@reduxjs/toolkit";
import selectedSongs from "./slices/selectedSongs";
import songSearch from "./slices/songSearch";
import playlist from "./slices/playlist";
import playback from "./slices/playback";
import devices from "./slices/devices";
import game from "./slices/game";
import spotifyAuth from "./slices/spotifyAuth";
import auth, { listenToAuthenticationChanges } from "./slices/auth";
import { initializeApp } from "firebase/app";
import firebaseConfig from "Config/firebase";
import enablePersistence from "./persist/enablePersistence";

const firebaseApp = initializeApp(firebaseConfig);

/**
 * The complete Redux store used by the app.
 * Middleware is provided by Redux Toolkit to allow for dispatching thunks,
 * immutability in reducers without worrying, and extra checks.
 */
const store = configureStore({
  reducer: {
    selectedSongs,
    songSearch,
    playlist,
    playback,
    devices,
    game,
    spotifyAuth,
    auth,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: {
          firebaseApp,
        },
      },
    }),
});

store.dispatch(listenToAuthenticationChanges());

enablePersistence(store, firebaseApp);

export default store;
