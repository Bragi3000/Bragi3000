import { Link } from "react-router-dom";

/*
 * Landing page of the application. Shows a welcome message and a link to open the application.
 */
const LandingPage = function () {
  return (
    <div className="LandingPage">
      <span>Welcome to Bragi, enjoy!</span>
      <br />
      <br />
      <Link to="/app">Open it</Link>
    </div>
  );
};

export default LandingPage;
