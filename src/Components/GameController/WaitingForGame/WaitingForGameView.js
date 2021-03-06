/**
 * Component that shows information before the game has started (when picking songs)
 * This view is only meant to be used by the presenter.
 * @returns The view for the component
 */
const WaitingForGameView = function () {
  return (
    <div className="w-72 mx-auto text-center">
      Please select and confirm your songs to start a new game!
    </div>
  );
};

export default WaitingForGameView;
