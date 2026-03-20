import { NextRequest, NextResponse } from 'next/server'
import { readDB, writeDB } from '@/lib/db'

export async function GET(_req: NextRequest, { params }: { params: Promise<{ token: string }> }) {
  const { token } = await params
  const db = readDB()
  const q = db.questionnaires.find(q => q.token === token)
  if (!q) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json(q)
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ token: string }> }) {
  const { token } = await params
  const { answers } = await req.json()
  const db = readDB()
  const idx = db.questionnaires.findIndex(q => q.token === token)
  if (idx === -1) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  db.questionnaires[idx] = {
    ...db.questionnaires[idx],
    answers,
    submittedAt: new Date().toISOString(),
  }
  writeDB(db)
  return NextResponse.json({ ok: true })
}
