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

  const fields = [
    {
      key: "email",
      label: "Email address",
      placeholder: "john@example.com",
      type: "text",
      ref: email,
    },
    {
      key: "password",
      label: "Password",
      placeholder: "••••••••••••",
      type: "password",
      ref: password,
    },
    signupMode && {
      key: "password-confirm",
      label: "Password (confirmation)",
      placeholder: "••••••••••••",
      type: "password",
      ref: passwordConfirm,
    },
  ];

  return (
    <>
      <h1 className="text-3xl mb-3">{signupMode ? "Sign up" : "Log in"}</h1>

      <form onSubmit={handleSubmit}>
        {error && <p className="text-red-500 my-3">{error}</p>}

        {fields.map(
          ({ key, label, placeholder, type, ref } = {}) =>
            key && (
              <label key={key} className="block my-3">
                {label}
                <input
                  className="block w-full mt-1 rounded-md bg-gray-700 border-transparent focus:border-gray-600 focus:ring-0"
                  type={type}
                  placeholder={placeholder}
                  ref={ref}
                  disabled={waiting}
                />
              </label>
            )
        )}

        <button className="block w-full my-3 mt-6 rounded-md bg-green-500 px-5 py-2 hover:bg-green-400">
          {waiting ? "..." : signupMode ? "Sign up" : "Log in"}
        </button>
      </form>

      <p className="my-3">
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
