"use client"

import { useEffect } from "react"

type ConfirmDialogProps = {
  open: boolean
  title: string
  message: string
  confirmLabel?: string
  cancelLabel?: string
  onConfirm: () => void
  onCancel: () => void
}

export function ConfirmDialog({
  open,
  title,
  message,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCancel()
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open, onCancel])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-title"
      onClick={onCancel}
    >
      <div
        className="wood-rail w-full max-w-md rounded-xl p-[3px] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="rounded-[10px] bg-background p-6">
          <h2 id="confirm-title" className="font-display text-xl font-bold text-gold gold-glow">
            {title}
          </h2>
          <p className="mt-3 text-pretty leading-relaxed text-foreground/80">{message}</p>
          <div className="mt-6 flex justify-end gap-3">
            <button
              type="button"
              onClick={onCancel}
              className="rounded-lg border border-foreground/20 px-5 py-2.5 font-medium text-foreground/80 transition-colors hover:bg-foreground/10"
            >
              {cancelLabel}
            </button>
            <button
              type="button"
              onClick={onConfirm}
              className="rounded-lg bg-led px-5 py-2.5 font-semibold text-background transition-transform hover:scale-105"
            >
              {confirmLabel}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
