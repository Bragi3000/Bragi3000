import { useSelector } from "react-redux";
import { useFirebase, useFirebaseConnect } from "react-redux-firebase";
import useAuthentication from "Services/firebase/useAuthentication";

const useSpotifyAuthData = function () {
  const firebase = useFirebase();
  const { user } = useAuthentication();
  const path = `users/${user.uid}/spotifyAuthData`;

  useFirebaseConnect(path);
  const data = useSelector(({ firebase: { data }}) => (
    (data.users && data.users[user.uid] && data.users[user.uid].spotifyAuthData)
  ));

  const setter = (newData) => (
    firebase.set(path, newData)
  );

  return [data, setter];
}

export default useSpotifyAuthData;
