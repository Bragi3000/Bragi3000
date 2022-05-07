import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { FINISHED, PICK_SONGS, PLAYING } from "Constants/gameStages";
import { LEFT_PLAYER, RIGHT_PLAYER } from "Constants/players";
import { FULFILLED, IDLE, REJECTED } from "Constants/promiseStatus";
import { addSongToPlaylist } from "Services/Spotify/spotifyAPI";
import {
  appendBannedSongs,
  fetchPlaylistSongs,
  selectPlaylistId,
} from "./playlist";
import {
  resetSelectedSongs,
  selectSelectedSong,
  selectSongIsConfirmed,
} from "./selectedSongs";
import { resetSearch } from "./songSearch";

const setStage = createAction("game/setStage");
const setWinner = createAction("game/setWinner");

export const maybeStartGame = () => (dispatch, getState) => {
  if (
    selectSongIsConfirmed(getState(), LEFT_PLAYER) &&
    selectSongIsConfirmed(getState(), RIGHT_PLAYER)
  ) {
    dispatch(setStage(PLAYING));
  }
};

export const endGame = createAsyncThunk(
  "game/endGame",
  async ({ winner, accessToken }, { getState, dispatch }) => {
    const loser = winner === LEFT_PLAYER ? RIGHT_PLAYER : LEFT_PLAYER;
    const winningSong = selectSelectedSong(getState(), winner);
    const losingSong = selectSelectedSong(getState(), loser);

    const playListId = selectPlaylistId(getState());
    const promise = addSongToPlaylist(accessToken, playListId, winningSong.uri);

    dispatch(setWinner(winner));
    dispatch(setStage(FINISHED));
    dispatch(appendBannedSongs(losingSong));

    await promise;
    dispatch(fetchPlaylistSongs({ accessToken }));

    // TODO: Maybe put the add to playlist thing in the playlist slice?
  }
);

export const resetGame = () => (dispatch) => {
  dispatch(resetSearch());
  dispatch(resetSelectedSongs());
  dispatch(setStage(PICK_SONGS));
};

/**
 * Initial state for {@link game}
 */
const initialState = {
  stage: PICK_SONGS,
  winner: null,

  endGame: {
    requestId: null,
    status: IDLE,
    error: "",
  },
};

const game = createSlice({
  name: "game",
  initialState,
  reducers: {},
  extraReducers: {
    [setStage]: (state, { payload }) => {
      state.stage = payload;
    },
    [setWinner]: (state, { payload }) => {
      state.winner = payload;
    },
    [endGame.pending]: (state, { meta }) => {
      state.endGame.requestId = meta.requestId;
    },
    [endGame.fulfilled]: (state, { meta }) => {
      if (state.endGame.requestId === meta.requestId) {
        state.endGame.status = FULFILLED;
      }
    },
    [endGame.rejected]: (state, { meta, error }) => {
      if (state.endGame.requestId === meta.requestId) {
        state.endGame.status = REJECTED;
        state.endGame.error = error.msg;
      }
    },
  },
});

export default game.reducer;

/**
 * Selector for the current game stage
 */
export const selectGameStage = (state) => state.game.stage;

export const selectWinner = (state) => state.game.winner;

export const selectEndGameStatus = (state) => state.game.endGame.status;
