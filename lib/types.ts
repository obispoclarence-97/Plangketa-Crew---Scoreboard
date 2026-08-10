export type Player = {
  id: string
  name: string
}

export type Match = {
  id: string
  playedAt: number
  player1Id: string
  player1Name: string
  player2Id: string
  player2Name: string
  score1: number
  score2: number
  /**
   * Legacy field from the old "Race to" format. Kept optional so previously
   * stored matches still parse — new matches never set it.
   */
  raceTo?: number
  winnerId: string
  winnerName: string
}

/** Aggregated, derived stats for a single player. */
export type PlayerStats = {
  id: string
  name: string
  played: number
  wins: number
  losses: number
  points: number
  winPct: number
  /**
   * Cumulative point margin across all matches: for every match a player is in,
   * add (their score − opponent score). Winners gain, losers lose. This is a
   * running total derived from the full match history, never reset on its own.
   */
  margin: number
  rank: number
}

export type ScoreboardState = {
  players: Player[]
  matches: Match[]
}
