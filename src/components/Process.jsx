import { useEffect, useRef } from 'react'

const steps = [
  {
    num: 1,
    title: 'Data Intake',
    desc: 'We receive superbills, fee tickets, or direct EHR export — securely via HIPAA-compliant file transfer.',
    white: true,
  },
  {
    num: 2,
    title: 'Charge Entry & Coding',
    desc: 'CPT, ICD-10, and modifier assignment verified against payer-specific requirements within 24 hours.',
    white: true,
  },
  {
    num: 3,
    title: 'Claims Submission',
    desc: 'Clean claims submitted electronically to all major payers with real-time eligibility verification.',
    white: true,
  },
  {
    num: 4,
    title: 'Payment Posting',
    desc: 'ERA and EOB payments posted line by line. Adjustments applied. Balances updated immediately.',
    white: true,
  },
  {
    num: 5,
    title: 'Denial Management',
    desc: 'Denied claims triaged by code and payer. Corrections made and resubmitted within our SLA window.',
    white: true,
  },
  {
    num: 6,
    title: 'AR Follow-Up & Reporting',
    desc: 'Outstanding claims pursued through 120+ days. Monthly reports delivered with full performance breakdown.',
    white: true,
  },
]

export default function Process({ onLearnMore = () => {} }) {
  const sectionRef = useRef(null)

  useEffect(() => {
    const items = sectionRef.current?.querySelectorAll('.animate-on-scroll') || []
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.1 }
    )
    items.forEach((el, i) => {
      el.style.transitionDelay = `${i * 0.1}s`
      obs.observe(el)
    })
    return () => obs.disconnect()
  }, [])

  const scrollToContact = () => {
    const el = document.getElementById('contact')
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' })
  }

  return (
    <section id="process" className="bg-white py-20" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-14">
          <p className="font-inter font-semibold uppercase text-xs tracking-widest mb-3 animate-on-scroll"
             style={{ color: '#009BDE', letterSpacing: '0.18em' }}>
            Our Process
          </p>
          <h2 className="font-montserrat font-bold mb-4 animate-on-scroll"
              style={{ color: '#003388', fontSize: 'clamp(1.8rem, 3vw, 2.5rem)' }}>
            From Superbill to Collections — Our 6-Step Process
          </h2>
          <p className="font-inter text-gray-500 text-lg max-w-2xl mx-auto animate-on-scroll">
            A proven, transparent workflow that maximizes reimbursements at every stage.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {steps.map((step) => (
            <div
              key={step.num}
              className="process-step animate-on-scroll rounded-2xl p-7 cursor-pointer"
              style={{ backgroundColor: '#EEF3F8' }}
              onClick={() => onLearnMore(step.title)}
            >
              {/* Step badge */}
              <div
                className="w-11 h-11 rounded-full flex items-center justify-center font-montserrat font-bold text-base mb-5"
                style={{ backgroundColor: '#003388', color: step.white ? '#FFFFFF' : '#00D084' }}
              >
                {step.num}
              </div>
              <h3 className="font-montserrat font-bold text-base mb-2" style={{ color: '#003388' }}>
                {step.title}
              </h3>
              <p className="font-inter text-sm text-gray-500 leading-relaxed mb-5">{step.desc}</p>
              <span className="process-arrow font-inter text-sm font-semibold" style={{ color: '#E87722' }}>
                Learn More ›
              </span>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center animate-on-scroll">
          <button
            onClick={scrollToContact}
            className="font-montserrat font-bold text-white px-10 py-4 rounded-lg text-lg transition-all duration-200"
            style={{ backgroundColor: '#009BDE' }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#0080B8')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#009BDE')}
          >
            Start Your Free AR Audit Today
          </button>
        </div>

      </div>
    </section>
  )
}
