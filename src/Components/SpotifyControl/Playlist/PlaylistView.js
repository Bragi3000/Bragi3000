import {
  durationToHoursMinutesString,
  durationToMinuteString,
} from "Utils/durations";
import Song from "Components/Song/Song";

/**
 * View for the playlist component.
 * @param songs - The songs to display.
 */
const PlaylistView = function ({ songs = [], remainingTime, timeUntilSongs }) {
  return (
    <div className="w-96 max-h-128 flex flex-col">
      <h1 className="text-xl text-center p-4 pb-2 flex-none">Playlist</h1>
      <div className="mb-2 mx-4 flex-none">
        <div className="text-sm text-gray-400 -mb-1">Remaining playtime</div>
        <div className="text-lg">
          {durationToHoursMinutesString(remainingTime)}
        </div>
      </div>
      <div className="overflow-auto pb-2">
        {songs.map((song, index) => {
          return (
            <Song
              key={song.id + index}
              song={song}
              extraInfo={
                <div className="text-sm text-gray-400">
                  in {durationToMinuteString(timeUntilSongs[index], true)}
                </div>
              }
            />
          );
        })}
      </div>
    </div>
  );
};

export default PlaylistView;
