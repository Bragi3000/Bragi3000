import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { logout, selectUser } from "Store/slices/auth";
import AccountSettingsView from "./AccountSettingsView";

/**
 * Settings section showing configuration for the Firebase account.
 * @returns The presenter for the component
 */
const AccountSettings = function () {
  const user = useSelector(selectUser)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    dispatch(logout());
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
