/**
 * Pads a number with zeroes to be two digits
 * @param number Number to pad
 * @returns Zero-padding string representation of number
 */
const pad2 = function (number) {
  return number.toString().padStart(2, "0");
};

/**
 * Create a nice-looking representation of a duration
 * @param duration Duration in milliseconds
 * @returns Time string in the format H:mm:ss
 */
export const createDurationString = function (duration) {
  const seconds = Math.floor((duration / 1000) % 60);
  const minutes = Math.floor((duration / 1000 / 60) % 60);
  const hours = Math.floor((duration / 1000 / 60 / 60) % 24);

  return `${hours}:${pad2(minutes)}:${pad2(seconds)}`;
};

/**
 * Converts a duration into a string showing minutes
 * @param duration Duration in milliseconds
 * @param shortMins Short minutes to mins if true
 * @returns String like '5 minutes'
 */
export const durationToMinuteString = function (duration, shortMins) {
  const minutes = Math.round(duration / 1000 / 60);

  return `${minutes} ${shortMins ? "min" : "minute"}${
    minutes === 1 ? "" : "s"
  }`;
};

/**
 * Converts a duration into a string showing hours and minutes
 * @param duration Duration in milliseconds
 * @param shortMins Short minutes to mins if true
 * @returns String like '2 hours, 5 minutes' or '5 minutes' (if less than an hour)
 */
export const durationToHoursMinutesString = function (duration, shortMins) {
  const hours = Math.floor((duration / 1000 / 60 / 60) % 24);
  const minutes = Math.round((duration / 1000 / 60) % 60);

  return (
    (hours > 0 ? `${hours} hour${hours === 1 ? "" : "s"}, ` : "") +
    `${minutes} ${shortMins ? "min" : "minute"}${minutes === 1 ? "" : "s"}`
  );
};
