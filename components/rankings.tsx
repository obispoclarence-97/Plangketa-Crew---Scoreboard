"use client"

import type { PlayerStats } from "@/lib/types"
import { formatMargin, marginColorClass } from "@/lib/stats"

const MEDALS: Record<number, { label: string; ring: string; bg: string }> = {
  1: { label: "1st", ring: "border-gold", bg: "bg-gold/15" },
  2: { label: "2nd", ring: "border-[#c0c6cc]", bg: "bg-[#c0c6cc]/10" },
  3: { label: "3rd", ring: "border-[#cd7f32]", bg: "bg-[#cd7f32]/10" },
}

function MedalBadge({ rank }: { rank: number }) {
  const medal = MEDALS[rank]
  if (medal) {
    const color =
      rank === 1 ? "text-gold" : rank === 2 ? "text-[#d6dbe0]" : "text-[#e0955a]"
    return (
      <span
        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 ${medal.ring} ${medal.bg} font-display text-xs font-black ${color}`}
      >
        {medal.label}
      </span>
    )
  }
  return (
    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-foreground/20 font-display text-sm font-bold text-foreground/50">
      {rank}
    </span>
  )
}

export function Rankings({ stats }: { stats: PlayerStats[] }) {
  return (
    <section aria-label="Rankings" className="rounded-2xl border border-gold/25 bg-background/50 p-5">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-display text-lg font-black tracking-wide text-gold gold-glow">RANKINGS</h2>
        <span className="font-display text-[10px] tracking-widest text-foreground/40">
          WIN% · PTS · MARGIN
        </span>
      </div>

      <ol className="flex flex-col gap-2">
        {stats.map((p) => {
          const isTop = p.rank <= 3 && p.played > 0
          return (
            <li
              key={p.id}
              className={`flex items-center gap-3 rounded-xl border p-3 transition-colors ${
                isTop ? "border-gold/30 bg-gold/5" : "border-foreground/10 bg-background/40"
              }`}
            >
              <MedalBadge rank={p.rank} />
              <div className="min-w-0 flex-1">
                <p className="truncate font-display text-base font-bold text-foreground">{p.name}</p>
                <p className="text-xs text-foreground/55">
                  {p.wins}W · {p.losses}L · {p.played} played
                </p>
              </div>
              <div className="flex items-center gap-4 text-right">
                <div className="hidden sm:block">
                  <p className="font-display text-lg font-black tabular-nums text-gold-light">
                    {p.winPct}%
                  </p>
                  <p className="text-[10px] tracking-widest text-foreground/40">WIN</p>
                </div>
                <div>
                  <p className="font-display text-lg font-black tabular-nums text-foreground">
                    {p.points}
                  </p>
                  <p className="text-[10px] tracking-widest text-foreground/40">PTS</p>
                </div>
                <div>
                  <p className={`font-display text-lg font-black tabular-nums ${marginColorClass(p.margin)}`}>
                    {formatMargin(p.margin)}
                  </p>
                  <p className="text-[10px] tracking-widest text-foreground/40">MARGIN</p>
                </div>
              </div>
            </li>
          )
        })}
      </ol>
    </section>
  )
}
