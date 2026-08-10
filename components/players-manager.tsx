"use client"

import { useState } from "react"
import type { PlayerStats } from "@/lib/types"

type PlayersManagerProps = {
  stats: PlayerStats[]
  onAddPlayer: (name: string) => { ok: boolean; error?: string }
}

export function PlayersManager({ stats, onAddPlayer }: PlayersManagerProps) {
  const [name, setName] = useState("")
  const [error, setError] = useState<string | null>(null)

  function handleAdd(e: React.FormEvent) {
    e.preventDefault()
    const result = onAddPlayer(name)
    if (!result.ok) {
      setError(result.error ?? "Could not add player.")
      return
    }
    setName("")
    setError(null)
  }

  return (
    <section aria-label="Players" className="rounded-2xl border border-gold/25 bg-background/50 p-5">
      <h2 className="mb-4 font-display text-lg font-black tracking-wide text-gold gold-glow">PLAYERS</h2>

      <form onSubmit={handleAdd} className="mb-4 flex gap-2">
        <label className="sr-only" htmlFor="new-player">
          New player name
        </label>
        <input
          id="new-player"
          value={name}
          onChange={(e) => {
            setName(e.target.value)
            if (error) setError(null)
          }}
          placeholder="Add a player…"
          className="min-w-0 flex-1 rounded-lg border border-gold/30 bg-background px-3 py-2.5 text-foreground outline-none transition-colors placeholder:text-foreground/30 focus-visible:border-gold focus-visible:ring-2 focus-visible:ring-gold/40"
        />
        <button
          type="submit"
          className="shrink-0 rounded-lg bg-gold px-4 py-2.5 font-display font-bold text-background transition-colors hover:bg-gold-light"
        >
          Add
        </button>
      </form>
      {error ? <p className="mb-3 text-sm text-led">{error}</p> : null}

      <ul className="flex flex-col gap-1.5">
        {stats.map((p) => (
          <li
            key={p.id}
            className="flex items-center justify-between rounded-lg border border-foreground/10 bg-background/40 px-3 py-2"
          >
            <span className="truncate font-medium text-foreground">{p.name}</span>
            <span className="shrink-0 font-display text-xs tabular-nums text-foreground/55">
              {p.played}P · {p.wins}W · {p.losses}L · {p.points}pts
            </span>
          </li>
        ))}
      </ul>
    </section>
  )
}
