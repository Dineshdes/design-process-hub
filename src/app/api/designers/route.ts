import { NextRequest, NextResponse } from 'next/server'
import { readDB, writeDB, Designer } from '@/lib/db'

const COLORS = ['#0500FF','#E53935','#00897B','#8E24AA','#F4511E','#039BE5','#43A047','#FB8C00']

export async function GET() {
  const db = readDB()
  return NextResponse.json(db.designers)
}

export async function POST(req: NextRequest) {
  const body = await req.json()
  const db = readDB()
  const designer: Designer = {
    id: Date.now().toString(),
    name: body.name,
    role: body.role || '',
    color: COLORS[db.designers.length % COLORS.length],
  }
  db.designers.push(designer)
  writeDB(db)
  return NextResponse.json(designer)
}
