import { useCallback } from "react";
import { useFirebase } from "react-redux-firebase";
import useAuthentication from "Services/firebase/useAuthentication";

const useSetSpotifyAuthData = function () {
  const { user } = useAuthentication();
  const path = `users/${user.uid}/spotifyAuthData`;

  const firebase = useFirebase();
  return useCallback((data) => firebase.set(path, data), [firebase, path]);
};

export default useSetSpotifyAuthData;
