/**
 * Browser evidence bridge (runtime evidence contract: setfarm.runtime-evidence-contract.v1).
 *
 * globalName: __SETFARM_TEST_BRIDGE__
 * actionInvocation.method: invokeAction
 * scenarioMode: __SETFARM_SCENARIO_MODE__ = "manual"
 * stateBindings: STATE_APP_STATE -> /states/STATE_APP_STATE
 */
import type { ActionRef, AppState } from "../features/prod-play-canvas-game/prod-play-canvas-game.types";

export const BRIDGE_GLOBAL_NAME = "__SETFARM_TEST_BRIDGE__";
export const SCENARIO_MODE_GLOBAL_NAME = "__SETFARM_SCENARIO_MODE__";
export const SCENARIO_MODE_VALUE = "manual";

export type BridgeActionInvoker = (
  actionRef: string,
  inputValues?: Record<string, unknown>,
) => void | Promise<void>;

export type BridgeStateGetter = () => AppState;

type BridgeGlobal = Record<string, unknown>;

function globalScope(): BridgeGlobal {
  return globalThis as unknown as BridgeGlobal;
}

let stateGetter: BridgeStateGetter | null = null;
let actionInvoker: BridgeActionInvoker | null = null;

/**
 * Exposes the application state and the action invocation entry point used by the
 * browser evidence adapter. The state is read from the live application store on
 * every access so it never becomes a test-only copy.
 */
export function installTestBridge(getState: BridgeStateGetter, invoke: BridgeActionInvoker): void {
  stateGetter = getState;
  actionInvoker = invoke;

  const scope = globalScope();
  scope[BRIDGE_GLOBAL_NAME] = {
    invokeAction(actionRef: string, inputValues?: Record<string, unknown>) {
      if (!actionInvoker) {
        throw new Error("SETFARM_ACTION_INVOKER_UNAVAILABLE");
      }
      return actionInvoker(actionRef, inputValues);
    },
    get states() {
      const current = stateGetter ? stateGetter() : { highScore: null, status: "idle" as const };
      return {
        STATE_APP_STATE: {
          highScore: current.highScore,
          status: current.status,
        },
      };
    },
  };
  scope[SCENARIO_MODE_GLOBAL_NAME] = SCENARIO_MODE_VALUE;
}

export function uninstallTestBridge(): void {
  const scope = globalScope();
  delete scope[BRIDGE_GLOBAL_NAME];
  delete scope[SCENARIO_MODE_GLOBAL_NAME];
  stateGetter = null;
  actionInvoker = null;
}

/** Invokes an action through the installed bridge (used by the app itself as well). */
export function invokeBridgeAction(
  actionRef: ActionRef,
  inputValues?: Record<string, unknown>,
): void | Promise<void> {
  if (!actionInvoker) {
    throw new Error("SETFARM_ACTION_INVOKER_UNAVAILABLE");
  }
  return actionInvoker(actionRef, inputValues);
}
