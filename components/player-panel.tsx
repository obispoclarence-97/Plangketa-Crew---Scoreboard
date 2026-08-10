"use client"

import { useEffect, useRef, useState } from "react"
import type { Player } from "@/lib/types"

type PlayerPanelProps = {
  label: string
  players: Player[]
  selectedId: string
  onSelect: (id: string) => void
  score: number
  onChange: (delta: number) => void
  onResetScore: () => void
  isWinner: boolean
  disabledPlayerId: string
}

export function PlayerPanel({
  label,
  players,
  selectedId,
  onSelect,
  score,
  onChange,
  onResetScore,
  isWinner,
  disabledPlayerId,
}: PlayerPanelProps) {
  const [pop, setPop] = useState(false)
  const firstRender = useRef(true)

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false
      return
    }
    setPop(true)
    const t = setTimeout(() => setPop(false), 360)
    return () => clearTimeout(t)
  }, [score])

  return (
    <div
      className={`relative flex flex-1 flex-col items-center rounded-2xl border p-5 transition-all sm:p-6 ${
        isWinner
          ? "animate-winner border-gold bg-gold/10"
          : "border-gold/25 bg-background/40"
      }`}
    >
      {isWinner ? (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gold px-4 py-1 font-display text-[11px] font-black tracking-widest text-background">
          LEADING
        </span>
      ) : null}

      <span className="font-display text-[11px] font-semibold tracking-[0.3em] text-foreground/50">
        {label}
      </span>

      <label className="sr-only" htmlFor={`select-${label}`}>
        {label} name
      </label>
      <select
        id={`select-${label}`}
        value={selectedId}
        onChange={(e) => onSelect(e.target.value)}
        className="mt-2 w-full max-w-[16rem] cursor-pointer rounded-lg border border-gold/40 bg-felt-dark px-3 py-2.5 text-center font-display text-base font-bold text-gold-light outline-none transition-colors focus-visible:border-gold focus-visible:ring-2 focus-visible:ring-gold/40"
      >
        {players.map((p) => (
          <option key={p.id} value={p.id} disabled={p.id === disabledPlayerId}>
            {p.name}
          </option>
        ))}
      </select>

      <span className="mt-5 font-display text-[10px] font-semibold tracking-[0.3em] text-foreground/40">
        SCORE
      </span>
      <div
        className={`font-display font-black leading-none tabular-nums led-glow ${
          isWinner ? "text-gold-light" : "text-led"
        } ${pop ? "animate-score-pop" : ""}`}
        style={{ fontSize: "clamp(4.5rem, 16vw, 9rem)" }}
        aria-live="polite"
      >
        {String(score).padStart(2, "0")}
      </div>

      <div className="mt-4 flex w-full max-w-[18rem] items-center justify-center gap-2">
        <button
          type="button"
          onClick={() => onChange(-1)}
          disabled={score <= 0}
          aria-label={`${label} minus one`}
          className="h-14 flex-1 rounded-xl border border-foreground/25 bg-background/60 font-display text-2xl font-bold text-foreground/80 transition-all hover:border-led/50 hover:text-led active:scale-95 disabled:cursor-not-allowed disabled:opacity-30"
        >
          −1
        </button>
        <button
          type="button"
          onClick={() => onChange(1)}
          aria-label={`${label} plus one`}
          className="h-16 flex-[1.4] rounded-xl bg-gold font-display text-3xl font-black text-background shadow-lg transition-all hover:bg-gold-light active:scale-95"
        >
          +1
        </button>
        <button
          type="button"
          onClick={() => onChange(2)}
          aria-label={`${label} plus two`}
          className="h-14 flex-1 rounded-xl border border-gold/40 bg-gold/15 font-display text-xl font-bold text-gold-light transition-all hover:bg-gold/25 active:scale-95"
        >
          +2
        </button>
      </div>
      <button
        type="button"
        onClick={onResetScore}
        disabled={score === 0}
        className="mt-2 font-display text-[10px] font-semibold tracking-[0.2em] text-foreground/40 transition-colors hover:text-foreground/70 disabled:opacity-30"
      >
        RESET TO 0
      </button>
    </div>
  )
}
