import { Link } from "react-router-dom";
import style from "./SignupForm.module.css";

const { useRef } = require("react")

const SignupFormView = function ({ onSignup, error }) {
  const email = useRef();
  const password = useRef();
  const passwordConfirm = useRef();

  const handleSubmit = (event) => {
    onSignup(
      email.current.value,
      password.current.value,
      passwordConfirm.current.value
    );
    event.preventDefault();
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {
          error ? <p className={style.error}></p> : null
        }
        <p style={{ color: "red" }}>{error}</p>

        <input type="text" placeholder="Email" ref={email} />
        <input type="password" placeholder="Password" ref={password} />
        <input type="password" placeholder="Password (confirmation)" ref={passwordConfirm} />
        <input type="submit" />
      </form>

      <Link to="/login">Login</Link>
    </div>
  )
}

export default SignupFormView;
