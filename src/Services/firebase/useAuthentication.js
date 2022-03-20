import { useSelector } from "react-redux";
import { isEmpty, isLoaded } from "react-redux-firebase";

/**
 * Hook for getting authentication information from Firebase
 *
 * @return {{authReady, loggedIn, user}} Authentication information
 */
const useAuthentication = function () {
  const auth = useSelector((state) => state.firebase.auth);

  return {
    authReady: isLoaded(auth),
    loggedIn: !isEmpty(auth),
    user: auth
  };
};

export default useAuthentication;
