import LogoutButton from "Components/LogoutButton/LogoutButton";
import { Link } from "react-router-dom";
import SpotifyControl from "Components/SpotifyControl/SpotifyControl";
import useUserData from "Services/firebase/useUserData";
import SongSelector from "Components/SongSelector/SongSelector";
import { LEFT_PLAYER, RIGHT_PLAYER } from "Constants/players";

const App = function () {
  const user = useUserData();

  return (
    <div className="App">
      <span>Hello there, {user.email}!</span>

      <LogoutButton />

      <Link to="/settings">Settings</Link>

      <SpotifyControl />

      <SongSelector player={LEFT_PLAYER} />

      <SongSelector player={RIGHT_PLAYER} />
    </div>
  );
};

export default App;
