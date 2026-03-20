
export function Footer() {
  return (
    <footer className="bg-forest text-sand relative overflow-hidden grain">
      {/* Ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

      {/* Main footer content */}
      <div className="py-20 md:py-28">
        <div className="container mx-auto px-6 md:px-14">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-8 mb-20">

            {/* Brand */}
            <div className="md:col-span-5">
              <h2 className="font-serif text-4xl md:text-5xl tracking-widest mb-6 text-sand">LUXE LANKA</h2>
              <p className="font-sans text-sm text-sand/45 max-w-xs leading-[1.85]">
                A sanctuary of bespoke hair and beauty at the edge of the Indian Ocean. Where visionary artistry meets effortless refinement.
              </p>
              <div className="mt-8 flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                <span className="font-sans text-[11px] text-sand/35 uppercase tracking-[0.2em]">123 Ocean Drive, Galle, Sri Lanka</span>
              </div>
            </div>

            {/* Spacer */}
            <div className="md:col-span-1" />

            {/* Contact */}
            <div className="md:col-span-3">
              <h3 className="text-[10px] uppercase tracking-[0.28em] text-sand/25 mb-7 font-sans">Contact</h3>
              <ul className="space-y-4 font-sans text-sm text-sand/60">
                <li className="hover:text-sand transition-colors cursor-default">+94 11 234 5678</li>
                <li className="hover:text-gold transition-colors">
                  <a href="mailto:reservations@luxelanka.com">reservations@luxelanka.com</a>
                </li>
              </ul>
            </div>

            {/* Social */}
            <div className="md:col-span-3">
              <h3 className="text-[10px] uppercase tracking-[0.28em] text-sand/25 mb-7 font-sans">Social</h3>
              <ul className="space-y-4 font-sans text-sm">
                {['Instagram', 'Facebook', 'Pinterest'].map(s => (
                  <li key={s}>
                    <a href="#" className="text-sand/60 hover:text-gold transition-colors group inline-flex items-center gap-2">
                      {s}
                      <span className="w-0 group-hover:w-4 h-px bg-gold transition-all duration-400" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* Bottom bar */}
          <div className="pt-8 border-t border-sand/8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="font-sans text-[10px] uppercase tracking-[0.22em] text-sand/25">
              &copy; {new Date().getFullYear()} Luxe Lanka. All Rights Reserved.
            </p>
            <div className="flex gap-8 font-sans text-[10px] uppercase tracking-[0.22em] text-sand/25">
              <a href="#" className="hover:text-sand/60 transition-colors">Privacy</a>
              <a href="#" className="hover:text-sand/60 transition-colors">Terms</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
