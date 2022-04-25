import { useState } from "react";
import { useFirebase } from "react-redux-firebase";

import LoginFormView from "./LoginFormView";

/**
 * Form for logging in and signing up with an email and password
 */
const LoginForm = function () {
  const firebase = useFirebase();
  const [error, setError] = useState(null);
  const [signupMode, setSignupMode] = useState(false);
  const [waiting, setWaiting] = useState(false);

  const handleSubmit = async (email, password, passwordConfirm) => {
    setWaiting(true);

    try {
      if (signupMode) {
        if (password !== passwordConfirm)
          throw new Error("Password and its confirmation are not the same!");

        await firebase.createUser({ email, password }, { email });
      } else {
        await firebase.login({ email, password });
      }
    } catch (error) {
      setError(error.message);
    }

    setWaiting(false);
  };

  return (
    <LoginFormView
      signupMode={signupMode}
      error={error}
      waiting={waiting}
      onSwitchMode={() => {
        setError("");
        setSignupMode((mode) => !mode);
      }}
      onSubmit={handleSubmit}
    />
  );
};

export default LoginForm;
