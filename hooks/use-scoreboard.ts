"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import { createId, getDefaultState, loadState, saveState } from "@/lib/storage"
import { computeStats } from "@/lib/stats"
import type { Match, ScoreboardState } from "@/lib/types"

export type SubmitResult =
  | { ok: true; match: Match }
  | { ok: false; error: string }

export function useScoreboard() {
  const [state, setState] = useState<ScoreboardState>(getDefaultState)
  const [hydrated, setHydrated] = useState(false)

  // Current (in-progress) match — not persisted. Open-ended scoring, no target.
  const [player1Id, setPlayer1Id] = useState<string>("")
  const [player2Id, setPlayer2Id] = useState<string>("")
  const [score1, setScore1] = useState(0)
  const [score2, setScore2] = useState(0)

  // Load persisted state on mount.
  useEffect(() => {
    const loaded = loadState()
    setState(loaded)
    setPlayer1Id(loaded.players[0]?.id ?? "")
    setPlayer2Id(loaded.players[1]?.id ?? "")
    setHydrated(true)
  }, [])

  // Persist whenever state changes (after hydration).
  useEffect(() => {
    if (hydrated) saveState(state)
  }, [state, hydrated])

  const stats = useMemo(
    () => computeStats(state.players, state.matches),
    [state.players, state.matches],
  )

  const player1 = state.players.find((p) => p.id === player1Id) ?? null
  const player2 = state.players.find((p) => p.id === player2Id) ?? null

  // Player currently ahead in the in-progress match (open-ended, no target).
  // Used only for a live "leading" highlight; the winner is finalized on submit.
  const liveWinnerId = useMemo(() => {
    if (player1Id === player2Id) return null
    if (score1 === score2) return null
    if (Math.max(score1, score2) <= 0) return null
    return score1 > score2 ? player1Id : player2Id
  }, [score1, score2, player1Id, player2Id])

  const setScore = useCallback((side: 1 | 2, next: number) => {
    // Scores are open-ended but can never go below zero.
    const clamped = Math.max(0, next)
    if (side === 1) setScore1(clamped)
    else setScore2(clamped)
  }, [])

  const changeScore = useCallback(
    (side: 1 | 2, delta: number) => {
      const current = side === 1 ? score1 : score2
      setScore(side, current + delta)
    },
    [score1, score2, setScore],
  )

  const resetMatch = useCallback(() => {
    setScore1(0)
    setScore2(0)
  }, [])

  const submitMatch = useCallback((): SubmitResult => {
    if (!player1Id || !player2Id) {
      return { ok: false, error: "Select both players before submitting." }
    }
    if (player1Id === player2Id) {
      return { ok: false, error: "Please select two different players." }
    }
    if (score1 === score2) {
      return { ok: false, error: "Scores are tied. One player must be ahead to submit." }
    }

    const p1 = state.players.find((p) => p.id === player1Id)
    const p2 = state.players.find((p) => p.id === player2Id)
    if (!p1 || !p2) return { ok: false, error: "Selected player not found." }

    const winnerIsP1 = score1 > score2
    const match: Match = {
      id: createId(),
      playedAt: Date.now(),
      player1Id: p1.id,
      player1Name: p1.name,
      player2Id: p2.id,
      player2Name: p2.name,
      score1,
      score2,
      winnerId: winnerIsP1 ? p1.id : p2.id,
      winnerName: winnerIsP1 ? p1.name : p2.name,
    }

    setState((prev) => ({ ...prev, matches: [match, ...prev.matches] }))
    resetMatch()
    return { ok: true, match }
  }, [player1Id, player2Id, score1, score2, state.players, resetMatch])

  const addPlayer = useCallback(
    (name: string): { ok: boolean; error?: string } => {
      const trimmed = name.trim()
      if (!trimmed) return { ok: false, error: "Enter a player name." }
      const exists = state.players.some(
        (p) => p.name.toLowerCase() === trimmed.toLowerCase(),
      )
      if (exists) return { ok: false, error: "That player already exists." }
      setState((prev) => ({
        ...prev,
        players: [...prev.players, { id: createId(), name: trimmed }],
      }))
      return { ok: true }
    },
    [state.players],
  )

  const clearHistory = useCallback(() => {
    setState((prev) => ({ ...prev, matches: [] }))
  }, [])

  const resetAll = useCallback(() => {
    const fresh = getDefaultState()
    setState(fresh)
    setPlayer1Id(fresh.players[0]?.id ?? "")
    setPlayer2Id(fresh.players[1]?.id ?? "")
    resetMatch()
  }, [resetMatch])

  return {
    hydrated,
    players: state.players,
    matches: state.matches,
    stats,
    // current match
    player1,
    player2,
    player1Id,
    player2Id,
    score1,
    score2,
    liveWinnerId,
    // actions
    setPlayer1Id,
    setPlayer2Id,
    changeScore,
    resetMatch,
    submitMatch,
    addPlayer,
    clearHistory,
    resetAll,
  }
}
