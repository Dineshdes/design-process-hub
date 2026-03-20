import { NextRequest, NextResponse } from 'next/server'
import { readDB, writeDB, Project } from '@/lib/db'

export async function GET() {
  const db = readDB()
  const projects = db.projects.map(p => ({
    ...p,
    designers: db.projectDesigners
      .filter(pd => pd.projectId === p.id)
      .map(pd => db.designers.find(d => d.id === pd.designerId))
      .filter(Boolean),
  }))
  return NextResponse.json(projects)
}

export async function POST(req: NextRequest) {
  const body = await req.json()
  const db = readDB()
  const project: Project = {
    id: Date.now().toString(),
    name: body.name,
    client: body.client,
    websiteType: body.websiteType,
    createdAt: new Date().toLocaleDateString('en-AU', { day: 'numeric', month: 'short', year: 'numeric' }),
    activePhase: 1,
    status: body.status || 'in-progress',
    scopeDoc: body.scopeDoc,
  }
  db.projects.push(project)
  writeDB(db)
  return NextResponse.json(project)
}
