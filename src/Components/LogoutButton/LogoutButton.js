import { useFirebase } from "react-redux-firebase";
import { useNavigate } from "react-router";
import LogoutButtonView from "./LogoutButtonView"

/**
 * LogoutButton component to log user out of the application.
 */
const LogoutButton = function () {
  const firebase = useFirebase();
  const navigate = useNavigate();

  const handleLogout = () => {
    firebase.logout()
      .then(() => navigate("/"));
  }

  return (
    <LogoutButtonView
      onLogout={handleLogout} />
  )
};

export default LogoutButton;
