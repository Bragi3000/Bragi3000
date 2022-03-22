import { useRef } from "react";
import { Link } from "react-router-dom";
import style from "./LoginForm.module.css";

const LoginFormView = function ({ onLogin, error }) {
  const email = useRef();
  const password = useRef();

  const handleSubmit = (event) => {
    onLogin(email.current.value, password.current.value);
    event.preventDefault();
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {
          error ? <p className={style.error}></p> : null
        }
        <p style={{color: "red"}}>{error}</p>

        <input type="text" placeholder="Email" ref={email} />
        <input type="password" placeholder="Password" ref={password} />
        <input type="submit" />
      </form>

      <Link to="/signup">Sign up</Link>
    </div>
  )
}

export default LoginFormView;
