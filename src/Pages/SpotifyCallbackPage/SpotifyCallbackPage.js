import tokenExtractor from "Utils/Spotify/TokenExtractor";
// import { getPlaybackState, addSongToQueue, searchSong, pauseSong, playSong } from "Services/Spotify/spotifyAPI";

const SpotifyCallbackPage = function () {
  const token = tokenExtractor();
  console.log(token.access_token);
  // getPlaybackState(token.access_token);
  // pauseSong(token.access_token);
  // playSong(token.access_token);
  // searchSong(token.access_token, "Never")

  return (
    <div>
      {token.access_token && (<span>Authenticated</span>)}
      {!token.access_token && (<span>Authentication failed</span>)}
    </div>
  )
}

export default SpotifyCallbackPage;
