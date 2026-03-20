import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface JournalEntry {
  id: string;
  category: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  image: string;
  isFeatured?: boolean;
}

const entries: JournalEntry[] = [
  {
    id: '1',
    category: 'Ritual',
    title: 'The Art of the Straight Razor',
    excerpt: 'Rediscovering the meditative precision of the traditional wet shave in a hurried world. Why the oldest method remains the gold standard for the modern gentleman.',
    date: 'Oct 12, 2024',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1532710093739-9470acff878f?q=80&w=2070&auto=format&fit=crop',
    isFeatured: true
  },
  {
    id: '2',
    category: 'Guide',
    title: 'Winter Skin Defense',
    excerpt: 'Essential hydration strategies and protective routines for the colder months.',
    date: 'Nov 05, 2024',
    readTime: '3 min read',
    image: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?q=80&w=2070&auto=format&fit=crop',
    isFeatured: false
  },
  {
    id: '3',
    category: 'Review',
    title: 'The Scent of Sandalwood',
    excerpt: 'A deep dive into our signature small-batch aftershave balm and its origins.',
    date: 'Nov 18, 2024',
    readTime: '4 min read',
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=1887&auto=format&fit=crop',
    isFeatured: false
  },
  {
    id: '4',
    category: 'Culture',
    title: 'Defining Modern Masculinity',
    excerpt: 'Moving beyond archetypes to find personal style and substance.',
    date: 'Sep 28, 2024',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop',
    isFeatured: false
  }
];

const categories = ['All', 'Ritual', 'Guide', 'Culture'];

const Journal: React.FC = () => {
  const [filter, setFilter] = useState('All');
  
  const filteredEntries = entries.filter(entry => 
    filter === 'All' || entry.category === filter
  );

  return (
    <section id="journal" className="py-32 md:py-48 bg-brand-charcoal text-brand-cream relative z-10 -mt-[1px] overflow-hidden">
      
      {/* Editorial Header */}
      <div className="container mx-auto px-6 md:px-16 mb-24 md:mb-32">
        <div className="flex flex-col md:flex-row justify-between items-end border-b border-brand-gold/10 pb-8">
            <div className="mb-12 md:mb-0">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1 }}
                    className="text-brand-gold font-sans text-xs tracking-[0.3em] uppercase mb-6 block"
                >
                    The Journal
                </motion.div>
                <motion.h2 
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, delay: 0.2 }}
                    className="font-serif text-6xl md:text-8xl lg:text-9xl text-brand-cream leading-[0.9] tracking-tight"
                >
                    Perspectives<span className="text-brand-gold italic">.</span>
                </motion.h2>
                <motion.p 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, delay: 0.5 }}
                    className="mt-6 text-brand-silver/50 font-sans font-light text-sm md:text-base max-w-md leading-relaxed"
                >
                    Insights on craft, culture, and modern grooming.
                </motion.p>
            </div>
            
            <motion.a 
                href="#journal"
                className="group flex items-center gap-4 text-brand-silver/60 hover:text-brand-gold transition-colors duration-500 pb-2 relative"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 1.5 }}
            >
                <span className="text-xs tracking-[0.2em] uppercase">View All Articles</span>
                <span className="bg-brand-gold w-0 h-[1px] absolute bottom-0 right-0 group-hover:w-full transition-all duration-500 ease-out" />
                <ArrowRight className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-2" />
            </motion.a>
        </div>

        {/* Filters */}
        <div className="flex gap-8 md:gap-12 mt-12 overflow-x-auto no-scrollbar pb-4 md:pb-0">
            {categories.map((cat, i) => (
                <button
                    key={cat}
                    onClick={() => setFilter(cat)}
                    className={`relative pb-4 text-xs tracking-[0.2em] uppercase transition-colors duration-500 ${
                        filter === cat ? 'text-brand-gold' : 'text-brand-silver/40 hover:text-brand-gold/70'
                    }`}
                >
                    {cat}
                    {filter === cat && (
                        <motion.div 
                            layoutId="activeFilter" 
                            className="absolute bottom-0 left-0 w-full h-[1px] bg-brand-gold"
                            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        />
                    )}
                </button>
            ))}
        </div>
      </div>

      {/* Magazine Layout Grid */}
      <div className="container mx-auto px-6 md:px-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-y-16 md:gap-8">
            <AnimatePresence mode="popLayout">
                {filteredEntries.map((entry, index) => {
                    const isFeatured = entry.isFeatured && filter === 'All';
                    
                    return (
                        <motion.article 
                            key={entry.id}
                            layout
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            viewport={{ once: true, margin: "-10%" }}
                            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                            className={`group relative cursor-pointer ${isFeatured ? 'md:col-span-8 md:row-span-2' : 'md:col-span-4'}`}
                            data-cursor-text="READ"
                        >
                            {/* Card Structure */}
                            <div className={`relative overflow-hidden bg-brand-black border border-brand-gold/10 transition-all duration-700 ease-out group-hover:border-brand-gold/40 group-hover:shadow-2xl group-hover:-translate-y-2 ${isFeatured ? 'h-[500px] md:h-[700px]' : 'h-auto flex flex-col'}`}>
                                
                                {/* Image Area */}
                                <div className={`overflow-hidden relative ${isFeatured ? 'absolute inset-0 w-full h-full' : 'aspect-[16/10] w-full'}`}>
                                     <div className={`absolute inset-0 z-10 transition-colors duration-700 ${isFeatured ? 'bg-gradient-to-t from-brand-black via-brand-black/40 to-transparent opacity-90' : 'bg-brand-black/10 group-hover:bg-transparent'}`} />
                                     <img 
                                        src={entry.image} 
                                        alt={entry.title}
                                        className="w-full h-full object-cover transition-all duration-1000 ease-out group-hover:scale-105 filter grayscale-[30%] group-hover:grayscale-0 contrast-[1.1]"
                                     />
                                </div>

                                {/* Content Area */}
                                <div className={`relative z-20 ${isFeatured ? 'h-full flex flex-col justify-end p-8 md:p-12' : 'p-8 flex-grow bg-brand-charcoal'}`}>
                                    
                                    {/* Meta */}
                                    <div className="flex items-center gap-4 mb-4 md:mb-6">
                                        <span className={`text-[10px] tracking-[0.25em] uppercase font-sans border px-2 py-1 ${isFeatured ? 'text-brand-gold border-brand-gold/30 bg-brand-black/50 backdrop-blur-md' : 'text-brand-gold border-brand-gold/20'}`}>
                                            {entry.category}
                                        </span>
                                        <span className={`text-[10px] tracking-[0.1em] uppercase font-sans ${isFeatured ? 'text-brand-silver/70' : 'text-brand-silver/40'}`}>
                                            {entry.date} &bull; {entry.readTime}
                                        </span>
                                    </div>

                                    {/* Title */}
                                    <h3 className={`font-serif leading-[1.1] mb-4 transition-colors duration-500 group-hover:text-brand-gold ${isFeatured ? 'text-4xl md:text-5xl text-brand-cream' : 'text-2xl md:text-3xl text-brand-cream'}`}>
                                        {entry.title}
                                    </h3>

                                    {/* Excerpt */}
                                    <p className={`font-sans font-light leading-relaxed mb-8 ${isFeatured ? 'text-brand-silver/80 text-lg max-w-2xl' : 'text-brand-silver/60 text-sm line-clamp-3'}`}>
                                        {entry.excerpt}
                                    </p>

                                    {/* CTA */}
                                    <div className="flex items-center gap-3 text-brand-gold">
                                        <span className="font-sans text-[10px] tracking-[0.2em] uppercase">Read Article</span>
                                        <ArrowRight className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-2" />
                                    </div>
                                </div>
                            </div>
                        </motion.article>
                    );
                })}
            </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default Journal;