"use client"

import type { Match } from "@/lib/types"

function formatDate(ts: number): string {
  return new Date(ts).toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  })
}

type RecentMatchesProps = {
  matches: Match[]
  onClearHistory: () => void
}

export function RecentMatches({ matches, onClearHistory }: RecentMatchesProps) {
  return (
    <section
      aria-label="Recent matches"
      className="rounded-2xl border border-gold/25 bg-background/50 p-5"
    >
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-display text-lg font-black tracking-wide text-gold gold-glow">
          RECENT MATCHES
        </h2>
        {matches.length > 0 ? (
          <button
            type="button"
            onClick={onClearHistory}
            className="font-display text-[10px] font-semibold tracking-widest text-foreground/45 transition-colors hover:text-led"
          >
            CLEAR
          </button>
        ) : null}
      </div>

      {matches.length === 0 ? (
        <p className="py-6 text-center text-sm text-foreground/45">
          No matches yet. Submit a match to build the history.
        </p>
      ) : (
        <ul className="flex flex-col gap-2">
          {matches.map((m) => {
            const p1Won = m.winnerId === m.player1Id
            return (
              <li
                key={m.id}
                className="animate-rise-in rounded-xl border border-foreground/10 bg-background/40 p-3"
              >
                <div className="mb-1.5 flex items-center justify-between">
                  <span className="text-[10px] tracking-widest text-foreground/40">
                    {formatDate(m.playedAt)}
                  </span>
                  <span className="rounded-full bg-gold/15 px-2 py-0.5 font-display text-[10px] font-bold tracking-wide text-gold-light">
                    RACE {m.raceTo}
                  </span>
                </div>
                <div className="flex items-center justify-between gap-2">
                  <span className={`truncate font-display font-bold ${p1Won ? "text-gold-light" : "text-foreground/60"}`}>
                    {m.player1Name}
                  </span>
                  <span className="shrink-0 font-display text-lg font-black tabular-nums text-foreground">
                    {m.score1} <span className="text-foreground/40">—</span> {m.score2}
                  </span>
                  <span className={`truncate text-right font-display font-bold ${!p1Won ? "text-gold-light" : "text-foreground/60"}`}>
                    {m.player2Name}
                  </span>
                </div>
                <p className="mt-1 text-center text-[11px] text-foreground/50">
                  Winner: <span className="font-semibold text-gold">{m.winnerName}</span>
                </p>
              </li>
            )
          })}
        </ul>
      )}
    </section>
  )
}
