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
  raceTo: number
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
  rank: number
}

export type ScoreboardState = {
  players: Player[]
  matches: Match[]
}
