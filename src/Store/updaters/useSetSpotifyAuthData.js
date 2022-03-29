import { useCallback } from "react";
import { useFirebase } from "react-redux-firebase";
import useUserData from "Services/firebase/useUserData";

const useSetSpotifyAuthData = function () {
  const user = useUserData();
  const path = `users/${user.uid}/spotifyAuthData`;

  const firebase = useFirebase();
  return useCallback((data) => firebase.set(path, data), [firebase, path]);
};

export default useSetSpotifyAuthData;
