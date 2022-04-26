import {Link} from "react-router-dom";
import bragi_background from "Assets/images/bragi-background.mp4";

/*
 * Landing page of the application. Shows a welcome message and a link to open the application.
 */
const LandingPage = function () {
  return (
    <div className="relative flex items-center justify-center h-screen mb-12 overflow-hidden">
      <div className="relative z-30 p-5 text-2xl text-white bg-purple-300 bg-opacity-50 rounded-xl">
        <h1 className="text-7xl mb-8">Bragi 3000</h1>
        <Link
          className="block w-fit mx-auto rounded-md bg-green-500 px-5 py-2 hover:bg-green-400"
          to="/app"
        >
          Start playing
        </Link>
      </div>
      <video className={"absolute z-10 w-auto min-w-full min-h-full max-w-none"} autoPlay loop muted>
        <source src={bragi_background} type={"video/mp4"}/>
      </video>
    </div>
  );
};

export default LandingPage;
