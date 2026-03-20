import { NextRequest, NextResponse } from 'next/server'
import { readDB, writeDB, Questionnaire } from '@/lib/db'
import crypto from 'crypto'

export async function POST(req: NextRequest) {
  const body = await req.json()
  const db = readDB()

  const token = crypto.randomBytes(10).toString('hex')
  const q: Questionnaire = {
    id: Date.now().toString(),
    token,
    projectId: body.projectId,
    projectName: body.projectName,
    sections: body.sections,
    answers: {},
    createdAt: new Date().toLocaleDateString('en-AU', { day: 'numeric', month: 'short', year: 'numeric' }),
  }
  db.questionnaires.push(q)
  writeDB(db)
  return NextResponse.json({ id: q.id, token: q.token })
}
