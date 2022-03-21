import SignupForm from "Components/SignupForm/SignupForm";
import { Navigate } from "react-router";
import useAuthentication from "Services/firebase/useAuthentication";
import useTitle from "Utils/useTitle";

const LoginPage = function () {
  useTitle("Bragi 3000 - Signup");

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
      <h1>Sign up</h1>

      <SignupForm />
    </div>
  );
};

export default LoginPage;
