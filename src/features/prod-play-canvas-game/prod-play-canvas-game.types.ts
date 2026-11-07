/**
 * Types for the Play Canvas Game application state (STATE_APP_STATE).
 *
 * Contract source:
 *   - state: STATE_APP_STATE { highScore: number | null, status: "idle" | "playing" }
 *   - entity: ENTITY_HIGH_SCORE { FIELD_HIGH_SCORE_VALUE: number }
 */

export type AppStatus = "idle" | "playing";

export interface AppState {
  highScore: number | null;
  status: AppStatus;
}

export type ActionRef = "ACT_LOAD_PLAY_ROUTE" | "ACT_START_GAME";

export const APP_STATE_INITIAL: AppState = {
  highScore: null,
  status: "idle",
};

export const APP_STATE_REF = "STATE_APP_STATE";
