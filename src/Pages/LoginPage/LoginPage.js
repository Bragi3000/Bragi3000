import LoginForm from "Components/LoginForm/LoginForm";
import useTitle from "Utils/useTitle";

/*
 * LoginPage to login into the application.
 */
const LoginPage = function () {
  useTitle("Log In - Bragi 3000");

  return (
    <div className="py-20 px-5 max-w-md mx-auto">
      <LoginForm />
    </div>
  );
};

export default LoginPage;
