import { useState, useEffect, useRef } from 'react'

const kpis = [
  { label: 'Collections Rate', target: 97.3, decimals: 1, suffix: '%',   trend: '↑', trendColor: '#003388', trendLabel: 'vs last month' },
  { label: 'Denial Rate',      target: 2.1,  decimals: 1, suffix: '%',   trend: '↓', trendColor: '#003388', trendLabel: 'lower is better' },
  { label: 'AR Days',          target: 18,   decimals: 0, suffix: ' Days',trend: '→', trendColor: '#009BDE', trendLabel: 'on target' },
  { label: 'Appeals Won',      target: 94,   decimals: 0, suffix: '%',   trend: '★', trendColor: '#003388', trendLabel: 'gold standard' },
]

function AnimatedValue({ target, decimals, suffix, run }) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!run) return
    let start = null
    const duration = 1800
    const step = (ts) => {
      if (!start) start = ts
      const progress = Math.min((ts - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(parseFloat((eased * target).toFixed(decimals)))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [run, target, decimals])
  return <>{count}{suffix}</>
}

export default function Hero() {
  const cardRef = useRef(null)
  const [animRun, setAnimRun] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setAnimRun(true), 600)
    return () => clearTimeout(timer)
  }, [])

  const scrollTo = (id) => {
    const el = document.getElementById(id)
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 80
      window.scrollTo({ top: y, behavior: 'smooth' })
    }
  }

  return (
    <section
      className="hero-pattern min-h-screen flex items-center"
      style={{ paddingTop: '140px', paddingBottom: '80px' }}
    >
      <div className="max-w-7xl mx-auto px-6 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Left Column */}
          <div>
            <h1 className="font-montserrat font-bold text-white mb-6 leading-tight"
                style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}>
              <div className="hero-line hero-line-1">Maximize Revenue.</div>
              <div className="hero-line hero-line-2">Minimize Denials.</div>
              <div className="hero-line hero-line-3" style={{ color: '#009BDE' }}>Trusted RCM Experts.</div>
            </h1>

            <p className="hero-sub font-inter text-lg mb-8 leading-relaxed" style={{ color: '#CBD5E0' }}>
              End-to-end medical billing services for US practices — accurate charge posting,
              aggressive AR follow-up, and expert denial management. All in one team.
            </p>

            <div className="hero-btns flex flex-wrap gap-4 mb-8">
              <button
                onClick={() => scrollTo('contact')}
                className="pulse-btn font-inter font-semibold text-white px-7 py-3.5 rounded-lg transition-all duration-200"
                style={{ backgroundColor: '#009BDE' }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#0080B8')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#009BDE')}
              >
                Get a Free AR Audit
              </button>
              <button
                onClick={() => scrollTo('services')}
                className="font-inter font-semibold text-white px-7 py-3.5 rounded-lg border border-white transition-all duration-200"
                style={{ backgroundColor: 'transparent' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'white'
                  e.currentTarget.style.color = '#003388'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent'
                  e.currentTarget.style.color = 'white'
                }}
              >
                See Our Services
              </button>
            </div>

            <div className="hero-trust flex flex-wrap gap-6">
              {[
                'HIPAA Compliant',
                '97%+ Collection Rate',
                'US-Based Clients',
              ].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <span style={{ color: '#009BDE' }} className="text-lg">✓</span>
                  <span className="font-inter text-sm font-medium" style={{ color: '#CBD5E0' }}>
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column — Dashboard Card */}
          <div className="flex justify-center lg:justify-end">
            <div
              ref={cardRef}
              className="dashboard-float rounded-2xl p-6 w-full max-w-sm"
              style={{
                backgroundColor: '#FFFFFF',
                boxShadow: '0 8px 40px rgba(0, 51, 136, 0.15), 0 2px 8px rgba(0,0,0,0.06)',
                border: '1px solid #E5E7EB',
              }}
            >
              {/* Card header */}
              <div className="flex items-center justify-between mb-5">
                <span className="font-inter text-xs font-semibold uppercase tracking-widest" style={{ color: '#009BDE' }}>
                  ● Live Practice Overview
                </span>
                <span className="text-xs font-inter px-2 py-0.5 rounded-full font-medium" style={{ backgroundColor: '#EBF5FF', color: '#003388' }}>
                  Live
                </span>
              </div>

              {/* KPI Grid */}
              <div className="grid grid-cols-2 gap-3">
                {kpis.map((kpi) => (
                  <div
                    key={kpi.label}
                    className="rounded-xl p-4"
                    style={{ backgroundColor: '#F5F7FA', border: '1px solid #E5E7EB' }}
                  >
                    <p className="font-inter text-xs mb-2" style={{ color: '#8090A1' }}>{kpi.label}</p>
                    <p className="font-montserrat font-bold text-2xl mb-1" style={{ color: '#003388' }}>
                      <AnimatedValue target={kpi.target} decimals={kpi.decimals} suffix={kpi.suffix} run={animRun} />
                    </p>
                    <div className="flex items-center gap-1">
                      <span style={{ color: kpi.trendColor }} className="text-sm font-bold">{kpi.trend}</span>
                      <span className="font-inter text-xs" style={{ color: '#8090A1' }}>{kpi.trendLabel}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Bottom bar */}
              <div
                className="mt-4 rounded-xl p-4 flex items-center justify-between"
                style={{ backgroundColor: '#EFF8FF', border: '1px solid #BFDFFF' }}
              >
                <span className="font-inter text-xs font-medium" style={{ color: '#003388' }}>Monthly Claims Processed</span>
                <span className="font-montserrat font-bold text-lg" style={{ color: '#009BDE' }}>
                  {animRun ? '$50M+' : '$0'}
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
