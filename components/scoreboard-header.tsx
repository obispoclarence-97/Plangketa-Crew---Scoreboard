"use client"

type ScoreboardHeaderProps = {
  isFullscreen: boolean
  onToggleFullscreen: () => void
  onResetAll: () => void
}

function MaximizeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
    </svg>
  )
}

function MinimizeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3" />
    </svg>
  )
}

function ResetIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
      <path d="M3 3v5h5" />
    </svg>
  )
}

export function ScoreboardHeader({ isFullscreen, onToggleFullscreen, onResetAll }: ScoreboardHeaderProps) {
  return (
    <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-4">
        <span
          className="hidden h-14 w-14 shrink-0 items-center justify-center rounded-full border-2 border-gold bg-background sm:flex"
          aria-hidden="true"
        >
          <span className="font-display text-2xl font-black text-gold">8</span>
        </span>
        <div>
          <h1 className="font-display text-3xl font-black leading-none tracking-tight text-gold gold-glow sm:text-4xl lg:text-5xl text-balance">
            PLANGKETA CREW
          </h1>
          <p className="mt-1.5 font-display text-xs font-medium tracking-[0.35em] text-foreground/70 sm:text-sm">
            BILLIARDS SCOREBOARD
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-3">
        <span className="flex items-center gap-2 rounded-full border border-led/50 bg-led/10 px-3 py-1.5">
          <span className="animate-pulse-live inline-block h-2.5 w-2.5 rounded-full bg-led" aria-hidden="true" />
          <span className="font-display text-[11px] font-bold tracking-widest text-led">LIVE</span>
        </span>

        <button
          type="button"
          onClick={onToggleFullscreen}
          aria-pressed={isFullscreen}
          className="flex items-center gap-2 rounded-lg border border-gold/40 bg-background/60 px-3 py-2 text-sm font-medium text-gold-light transition-colors hover:bg-gold/15"
        >
          {isFullscreen ? <MinimizeIcon /> : <MaximizeIcon />}
          <span className="hidden sm:inline">{isFullscreen ? "Exit" : "Fullscreen"}</span>
        </button>

        <button
          type="button"
          onClick={onResetAll}
          className="flex items-center gap-2 rounded-lg border border-foreground/20 bg-background/60 px-3 py-2 text-sm font-medium text-foreground/70 transition-colors hover:border-led/50 hover:text-led"
        >
          <ResetIcon />
          <span className="hidden sm:inline">Reset All</span>
        </button>
      </div>
    </header>
  )
}
