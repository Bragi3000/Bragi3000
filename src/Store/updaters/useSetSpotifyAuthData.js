import { useCallback } from "react";
import { useFirebase } from "react-redux-firebase";
import useAuthentication from "Services/firebase/useAuthentication";

const useSetSpotifyAuthData = function () {
  const { user } = useAuthentication();
  const path = `users/${user.uid}/spotifyAuthData`;

  const firebase = useFirebase();
  return useCallback((data) => {
    if (user.uid)
      firebase.set(path, data);
  }, [user.uid, firebase, path]);
}

export default useSetSpotifyAuthData;
