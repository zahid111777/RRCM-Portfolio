import { useState, useEffect, useRef, useCallback } from 'react'

const testimonials = [
  {
    quote:
      'Resolution RCM cut our denial rate from 14% down to under 3% in the first 90 days. Their team caught billing errors our previous vendor missed for years. The monthly reports alone are worth the switch.',
    name: 'Dr. Rawara M.',
    practice: 'Orthopedic Practice — Dallas, Texas',
  },
  {
    quote:
      'We finally have full visibility into our AR. Collections improved 22% in the first quarter. Our account manager responds within hours and knows our payers inside out. This is what real billing support looks like.',
    name: 'James R., Practice Administrator',
    practice: 'Multi-Specialty Group — Chicago, Illinois',
  },
  {
    quote:
      'The onboarding took 48 hours and the transition from our old biller was seamless. I was worried about disruption — there was none. Now I get a clear monthly report instead of chasing down numbers myself.',
    name: 'Dr. Pasban K.',
    practice: 'Family Medicine Clinic — Houston, Texas',
  },
]

export default function Testimonials() {
  const [current, setCurrent] = useState(0)
  const [visible, setVisible] = useState(true)
  const intervalRef = useRef(null)
  const containerRef = useRef(null)

  const goTo = useCallback((index) => {
    setVisible(false)
    setTimeout(() => {
      setCurrent((index + testimonials.length) % testimonials.length)
      setVisible(true)
    }, 500)
  }, [])

  const startTimer = useCallback(() => {
    intervalRef.current = setInterval(() => {
      goTo((current + 1) % testimonials.length)
    }, 5000)
  }, [current, goTo])

  useEffect(() => {
    startTimer()
    return () => clearInterval(intervalRef.current)
  }, [startTimer])

  const pauseTimer = () => clearInterval(intervalRef.current)
  const resumeTimer = () => startTimer()

  return (
    <section
      id="testimonials"
      style={{ backgroundColor: '#F5F7FA' }}
      className="py-20"
      ref={containerRef}
    >
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-12">
          <p className="font-inter font-semibold uppercase text-xs tracking-widest mb-3"
             style={{ color: '#009BDE', letterSpacing: '0.18em' }}>
            Client Success Stories
          </p>
          <h2 className="font-montserrat font-bold"
              style={{ color: '#003388', fontSize: 'clamp(1.8rem, 3vw, 2.5rem)' }}>
            What Our Clients Say
          </h2>
        </div>

        {/* Carousel */}
        <div
          className="relative flex items-center gap-4"
          onMouseEnter={pauseTimer}
          onMouseLeave={resumeTimer}
        >
          {/* Left Arrow */}
          <button
            onClick={() => goTo(current - 1)}
            className="flex-shrink-0 w-8 h-8 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-all"
            style={{ border: '2px solid #009BDE', cursor: 'pointer', backgroundColor: 'white' }}
            aria-label="Previous testimonial"
          >
            <span style={{ color: '#009BDE', fontSize: '1rem' }}>←</span>
          </button>

          {/* Card */}
          <div
            className="testimonial-card flex-1 max-w-2xl mx-auto text-center"
            style={{ opacity: visible ? 1 : 0, transition: 'opacity 0.5s ease, transform 0.25s ease, box-shadow 0.25s ease, background-color 0.25s ease' }}
          >
            <div className="font-montserrat font-bold leading-none mb-4" style={{ color: '#003388', fontSize: 'clamp(3rem, 10vw, 6rem)' }}>"</div>
            <p className="font-inter italic leading-relaxed mb-6" style={{ color: '#003388', fontSize: 'clamp(0.95rem, 2.5vw, 1.25rem)' }}>
              {testimonials[current].quote}
            </p>
            <div
              className="mx-auto mb-5"
              style={{ width: '60px', height: '2px', backgroundColor: '#009BDE' }}
            />
            <p className="font-montserrat font-bold text-base" style={{ color: '#003388' }}>
              {testimonials[current].name}
            </p>
            <p className="font-inter text-sm mt-1" style={{ color: '#009BDE' }}>
              {testimonials[current].practice}
            </p>
          </div>

          {/* Right Arrow */}
          <button
            onClick={() => goTo(current + 1)}
            className="flex-shrink-0 w-8 h-8 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-all"
            style={{ border: '2px solid #009BDE', cursor: 'pointer', backgroundColor: 'white' }}
            aria-label="Next testimonial"
          >
            <span style={{ color: '#009BDE', fontSize: '1rem' }}>→</span>
          </button>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-3 mt-8">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className="w-3 h-3 rounded-full transition-all duration-200"
              style={{
                backgroundColor: i === current ? '#009BDE' : '#CBD5E0',
                border: 'none',
                cursor: 'pointer',
              }}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  )
}
