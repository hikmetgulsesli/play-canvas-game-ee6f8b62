import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { actLoadPlayRoute } from "../surf-play-page/act_load_play_route";
import { actStartGame } from "../surf-play-page/act_start_game";
import { createGameRuntime } from "../../game/game-runtime";
import type { GameRuntime } from "../../game/game-runtime";
import { installTestBridge, uninstallTestBridge } from "../../test/bridge";
import {
  APP_STATE_INITIAL,
  type ActionRef,
  type AppState,
} from "./prod-play-canvas-game.types";

export interface ProdPlayCanvasGameStoreValue {
  state: AppState;
  dispatch: (actionRef: ActionRef) => void;
}

const StoreContext = createContext<ProdPlayCanvasGameStoreValue | null>(null);

export interface ProdPlayCanvasGameProviderProps {
  children?: React.ReactNode;
  initialState?: AppState;
}

export function ProdPlayCanvasGameProvider({
  children,
  initialState,
}: ProdPlayCanvasGameProviderProps) {
  const [state, setState] = useState<AppState>(initialState ?? APP_STATE_INITIAL);
  const stateRef = useRef<AppState>(state);
  stateRef.current = state;
  const runtimeRef = useRef<GameRuntime | null>(null);

  if (runtimeRef.current === null) {
    runtimeRef.current = createGameRuntime();
  }

  const dispatch = useCallback((actionRef: ActionRef) => {
    setState((previous) => {
      if (actionRef === "ACT_START_GAME") {
        const next = actStartGame(previous);
        runtimeRef.current?.start();
        return next;
      }
      if (actionRef === "ACT_LOAD_PLAY_ROUTE") {
        return actLoadPlayRoute(previous);
      }
      return previous;
    });
  }, []);

  useEffect(() => {
    const runtime = runtimeRef.current;
    return () => {
      runtime?.stop();
    };
  }, []);

  useEffect(() => {
    installTestBridge(
      () => stateRef.current,
      (actionRef) => {
        if (actionRef === "ACT_START_GAME") {
          dispatch("ACT_START_GAME");
          return;
        }
        if (actionRef === "ACT_LOAD_PLAY_ROUTE") {
          dispatch("ACT_LOAD_PLAY_ROUTE");
        }
      },
    );
    return () => {
      uninstallTestBridge();
    };
  }, [dispatch]);

  const value = useMemo<ProdPlayCanvasGameStoreValue>(() => ({ state, dispatch }), [state, dispatch]);

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useAppState(): AppState {
  const value = useContext(StoreContext);
  if (!value) {
    throw new Error("PROD_PLAY_CANVAS_GAME_STORE_MISSING");
  }
  return value.state;
}

export function useAppDispatch(): (actionRef: ActionRef) => void {
  const value = useContext(StoreContext);
  if (!value) {
    throw new Error("PROD_PLAY_CANVAS_GAME_STORE_MISSING");
  }
  return value.dispatch;
}
