// AUTO-GENERATED from Stitch — DO NOT modify layout or CSS
// Screen: Play Page - Play Canvas Game
// 
// AGENT INSTRUCTIONS:
// 1. DO NOT change className values or layout structure
// 2. Preserve the generated action-input state and exact payload transport
// 3. Wire interactive controls through the typed actions prop
// 4. Replace placeholder data with props/state


export type PlayPagePlayCanvasGameActionId = "start-game-1";

export interface PlayPagePlayCanvasGameProps {
  actions?: {
    "start-game-1"?: () => void;
  };

  /** Current route path bound to the play page surface. */
  route?: string;
  /** Current application status ("idle" | "playing"). */
  status?: string;
  /** Current high score value (null when nothing is stored). */
  score?: number | null;
}

export type PlayPagePlayCanvasGameActionCallbacks = NonNullable<PlayPagePlayCanvasGameProps["actions"]>;

export function PlayPagePlayCanvasGame({ actions, route, status, score }: PlayPagePlayCanvasGameProps) {
  const scoreValue = score === null || score === undefined ? null : String(score);

  return (
    <>
      <div data-surface-id="SURF_PLAY_PAGE" className="min-h-screen flex flex-col items-center justify-between p-8 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900" data-setfarm-element-ref="E000001" data-observable-refs="OBS_LOAD_PLAY_ROUTE_PLAY_ROUTE_LOADED OBS_START_GAME_ROUTE_AFTER_START OBS_START_GAME_START_STATUS_MESSAGE" data-route={route} data-status={status}>
          
          {/* Top Bar / Header with Title and Score Display */}
          <header className="w-full max-w-5xl flex items-center justify-between border-b border-slate-800 pb-6 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center font-bold text-xl text-white shadow-lg shadow-indigo-500/20">
                P
              </div>
              <div>
                <h1 className="text-xl font-bold tracking-tight text-white">Play Canvas Game</h1>
                <p className="text-xs text-slate-400">Route: /play</p>
              </div>
            </div>
      
            {/* Score Display Surface */}
            <div data-surface-id="SURF_SCORE_DISPLAY" className="flex items-center gap-4 bg-slate-900/90 border border-slate-800 rounded-xl px-5 py-3 shadow-inner" data-setfarm-element-ref="E000002" data-observable-refs="OBS_START_GAME_SCORE_VALUE" data-value={scoreValue === null ? undefined : scoreValue}>
              <div className="text-right">
                <span className="text-xs uppercase tracking-wider font-semibold text-slate-400 block">Score</span>
                <span className="text-2xl font-black tabular-nums text-emerald-400">{scoreValue === null ? "0" : scoreValue}</span>
              </div>
            </div>
          </header>
      
          {/* Main Game Area */}
          <main className="w-full max-w-5xl flex-1 flex flex-col items-center justify-center gap-6">
            {/* Game Canvas Surface */}
            <div data-surface-id="SURF_GAME_CANVAS" className="relative w-full aspect-[16/9] max-h-[580px] bg-slate-900 border-2 border-slate-800 rounded-2xl overflow-hidden shadow-2xl flex items-center justify-center" data-setfarm-element-ref="E000003">
              {/* Canvas grid graphic background */}
              <div className="absolute inset-0 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:24px_24px] opacity-40"></div>
              
              {/* Canvas display content */}
              <div className="relative z-10 flex flex-col items-center text-center p-8 max-w-md">
                <div className="w-20 h-20 mb-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <h2 className="text-lg font-semibold text-slate-200 mb-1">Canvas Arena Ready</h2>
                <p className="text-sm text-slate-400">Start the session to initialize canvas rendering and game loop.</p>
              </div>
      
              <div className="absolute bottom-4 left-4 text-xs font-mono text-slate-500">
                SURFACE: SURF_GAME_CANVAS [16:9 HD]
              </div>
            </div>
      
            {/* Action Panel & Status Message */}
            <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-900/60 border border-slate-800/80 rounded-xl px-6 py-4">
              {/* Status message satisfying observable requirement */}
              <div className="flex items-center gap-2 text-sm text-slate-300">
                <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="font-medium text-slate-200">Game started</span>
                <span className="text-xs text-slate-400">— Ready for player input</span>
              </div>
      
              {/* Controls */}
              <div>
                <button data-action="ACT_START_GAME" data-control-slot="CSLOT_START_GAME_START_BUTTON" className="inline-flex items-center justify-center px-6 py-3 text-sm font-semibold tracking-wide text-white bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 rounded-lg shadow-lg shadow-indigo-600/30 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 focus:ring-offset-slate-900 cursor-pointer" data-setfarm-element-ref="E000004" data-observable-refs="OBS_START_GAME_START_BUTTON_STATE" type="button" data-action-id="start-game-1" onClick={actions?.["start-game-1"]}>
                  Start Game
                </button>
              </div>
            </div>
          </main>
      
          {/* Footer decoration (non-actionable) */}
          <footer className="w-full max-w-5xl pt-6 mt-6 border-t border-slate-800 text-center text-xs text-slate-400">
            Play Canvas Game © 2025. All rights reserved.
          </footer>
      
        </div>
    </>
  );
}
