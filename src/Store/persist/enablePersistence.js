import persistSpotifyAuth from "./parts/spotifyAuth";
import persistPlaylist from "./parts/playlist";
import { getDatabase, ref } from "firebase/database";
import { setFirebaseReady } from "Store/slices/auth";

const persistors = [
  ["spotifyAuth", persistSpotifyAuth],
  ["playlist", persistPlaylist],
];

const enablePersistence = function (store, firebaseApp) {
  const db = getDatabase(firebaseApp);
  let prevState = store.getState();
  let unsubs = [];

  store.subscribe(() => {
    const userUid = store.getState().auth.user.uid;
    const prevUid = prevState.auth.user.uid;
    const basePath = `users`;

    if (userUid && userUid === prevUid) {
      for (const [part, { toFirebase }] of persistors) {
        toFirebase(
          store.getState(),
          prevState,
          ref(db, `${basePath}/${userUid}/${part}`)
        );
      }
    }

    if (prevUid && !userUid) {
      unsubs.forEach((unsub) => unsub());
    }

    if (userUid && !prevUid) {
      (async function () {
        for (const [part, { fromFirebaseOnce }] of persistors) {
          await fromFirebaseOnce(
            store.getState(),
            store.dispatch,
            ref(db, `${basePath}/${userUid}/${part}`)
          );
        }

        store.dispatch(setFirebaseReady());

        unsubs = persistors.flatMap(([part, { fromFirebaseSub }]) =>
          fromFirebaseSub(
            store.getState(),
            store.dispatch,
            ref(db, `${basePath}/${userUid}/${part}`)
          )
        );
      })();
    }

    prevState = store.getState();
  });
};

export default enablePersistence;
