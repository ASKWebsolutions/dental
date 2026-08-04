'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Container from '@/components/ui/Container';

const stats = [
  { value: '15k+', label: 'Smiles Crafted' },
  { value: '12', label: 'Master Doctors' },
  { value: '98%', label: 'Success Rate' },
  { value: '4.9', label: 'Rated' },
];

export const GalleryCTA: React.FC = () => {
  return (
    <section className="py-20 md:py-24 bg-bg overflow-hidden">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="bg-[#003b1b] rounded-[32px] px-6 py-12 md:px-16 md:py-16 overflow-hidden shadow-xl relative text-center"
        >
          {/* Decorative rings */}
          <div className="absolute bottom-[-60px] right-[-60px] w-72 h-72 rounded-full border-[18px] border-[#b1f2be]/10 pointer-events-none" />
          <div className="absolute top-[-80px] left-[-80px] w-64 h-64 rounded-full bg-[#b1f2be]/5 blur-[80px] pointer-events-none" />

          <div className="relative z-10 flex flex-col items-center max-w-3xl mx-auto">
            <h2 className="font-serif font-bold text-3xl sm:text-4xl lg:text-5xl text-emerald-300 leading-tight tracking-[-0.5px]">
              Your New Smile Awaits
            </h2>
            <p className="mt-4 text-sm sm:text-base text-white/70 font-sans leading-relaxed max-w-xl">
              Whether you&apos;re exploring veneers, implants, or a full-mouth restoration, our
              master doctors will craft a treatment plan tailored to your goals and timeline.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4 font-sans justify-center items-center w-full sm:w-auto">
              <Link
                href="/contact"
                className="w-full sm:w-auto inline-flex items-center justify-center font-bold uppercase tracking-wide transition-all duration-300 rounded-full text-sm px-8 py-3.5 bg-white text-[#003b1b] hover:bg-emerald-100 shadow-lg cursor-pointer"
              >
                Book Consultation
              </Link>
              <Link
                href="/services"
                className="w-full sm:w-auto inline-flex items-center justify-center font-bold uppercase tracking-wide transition-all duration-300 rounded-full text-sm px-8 py-3.5 border-2 border-white/40 text-white hover:bg-white/10 cursor-pointer"
              >
                View Pricing Guide
              </Link>
            </div>

            <div className="mt-10 pt-8 border-t border-white/15 w-full grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((s) => (
                <div key={s.label}>
                  <p className="font-serif font-bold text-2xl md:text-3xl text-white">{s.value}</p>
                  <p className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-[#b1f2be]/80 mt-1">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
};

export default GalleryCTA;
