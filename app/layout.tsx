import type { Metadata, Viewport } from "next"
import { Orbitron, Inter } from "next/font/google"
import type { ReactNode } from "react"
import "./globals.css"

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
  weight: ["400", "500", "700", "800", "900"],
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "Plangketa Crew — Billiards Scoreboard",
  description:
    "Live digital billiards scoreboard for the Plangketa Crew. Track matches, rankings, and stats in a premium pool-hall interface.",
  generator: "v0.app",
}

export const viewport: Viewport = {
  themeColor: "#0a0b0a",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="bg-background">
      <body className={`${orbitron.variable} ${inter.variable} antialiased`}>{children}</body>
    </html>
  )
}
