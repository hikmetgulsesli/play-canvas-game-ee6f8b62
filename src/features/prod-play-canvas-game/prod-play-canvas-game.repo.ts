/**
 * Persistence access for PERSIST_HIGH_SCORE_STORAGE.
 *
 * kind: local_storage
 * owner: application
 * key: setfarm.play_canvas_game.high_score_storage.v1
 * durability: reload
 */

export const HIGH_SCORE_STORAGE_KEY = "setfarm.play_canvas_game.high_score_storage.v1";

function storage(): Storage | null {
  try {
    if (typeof window === "undefined") return null;
    return window.localStorage ?? null;
  } catch {
    return null;
  }
}

/** Reads the persisted high score. Returns null when nothing valid is stored. */
export function readPersistedHighScore(): number | null {
  const store = storage();
  if (!store) return null;
  let raw: string | null = null;
  try {
    raw = store.getItem(HIGH_SCORE_STORAGE_KEY);
  } catch {
    return null;
  }
  if (raw === null || raw === "") return null;
  const parsed = Number(raw);
  if (!Number.isFinite(parsed)) return null;
  return parsed;
}

/** Writes the high score so it survives a reload. */
export function writePersistedHighScore(value: number): void {
  const store = storage();
  if (!store) return;
  try {
    store.setItem(HIGH_SCORE_STORAGE_KEY, String(value));
  } catch {
    /* storage unavailable: state stays authoritative for the session */
  }
}
