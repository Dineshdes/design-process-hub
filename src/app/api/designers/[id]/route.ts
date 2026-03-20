import { NextRequest, NextResponse } from 'next/server'
import { readDB, writeDB } from '@/lib/db'

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const db = readDB()
  db.designers = db.designers.filter(d => d.id !== id)
  db.projectDesigners = db.projectDesigners.filter(pd => pd.designerId !== id)
  writeDB(db)
  return NextResponse.json({ ok: true })
}
