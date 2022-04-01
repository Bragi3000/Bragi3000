import LogoutButton from "Components/LogoutButton/LogoutButton";
import { Link } from "react-router-dom";
import SpotifyControl from "Components/SpotifyControl/SpotifyControl";
import useUserData from "Services/firebase/useUserData";
import SongSelector from "Components/SongSelector/SongSelector";

const App = function () {
  const user = useUserData();

  return (
    <div className="App">
      <span>Hello there, {user.email}!</span>

      <LogoutButton />

      <Link to="/settings">Settings</Link>

      <SpotifyControl/>

      <SongSelector />
    </div>
  );
};

export default App;
