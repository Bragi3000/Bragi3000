import { Navigate } from "react-router";
import WaitingView from "Components/WaitingView/WaitingView";
import { useSelector } from "react-redux";
import {
  selectFirebaseReady,
  selectUser,
} from "Store/slices/auth";

/**
 * Component to restrict access to authenticated users.
 * @param children the access restricted content
 * @param reverse reverse the behavior, restrict to unauthenticated users
 */
const RequireAuthentication = function ({ children, reverse = false }) {
  const user = useSelector(selectUser);
  const ready = useSelector(selectFirebaseReady);

  if (!ready) return <WaitingView text="Waiting for Firebase" />;

  if (!reverse && user.uid === null) return <Navigate replace to="/login" />;

  if (reverse && user.uid !== null) return <Navigate replace to="/app" />;

  return children;
};

export default RequireAuthentication;
