import { useState } from "react";
import { useFirebase } from "react-redux-firebase";

import SignupFormView from "./SignupFormView";

/**
 *  SignupForm with mail, password, and confirm password.
 */
const SignupForm = function () {
  const firebase = useFirebase();
  const [error, setError] = useState(null);

  const handleSignup = (email, password, passwordConfirm) => {
    if (password !== passwordConfirm) {
      setError("Password and password confirmation are not the same!");
      return;
    }

    firebase.createUser({ email, password }, { email })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <SignupFormView
      onSignup={handleSignup}
      error={error} />
  )
};

export default SignupForm;
