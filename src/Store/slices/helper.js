import {createSelector, createSlice} from "@reduxjs/toolkit";

/**
 * Initial state for {@link helperSlice}
 */
const initialState = {
  helpActive: false,
  position: 0
};

const helperSlice = createSlice({
  name: "helper",
  initialState,
  reducers: {

    toggleHelpActivity: (state, action) => {
      state.helpActive = !state.helpActive;
    },

    setHelpedComponent: (state, {payload: {explainedComponentPosition}}) => {
      state.position = explainedComponentPosition;
    }
  }
})

export const {toggleHelpActivity, setHelpedComponent} = helperSlice.actions;
export default helperSlice.reducer;
