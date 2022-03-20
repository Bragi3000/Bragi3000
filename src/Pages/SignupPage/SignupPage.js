import SignupForm from "Components/SignupForm/SignupForm";
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
      <h1>Sign up</h1>

      <SignupForm />
    </div>
  );
};

export default LoginPage;
