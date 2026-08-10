"use client"

import type { Match, PlayerStats } from "@/lib/types"
import { formatMargin, marginColorClass } from "@/lib/stats"

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
valueClassName = "text-foreground",
}: {
label: string
value: string
sub?: string
valueClassName?: string
}) {
return ( <div className="rounded-xl border border-foreground/10 bg-background/40 p-4"> <p className="font-display text-[10px] font-semibold tracking-[0.2em] text-foreground/45">
{label} </p>

```
  <p
    className={`mt-1 truncate font-display text-xl font-black tabular-nums ${valueClassName}`}
  >
    {value}
  </p>

  {sub ? (
    <p className="mt-1 text-xs text-foreground/45">
      {sub}
    </p>
  ) : null}
</div>
```

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
(max, m) => Math.max(max, m.score1, m.score2),
0,
)

const overallMargin = stats.reduce(
(sum, player) => sum + player.margin,
0,
)

return ( <section className="grid grid-cols-2 gap-3 lg:grid-cols-5"> <StatCard
     label="MATCHES"
     value={String(totalMatches)}
     sub="Completed matches"
   />

```
  <StatCard
    label="PLAYERS"
    value={String(totalPlayers)}
    sub="Active players"
  />

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
    label="TOP SCORE"
    value={String(highestScore)}
    sub="Highest score in a match"
  />

  <StatCard
    label="TOTAL MARGIN"
    value={formatMargin(overallMargin)}
    sub="Combined player margin"
    valueClassName={marginColorClass(overallMargin)}
  />
</section>
```

)
}
