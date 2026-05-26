import { useState, useEffect } from 'react'

const navLinks = [
  { label: 'Services', href: '#services' },
  { label: 'Why Us', href: '#why-us' },
  { label: 'Process', href: '#process' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const sections = ['services', 'why-us', 'process', 'testimonials', 'contact']
    const observers = sections.map((id) => {
      const el = document.getElementById(id)
      if (!el) return null
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id) },
        { threshold: 0.3 }
      )
      obs.observe(el)
      return obs
    }).filter(Boolean)
    return () => observers.forEach((o) => o.disconnect())
  }, [])

  const scrollTo = (href) => {
    setMenuOpen(false)
    const id = href.replace('#', '')
    window.dispatchEvent(new CustomEvent('nav-goto', { detail: id }))
  }

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        backgroundColor: '#FFFFFF',
        borderBottom: '1px solid #E5E7EB',
        boxShadow: scrolled ? '0 2px 20px rgba(0,0,0,0.08)' : 'none',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#"
          className="font-montserrat font-bold text-xl tracking-wide flex items-center gap-2"
          style={{ color: '#003388' }}
          onClick={(e) => { e.preventDefault(); window.dispatchEvent(new CustomEvent('nav-goto', { detail: '' })) }}
        >
          <span className="w-2 h-2 rounded-full inline-block" style={{ backgroundColor: '#009BDE' }} />
          RESOLUTION RCM &amp; AI
        </a>

        {/* Desktop Nav */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const id = link.href.replace('#', '')
            return (
              <li key={link.label}>
                <button
                  onClick={() => scrollTo(link.href)}
                  className={`nav-link text-sm font-inter font-medium${activeSection === id ? ' active' : ''}`}
                  style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                >
                  {link.label}
                </button>
              </li>
            )
          })}
        </ul>

        {/* CTA */}
        <div className="hidden md:block">
          <button
            onClick={() => scrollTo('#contact')}
            className="font-inter font-semibold text-white text-sm px-5 py-2.5 rounded-lg transition-all duration-200"
            style={{ backgroundColor: '#009BDE' }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#0080B8')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#009BDE')}
          >
            Book a Free Audit
          </button>
        </div>

        {/* Hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-0.5 transition-all ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} style={{ backgroundColor: '#1C1B1F' }} />
          <span className={`block w-6 h-0.5 transition-all ${menuOpen ? 'opacity-0' : ''}`} style={{ backgroundColor: '#1C1B1F' }} />
          <span className={`block w-6 h-0.5 transition-all ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} style={{ backgroundColor: '#1C1B1F' }} />
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden w-full" style={{ backgroundColor: '#FFFFFF' }}>
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => scrollTo(link.href)}
              className="block w-full text-left font-inter font-medium px-8 py-4 border-b border-gray-100 hover:text-teal transition-colors"
              style={{ background: 'none', cursor: 'pointer', color: '#1C1B1F' }}
            >
              {link.label}
            </button>
          ))}
          <div className="px-8 py-4">
            <button
              onClick={() => scrollTo('#contact')}
              className="w-full font-inter font-semibold text-white text-sm px-5 py-3 rounded-lg"
              style={{ backgroundColor: '#009BDE' }}
            >
              Book a Free Audit
            </button>
          </div>
        </div>
      )}
    </nav>
  )
}
