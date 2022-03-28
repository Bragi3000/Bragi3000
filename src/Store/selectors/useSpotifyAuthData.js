import { useSelector } from "react-redux";
import { useFirebaseConnect } from "react-redux-firebase";
import useAuthentication from "Services/firebase/useAuthentication";

const useSpotifyAuthData = function () {
  const { user } = useAuthentication();

  useFirebaseConnect(user.uid ? `users/${user.uid}/spotifyAuthData` : [], user.uid);
  return useSelector(({ firebase: { data } }) => (
    data.users && data.users[user.uid] && data.users[user.uid].spotifyAuthData
  ));
}

export default useSpotifyAuthData;
