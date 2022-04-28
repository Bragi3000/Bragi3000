import {
  IconContext,
  PlayCircle as PlayIcon,
  PauseCircle as PauseIcon,
  Queue as QueueIcon,
  DesktopTower as DevicesIcon,
} from "phosphor-react";

/**
 * Simple song information view showing play/pause button, cover image, name of song and artists
 * @param {function} onModifyPlayback Modifies current playback state
 * @param {string} name current song name
 * @param {string} imageSrc cover image for the current song
 * @param {boolean} is_playing playing status of current song
 * @param {string} artists artists of the current song
 * @returns {JSX.Element} View with current song information
 */
const SpotifyControlView = function ({
  onModifyPlayback,
  name,
  imageSrc,
  is_playing,
  artists,
}) {
  const PlayPauseIcon = is_playing ? PauseIcon : PlayIcon;

  return (
    <div className="h-28 px-5 py-3 bg-main-900 flex space-x-3 items-center">
      <img className="h-full flex-none" src={imageSrc} alt="Album cover" />
      <div className="flex-auto flex flex-col">
        <span className="block"> {name} </span>
        <span className="block text-main-400"> {artists} </span>
      </div>

      <IconContext.Provider
        value={{
          color: "currentColor",
        }}
      >
        <button className="flex-none hover:text-main-400">
          <DevicesIcon className="w-auto h-8" />
        </button>
        <button className="flex-none hover:text-main-400">
          <QueueIcon className="w-auto h-8" />
        </button>
        <button className="flex-none hover:text-main-400">
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
