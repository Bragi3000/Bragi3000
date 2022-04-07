import SignupForm from "Components/SignupForm/SignupForm";
import useTitle from "Utils/useTitle";

/*
 * Signup Page to sign up for the application.
 */
const SignupPage = function () {
  useTitle("Bragi 3000 - Signup");

  return (
    <div>
      <h1>Sign up</h1>
      <SignupForm />
    </div>
  );
};

export default SignupPage;
