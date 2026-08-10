"use client"

import type { Match, PlayerStats } from "@/lib/types"

type StatsBarProps = {
totalMatches: number
totalPlayers: number
stats: PlayerStats[]
matches: Match[]
}

function StatCard({
label,
value,
sub,
}: {
label: string
value: string
sub?: string
}) {
return ( <div className="rounded-xl border border-foreground/10 bg-background/40 p-4"> <p className="text-[10px] font-semibold tracking-[0.2em] text-foreground/40">
{label} </p>

```
  <p className="mt-1 font-display text-xl font-black text-gold-light">
    {value}
  </p>

  {sub ? (
    <p className="mt-1 text-xs text-foreground/50">
      {sub}
    </p>
  ) : null}
</div>

)
}

export function StatsBar({
totalMatches,
totalPlayers,
stats,
matches,
}: StatsBarProps) {
const leader = stats.find((s) => s.played > 0) ?? null

const highestScore = matches.reduce(
(max, match) => Math.max(max, match.score1, match.score2),
0,
)

const bestMargin =
stats.length > 0
? Math.max(...stats.map((player) => player.margin))
: 0

return ( <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
<StatCard
label="CURRENT LEADER"
value={leader ? leader.name : "—"}
sub={
leader
? `${leader.wins}W · ${leader.winPct}%`
: "No matches yet"
}
/>

  <StatCard
    label="MATCHES"
    value={String(totalMatches)}
    sub={`${totalPlayers} players`}
  />

  <StatCard
    label="HIGH SCORE"
    value={String(highestScore)}
    sub="Single match score"
  />

  <StatCard
    label="BEST MARGIN"
    value={bestMargin > 0 ? `+${bestMargin}` : String(bestMargin)}
    sub="Cumulative point margin"
  />
</div>

)
}
