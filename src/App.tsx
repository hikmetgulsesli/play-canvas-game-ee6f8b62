import { useEffect, useMemo } from "react";
import { PlayPagePlayCanvasGame } from "./screens/PlayPagePlayCanvasGame";
import {
  ProdPlayCanvasGameProvider,
  useAppDispatch,
  useAppState,
} from "./features/prod-play-canvas-game/prod-play-canvas-game.store";

const PLAY_ROUTE_PATH = "/play";

function currentRoute(): string {
  if (typeof window === "undefined") return PLAY_ROUTE_PATH;
  const pathname = window.location.pathname || "/";
  if (pathname.length > 1 && pathname.endsWith("/")) {
    return pathname.slice(0, -1);
  }
  return pathname;
}

function PlayPageRoute() {
  const state = useAppState();
  const dispatch = useAppDispatch();
  const route = currentRoute();

  // ACT_LOAD_PLAY_ROUTE: route entry rehydrates the persisted high score.
  useEffect(() => {
    dispatch("ACT_LOAD_PLAY_ROUTE");
  }, [dispatch, route]);

  const actions = useMemo(
    () => ({
      "start-game-1": () => {
        dispatch("ACT_START_GAME");
      },
    }),
    [dispatch],
  );

  return (
    <PlayPagePlayCanvasGame
      actions={actions}
      route={route}
      status={state.status}
      score={state.highScore}
    />
  );
}

function Landing() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <a href={PLAY_ROUTE_PATH}>Open the play canvas game</a>
    </main>
  );
}

export default function App() {
  const route = currentRoute();

  return (
    <div
      data-setfarm-root="baseline"
      data-testid="setfarm-app-root"
      className="min-h-screen bg-slate-50 text-slate-950"
    >
      <ProdPlayCanvasGameProvider>
        {route === PLAY_ROUTE_PATH ? <PlayPageRoute /> : <Landing />}
      </ProdPlayCanvasGameProvider>
    </div>
  );
}
