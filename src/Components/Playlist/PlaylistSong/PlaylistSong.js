import PlaylistSongView from "./PlaylistSongView";
import { getTimeUntilSong } from "../PlaylistTimer/PlaylistTimer";
import { useState } from "react";

/**
* Component that represents a song in the playlist
 * @param song - The song to be displayed
 * @param index - Index of the song in the playlist
*/
const PlaylistSong = function ({ song, index }) {
  const [hover, setHover] = useState(false);
  const timeUntilSong = hover ? getTimeUntilSong(song) : null;
  return <PlaylistSongView song={song} key={index} index={index} onHoverSong={setHover} timeUntilSong={timeUntilSong}/>
}

export default PlaylistSong;
