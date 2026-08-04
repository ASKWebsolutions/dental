'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import Container from '@/components/ui/Container';

const patientAvatars = [
  {
    src: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100',
    alt: 'Smiling patient',
  },
  {
    src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100',
    alt: 'Smiling patient',
  },
];

export const AboutCTA: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="bg-bg py-12">
      <Container>
        {/* Full-Width Dark Green Card */}
        <div className="w-full rounded-[2.5rem] bg-[#003b1b] p-8 sm:p-14 text-center text-white relative overflow-hidden shadow-2xl">
          <div className="flex flex-col items-center">
            {/* Eyebrow Pill Badge */}
            <motion.span
              initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="inline-block px-4 py-1.5 rounded-full bg-white/10 border border-white/10 text-emerald-200 text-xs font-semibold mb-6"
            >
              Your Journey Starts Here
            </motion.span>

            {/* Headline */}
            <motion.h2
              initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
              className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold max-w-3xl mx-auto mb-8 text-white leading-snug"
            >
              Ready to redefine your smile? Join the 10,000+ patients who trust our expertise.
            </motion.h2>

            {/* Two Centered CTAs */}
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
              className="flex flex-wrap items-center justify-center gap-4 font-sans"
            >
              <Link
                href="/book-appointment"
                className="px-8 py-3.5 rounded-full bg-[#b1f2be] hover:bg-[#99e8ac] text-[#003b1b] font-bold text-sm transition-all shadow-md"
              >
                Schedule a Consultation
              </Link>
              <Link
                href="/gallery"
                className="px-8 py-3.5 rounded-full border border-white/20 bg-black/10 hover:bg-black/20 text-white font-bold text-sm transition-all"
              >
                View Our Work
              </Link>
            </motion.div>

            {/* Patient Avatars & Trust Bar */}
            <div className="flex items-center justify-center gap-3 mt-10">
              <div className="flex -space-x-2">
                {patientAvatars.map((avatar) => (
                  <Image
                    key={avatar.src}
                    src={avatar.src}
                    alt={avatar.alt}
                    width={100}
                    height={100}
                    className="w-8 h-8 rounded-full border-2 border-[#003b1b] object-cover"
                  />
                ))}
                <div className="w-8 h-8 rounded-full border-2 border-[#003b1b] bg-white text-[#003b1b] text-[10px] font-bold flex items-center justify-center">
                  +8k
                </div>
              </div>
              <span className="text-xs text-emerald-100/80 font-sans">
                Trusted by patients worldwide
              </span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default AboutCTA;
