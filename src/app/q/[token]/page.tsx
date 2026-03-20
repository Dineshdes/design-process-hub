import { readDB } from '@/lib/db'
import ClientForm from './ClientForm'

export default async function QuestionnairePage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params
  const db = readDB()
  const q = db.questionnaires.find(q => q.token === token)

  if (!q) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Space Grotesk', system-ui, sans-serif" }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontFamily: "'Space Mono', monospace", fontSize: '2rem', color: '#B0B0C0', marginBottom: '16px' }}>◎</div>
          <div style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: '8px' }}>Questionnaire not found</div>
          <p style={{ color: '#6B6B80', fontSize: '0.9rem' }}>This link may have expired or is invalid.</p>
        </div>
      </div>
    )
  }

  return <ClientForm questionnaire={q} />
}
