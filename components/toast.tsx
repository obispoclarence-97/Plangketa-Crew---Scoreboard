"use client"

import { useEffect } from "react"

export type ToastData = {
  id: number
  message: string
  tone: "success" | "error"
}

export function Toast({ toast, onDismiss }: { toast: ToastData | null; onDismiss: () => void }) {
  useEffect(() => {
    if (!toast) return
    const t = setTimeout(onDismiss, 3200)
    return () => clearTimeout(t)
  }, [toast, onDismiss])

  if (!toast) return null

  const isSuccess = toast.tone === "success"

  return (
    <div
      className="fixed inset-x-0 bottom-6 z-50 flex justify-center px-4"
      role="status"
      aria-live="polite"
    >
      <div
        className={`animate-rise-in flex items-center gap-3 rounded-xl border px-5 py-3 shadow-2xl backdrop-blur ${
          isSuccess
            ? "border-gold/60 bg-felt-dark/95 text-gold-light"
            : "border-led/60 bg-background/95 text-led"
        }`}
      >
        <span
          className={`inline-block h-2.5 w-2.5 shrink-0 rounded-full ${
            isSuccess ? "bg-gold" : "bg-led"
          }`}
          aria-hidden="true"
        />
        <span className="font-medium text-balance">{toast.message}</span>
      </div>
    </div>
  )
}
