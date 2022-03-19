import firebase from "firebase/compat/app"
import "firebase/compat/auth";

import { useState } from "react";
import LoginFormView from "./LoginFormView";

const LoginForm = function () {
  const [error, setError] = useState(null);

  const handleLogin = (email, password) => {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        console.log(userCredential.user);
      })
      .catch((error) => {
        console.log(error.code + ": " + error.message);
        setError(error.message);
      })
  }

  return (
    <LoginFormView
      onLogin={handleLogin}
      error={error} />
  )
}

export default LoginForm;
