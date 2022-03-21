import { useState } from "react";
import { useFirebase } from "react-redux-firebase";

import LoginFormView from "./LoginFormView";

const LoginForm = function () {
  const firebase = useFirebase();
  const [error, setError] = useState(null);

  const handleLogin = (email, password) => {
    firebase.login({ email, password })
      .catch((error) => {
        console.log(error.code + ": " + error.message);
        setError(error.message);
      });
  };

  return (
    <LoginFormView
      onLogin={handleLogin}
      error={error} />
  )
};

export default LoginForm;
