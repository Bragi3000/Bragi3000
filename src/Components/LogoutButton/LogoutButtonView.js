/**
 * View for the logout button.
 * @param onLogout - callback when user is logged out
 */
const LogoutButtonView = function ({ onLogout }) {
  return (
    <button onClick={() => onLogout()}>Logout</button>
  );
};

export default LogoutButtonView;
