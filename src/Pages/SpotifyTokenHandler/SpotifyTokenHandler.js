import { tokenExtractor } from "Utils/index";
import { getPlaybackState } from "Services/index";

const SpotifyTokenHandler = function () {
  const token = tokenExtractor();
  console.log(token.access_token);
  // getPlaybackState(token.access_token);



  return (
    <div>
      {token.access_token && (<span>Authenticated</span>)}
      {!token.access_token && (<span>Authentication failed</span>)}
    </div>
  )
}

export default SpotifyTokenHandler;
