import {tokenExtractor} from "Utils/index";
import {getPlaybackState} from "src/Services/index";

const SpotifyTokenHandler = function () {
  const token = tokenExtractor();
  console.log(token);
  return (
    <div>
      {token.access_token && (<span>Authenticated</span>)}
      {!token.access_token && (<span>Authentication failed</span>)}
    </div>
  )
}

export default SpotifyTokenHandler;
