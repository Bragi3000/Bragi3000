import { Link } from "react-router-dom";
import kermit from "Assets/images/kermit.png";

/*
 * Landing page of the application. Shows a welcome message and a link to open the application.
 */
const LandingPage = function () {
  return (
    <>
      <div className="container mx-auto px-5 my-40 text-center">
        <h1 className="text-7xl mb-8">Bragi 3000</h1>
        <p className="text-3xl mb-6 text-gray-200 mx-auto w-192">
          Give everyone the chance to hear their favorite song
        </p>
        <p className="text-xl mb-6 text-gray-400 mx-auto w-128">
          Two people select a song from Spotify. Afterwards they play a fun
          minigame. The song chosen by the winner is added to the queue, while
          the other song gets obliterated.
        </p>
        <Link
          className="block w-fit mx-auto rounded-md bg-green-500 px-5 py-2 hover:bg-green-400 text-[#000]"
          to="/app"
        >
          Start playing
        </Link>
      </div>
      <img
        src={kermit}
        className="fixed bottom-0 w-80 right-0 animate-kermit"
        alt="Kermit"
      />
    </>
  );
};

export default LandingPage;
