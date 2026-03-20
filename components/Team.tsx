import React from 'react';
import { motion } from 'framer-motion';
import { TeamMember } from '../types';

export const team: TeamMember[] = [
  {
    id: '1',
    name: 'Arjun Silva',
    role: 'Master Barber',
    bio: 'Straight razor mastery.',
    image: 'https://images.unsplash.com/photo-1582845600106-965ba4b74f00?q=80&w=1974&auto=format&fit=crop'
  },
  {
    id: '2',
    name: 'Kian Perera',
    role: 'Stylist',
    bio: 'Modern texture expert.',
    image: 'https://images.unsplash.com/photo-1595152772835-219674b2a8a6?q=80&w=2080&auto=format&fit=crop'
  },
  {
    id: '3',
    name: 'David Rossi',
    role: 'Director',
    bio: 'Italian trained precision.',
    image: 'https://images.unsplash.com/photo-1618077360395-f3068be8e001?q=80&w=2080&auto=format&fit=crop'
  }
];

const Team: React.FC = () => {
  return (
    <section id="team" className="py-32 bg-brand-black text-brand-cream -mt-[1px]">
      <div className="container mx-auto px-6 md:px-16">
        <div className="mb-24 text-center">
            <motion.div
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 2.0, ease: [0.22, 1, 0.36, 1] }}
            >
                <span className="text-brand-gold font-sans text-[10px] tracking-[0.3em] uppercase mb-6 block">
                    The Team
                </span>
                <h2 className="text-5xl md:text-7xl font-serif">Masters of Craft</h2>
            </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-20">
          {team.map((member, i) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ delay: i * 0.3, duration: 2.0, ease: [0.22, 1, 0.36, 1] }}
              className="group cursor-hover stylist-card"
            >
              <div className="relative aspect-[3/4] overflow-hidden mb-8">
                {/* Pointer events none added to overlay so cursor hits the image */}
                <div className="absolute inset-0 bg-brand-gold/10 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 mix-blend-overlay pointer-events-none" />
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover grayscale brightness-90 contrast-125 transition-all duration-1000 ease-out group-hover:scale-105"
                />
              </div>
              
              <div className="text-center">
                <h3 className="text-3xl font-serif mb-2">{member.name}</h3>
                <p className="text-[10px] font-sans uppercase tracking-[0.2em] text-brand-gold mb-4 opacity-70 group-hover:opacity-100 transition-opacity duration-700">{member.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;