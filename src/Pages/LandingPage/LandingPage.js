import { Link } from "react-router-dom";
import useTitle from "Utils/useTitle";

const LandingPage = function () {
  useTitle("Bragi 3000");

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
