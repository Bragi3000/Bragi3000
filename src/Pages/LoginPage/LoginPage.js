import LoginForm from "Components/LoginForm/LoginForm";
import useTitle from "Utils/useTitle";

/*
 * LoginPage to login into the application.
 */
const LoginPage = function () {
  useTitle("Bragi 3000 - Login");

  return (
    <div>
      <h1>Login</h1>
      <LoginForm />
    </div>
  );
};

export default LoginPage;
