import { useState } from "react";
import { useFirebase } from "react-redux-firebase";
import { useNavigate } from "react-router";

import LoginFormView from "./LoginFormView";

const LoginForm = function () {
  const firebase = useFirebase();
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const handleLogin = (email, password) => {
    firebase.login({ email, password })
      .then(() => {
        navigate("/app");
      })
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
