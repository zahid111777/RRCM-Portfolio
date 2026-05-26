import { useEffect, useRef, useState } from 'react'

const stats = [
  { value: 97.3, suffix: '%', label: 'Collection Rate', decimals: 1 },
  { value: 2.1, suffix: '%', label: 'Average Denial Rate', decimals: 1 },
  { value: 48, suffix: ' Hrs', label: 'Claim Turnaround', decimals: 0 },
  { value: 94, suffix: '%', label: 'Appeals Success Rate', decimals: 0 },
  { value: 50, prefix: '$', suffix: 'M+', label: 'Claims Processed Monthly', decimals: 0 },
]

const badges = [
  '🔒 HIPAA Compliant',
  '✅ ISO-Certified Partner',
  '🇺🇸 US-Based Clients',
  '⭐ 10+ Years Experience',
  '🏆 98% Client Retention',
]

function useCountUp(target, decimals, duration, started) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!started) return
    let startTime = null
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(parseFloat((eased * target).toFixed(decimals)))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [started, target, decimals, duration])
  return count
}

function StatItem({ stat, started, isLast }) {
  const count = useCountUp(stat.value, stat.decimals, 2000, started)
  return (
    <div className={`flex flex-col items-center text-center px-6 md:px-8 ${!isLast ? 'md:border-r md:border-gray-300' : ''}`}>
      <span
        className="font-montserrat font-bold"
        style={{ color: '#009BDE', fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}
      >
        {stat.prefix || ''}{count}{stat.suffix}
      </span>
      <span className="font-inter text-gray-600 text-base mt-2">{stat.label}</span>
    </div>
  )
}

export default function Stats() {
  const statsRef = useRef(null)
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const el = statsRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true)
          obs.disconnect()
        }
      },
      { threshold: 0.3 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <>
      {/* Part A — Animated Stats */}
      <section ref={statsRef} style={{ backgroundColor: '#FFFFFF' }} className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap justify-center gap-y-10">
            {stats.map((stat, i) => (
              <div key={stat.label} className="w-1/2 md:w-auto flex justify-center">
                <StatItem stat={stat} started={started} isLast={i === stats.length - 1} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div style={{ backgroundColor: '#009BDE', height: '2px' }} />

      {/* Part B — Trust Badges */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <p
            className="text-center font-inter uppercase text-xs tracking-widest mb-8"
            style={{ color: '#94A3B8', letterSpacing: '0.18em' }}
          >
            Trusted by Practices Across the US
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {badges.map((badge) => (
              <span
                key={badge}
                className="trust-badge font-inter text-sm font-medium px-5 py-2.5 rounded-full cursor-default"
                style={{
                  border: '1.5px solid #009BDE',
                  color: '#003388',
                  backgroundColor: 'white',
                }}
              >
                {badge}
              </span>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
