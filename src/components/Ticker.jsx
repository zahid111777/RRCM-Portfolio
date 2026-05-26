const tickerText =
  '✓ HIPAA Compliant   ✓ 97%+ Collection Rate   ✓ 48-Hour Claim Turnaround   ✓ Expert Denial Management   ✓ Real-Time Reporting   ✓ US-Based Clients   ✓ 10+ Years Experience   '

export default function Ticker() {
  return (
    <div
      className="w-full overflow-hidden"
      style={{ backgroundColor: '#009BDE', height: '48px', display: 'flex', alignItems: 'center' }}
    >
      <div className="ticker-inner">
        <span className="font-inter font-medium text-white text-sm px-4">
          {tickerText}
        </span>
        <span className="font-inter font-medium text-white text-sm px-4" aria-hidden="true">
          {tickerText}
        </span>
      </div>
    </div>
  )
}
