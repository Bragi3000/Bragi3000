import { Link } from "react-router-dom";

/*
 * Landing page of the application. Shows a welcome message and a link to open the application.
 */
const LandingPage = function () {
  return (
    <div className="container mx-auto px-5 my-40 text-center">
      <h1 className="text-7xl mb-8">Bragi 3000</h1>

      <Link
        className="block w-fit mx-auto rounded-md bg-green-500 px-5 py-2 hover:bg-green-400 text-[#000]"
        to="/app"
      >
        Start playing
      </Link>
    </div>
  );
};

export default LandingPage;
