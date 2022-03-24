import { Link } from "react-router-dom";

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
