import BannedSongView from "./BannedSongView";

/**
* Component that represents a song in the playlist
 * @param song - The song to be displayed
 * @param index - Index of the song in the playlist
*/
const BannedSong = function ({ song, index }) {
  return <BannedSongView song={song} key={index} index={index}/>
}

export default BannedSong;
