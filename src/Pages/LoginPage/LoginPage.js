import LoginForm from "Components/LoginForm/LoginForm";
import { Navigate } from "react-router";
import useAuthentication from "Services/firebase/useAuthentication";
import useTitle from "Utils/useTitle";

const LoginPage = function () {
  useTitle("Bragi 3000 - Login");

  const { authReady, loggedIn } = useAuthentication();

  if (!authReady)
    return (
      <span>Waiting for auth...</span>
    );

  if (loggedIn)
    return (
      <Navigate to="/app" />
    );

  return (
    <div>
      <h1>Login</h1>

      <LoginForm />
    </div>
  );
};

export default LoginPage;
