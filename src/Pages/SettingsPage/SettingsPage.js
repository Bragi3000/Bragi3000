import About from "Components/settings/About/About";
import AccountSettings from "Components/settings/AccountSettings/AccountSettings";
import PlaylistSettings from "Components/settings/PlaylistSettings/PlaylistSettings";
import SpotifySettings from "Components/settings/SpotifySettings/SpotifySettings";
import { Link } from "react-router-dom";
import useTitle from "Utils/useTitle";

/*
 * SettingsPage of the application.
 * Shows user-id, access-token and link to the Spotify Login.
 */
const SettingsPage = function () {
  useTitle("Settings - Bragi 3000");

  return (
    <div className="container mx-auto px-5">
      <div className="my-10 text-right">
        <Link className="text-green-400 hover:underline" to="/app">
          Close settings
        </Link>
      </div>
      <PlaylistSettings />
      <AccountSettings />
      <SpotifySettings />
      <About />
    </div>
  );
};

export default SettingsPage;
