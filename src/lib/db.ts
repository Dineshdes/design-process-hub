import fs from 'fs'
import path from 'path'

const DB_PATH = path.join(process.cwd(), 'src/data/db.json')

export interface Project {
  id: string
  name: string
  client: string
  websiteType: string
  createdAt: string
  activePhase: number
  status: string
  scopeDoc?: string
}

export interface Designer {
  id: string
  name: string
  role: string
  color: string
}

export interface QnaQuestion {
  id: string
  text: string
}

export interface QnaSection {
  section: string
  icon: string
  description: string
  questions: QnaQuestion[]
}

export interface Questionnaire {
  id: string
  token: string
  projectId: string
  projectName: string
  sections: QnaSection[]
  answers: Record<string, string>
  createdAt: string
  submittedAt?: string
}

export interface DB {
  projects: Project[]
  designers: Designer[]
  projectDesigners: { projectId: string; designerId: string }[]
  questionnaires: Questionnaire[]
}

export function readDB(): DB {
  try {
    const raw = JSON.parse(fs.readFileSync(DB_PATH, 'utf-8'))
    return { questionnaires: [], ...raw }
  } catch {
    return { projects: [], designers: [], projectDesigners: [], questionnaires: [] }
  }
}

export function writeDB(db: DB): void {
  fs.mkdirSync(path.dirname(DB_PATH), { recursive: true })
  fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2))
}
