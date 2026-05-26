import { useState } from 'react'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '../firebase'

const defaultForm = {
  fullName: '',
  email: '',
  phone: '',
  practiceName: '',
  practiceType: '',
  claimVolume: '',
  message: '',
}

export default function Contact() {
  const [form, setForm] = useState(defaultForm)
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')

  const validate = () => {
    const e = {}
    if (!form.fullName.trim()) e.fullName = 'Full name is required.'
    if (!form.email.trim()) {
      e.email = 'Email is required.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      e.email = 'Enter a valid email address.'
    }
    if (!form.practiceType) e.practiceType = 'Please select a practice type.'
    return e
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }
    setSubmitting(true)
    setSubmitError('')
    try {
      const payload = {
        ...form,
        submittedAt: new Date().toISOString(),
      }

      // Primary: RTDB REST API (no SDK auth required, works with open rules)
      const res = await fetch(
        'https://resolution-rcm-ai-c46d6-default-rtdb.firebaseio.com/leads.json',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        }
      )
      if (!res.ok) throw new Error(`RTDB error ${res.status}`)

      // Secondary: Firestore best-effort
      addDoc(collection(db, 'leads'), {
        ...payload,
        createdAt: serverTimestamp(),
      }).catch(() => {})

      setSubmitted(true)
    } catch (err) {
      console.error('Form submit error:', err)
      setSubmitError('Something went wrong. Please try again or email us directly.')
    } finally {
      setSubmitting(false)
    }
  }

  const inputClass = (field) =>
    `form-input w-full border rounded-lg px-4 py-3 font-inter text-sm transition-all duration-200 ${
      errors[field] ? 'border-red-400' : 'border-gray-200'
    }`

  return (
    <section id="contact" className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-12">
          <p className="font-inter font-semibold uppercase text-xs tracking-widest mb-3"
             style={{ color: '#009BDE', letterSpacing: '0.18em' }}>
            Get Started
          </p>
          <h2 className="font-montserrat font-bold mb-4"
              style={{ color: '#003388', fontSize: 'clamp(1.8rem, 3vw, 2.5rem)' }}>
            Request Your Free AR Audit
          </h2>
          <p className="font-inter text-gray-500 text-lg max-w-xl mx-auto">
            No commitment. No cost. Just a clear picture of where your revenue stands.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

          {/* Left — What You Get */}
          <div className="rounded-xl p-6 md:p-10" style={{ backgroundColor: '#003388' }}>
            <h3 className="font-montserrat font-bold text-white text-2xl mb-6">
              What's Included in Your Free Audit
            </h3>
            <ul className="space-y-3 mb-10">
              {[
                'Current denial rate analysis',
                'AR aging breakdown by bucket',
                'Collection rate benchmarking vs industry',
                'Top 5 revenue leakage points identified',
                'Payer mix and reimbursement review',
                'Actionable recommendations report',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 font-inter text-white text-base">
                  <span style={{ color: '#009BDE' }} className="font-bold mt-0.5">✓</span>
                  {item}
                </li>
              ))}
            </ul>

            <div className="space-y-3">
              {[
                { icon: '📧', text: 'info@resolutionrcmai.com', href: 'mailto:info@resolutionrcmai.com' },
                { icon: '📞', text: '+1 (XXX) XXX-XXXX', href: null },
                { icon: '💬', text: 'WhatsApp available', href: 'https://wa.me/1XXXXXXXXXX' },
                { icon: '🕒', text: 'Mon–Fri, 9am–6pm EST', href: null },
              ].map((item) => (
                <div key={item.text} className="flex items-center gap-3 font-inter text-gray-300 text-sm">
                  <span>{item.icon}</span>
                  {item.href ? (
                    <a href={item.href} className="hover:text-white transition-colors" target="_blank" rel="noopener noreferrer">
                      {item.text}
                    </a>
                  ) : (
                    <span>{item.text}</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right — Form */}
          <div className="bg-white rounded-xl p-6 md:p-10 shadow-lg border border-gray-100">
            {submitted ? (
              <div className="flex flex-col items-center justify-center h-full text-center py-10">
                <div className="text-6xl mb-4">✅</div>
                <h3 className="font-montserrat font-bold text-2xl mb-3" style={{ color: '#009BDE' }}>
                  Thank You!
                </h3>
                <p className="font-inter text-gray-600 mb-2">
                  We'll be in touch within 1 business day.
                </p>
                <p className="font-inter text-gray-500 text-sm mb-8">
                  In the meantime, feel free to email us at{' '}
                  <a href="mailto:info@resolutionrcmai.com" className="underline" style={{ color: '#009BDE' }}>
                    info@resolutionrcmai.com
                  </a>
                </p>
                <button
                  onClick={() => { setSubmitted(false); setForm(defaultForm); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
                  className="font-inter font-semibold text-white px-7 py-3 rounded-lg"
                  style={{ backgroundColor: '#003388' }}
                >
                  Back to Home
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                {/* Full Name */}
                <div>
                  <label className="block font-inter text-sm font-medium mb-1.5" style={{ color: '#003388' }}>
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={form.fullName}
                    onChange={handleChange}
                    className={inputClass('fullName')}
                    placeholder="Dr. John Smith"
                  />
                  {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
                </div>

                {/* Email */}
                <div>
                  <label className="block font-inter text-sm font-medium mb-1.5" style={{ color: '#003388' }}>
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    className={inputClass('email')}
                    placeholder="you@practice.com"
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>

                {/* Phone + Practice Name */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-inter text-sm font-medium mb-1.5" style={{ color: '#003388' }}>
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      className={inputClass('phone')}
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>
                  <div>
                    <label className="block font-inter text-sm font-medium mb-1.5" style={{ color: '#003388' }}>
                      Practice Name
                    </label>
                    <input
                      type="text"
                      name="practiceName"
                      value={form.practiceName}
                      onChange={handleChange}
                      className={inputClass('practiceName')}
                      placeholder="City Medical Group"
                    />
                  </div>
                </div>

                {/* Practice Type */}
                <div>
                  <label className="block font-inter text-sm font-medium mb-1.5" style={{ color: '#003388' }}>
                    Practice Type <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="practiceType"
                    value={form.practiceType}
                    onChange={handleChange}
                    className={inputClass('practiceType') + ' bg-white'}
                  >
                    <option value="">Select practice type…</option>
                    <option>Solo Practice</option>
                    <option>Group Practice</option>
                    <option>Billing Company</option>
                    <option>Hospital / Health System</option>
                    <option>Other</option>
                  </select>
                  {errors.practiceType && <p className="text-red-500 text-xs mt-1">{errors.practiceType}</p>}
                </div>

                {/* Claim Volume */}
                <div>
                  <label className="block font-inter text-sm font-medium mb-1.5" style={{ color: '#003388' }}>
                    Monthly Claim Volume
                  </label>
                  <select
                    name="claimVolume"
                    value={form.claimVolume}
                    onChange={handleChange}
                    className={inputClass('claimVolume') + ' bg-white'}
                  >
                    <option value="">Select volume…</option>
                    <option>Under 100</option>
                    <option>100–500</option>
                    <option>500–1000</option>
                    <option>1000+</option>
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label className="block font-inter text-sm font-medium mb-1.5" style={{ color: '#003388' }}>
                    Message / Notes
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={3}
                    className={inputClass('message')}
                    placeholder="Any specific challenges or questions?"
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full font-montserrat font-bold text-white py-4 rounded-lg text-base transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
                  style={{ backgroundColor: '#009BDE' }}
                  onMouseEnter={(e) => !submitting && (e.currentTarget.style.backgroundColor = '#00D084')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#009BDE')}
                >
                  {submitting ? 'Submitting...' : 'Request My Free Audit →'}
                </button>

                {submitError && (
                  <div className="rounded-lg p-4 mt-2" style={{ backgroundColor: '#FEF2F2', border: '1px solid #FECACA' }}>
                    <p className="font-inter text-sm text-red-600 mb-2">Submission failed. Please email us directly:</p>
                    <a
                      href={`mailto:info@resolutionrcmai.com?subject=Audit Request - ${form.practiceName || form.fullName}&body=${encodeURIComponent(`Name: ${form.fullName}\nEmail: ${form.email}\nPhone: ${form.phone}\nPractice: ${form.practiceName}\nType: ${form.practiceType}\nVolume: ${form.claimVolume}\n\n${form.message}`)}`}
                      className="font-inter text-sm font-semibold underline"
                      style={{ color: '#003388' }}
                    >
                      📧 Send via Email Instead →
                    </a>
                  </div>
                )}

                <p className="text-center font-inter text-xs text-gray-400">
                  We respond within 1 business day. Your information is 100% confidential.
                </p>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  )
}
