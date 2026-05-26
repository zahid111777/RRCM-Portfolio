import { useEffect, useRef } from 'react'

const reasons = [
  {
    icon: '🎯',
    title: 'Specialized in Medical Billing Only',
    desc: 'We do one thing and do it exceptionally — medical billing. No distractions, no generalist approach.',
  },
  {
    icon: '📞',
    title: 'Dedicated Account Manager',
    desc: 'Every client has a named account manager available during US business hours for calls, emails, and reports.',
  },
  {
    icon: '📈',
    title: 'Performance-Driven Model',
    desc: 'Our fees are tied to your collections — we only win when you win. Full transparency, zero hidden costs.',
  },
  {
    icon: '🔄',
    title: 'Seamless EHR Integration',
    desc: 'We work with all major EHR systems — Epic, Athena, eClinicalWorks, Kareo, Practice Fusion, and more.',
  },
]

export default function WhyUs() {
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
    <section id="why-us" style={{ backgroundColor: '#F5F7FA' }} className="py-20" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left — Stacked Cards (shown below on mobile) */}
          <div className="relative flex justify-center order-2 lg:order-1" style={{ minHeight: '340px' }}>
            {/* Back card */}
            <div
              className="card-back absolute w-72 rounded-xl p-7 shadow-lg"
              style={{ backgroundColor: '#003388', top: '0', left: '50%', transform: 'translateX(-50%) rotate(-3deg) translateY(8px)' }}
            >
              <p className="font-montserrat font-bold text-3xl" style={{ color: '#00D084' }}>97.3%</p>
              <p className="font-inter text-white text-sm mt-2">Collections Rate</p>
            </div>

            {/* Middle card */}
            <div
              className="card-mid absolute w-72 rounded-xl p-7 shadow-lg"
              style={{ backgroundColor: '#009BDE', top: '12px', left: '50%', transform: 'translateX(-50%) rotate(1deg) translateY(4px)' }}
            >
              <p className="font-montserrat font-bold text-3xl text-white">2.1%</p>
              <p className="font-inter text-white/80 text-sm mt-2">Denial Rate</p>
            </div>

            {/* Front card */}
            <div
              className="absolute w-72 rounded-xl p-7 shadow-xl bg-white"
              style={{ top: '24px', left: '50%', transform: 'translateX(-50%)' }}
            >
              <p className="font-montserrat font-bold text-sm mb-4" style={{ color: '#003388' }}>Our Promise to You</p>
              <ul className="space-y-2">
                {[
                  'No long-term contracts',
                  'Dedicated account manager',
                  'Monthly performance reviews',
                  '48-hour onboarding',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2 font-inter text-sm" style={{ color: '#1C1B1F' }}>
                    <span style={{ color: '#009BDE' }} className="font-bold">✓</span> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right — Reasons List */}
          <div className="order-1 lg:order-2">
            <p
              className="font-inter font-semibold uppercase text-xs tracking-widest mb-3 animate-on-scroll"
              style={{ color: '#009BDE', letterSpacing: '0.18em' }}
            >
              Why Resolution RCM &amp; AI
            </p>
            <h2
              className="font-montserrat font-bold mb-8 animate-on-scroll"
              style={{ color: '#003388', fontSize: 'clamp(1.5rem, 2.5vw, 2.25rem)' }}
            >
              More Than a Billing Company — Your Revenue Partner
            </h2>

            <div className="space-y-6">
              {reasons.map((reason, i) => (
                <div key={reason.title} className="flex gap-4 animate-on-scroll">
                  <div
                    className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                    style={{ backgroundColor: 'rgba(0, 155, 222, 0.1)' }}
                  >
                    {reason.icon}
                  </div>
                  <div>
                    <h3 className="font-montserrat font-bold text-base mb-1" style={{ color: '#003388' }}>
                      {reason.title}
                    </h3>
                    <p className="font-inter text-sm text-gray-500 leading-relaxed">{reason.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={scrollToContact}
              className="mt-8 font-inter font-semibold text-white px-7 py-3.5 rounded-lg transition-all duration-200 animate-on-scroll"
              style={{ backgroundColor: '#009BDE' }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#0080B8')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#009BDE')}
            >
              Schedule a Free 30-Min Consultation
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
