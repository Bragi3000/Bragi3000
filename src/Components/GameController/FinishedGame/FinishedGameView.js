import { LEFT_PLAYER } from "Constants/players";
import { FULFILLED, PENDING, REJECTED } from "Constants/promiseStatus";
import { SmileySad, Trophy as TrophyIcon } from "phosphor-react";

/**
 * Component that shows information and actions after the minigame has ended.
 * This view is only meant to be used by the presenter.
 * @param winner Winner of the game
 * @param endGameStatus Status of the actions executed after the game
 * @param onContinue Event fired when the continue button is pressed
 * @returns The view for the component
 */
const FinishedGameView = function ({ winner, endGameStatus, onContinue }) {
  return (
    <div className="flex flex-col space-y-3 text-center">
      <TrophyIcon
        className="text-gold h-40 w-auto"
        weight="fill"
        color="currentColor"
      />
      <p className="text-2xl">
        Congratulations, player {winner === LEFT_PLAYER ? "1" : "2"}!
      </p>
      <p className="px-28 text-gray-400">
        {endGameStatus === FULFILLED && (
          <>Your song has been added to the playlist</>
        )}
        {endGameStatus === REJECTED && (
          <>
            Unfortunately, there was an error adding your song to the playlist{" "}
            <SmileySad className="inline h-5" />
          </>
        )}
        {endGameStatus === PENDING && (
          <>Your song is being added to the playlist...</>
        )}
      </p>
      <div>
        <button
          className="text-green-500 hover:underline"
          onClick={() => onContinue()}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default FinishedGameView;
