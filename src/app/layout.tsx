import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Verdant — Sustainable Solutions Platform',
  description: 'AI-powered sustainability intelligence for a low-carbon world',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
