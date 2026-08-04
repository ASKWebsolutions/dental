'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Container from '@/components/ui/Container';
import HighlightText from './HighlightText';

export const TeamHero: React.FC = () => {
  return (
    <section className="relative pt-36 pb-16 md:pt-40 md:pb-20 overflow-hidden bg-bg flex flex-col justify-center items-center text-center">
      <Container className="flex flex-col items-center">
        {/* Mint Pill Badge */}
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="inline-flex items-center px-4 py-1.5 rounded-full bg-hero-badge-bg-mint text-hero-badge-text-dark font-sans font-bold text-xs uppercase tracking-wider mb-6 shadow-sm"
        >
          World-Class Care
        </motion.span>

        {/* H1 Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
          className="font-serif font-bold text-4xl sm:text-5xl lg:text-[48px] lg:leading-[58px] text-hero-heading-dark tracking-[-0.96px] mb-6 max-w-2xl"
        >
          Our <HighlightText>Doctors</HighlightText>
        </motion.h1>

        {/* Centered Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
          className="text-base sm:text-lg text-body-text leading-[29px] font-sans font-normal mb-4 max-w-2xl"
        >
          Meet the exceptional team of multi-disciplinary clinical specialists committed to precision dentistry, aesthetic mastery, and patient comfort.
        </motion.p>
      </Container>
    </section>
  );
};

export default TeamHero;
