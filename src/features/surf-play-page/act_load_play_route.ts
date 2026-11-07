/**
 * ACT_LOAD_PLAY_ROUTE - Load Play Route.
 *
 * trigger: route (ROUTE_PLAY_ROUTE)
 * stateDeltas: STATE_APP_STATE /highScore = null
 * persistenceEffects: PERSIST_HIGH_SCORE_STORAGE read -> STATE_APP_STATE /highScore
 * navigation: stay
 */
import { readPersistedHighScore } from "../prod-play-canvas-game/prod-play-canvas-game.repo";
import type { AppState } from "../prod-play-canvas-game/prod-play-canvas-game.types";

export const ACT_LOAD_PLAY_ROUTE_REF = "ACT_LOAD_PLAY_ROUTE";

export function actLoadPlayRoute(current: AppState): AppState {
  const persisted = readPersistedHighScore();
  return {
    ...current,
    highScore: persisted,
  };
}
