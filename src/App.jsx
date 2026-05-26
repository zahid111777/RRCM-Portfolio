import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Ticker from './components/Ticker'
import Services from './components/Services'
import Stats from './components/Stats'
import WhyUs from './components/WhyUs'
import Process from './components/Process'
import Testimonials from './components/Testimonials'
import Contact from './components/Contact'
import Footer from './components/Footer'
import BackToTop from './components/BackToTop'
import ServiceDetail from './components/ServiceDetail'
import ProcessDetail from './components/ProcessDetail'

function App() {
  const [activeService, setActiveService] = useState(null)
  const [activeProcess, setActiveProcess] = useState(null)

  const navigate = (section) => {
    setActiveService(null)
    setActiveProcess(null)
    setTimeout(() => {
      if (section) {
        const el = document.getElementById(section)
        if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' })
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
    }, 80)
  }
  // Listen for navbar navigation — works from any sub-page
  useEffect(() => {
    const handler = (e) => navigate(e.detail)
    window.addEventListener('nav-goto', handler)
    return () => window.removeEventListener('nav-goto', handler)
  }, [])

  // Listen for in-page step navigation from ProcessDetail
  useEffect(() => {
    const handler = (e) => { setActiveProcess(e.detail); window.scrollTo(0, 0) }
    window.addEventListener('navigate-process', handler)
    return () => window.removeEventListener('navigate-process', handler)
  }, [])

  // Global scroll animation observer — re-runs when page changes
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.05 }
    )

    // Observe after a brief delay to allow render
    const timer = setTimeout(() => {
      document.querySelectorAll('.animate-on-scroll').forEach((el) => {
        observer.observe(el)
      })
    }, 100)

    return () => {
      clearTimeout(timer)
      observer.disconnect()
    }
  }, [activeService, activeProcess])

  return (
    <>
      <Navbar />
      {activeService ? (
        <ServiceDetail
          serviceName={activeService}
          onBack={() => navigate('services')}
          onContact={() => navigate('contact')}
        />
      ) : activeProcess ? (
        <ProcessDetail
          stepKey={activeProcess}
          onBack={() => navigate('process')}
          onContact={() => navigate('contact')}
        />
      ) : (
        <main>
          <Hero />
          <Ticker />
          <Services onLearnMore={(name) => { setActiveService(name); window.scrollTo(0, 0) }} />
          <Stats />
          <WhyUs />
          <Process onLearnMore={(key) => { setActiveService(null); setActiveProcess(key); window.scrollTo(0, 0) }} />
          <Testimonials />
          <Contact />
        </main>
      )}
      <Footer />
      <BackToTop />
    </>
  )
}

export default App
