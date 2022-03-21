import LogoutButton from "Components/LogoutButton/LogoutButton";
import { Navigate } from "react-router";
import useAuthentication from "Services/firebase/useAuthentication";

const App = function () {
  const { authReady, loggedIn, user } = useAuthentication();

  if (!authReady)
    return (
      <span>Waiting for auth...</span>
    );

  if (!loggedIn)
    return (
      <Navigate replace to="/login" />
    );

  return (
    <div className="App">
      <span>Hello there, {user.email}!</span>

      <LogoutButton />
    </div>
  );
};

export default App;
