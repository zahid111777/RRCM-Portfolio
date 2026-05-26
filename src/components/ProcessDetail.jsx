import { useEffect } from 'react'
import { processData } from '../data/processData'

export default function ProcessDetail({ stepKey, onBack, onContact }) {
  const step = processData.find((s) => s.key === stepKey)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  if (!step) return null

  return (
    <main style={{ paddingTop: '80px' }}>

      {/* ── Breadcrumb bar ── */}
      <div style={{ backgroundColor: '#002775', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center gap-2">
          <button
            onClick={onBack}
            className="font-inter text-xs font-medium transition-colors duration-200"
            style={{ color: '#94B4D4', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#FFFFFF')}
            onMouseLeave={(e) => (e.currentTarget.style.color = '#94B4D4')}
          >
            Our Process
          </button>
          <span style={{ color: '#4A6080', fontSize: '0.75rem' }}>›</span>
          <span className="font-inter text-xs" style={{ color: '#FFFFFF' }}>Step {step.num}: {step.key}</span>
        </div>
      </div>

      {/* ── Hero Header ── */}
      <section className="hero-pattern py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            {/* Left — text */}
            <div>
              <span
                className="inline-flex items-center gap-2 font-inter text-xs font-semibold uppercase tracking-widest px-3 py-1.5 rounded-full mb-6"
                style={{ backgroundColor: 'rgba(0,155,222,0.15)', color: '#009BDE', letterSpacing: '0.14em' }}
              >
                <span style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: '#009BDE', display: 'inline-block' }} />
                Step {step.num} of 6
              </span>

              <h1
                className="font-montserrat font-bold text-white mb-5"
                style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.4rem)', lineHeight: 1.12 }}
              >
                {step.key}
              </h1>

              <p className="font-inter text-lg leading-relaxed mb-8" style={{ color: '#B8D0E8', maxWidth: '520px' }}>
                {step.subtitle}
              </p>

              <div className="flex flex-wrap gap-3">
                <button
                  onClick={onContact}
                  className="font-inter font-semibold text-white px-7 py-3 rounded-xl transition-all duration-200"
                  style={{ backgroundColor: '#009BDE' }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#0080B8')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#009BDE')}
                >
                  Book a Free Audit
                </button>
                <button
                  onClick={onBack}
                  className="font-inter font-semibold px-7 py-3 rounded-xl border border-white transition-all duration-200"
                  style={{ color: 'white', background: 'transparent' }}
                  onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'white'; e.currentTarget.style.color = '#003388' }}
                  onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = 'white' }}
                >
                  ← All Steps
                </button>
              </div>
            </div>

            {/* Right — icon card */}
            <div className="flex justify-center lg:justify-end">
              <div
                className="rounded-2xl p-8 w-full max-w-xs text-center"
                style={{ backgroundColor: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', backdropFilter: 'blur(8px)' }}
              >
                <div
                  className="w-24 h-24 rounded-2xl flex items-center justify-center text-5xl mx-auto mb-6"
                  style={{ backgroundColor: 'rgba(0,155,222,0.18)' }}
                >
                  {step.icon}
                </div>
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center font-montserrat font-bold text-base mx-auto mb-3"
                  style={{ backgroundColor: '#003388', color: '#FFFFFF', border: '2px solid rgba(255,255,255,0.2)' }}
                >
                  {step.num}
                </div>
                <p className="font-montserrat font-bold text-white text-lg mb-2">{step.key}</p>
                <p className="font-inter text-xs mb-6" style={{ color: '#8FB8D8' }}>Resolution RCM &amp; AI</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {step.benefits.slice(0, 4).map((b) => (
                    <div key={b} className="flex items-start gap-1.5 text-left">
                      <span style={{ color: '#009BDE', flexShrink: 0, marginTop: '1px' }}>✓</span>
                      <span className="font-inter text-xs leading-snug" style={{ color: '#B8D0E8' }}>{b}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── Overview + Sidebar ── */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

            {/* Paragraphs — 2/3 width */}
            <div className="lg:col-span-2">
              <p
                className="font-inter font-semibold uppercase text-xs tracking-widest mb-6"
                style={{ color: '#009BDE', letterSpacing: '0.18em' }}
              >
                Step Overview
              </p>
              <div className="space-y-5">
                {step.paragraphs.map((para, i) => (
                  <p key={i} className="font-inter leading-relaxed" style={{ color: '#4A5568', fontSize: '1rem' }}>
                    {para}
                  </p>
                ))}
              </div>
            </div>

            {/* Sticky sidebar — 1/3 */}
            <div className="lg:col-span-1">
              <div
                className="rounded-2xl p-7 sticky top-24"
                style={{ backgroundColor: '#EEF3F8' }}
              >
                <p
                  className="font-inter font-semibold uppercase text-xs tracking-widest mb-5"
                  style={{ color: '#009BDE', letterSpacing: '0.15em' }}
                >
                  Key Benefits
                </p>
                <ul className="space-y-3 mb-6">
                  {step.benefits.map((b) => (
                    <li key={b} className="flex items-start gap-3">
                      <span style={{ color: '#009BDE', fontSize: '1rem', marginTop: '1px' }}>✓</span>
                      <span className="font-inter text-sm" style={{ color: '#374151' }}>{b}</span>
                    </li>
                  ))}
                </ul>

                <div style={{ height: '1px', backgroundColor: '#D1DCE8', marginBottom: '1.25rem' }} />

                <button
                  onClick={onContact}
                  className="w-full font-inter font-semibold text-white py-3 rounded-xl transition-all duration-200"
                  style={{ backgroundColor: '#009BDE' }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#0080B8')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#009BDE')}
                >
                  Book a Free Audit →
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── Key Features Cards ── */}
      <section className="py-16" style={{ backgroundColor: '#F5F7FA' }}>
        <div className="max-w-7xl mx-auto px-6">

          <div className="text-center mb-12">
            <p
              className="font-inter font-semibold uppercase text-xs tracking-widest mb-3"
              style={{ color: '#009BDE', letterSpacing: '0.18em' }}
            >
              What Sets Us Apart
            </p>
            <h2
              className="font-montserrat font-bold"
              style={{ color: '#003388', fontSize: 'clamp(1.5rem, 2.5vw, 2rem)' }}
            >
              Key Features of Our {step.key} Process
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {step.highlights.map((h) => (
              <div
                key={h.title}
                className="process-step rounded-2xl p-8 cursor-default"
                style={{ backgroundColor: '#EEF3F8' }}
              >
                <div className="text-4xl mb-5">{h.icon}</div>
                <h3
                  className="font-montserrat font-bold text-base mb-3"
                  style={{ color: '#003388' }}
                >
                  {h.title}
                </h3>
                <p className="font-inter text-sm leading-relaxed" style={{ color: '#6B7280' }}>
                  {h.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Step navigation ── */}
      <section className="py-10 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <p className="font-inter font-semibold uppercase text-xs tracking-widest mb-6 text-center" style={{ color: '#009BDE', letterSpacing: '0.18em' }}>
            Explore All Steps
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {processData.map((s) => (
              <button
                key={s.key}
                onClick={() => { window.scrollTo(0, 0); window.dispatchEvent(new CustomEvent('navigate-process', { detail: s.key })) }}
                className="font-inter text-sm font-medium px-4 py-2 rounded-full transition-all duration-200"
                style={{
                  backgroundColor: s.key === step.key ? '#003388' : '#EEF3F8',
                  color: s.key === step.key ? '#FFFFFF' : '#003388',
                  border: s.key === step.key ? '1.5px solid #003388' : '1.5px solid #D1DCE8',
                }}
                onMouseEnter={(e) => { if (s.key !== step.key) { e.currentTarget.style.backgroundColor = '#D6E6F5'; e.currentTarget.style.borderColor = '#009BDE' } }}
                onMouseLeave={(e) => { if (s.key !== step.key) { e.currentTarget.style.backgroundColor = '#EEF3F8'; e.currentTarget.style.borderColor = '#D1DCE8' } }}
              >
                {s.num}. {s.key}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="hero-pattern py-16">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2
            className="font-montserrat font-bold text-white mb-4"
            style={{ fontSize: 'clamp(1.5rem, 3vw, 2.2rem)' }}
          >
            Ready to Optimize Your Revenue Cycle?
          </h2>
          <p className="font-inter text-lg mb-10" style={{ color: '#CBD5E0' }}>
            Our RCM experts are ready to transform your billing performance — starting today.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <button
              onClick={onContact}
              className="font-inter font-semibold text-white px-8 py-3.5 rounded-xl transition-all duration-200"
              style={{ backgroundColor: '#009BDE' }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#0080B8')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#009BDE')}
            >
              Book a Free Audit
            </button>
            <button
              onClick={onBack}
              className="font-inter font-semibold px-8 py-3.5 rounded-xl border border-white transition-all duration-200"
              style={{ color: 'white', background: 'transparent' }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'white'; e.currentTarget.style.color = '#003388' }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = 'white' }}
            >
              ← Back to Process
            </button>
          </div>
        </div>
      </section>

    </main>
  )
}
