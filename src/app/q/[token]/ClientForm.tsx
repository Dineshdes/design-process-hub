'use client'
import { useState } from 'react'
import { Questionnaire } from '@/lib/db'

export default function ClientForm({ questionnaire: q }: { questionnaire: Questionnaire }) {
  const [answers, setAnswers] = useState<Record<string, string>>(q.answers ?? {})
  const [submitted, setSubmitted] = useState(!!q.submittedAt)
  const [submitting, setSubmitting] = useState(false)

  const totalQ = q.sections.reduce((n, s) => n + s.questions.length, 0)
  const answered = Object.values(answers).filter(v => v.trim()).length
  const pct = totalQ > 0 ? Math.round((answered / totalQ) * 100) : 0

  const handleSubmit = async () => {
    setSubmitting(true)
    await fetch(`/api/questionnaires/${q.token}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ answers }),
    })
    setSubmitted(true)
    setSubmitting(false)
  }

  if (submitted) {
    return (
      <div style={{ minHeight: '100vh', background: '#FAFAFA', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Space Grotesk', system-ui, sans-serif" }}>
        <div style={{ textAlign: 'center', maxWidth: '440px', padding: '40px' }}>
          <div style={{ width: '56px', height: '56px', background: '#DCFCE7', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', fontSize: '1.5rem' }}>✓</div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, letterSpacing: '-0.02em', marginBottom: '12px' }}>Answers Submitted</h2>
          <p style={{ color: '#64647A', fontSize: '0.95rem', lineHeight: 1.7 }}>
            Thank you for completing the questionnaire for <strong>{q.projectName}</strong>. Your responses have been saved and the design team will review them shortly.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', background: '#FAFAFA', fontFamily: "'Space Grotesk', system-ui, sans-serif" }}>
      {/* Header */}
      <div style={{ background: '#fff', borderBottom: '1px solid #E6E6F0', position: 'sticky', top: 0, zIndex: 10 }}>
        <div style={{ maxWidth: '760px', margin: '0 auto', padding: '0 32px', height: '56px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '24px', height: '24px', background: '#0500FF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Space Mono', monospace", fontSize: '0.65rem', fontWeight: 700, color: '#fff' }}>DF</div>
            <span style={{ fontFamily: "'Space Mono', monospace", fontWeight: 700, fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Designflow</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.68rem', color: '#64647A', letterSpacing: '0.06em' }}>{answered}/{totalQ} answered</span>
            <div style={{ width: '80px', height: '3px', background: '#E6E6F0' }}>
              <div style={{ height: '100%', background: '#0500FF', width: `${pct}%`, transition: 'width 0.3s' }} />
            </div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div style={{ maxWidth: '760px', margin: '0 auto', padding: '52px 32px 80px' }}>

        {/* Page header */}
        <div style={{ marginBottom: '48px', paddingBottom: '32px', borderBottom: '1px solid #E6E6F0' }}>
          <div style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#ABABBE', marginBottom: '10px' }}>
            Client Questionnaire · {q.projectName}
          </div>
          <h1 style={{ fontSize: 'clamp(1.6rem, 4vw, 2.4rem)', fontWeight: 700, letterSpacing: '-0.03em', textTransform: 'uppercase', marginBottom: '12px', color: '#0C0C14' }}>
            Project Brief
          </h1>
          <p style={{ fontSize: '0.95rem', color: '#64647A', lineHeight: 1.7, maxWidth: '520px' }}>
            Please take a few minutes to answer these questions. Your responses help us understand your project deeply and deliver the best possible design.
          </p>
        </div>

        {/* Sections */}
        {q.sections.map((sec, si) => (
          <div key={sec.section} style={{ marginBottom: '56px' }}>
            <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start', marginBottom: '28px' }}>
              <div style={{ minWidth: '44px' }}>
                <span style={{ fontFamily: "'Space Mono', monospace", fontSize: '1.5rem', fontWeight: 700, color: '#0500FF', lineHeight: 1 }}>{sec.icon}</span>
              </div>
              <div>
                <div style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#64647A', marginBottom: '4px' }}>{sec.section}</div>
                <p style={{ fontSize: '0.88rem', color: '#64647A', lineHeight: 1.65 }}>{sec.description}</p>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '28px', paddingLeft: '64px' }}>
              {sec.questions.map((question, qi) => (
                <div key={question.id}>
                  <label style={{ display: 'block', fontSize: '0.96rem', color: '#64647A', fontWeight: 500, marginBottom: '8px', lineHeight: 1.5 }}>
                    <span style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.72rem', color: '#0500FF', fontWeight: 700, marginRight: '8px' }}>{String(qi + 1).padStart(2, '0')}</span>
                    {question.text}
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Your answer…"
                    value={answers[question.id] || ''}
                    onChange={e => setAnswers(prev => ({ ...prev, [question.id]: e.target.value }))}
                    style={{ width: '100%', padding: '10px 14px', border: '1px solid #E6E6F0', background: '#fff', fontFamily: "'Space Grotesk', system-ui, sans-serif", fontSize: '0.95rem', color: '#0C0C14', outline: 'none', resize: 'vertical', lineHeight: 1.6, transition: 'border-color 0.15s', boxSizing: 'border-box' }}
                    onFocus={e => (e.target.style.borderColor = '#0500FF')}
                    onBlur={e => (e.target.style.borderColor = '#E6E6F0')}
                  />
                </div>
              ))}
            </div>

            {si < q.sections.length - 1 && (
              <div style={{ height: '1px', background: '#E6E6F0', marginTop: '48px' }} />
            )}
          </div>
        ))}

        {/* Submit */}
        <div style={{ paddingTop: '32px', borderTop: '1px solid #E6E6F0', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <button
            onClick={handleSubmit}
            disabled={submitting || answered === 0}
            style={{ padding: '11px 28px', background: '#0500FF', color: '#fff', border: 'none', fontFamily: "'Space Mono', monospace", fontSize: '0.82rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', cursor: answered > 0 && !submitting ? 'pointer' : 'not-allowed', opacity: answered > 0 && !submitting ? 1 : 0.35, transition: 'opacity 0.15s' }}>
            {submitting ? 'Submitting…' : 'Submit Answers →'}
          </button>
          <span style={{ fontSize: '0.82rem', color: '#ABABBE' }}>{answered} of {totalQ} questions answered</span>
        </div>
      </div>
    </div>
  )
}
