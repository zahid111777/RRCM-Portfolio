export default function Footer() {
  const scrollTo = (id) => {
    window.dispatchEvent(new CustomEvent('nav-goto', { detail: id }))
  }

  return (
    <footer style={{ backgroundColor: '#003388' }} className="pt-16 pb-6">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pb-10 border-b border-white/10">

          {/* Column 1 — Logo + Tagline */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: '#009BDE' }} />
              <span className="font-montserrat font-bold text-white text-lg">RESOLUTION RCM &amp; AI</span>
            </div>
            <p className="text-gray-400 text-sm font-inter leading-relaxed mb-4">
              Powering US Medical Billing with AI
            </p>
            <p className="text-gray-500 text-sm font-inter">
              {/* 24-7 Consultancy<br /> */}
              Islamabad, Pakistan
            </p>
          </div>

          {/* Column 2 — Quick Links */}
          <div>
            <h4 className="font-montserrat font-bold text-white mb-4 text-sm uppercase tracking-widest">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {[
                { label: 'Services', id: 'services' },
                { label: 'Process', id: 'process' },
                { label: 'Why Us', id: 'why-us' },
                { label: 'Contact', id: 'contact' },
              ].map((item) => (
                <li key={item.label}>
                  <button
                    onClick={() => scrollTo(item.id)}
                    className="text-gray-400 hover:text-white text-sm font-inter transition-colors"
                    style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 — Contact Info */}
          <div>
            <h4 className="font-montserrat font-bold text-white mb-4 text-sm uppercase tracking-widest">
              Contact
            </h4>
            <ul className="space-y-3 text-sm font-inter text-gray-400">
              <li>
                <a
                  href="mailto:info@resolutionrcmai.com"
                  className="hover:text-white transition-colors flex items-center gap-2"
                >
                  📧 info@resolutionrcmai.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                📞 +1 (XXX) XXX-XXXX
              </li>
              <li>
                <a
                  href="https://wa.me/1XXXXXXXXXX"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-2"
                >
                  💬 WhatsApp Us
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="text-center pt-6">
          <p className="text-gray-500 text-sm font-inter">
            © 2026 Resolution RCM &amp; AI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
