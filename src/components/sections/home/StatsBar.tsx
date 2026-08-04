'use client';

import React from 'react';
import { motion, Variants } from 'framer-motion';
import Container from '@/components/ui/Container';
import { SiteStat } from '@/types/reviews';

import AnimatedCounter from '@/components/ui/AnimatedCounter';

interface StatsBarProps {
  stats?: SiteStat[];
}

const easing = [0.22, 1, 0.36, 1] as const;

export const StatsBar: React.FC<StatsBarProps> = ({ stats }) => {
  const displayStats = stats && stats.length > 0 ? stats : [
    // TODO: confirm these fallback numbers with the clinic before launch
    { value: '25+', label: 'Years Clinical Experience' },
    { value: '5000+', label: 'Successful Implants' },
    { value: '15000+', label: 'Smiles Transformed' },
    { value: '99%', label: 'Patient Satisfaction' },
  ];

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: easing },
    },
  };

  return (
    <section className="relative py-14 md:py-20 bg-[#003b1b] text-white overflow-hidden">
      {/* Fixed Right-Corner Tooth Watermark */}
      <svg
        className="absolute top-2 right-[8%] sm:right-[10%] lg:right-[12%] w-24 h-24 sm:w-28 sm:h-28 text-[#96d5a3]/20 pointer-events-none select-none -z-0 rotate-12"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M12 2C8 2 6 4 6 7c0 4 1 8 2 11 1 2 2.5 4 4 4s3-2 4-4c1-3 2-7 2-11 0-3-2-5-6-5z" />
        <path d="M9 10c1.5 1 4.5 1 6 0" />
      </svg>

      <Container>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="relative z-10 grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 w-full text-center"
        >
          {displayStats.map((stat, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className="flex flex-col items-center justify-center"
            >
              {/* Big mint-colored number */}
              <span className="font-serif font-bold text-4xl md:text-5xl lg:text-[56px] text-[#b1f2be] mb-3 tracking-tight">
                <AnimatedCounter value={stat.value} />
              </span>
              {/* Bold uppercase-tracked label in white */}
              <span className="font-sans font-bold text-[11px] md:text-xs uppercase tracking-widest text-white/90 leading-tight">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
};

export default StatsBar;
