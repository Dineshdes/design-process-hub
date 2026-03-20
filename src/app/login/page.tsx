'use client'

import { useState } from 'react'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPass, setShowPass] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => setLoading(false), 1500)
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--bg)',
      display: 'flex',
      flexDirection: 'column',
    }}>
      {/* Nav */}
      <nav id="nav" style={{ padding: '0 32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', height: 56, gap: 10 }}>
          <div style={{
            width: 28, height: 28,
            background: 'var(--blue)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <span style={{ color: '#fff', fontFamily: 'var(--mono)', fontWeight: 700, fontSize: '0.78rem' }}>DF</span>
          </div>
          <span style={{ fontWeight: 700, fontSize: '0.98rem', letterSpacing: '-0.01em' }}>DesignFlow</span>
        </div>
      </nav>

      {/* Main */}
      <main style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 24px',
      }}>
        <div style={{
          width: '100%',
          maxWidth: 400,
          animation: 'slide-in 0.35s ease forwards',
        }}>
          {/* Header */}
          <div style={{ marginBottom: 40 }}>
            <p className="label" style={{ marginBottom: 10 }}>Welcome back</p>
            <h1 style={{ fontSize: '2rem', fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.1 }}>
              Sign in to<br />your account
            </h1>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>

            {/* Email */}
            <div style={{ borderBottom: '1px solid var(--rule)', paddingBottom: 24, marginBottom: 24 }}>
              <label className="q-label" htmlFor="email">Email address</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@company.com"
                required
                className="q-input"
                style={{ fontSize: '1rem' }}
                autoComplete="email"
              />
            </div>

            {/* Password */}
            <div style={{ borderBottom: '1px solid var(--rule)', paddingBottom: 32, marginBottom: 32 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                <label className="q-label" htmlFor="password" style={{ marginBottom: 0 }}>Password</label>
                <button
                  type="button"
                  style={{
                    background: 'none', border: 'none', cursor: 'pointer',
                    fontFamily: 'var(--mono)', fontSize: '0.75rem', fontWeight: 700,
                    letterSpacing: '0.08em', textTransform: 'uppercase',
                    color: 'var(--blue)',
                  }}
                  onClick={() => setShowPass(p => !p)}
                >
                  {showPass ? 'Hide' : 'Show'}
                </button>
              </div>
              <div style={{ position: 'relative' }}>
                <input
                  id="password"
                  type={showPass ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="q-input"
                  style={{ fontSize: '1rem' }}
                  autoComplete="current-password"
                />
              </div>
              <div style={{ marginTop: 12, textAlign: 'right' }}>
                <a href="#" style={{
                  fontFamily: 'var(--mono)', fontSize: '0.78rem', fontWeight: 700,
                  letterSpacing: '0.08em', textTransform: 'uppercase',
                  color: 'var(--mid)', textDecoration: 'none',
                }}>
                  Forgot password?
                </a>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="btn-blue"
              disabled={loading}
              style={{
                width: '100%',
                padding: '14px 20px',
                fontSize: '0.9rem',
                opacity: loading ? 0.7 : 1,
                cursor: loading ? 'not-allowed' : 'pointer',
              }}
            >
              {loading ? 'Signing in…' : 'Sign in'}
            </button>
          </form>

          {/* Divider */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, margin: '28px 0' }}>
            <div className="rule" style={{ flex: 1 }} />
            <span style={{ fontFamily: 'var(--mono)', fontSize: '0.75rem', color: 'var(--dim)', letterSpacing: '0.08em' }}>OR</span>
            <div className="rule" style={{ flex: 1 }} />
          </div>

          {/* SSO */}
          <button className="btn-ghost" style={{ width: '100%', padding: '12px 20px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M15.68 8.18c0-.57-.05-1.12-.14-1.64H8v3.1h4.3a3.68 3.68 0 0 1-1.6 2.41v2h2.59c1.52-1.4 2.4-3.46 2.4-5.87z" fill="#4285F4"/>
              <path d="M8 16c2.16 0 3.97-.72 5.29-1.94l-2.58-2a4.8 4.8 0 0 1-7.17-2.52H.97v2.06A8 8 0 0 0 8 16z" fill="#34A853"/>
              <path d="M3.54 9.54A4.82 4.82 0 0 1 3.29 8c0-.54.09-1.06.25-1.54V4.4H.97A8 8 0 0 0 0 8c0 1.29.31 2.51.97 3.6l2.57-2.06z" fill="#FBBC05"/>
              <path d="M8 3.18c1.21 0 2.3.42 3.16 1.23l2.37-2.37A8 8 0 0 0 .97 4.4l2.57 2.06A4.77 4.77 0 0 1 8 3.18z" fill="#EA4335"/>
            </svg>
            Continue with Google
          </button>

          {/* Footer */}
          <p style={{ textAlign: 'center', marginTop: 32, color: 'var(--mid)', fontSize: '0.9rem' }}>
            Don&apos;t have an account?{' '}
            <a href="#" style={{ color: 'var(--blue)', fontWeight: 600, textDecoration: 'none' }}>
              Request access
            </a>
          </p>
        </div>
      </main>

      {/* Footer strip */}
      <footer style={{
        borderTop: '1px solid var(--rule)',
        padding: '16px 32px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <span style={{ fontFamily: 'var(--mono)', fontSize: '0.75rem', color: 'var(--dim)', letterSpacing: '0.06em' }}>
          © 2026 DESIGNFLOW
        </span>
        <div style={{ display: 'flex', gap: 24 }}>
          {['Privacy', 'Terms', 'Help'].map(link => (
            <a key={link} href="#" style={{
              fontFamily: 'var(--mono)', fontSize: '0.75rem', fontWeight: 700,
              letterSpacing: '0.08em', textTransform: 'uppercase',
              color: 'var(--mid)', textDecoration: 'none',
            }}>
              {link}
            </a>
          ))}
        </div>
      </footer>
    </div>
  )
}
