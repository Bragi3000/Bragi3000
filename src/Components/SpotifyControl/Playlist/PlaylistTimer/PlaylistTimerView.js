/**
 *  View to render the remaining playtime in the playlist
 * @param remainingTime - time until the end of the playlist
 */
const PlaylistTimerView = function ({remainingTime}) {
  return (
    <div className={"flex justify-center text-xl mb-2"}>
      Remaining Playtime: {remainingTime}
    </div>
  );
};

export default PlaylistTimerView;
