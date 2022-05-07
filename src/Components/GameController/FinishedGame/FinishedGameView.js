import { LEFT_PLAYER } from "Constants/players";
import { FULFILLED, PENDING, REJECTED } from "Constants/promiseStatus";
import { SmileySad, Trophy as TrophyIcon } from "phosphor-react";

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
