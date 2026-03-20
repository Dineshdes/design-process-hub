import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'DesignFlow — Creative Process Hub',
  description: 'AI-powered design process for senior creative leads',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
