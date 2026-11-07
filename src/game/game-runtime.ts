/**
 * Minimal game runtime for SURF_GAME_CANVAS.
 *
 * Owns the animation frame loop that runs while the session is playing and keeps
 * the runtime free of direct DOM assumptions so it also works under the test runner.
 */

export interface GameRuntime {
  start(): void;
  stop(): void;
  readonly running: boolean;
  readonly frames: number;
}

export interface GameRuntimeOptions {
  onFrame?: (elapsedMs: number) => void;
}

export function createGameRuntime(options: GameRuntimeOptions = {}): GameRuntime {
  let running = false;
  let frames = 0;
  let handle: number | null = null;
  let startedAt = 0;

  const schedule = (): void => {
    if (!running) return;
    frames += 1;
    if (options.onFrame) {
      options.onFrame(typeof performance !== "undefined" ? performance.now() - startedAt : frames * 16);
    }
    if (typeof requestAnimationFrame === "function") {
      handle = requestAnimationFrame(schedule);
    }
  };

  return {
    start(): void {
      if (running) return;
      running = true;
      startedAt = typeof performance !== "undefined" ? performance.now() : 0;
      schedule();
    },
    stop(): void {
      running = false;
      if (handle !== null && typeof cancelAnimationFrame === "function") {
        cancelAnimationFrame(handle);
      }
      handle = null;
    },
    get running(): boolean {
      return running;
    },
    get frames(): number {
      return frames;
    },
  };
}
