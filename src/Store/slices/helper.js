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
      state.helpActive = !state.helpActive;
    },

    /**
     * Action & reducer to reset the playback state
     */
    resetPlaybackState: () => initialState,


    /**
     * Action & reducer to show help for certain component position
     */
    setHelpedComponent: (state, {payload: {explainedComponentPosition}}) => {
      state.position = explainedComponentPosition;
    }

  }
})

export const {
  toggleHelpActivity,
  setHelpedComponent,
  resetPlaybackState
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
