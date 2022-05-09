import {
  PlayCircle as PlayIcon,
  PauseCircle as PauseIcon,
  Queue as QueueIcon,
  DesktopTower as DevicesIcon,
  IconContext,
} from "phosphor-react";
import DeviceSelector from "./DeviceSelector/DeviceSelector";
import Playlist from "./Playlist/Playlist";
import PopoverIcon from "./PopoverIcon/PopoverIcon";
import PopoverHelp from "../PopoverHelp/PopoverHelp";
import devicedemo from "Assets/images/devicedemo.png";
import playlistdemo from "Assets/images/playlistdemo.png";
import songdemo from "Assets/images/songdemo.png";

/**
 * Controlbar for showing playback information and controlling it.
 * This view is only meant to be used by the presenter.
 * @param name Name of the current song
 * @param artists Artists of the current song
 * @param imageSrc Cover image for the current song
 * @param is_playing Whether the current song is playing
 * @param onModifyPlayback Event fired on modifying the playback state
 * @returns The presenter for the component
 */
const SpotifyControlView = function ({
  name,
  artists,
  imageSrc,
  is_playing,
  onModifyPlayback,
}) {
  const PlayPauseIcon = is_playing ? PauseIcon : PlayIcon;

  return (
    <div className="h-28 px-5 py-3 bg-gray-900 flex space-x-3 items-center">
      <PopoverHelp number={1}
        helperText={"This section displays the cover, the title, and the artist of the currently played song."}
        helperHeading={"Song and Cover"}
        horizontal={"right"} vertical={"top"} helperImg={songdemo}>
        <img className="h-full flex-none" src={imageSrc} alt="Album cover"/>
      </PopoverHelp>
      <div className="flex-auto flex flex-col">
        <span className="block"> {name} </span>
        <span className="block text-gray-400"> {artists} </span>
      </div>

      <IconContext.Provider
        value={{
          color: "currentColor",
        }}
      >
        <PopoverIcon icon={
          <PopoverHelp number={2} helperHeading={"Device Selection"}
            helperText={"This section allows you to select the device the music should be played on. " +
              "Make sure a device is selected and shows the green play icon to start playing the game."}
            helperImg={devicedemo} horizontal={"middle"} vertical={"top"}>
            <DevicesIcon className="w-auto h-8"/>
          </PopoverHelp>
        }>
          <DeviceSelector/>
        </PopoverIcon>
        <PopoverIcon icon={
          <PopoverHelp number={3}
            helperHeading={"Playlist"}
            helperText={"This section shows the upcoming songs in the playlist and the remaining playlist. " +
              "You can also hover over a song to see when it will be played."}
            helperImg={playlistdemo} horizontal={"middle"} vertical={"top"}>
            <QueueIcon className="w-auto h-8"/>
          </PopoverHelp>
        }>
          <Playlist/>
        </PopoverIcon>
        <button className="block flex-none hover:text-gray-400">
          <PlayPauseIcon
            weight="fill"
            className="w-auto h-20"
            onClick={() => onModifyPlayback()}
          />
        </button>
      </IconContext.Provider>
    </div>
  );
};

export default SpotifyControlView;
