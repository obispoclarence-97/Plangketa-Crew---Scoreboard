import type { ScoreboardState } from "./types"

/**
 * Persistence layer for the scoreboard.
 *
 * This is intentionally a thin abstraction over localStorage so the app can be
 * swapped to a remote/online backend later without touching the UI or the
 * scoreboard hook — just re-implement `loadState` and `saveState`.
 */

const STORAGE_KEY = "plangketa-crew-scoreboard/v1"

const DEFAULT_PLAYER_NAMES = ["Clarence", "Zeke", "Kyzer", "Josh"]

export function createId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID()
  }
  return `id-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
}

export function getDefaultState(): ScoreboardState {
  return {
    players: DEFAULT_PLAYER_NAMES.map((name) => ({ id: createId(), name })),
    matches: [],
  }
}

export function loadState(): ScoreboardState {
  if (typeof window === "undefined") return getDefaultState()
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return getDefaultState()
    const parsed = JSON.parse(raw) as ScoreboardState
    if (!parsed.players || !Array.isArray(parsed.players)) return getDefaultState()
    return {
      players: parsed.players,
      matches: Array.isArray(parsed.matches) ? parsed.matches : [],
    }
  } catch {
    return getDefaultState()
  }
}

export function saveState(state: ScoreboardState): void {
  if (typeof window === "undefined") return
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch {
    // Storage full or unavailable — fail silently.
  }
}
