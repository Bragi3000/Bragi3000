import { useEffect } from "react";
import { useMatch } from "react-router";

import LoginFormView from "./LoginFormView";
import { useDispatch, useSelector } from "react-redux";
import {
  authenticate,
  resetAuthenticationStatus,
  selectAuthenticationError,
  selectAuthenticationIsWaiting,
} from "Store/slices/auth";

/**
 * Form for logging in and signing up with an email and password
 */
const LoginForm = function () {
  const error = useSelector(selectAuthenticationError);
  const waiting = useSelector(selectAuthenticationIsWaiting);
  const dispatch = useDispatch();
  const signupMode = !!useMatch("/signup");

  useEffect(() => {
    dispatch(resetAuthenticationStatus());
  }, [dispatch, signupMode]);

  const handleSubmit = (email, password, passwordConfirm) => {
    dispatch(
      authenticate({ signup: signupMode, email, password, passwordConfirm })
    );
  };

  return (
    <LoginFormView
      signupMode={signupMode}
      error={error}
      waiting={waiting}
      onSubmit={handleSubmit}
    />
  );
};

export default LoginForm;
