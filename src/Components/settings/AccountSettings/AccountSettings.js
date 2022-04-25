import { useFirebase } from "react-redux-firebase";
import { useNavigate } from "react-router";
import useUserData from "Services/firebase/useUserData";
import AccountSettingsView from "./AccountSettingsView";

const AccountSettings = function () {
  const firebase = useFirebase();
  const navigate = useNavigate();
  const user = useUserData();

  const handleLogout = async () => {
    await firebase.logout();
    navigate("/");
  };

  return (
    <AccountSettingsView
      email={user.email}
      uid={user.uid}
      onLogout={handleLogout}
    />
  );
};

export default AccountSettings;
