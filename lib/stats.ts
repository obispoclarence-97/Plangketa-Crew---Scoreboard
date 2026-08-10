import type { Match, Player, PlayerStats } from "./types"

/**
 * Compute per-player aggregate stats and rankings from the raw match list.
 * Rank order: wins desc, then win% desc, then total points desc, then name.
 */
export function computeStats(players: Player[], matches: Match[]): PlayerStats[] {
  const base = new Map<string, PlayerStats>()

  for (const p of players) {
    base.set(p.id, {
      id: p.id,
      name: p.name,
      played: 0,
      wins: 0,
      losses: 0,
      points: 0,
      winPct: 0,
      rank: 0,
    })
  }

  for (const m of matches) {
    const s1 = base.get(m.player1Id)
    const s2 = base.get(m.player2Id)
    if (s1) {
      s1.played += 1
      s1.points += m.score1
      if (m.winnerId === m.player1Id) s1.wins += 1
      else s1.losses += 1
    }
    if (s2) {
      s2.played += 1
      s2.points += m.score2
      if (m.winnerId === m.player2Id) s2.wins += 1
      else s2.losses += 1
    }
  }

  const list = Array.from(base.values()).map((s) => ({
    ...s,
    winPct: s.played > 0 ? Math.round((s.wins / s.played) * 100) : 0,
  }))

  list.sort((a, b) => {
    if (b.wins !== a.wins) return b.wins - a.wins
    if (b.winPct !== a.winPct) return b.winPct - a.winPct
    if (b.points !== a.points) return b.points - a.points
    return a.name.localeCompare(b.name)
  })

  list.forEach((s, i) => {
    s.rank = i + 1
  })

  return list
}
