const LogoutButtonView = function ({ onLogout }) {
  return (
    <button onClick={() => onLogout()}>Logout</button>
  );
};

export default LogoutButtonView;
