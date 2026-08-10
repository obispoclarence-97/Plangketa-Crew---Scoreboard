"use client"

import { PlayerPanel } from "./player-panel"
import type { Player } from "@/lib/types"

type MatchCardProps = {
  players: Player[]
  player1Id: string
  player2Id: string
  onSelectP1: (id: string) => void
  onSelectP2: (id: string) => void
  score1: number
  score2: number
  onChangeScore: (side: 1 | 2, delta: number) => void
  onResetScore: (side: 1 | 2) => void
  liveWinnerId: string | null
  onSubmit: () => void
  onResetMatch: () => void
}

export function MatchCard({
  players,
  player1Id,
  player2Id,
  onSelectP1,
  onSelectP2,
  score1,
  score2,
  onChangeScore,
  onResetScore,
  liveWinnerId,
  onSubmit,
  onResetMatch,
}: MatchCardProps) {
  return (
    <section
      aria-label="Current match"
      className="felt-surface relative overflow-hidden rounded-3xl border-[6px] border-wood p-4 shadow-2xl sm:p-6 lg:p-8"
    >
      {/* Corner pockets */}
      {["top-2 left-2", "top-2 right-2", "bottom-2 left-2", "bottom-2 right-2"].map((pos) => (
        <span
          key={pos}
          className={`pointer-events-none absolute ${pos} h-6 w-6 rounded-full bg-background/70 shadow-[inset_0_2px_6px_rgba(0,0,0,0.8)]`}
          aria-hidden="true"
        />
      ))}

      {/* Match banner */}
      <div className="mb-6 flex flex-col items-center gap-1">
        <span className="font-display text-[11px] font-semibold tracking-[0.3em] text-gold-light/80">
          LIVE MATCH
        </span>
        <span className="font-display text-[10px] tracking-[0.25em] text-foreground/45">
          OPEN SCORING · HIGHER SCORE WINS
        </span>
      </div>

      {/* Competitor panels */}
      <div className="flex flex-col items-stretch gap-4 md:flex-row md:items-center md:gap-3">
        <PlayerPanel
          label="PLAYER 1"
          players={players}
          selectedId={player1Id}
          onSelect={onSelectP1}
          score={score1}
          onChange={(d) => onChangeScore(1, d)}
          onResetScore={() => onResetScore(1)}
          isWinner={liveWinnerId === player1Id && player1Id !== ""}
          disabledPlayerId={player2Id}
        />

        <div className="flex items-center justify-center py-1 md:flex-col">
          <span className="font-display text-2xl font-black text-gold gold-glow md:text-3xl">VS</span>
        </div>

        <PlayerPanel
          label="PLAYER 2"
          players={players}
          selectedId={player2Id}
          onSelect={onSelectP2}
          score={score2}
          onChange={(d) => onChangeScore(2, d)}
          onResetScore={() => onResetScore(2)}
          isWinner={liveWinnerId === player2Id && player2Id !== ""}
          disabledPlayerId={player1Id}
        />
      </div>

      {/* Match controls */}
      <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:justify-center">
        <button
          type="button"
          onClick={onSubmit}
          className="rounded-xl bg-gold px-8 py-4 font-display text-lg font-black tracking-wide text-background shadow-lg transition-all hover:bg-gold-light hover:shadow-gold/20 active:scale-[0.98] sm:px-12"
        >
          SUBMIT MATCH
        </button>
        <button
          type="button"
          onClick={onResetMatch}
          className="rounded-xl border border-foreground/25 bg-background/50 px-8 py-4 font-display text-lg font-bold tracking-wide text-foreground/70 transition-all hover:border-led/50 hover:text-led active:scale-[0.98]"
        >
          RESET MATCH
        </button>
      </div>
    </section>
  )
}
