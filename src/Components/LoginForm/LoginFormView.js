import { useRef } from "react";
import { Link } from "react-router-dom";

/**
 * View for the LoginForm component
 * @param props.signupMode Whether the form is for signing up instead of logging in
 * @param props.error An error to display above the form
 * @param props.waiting Whether the form is waiting after a submission
 * @param props.onSubmit Event fired after submitting the form
 * @param props.onSwitchMode Event fired when switching between logging in and signing up
 */
const LoginFormView = function ({
  signupMode = false,
  error = "",
  waiting = false,
  onSubmit = (email, password, passwordConfirm) => {},
}) {
  const email = useRef();
  const password = useRef();
  const passwordConfirm = useRef();

  const handleSubmit = (event) => {
    onSubmit(
      email.current.value,
      password.current.value,
      passwordConfirm.current?.value
    );
    event.preventDefault();
  };

  return (
    <>
      <h1 className="text-3xl mb-3">{signupMode ? "Sign up" : "Log in"}</h1>

      <form onSubmit={handleSubmit}>
        {error && <p className="text-red-500 my-3">{error}</p>}

        <label className="block my-3">
          Email address
          <input
            className="block w-full mt-1 rounded-md bg-main-700 border-transparent focus:border-main-600 focus:ring-0"
            type="text"
            placeholder="john@example.com"
            ref={email}
            disabled={waiting}
          />
        </label>

        <label className="block my-3">
          Password
          <input
            className="block w-full mt-1 rounded-md bg-main-700 border-transparent focus:border-main-600 focus:ring-0"
            type="password"
            placeholder="••••••••••••"
            ref={password}
            disabled={waiting}
          />
        </label>

        {signupMode && (
          <label className="block my-3">
            Password (confirmation)
            <input
              className="block w-full mt-1 rounded-md bg-main-700 border-transparent focus:border-main-600 focus:ring-0"
              type="password"
              placeholder="••••••••••••"
              ref={passwordConfirm}
              disabled={waiting}
            />
          </label>
        )}

        <button className="block w-full my-3 mt-6 rounded-md bg-green-500 px-5 py-2 hover:bg-green-400">
          {waiting ? "..." : signupMode ? "Sign up" : "Log in"}
        </button>
      </form>

      <p>
        {signupMode ? "Already a member? " : "Not a member yet? "}
        <Link
          to={signupMode ? "/login" : "/signup"}
          className="text-green-400 hover:underline my-3"
        >
          {signupMode ? "Log in" : "Sign up"}
        </Link>
      </p>
    </>
  );
};

export default LoginFormView;
