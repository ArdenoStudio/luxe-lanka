import React from 'react';
import { Instagram, Facebook, MapPin } from 'lucide-react';
import ArdenoProductionCredit from './ArdenoProductionCredit';

const Footer: React.FC = () => {
  return (
    <footer className="bg-brand-black pt-20 pb-10 border-t border-white/5 -mt-[1px] relative z-10">
      <div className="container mx-auto px-6">
        {/* ... (existing content) */}
        <div className="flex flex-col md:flex-row justify-between items-start mb-16 gap-12">
          <div className="md:w-1/3">
            <div className="mb-6">
              <span className="font-serif text-3xl text-brand-cream">Luxe</span>
              <span className="font-sans text-xs tracking-[0.3em] uppercase text-brand-gold ml-2">Lanka</span>
            </div>
            <p className="text-brand-silver/50 font-sans text-sm leading-relaxed max-w-xs">
              A luxury grooming destination in Colombo, dedicated to the art of masculine refinement.
            </p>
          </div>

          <div className="md:w-1/3 flex flex-col space-y-4">
            <h4 className="font-sans text-xs tracking-widest uppercase text-brand-gold mb-2">Location</h4>
            <div className="flex items-start space-x-2 text-brand-silver/70 font-sans text-sm">
              <MapPin size={16} className="mt-1 flex-shrink-0" />
              <p>
                No. 45, Horton Place,<br />
                Colombo 07,<br />
                Sri Lanka.
              </p>
            </div>
            <a href="https://maps.google.com" target="_blank" rel="noreferrer" className="text-xs text-brand-gold/70 underline hover:text-brand-gold">
              View on Map
            </a>
          </div>

          <div className="md:w-1/3 flex flex-col items-start md:items-end">
            <h4 className="font-sans text-xs tracking-widest uppercase text-brand-gold mb-4">Follow Us</h4>
            <div className="flex space-x-6">
              <a href="#" className="text-brand-silver hover:text-brand-gold transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-brand-silver hover:text-brand-gold transition-colors">
                <Facebook size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 pb-28 md:pb-0 flex flex-col md:flex-row justify-between items-center text-xs font-sans text-brand-silver/30 mb-8">
          <p>&copy; {new Date().getFullYear()} Luxe Lanka. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-brand-gold">Privacy</a>
            <a href="#" className="hover:text-brand-gold">Terms</a>
          </div>
        </div>

        <ArdenoProductionCredit color="#c4a97d" />
      </div>
    </footer>
  );
};

export default Footer;

export default Footer;