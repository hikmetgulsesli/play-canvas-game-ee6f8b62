/**
 * ACT_START_GAME - Start Game.
 *
 * trigger: user (control slot CSLOT_START_GAME_START_BUTTON)
 * stateDeltas: STATE_APP_STATE /status = "playing", STATE_APP_STATE /highScore = 0
 * persistenceEffects: PERSIST_HIGH_SCORE_STORAGE write <- STATE_APP_STATE /highScore
 * navigation: stay
 */
import { writePersistedHighScore } from "../prod-play-canvas-game/prod-play-canvas-game.repo";
import type { AppState } from "../prod-play-canvas-game/prod-play-canvas-game.types";

export const ACT_START_GAME_REF = "ACT_START_GAME";

export function actStartGame(current: AppState): AppState {
  const next: AppState = {
    ...current,
    status: "playing",
    highScore: 0,
  };
  writePersistedHighScore(next.highScore);
  return next;
}
