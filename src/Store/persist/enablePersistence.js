import persistSpotifyAuth from "./parts/spotifyAuth";
import { getDatabase, off, onValue, ref } from "firebase/database";

const persistors = Object.entries({
  spotifyAuth: persistSpotifyAuth,
});

const enablePersistence = function (store, firebaseApp) {
  const db = getDatabase(firebaseApp);
  let prevState = store.getState();

  store.subscribe(() => {
    const state = store.getState();
    const userUid = state.auth.user.uid;
    const prevUid = prevState.auth.user.uid;
    const basePath = `users`;

    if (userUid && userUid === prevUid) {
      for (const [part, { toFirebase }] of persistors) {
        toFirebase(state, prevState, ref(db, `${basePath}/${userUid}/${part}`));
      }
    }

    if (prevUid && !userUid) {
      for (const [part] of Object.entries(persistors)) {
        off(ref(db, `${basePath}/${prevUid}/${part}`));
      }
    }

    if (userUid && !prevUid) {
      for (const [part, { fromFirebase }] of persistors) {
        onValue(ref(db, `${basePath}/${userUid}/${part}`), (snapshot) =>
          fromFirebase(state, store.dispatch, snapshot.val())
        );
      }
    }

    prevState = state;
  });
};

export default enablePersistence;
