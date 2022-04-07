import { isEmpty, isLoaded } from "react-redux-firebase";
import { Navigate } from "react-router";
import useUserData from "Services/firebase/useUserData";
import WaitingView from "Components/WaitingView/WaitingView";

/**
 * Component to restrict access to authenticated users.
 * @param children the access restricted content
 * @param reverse reverse the behavior, restrict to unauthenticated users
 */
const RequireAuthentication = function ({ children, reverse = false }) {
  const userData = useUserData();

  if (!isLoaded(userData))
    return <WaitingView text="Waiting for Firebase" />;

  if (!reverse && (isEmpty(userData) || !userData.uid))
    return <Navigate replace to="/login" />;

  if (reverse && !isEmpty(userData))
    return <Navigate replace to="/app" />;

  return children;
};

export default RequireAuthentication;
