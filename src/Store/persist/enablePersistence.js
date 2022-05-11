import persistSpotifyAuth from "./parts/spotifyAuth";
import persistPlaylist from "./parts/playlist";
import { get, getDatabase, off, onValue, ref } from "firebase/database";
import { setFirebaseReady } from "Store/slices/auth";

const persistors = [["spotifyAuth", persistSpotifyAuth], ["playlist", persistPlaylist]];

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
      for (const [part] of persistors) {
        off(ref(db, `${basePath}/${prevUid}/${part}`));
      }
    }

    if (userUid && !prevUid) {
      Promise.all(
        persistors.map(async ([part, { fromFirebase }]) => {
          await get(ref(db, `${basePath}/${userUid}/${part}`)).then(
            (snapshot) => fromFirebase(state, store.dispatch, snapshot.val())
          );

          onValue(ref(db, `${basePath}/${userUid}/${part}`), (snapshot) =>
            fromFirebase(state, store.dispatch, snapshot.val())
          );
        })
      ).then(() => {
        store.dispatch(setFirebaseReady());
      });
    }

    prevState = state;
  });
};

export default enablePersistence;
