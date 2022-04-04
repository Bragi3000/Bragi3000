import { configureStore } from "@reduxjs/toolkit";
import selectedSongs from "./slices/selectedSongs";
import songSearch from "./slices/songSearch";
import {
  firebaseReducer,
  getFirebase,
  actionTypes as rrfActionTypes,
} from "react-redux-firebase";

const store = configureStore({
  reducer: {
    firebase: firebaseReducer,
    selectedSongs,
    songSearch,
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
