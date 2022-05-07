import {Link} from "react-router-dom";
import kermit_404 from "Assets/images/kermit_404.gif"


const NotFoundPage = function () {
  return (
    <div>
      <div className={"text-center p-20"}>
        <h1 className={"text-7xl mb-8"}>404</h1>
        <h2 className={"text-5xl mb-8"}>UH OH! You're lost.</h2>
        <p className={"text-5l mb-8"}>
          The page you are looking for does not exist. <br/>
          How you got here is a mystery. <br/>
          Help scared kermit go back to safety by clicking the button below!
        </p>
        <Link className={"block w-fit mx-auto rounded-md bg-green-500 px-5 py-2 hover:bg-green-400"} to={"/"}>
          Home
        </Link>
        <img className={"p-12 mx-auto rounded-xl"} src={kermit_404} alt={"Kermit is scared go back"} />
      </div>
    </div>
  )
}

export default NotFoundPage;
