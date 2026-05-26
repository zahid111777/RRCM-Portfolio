import { useEffect, useRef } from 'react'

const services = [
  {
    icon: '📋',
    name: 'Charge Posting',
    desc: 'Accurate CPT and ICD-10 code entry with modifiers, verified against payer-specific rules before submission.',
  },
  {
    icon: '💳',
    name: 'Payment Posting',
    desc: 'ERA and EOB processing with line-item reconciliation, adjustment code application, and balance tracking.',
  },
  {
    icon: '🚫',
    name: 'Denial Management',
    desc: 'Real-time denial tracking by code and payer, with priority queuing and corrective action recommendations.',
  },
  {
    icon: '⏱️',
    name: 'AR Follow-Up',
    desc: 'Systematic aging bucket management — our specialists pursue every outstanding claim from 30 to 120+ days.',
  },
  {
    icon: '⚖️',
    name: 'Appeals Management',
    desc: 'Professional appeal letter drafting and submission with outcome tracking and payer follow-up.',
  },
  {
    icon: '📊',
    name: 'Reporting & Analytics',
    desc: 'Custom KPI dashboards and monthly reports — collections rate, denial breakdown, AR trend, and more.',
  },
  {
    icon: '🎙️',
    name: 'Medical Transcription',
    desc: 'HIPAA-compliant transcription with 24-hour turnaround, supporting all major EHR formats.',
  },
  {
    icon: '🏥',
    name: 'Credentialing Support',
    desc: 'Provider enrollment and payer credentialing management to ensure no billing gaps.',
  },
  {
    icon: '🔐',
    name: 'Client Portal Access',
    desc: 'Secure online portal for practice owners to view their financial performance in real time, 24/7.',
  },
]

export default function Services({ onLearnMore = () => {} }) {
  const gridRef = useRef(null)

  useEffect(() => {
    const cards = gridRef.current?.querySelectorAll('.service-card') || []
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.1 }
    )
    cards.forEach((card, i) => {
      card.style.transitionDelay = `${i * 0.08}s`
      obs.observe(card)
    })
    return () => obs.disconnect()
  }, [])

  const scrollToContact = () => {
    const el = document.getElementById('contact')
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 80
      window.scrollTo({ top: y, behavior: 'smooth' })
    }
  }

  return (
    <section id="services" style={{ backgroundColor: '#F5F7FA' }} className="py-20">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-14">
          <p
            className="font-inter font-semibold uppercase tracking-widest text-xs mb-3"
            style={{ color: '#009BDE', letterSpacing: '0.18em' }}
          >
            What We Offer
          </p>
          <h2
            className="font-montserrat font-bold mb-4"
              style={{ color: '#003388', fontSize: 'clamp(1.8rem, 3vw, 2.5rem)' }}
          >
            Complete RCM Services — From Charge to Collections
          </h2>
          <p className="font-inter text-gray-500 text-lg max-w-2xl mx-auto">
            We handle your entire revenue cycle so your team can focus on patient care.
          </p>
        </div>

        {/* Cards Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {services.map((svc) => (
            <div
              key={svc.name}
              className="service-card animate-on-scroll rounded-2xl p-7 transition-all duration-300 cursor-pointer"
              style={{ backgroundColor: '#EEF3F8' }}
              onClick={() => onLearnMore(svc.name)}
            >
              <div className="text-4xl mb-5">{svc.icon}</div>
              <h3
                className="font-montserrat font-bold text-lg mb-2"
                style={{ color: '#003388' }}
              >
                {svc.name}
              </h3>
              <p className="font-inter text-sm text-gray-500 leading-relaxed mb-5">{svc.desc}</p>
              <span className="service-arrow font-inter text-sm font-semibold" style={{ color: '#E87722' }}>
                Learn More ›
              </span>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <button
            onClick={scrollToContact}
            className="font-inter font-semibold text-white px-8 py-3.5 rounded-lg transition-all duration-200"
            style={{ backgroundColor: '#003388' }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#009BDE')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#003388')}
          >
            Talk to Our Billing Team
          </button>
        </div>

      </div>
    </section>
  )
}
