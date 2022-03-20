import LoginForm from "Components/LoginForm/LoginForm";
import { Navigate } from "react-router";
import useAuthentication from "Services/firebase/useAuthentication";

const LoginPage = function () {
  const { authReady, loggedIn } = useAuthentication();

  if (!authReady)
    return (
      <span>Waiting for auth...</span>
    );

  if (loggedIn)
    return (
      <Navigate replace to="/app" />
    );

  return (
    <div>
      <h1>Login</h1>

      <LoginForm />
    </div>
  );
};

export default LoginPage;
