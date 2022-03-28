import LogoutButton from "Components/LogoutButton/LogoutButton";
import { Link } from "react-router-dom";
import useAuthentication from "Services/firebase/useAuthentication";

const App = function () {
  const { user } = useAuthentication();

  return (
    <div className="App">
      <span>Hello there, {user.email}!</span>

      <LogoutButton />

      <Link to="/settings">Settings</Link>
    </div>
  );
};

export default App;
