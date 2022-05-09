import { createSlice } from "@reduxjs/toolkit";
import helpPopovers from "Constants/helpPopovers";

/**
 * Initial state for {@link helperSlice}
 */
const initialState = {
  helpActive: false,
  currentPopover: helpPopovers[0],
};

/**
 * Slice for helper state
 */
const helperSlice = createSlice({
  name: "helper",
  initialState,
  reducers: {
    /**
     * Action & reducer to toggle help activity
     */
    toggleHelpActivity: (state) => {
      if (!state.helpActive) {
        state.currentPopover = initialState.currentPopover;
      }
      state.helpActive = !state.helpActive;
    },

    /**
     * Action & reducer to show help for certain component position
     */
    changePosition: (state, { payload }) => {
      const currPos = helpPopovers.indexOf(state.currentPopover);
      let newPos = Math.max(currPos + payload, 0);

      if (newPos >= helpPopovers.length) {
        state.helpActive = false;
        newPos = 0;
      }

      state.currentPopover = helpPopovers[newPos];
    },
  },
  extraReducers: {
    RESET: () => initialState,
  },
});

export const { toggleHelpActivity, changePosition } = helperSlice.actions;

export default helperSlice.reducer;

/**
 * Selector for the current popover, or null if help is not active
 */
export const selectCurrentHelpPopover = (state) =>
  state.helper.helpActive ? state.helper.currentPopover : null;

