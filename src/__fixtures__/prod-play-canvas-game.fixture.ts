/**
 * Fixtures for the Play Canvas Game feature.
 */
import { HIGH_SCORE_STORAGE_KEY } from "../features/prod-play-canvas-game/prod-play-canvas-game.repo";
import { APP_STATE_INITIAL, type AppState } from "../features/prod-play-canvas-game/prod-play-canvas-game.types";

export const PLAY_ROUTE_PATH = "/play";

export const PLAY_ROUTE_SURFACE_IDS = [
  "SURF_PLAY_PAGE",
  "SURF_GAME_CANVAS",
  "SURF_SCORE_DISPLAY",
] as const;

export const START_GAME_CONTROL_SLOT = "CSLOT_START_GAME_START_BUTTON";

export const START_GAME_ACTION_ID = "start-game-1";

export const appStateFixture = (overrides: Partial<AppState> = {}): AppState => ({
  ...APP_STATE_INITIAL,
  ...overrides,
});

export const highScoreStorageFixture = (value: number | null): void => {
  try {
    if (value === null) {
      window.localStorage.removeItem(HIGH_SCORE_STORAGE_KEY);
      return;
    }
    window.localStorage.setItem(HIGH_SCORE_STORAGE_KEY, String(value));
  } catch {
    /* storage unavailable in this environment */
  }
};
