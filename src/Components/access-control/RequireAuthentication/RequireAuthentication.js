import { isEmpty, isLoaded } from "react-redux-firebase";
import { Navigate } from "react-router";
import useUserData from "Services/firebase/useUserData";
import WaitingView from "Components/WaitingView/WaitingView";

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
