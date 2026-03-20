import { NextRequest, NextResponse } from 'next/server'
import { readDB, writeDB } from '@/lib/db'

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const body = await req.json()
  const db = readDB()
  db.projects = db.projects.map(p => p.id === id ? { ...p, ...body } : p)
  writeDB(db)
  return NextResponse.json({ ok: true })
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const db = readDB()
  db.projects = db.projects.filter(p => p.id !== id)
  db.projectDesigners = db.projectDesigners.filter(pd => pd.projectId !== id)
  writeDB(db)
  return NextResponse.json({ ok: true })
}

// Assign or remove designer from project
export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const { designerId, action } = await req.json()
  const db = readDB()
  if (action === 'add') {
    const exists = db.projectDesigners.find(pd => pd.projectId === id && pd.designerId === designerId)
    if (!exists) db.projectDesigners.push({ projectId: id, designerId })
  } else {
    db.projectDesigners = db.projectDesigners.filter(pd => !(pd.projectId === id && pd.designerId === designerId))
  }
  writeDB(db)
  return NextResponse.json({ ok: true })
}
