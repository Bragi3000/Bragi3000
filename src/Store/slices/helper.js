import {createSelector, createSlice} from "@reduxjs/toolkit";

/**
 * Initial state for {@link helperSlice}
 */
const initialState = {
  helpActive: false,
  position: 0
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
    toggleHelpActivity: (state, action) => {
      if (!state.helpActive) {
        state.position = initialState.position;
      }
      state.helpActive = !state.helpActive;
    },

    /**
     * Action & reducer to reset the playback state
     */
    resetHelper: () => initialState,


    /**
     * Action & reducer to show help for certain component position
     */
    changePosition: (state, action) => {
      state.position = Math.min(Math.max(state.position + action.payload, 0), 10);
    },


  }
})

export const {
  toggleHelpActivity,
  changePosition,
  resetHelper
} = helperSlice.actions;

export default helperSlice.reducer;

/**
 * Selector for help activity
 */
export const selectHelpActive = state => state.helpActive;

/**
 * Selector for position i.e. component help displayed
 */
export const selectPosition = state => state.position;
