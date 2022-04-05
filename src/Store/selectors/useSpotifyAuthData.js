import { useSelector } from "react-redux";
import { useFirebaseConnect } from "react-redux-firebase";
import useUserData from "Services/firebase/useUserData";

/**
 * Custom hook for retrieving Spotify authentication tokens from Firebase
 * @returns Object containing the spotify authentication data
 */
const useSpotifyAuthData = function () {
  const user = useUserData();

  useFirebaseConnect(user.uid ? `users/${user.uid}/spotifyAuthData` : [], user.uid);
  return useSelector(({ firebase: { data } }) => (
    data.users && data.users[user.uid] && data.users[user.uid].spotifyAuthData
  ));
}

export default useSpotifyAuthData;
