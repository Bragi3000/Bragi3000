import { createSlice } from "@reduxjs/toolkit";
import { FINISHED, PICK_SONGS, PLAYING } from "Constants/gameStages";

/**
 * Initial state for {@link game}
 */
const initialState = {
  stage: PICK_SONGS,
  winner: null,
};

const game = createSlice({
  name: "game",
  initialState,
  reducers: {
    /**
     * Reducer that resets the stage to PICK_SONGS
     */
    resetGame: (state) => {
      state.stage = PICK_SONGS;
    },

    /**
     * Reducer that starts the mini-game by setting the stage to PLAYING
     */
    startGame: (state) => {
      state.stage = PLAYING;
    },

    /**
     * Reducer that ends the game by setting the stage to FINISHED
     * and setting a winner
     */
    setWinner: (state, { payload: { winner } }) => {
      state.stage = FINISHED;
      state.winner = winner;
    },
  },
  extraReducers: {},
});

export default game.reducer;

/**
 * Action for resetting the game to the song picking stage
 */
export const resetGame = game.actions.resetGame;

/**
 * Action for starting the mini-game
 */
export const startGame = game.actions.startGame;

/**
 * Action for ending the mini-game and setting the winner
 * @param winner The winner of the game (LEFT_PLAYER or RIGHT_PLAYER)
 */
export const setWinner = game.actions.setWinner;

/**
 * Selector for the current game stage
 */
export const selectGameStage = (state) => state.game.stage;
