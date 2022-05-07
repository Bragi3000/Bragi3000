/**
 * The status when no promise has been initiated.
 */
export const IDLE = "IDLE";

/**
 * The status when a promise has been initiated, but not resolved.
 */
export const PENDING = "PENDING";

/**
 * The status when the latest promise has been fulfilled successfully.
 */
export const FULFILLED = "FULFILLED";

/**
 * The status when the latest promise has rejected (thrown an error).
 */
export const REJECTED = "REJECTED";
