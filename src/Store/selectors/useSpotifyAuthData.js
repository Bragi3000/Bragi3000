import { useSelector } from "react-redux";
import { useFirebaseConnect } from "react-redux-firebase";
import useAuthentication from "Services/firebase/useAuthentication";

const useSpotifyAuthData = function () {
  const { user } = useAuthentication();
  const path = `users/${user.uid}/spotifyAuthData`;

  useFirebaseConnect(path);
  return useSelector(({ firebase: { data } }) => (
    (data.users && data.users[user.uid] && data.users[user.uid].spotifyAuthData)
  ));
}

export default useSpotifyAuthData;
