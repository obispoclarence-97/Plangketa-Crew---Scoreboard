"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { useScoreboard } from "@/hooks/use-scoreboard"
import { ScoreboardHeader } from "@/components/scoreboard-header"
import { StatsBar } from "@/components/stats-bar"
import { MatchCard } from "@/components/match-card"
import { Rankings } from "@/components/rankings"
import { RecentMatches } from "@/components/recent-matches"
import { PlayersManager } from "@/components/players-manager"
import { ConfirmDialog } from "@/components/confirm-dialog"
import { Toast, type ToastData } from "@/components/toast"

export default function Page() {
const sb = useScoreboard()
const rootRef = useRef<HTMLElement | null>(null)

const [isFullscreen, setIsFullscreen] = useState(false)
const [toast, setToast] = useState<ToastData | null>(null)
const [confirm, setConfirm] = useState<null | "clearHistory" | "resetAll">(null)

const showToast = useCallback(
(message: string, tone: ToastData["tone"]) => {
setToast({
id: Date.now(),
message,
tone,
})
},
[],
)

const toggleFullscreen = useCallback(async () => {
try {
if (!document.fullscreenElement) {
await rootRef.current?.requestFullscreen()
} else {
await document.exitFullscreen()
}
} catch {
setIsFullscreen((value) => !value)
}
}, [])

useEffect(() => {
const handleFullscreenChange = () => {
setIsFullscreen(Boolean(document.fullscreenElement))
}

```
document.addEventListener("fullscreenchange", handleFullscreenChange)

return () => {
  document.removeEventListener("fullscreenchange", handleFullscreenChange)
}
```

}, [])

const handleSubmit = useCallback(() => {
const result = sb.submitMatch()

```
if (!result.ok) {
  showToast(result.error, "error")
  return
}

const match = result.match

const winnerMessage =
  "WINNER: " +
  match.winnerName +
  " (" +
  Math.max(match.score1, match.score2) +
  "—" +
  Math.min(match.score1, match.score2) +
  ")"

showToast(winnerMessage, "success")
```

}, [sb, showToast])

const handleResetScore = useCallback(
(side: 1 | 2) => {
if (side === 1) {
sb.changeScore(1, -sb.score1)
} else {
sb.changeScore(2, -sb.score2)
}
},
[sb],
)

if (!sb.hydrated) {
return ( <main className="flex min-h-screen items-center justify-center bg-background"> <p className="font-display text-sm tracking-[0.25em] text-foreground/50">
LOADING SCOREBOARD... </p> </main>
)
}

return ( <div
   ref={rootRef}
   className="min-h-screen bg-background text-foreground"
 > <main className="mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">

```
    <ScoreboardHeader
      isFullscreen={isFullscreen}
      onToggleFullscreen={toggleFullscreen}
      onResetAll={() => setConfirm("resetAll")}
    />

    {!isFullscreen ? (
      <StatsBar
        totalMatches={sb.matches.length}
        totalPlayers={sb.players.length}
        stats={sb.stats}
        matches={sb.matches}
      />
    ) : null}

    <MatchCard
      players={sb.players}
      player1Id={sb.player1Id}
      player2Id={sb.player2Id}
      onSelectP1={sb.setPlayer1Id}
      onSelectP2={sb.setPlayer2Id}
      score1={sb.score1}
      score2={sb.score2}
      onChangeScore={sb.changeScore}
      onResetScore={handleResetScore}
      liveWinnerId={sb.liveWinnerId}
      onSubmit={handleSubmit}
      onResetMatch={sb.resetMatch}
    />

    {!isFullscreen ? (
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">

        <Rankings stats={sb.stats} />

        <div className="flex flex-col gap-6">

          <RecentMatches
            matches={sb.matches}
            onClearHistory={() => setConfirm("clearHistory")}
          />

          <PlayersManager
            stats={sb.stats}
            onAddPlayer={sb.addPlayer}
          />

        </div>

      </div>
    ) : null}

    <footer className="pb-4 text-center font-display text-[10px] tracking-[0.3em] text-foreground/30">
      PLANKETA CREW · DIGITAL BILLIARDS SCOREBOARD
    </footer>

  </main>

  <ConfirmDialog
    open={confirm === "clearHistory"}
    title="Clear match history?"
    message="This permanently removes all recorded matches. Player rankings and stats will recalculate from an empty history. This cannot be undone."
    confirmLabel="Clear history"
    onConfirm={() => {
      sb.clearHistory()
      setConfirm(null)
      showToast("Match history cleared.", "success")
    }}
    onCancel={() => setConfirm(null)}
  />

  <ConfirmDialog
    open={confirm === "resetAll"}
    title="Reset everything?"
    message="This clears all matches and restores the default player roster. This cannot be undone."
    confirmLabel="Reset all"
    onConfirm={() => {
      sb.resetAll()
      setConfirm(null)
      showToast("Scoreboard reset to defaults.", "success")
    }}
    onCancel={() => setConfirm(null)}
  />

  <Toast
        toast={toast}
        onDismiss={() => setToast(null)}
      />

    </div>
  )
}
