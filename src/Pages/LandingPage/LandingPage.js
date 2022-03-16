import {Link} from "react-router-dom";
import {SpotifyAuth} from "Components/index";

const LandingPage = function () {
  return (
    <div className="LandingPage">
      <span>Welcome to Bragi, enjoy!</span>
      <br/>
      <br/>
      <Link to="/app">Open it</Link>
      <br/>
      <SpotifyAuth/>
    </div>
  );
};

export default LandingPage;
