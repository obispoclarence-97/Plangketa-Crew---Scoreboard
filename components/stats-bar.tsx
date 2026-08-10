"use client"

import type { Match, PlayerStats } from "@/lib/types"

type StatsBarProps = {
  totalMatches: number
  totalPlayers: number
  stats: PlayerStats[]
  matches: Match[]
}

function StatCard({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="flex flex-col justify-between rounded-xl border border-gold/20 bg-background/50 p-4">
      <span className="font-display text-[10px] font-semibold tracking-[0.2em] text-foreground/50">
        {label}
      </span>
      <span className="mt-2 font-display text-2xl font-black text-gold-light led-glow text-gold sm:text-3xl">
        {value}
      </span>
      {sub ? <span className="mt-0.5 truncate text-xs text-foreground/60">{sub}</span> : null}
    </div>
  )
}

export function StatsBar({ totalMatches, totalPlayers, stats, matches }: StatsBarProps) {
  const leader = stats.find((s) => s.played > 0) ?? null
  const highestScore = matches.reduce((max, m) => Math.max(max, m.score1, m.score2), 0)

  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      <StatCard label="TOTAL MATCHES" value={String(totalMatches)} />
      <StatCard label="TOTAL PLAYERS" value={String(totalPlayers)} />
      <StatCard
        label="CURRENT LEADER"
        value={leader ? leader.name : "—"}
        sub={leader ? `${leader.wins}W · ${leader.winPct}%` : "No matches yet"}
      />
      <StatCard label="HIGHEST SCORE" value={String(highestScore)} />
    </div>
  )
}
