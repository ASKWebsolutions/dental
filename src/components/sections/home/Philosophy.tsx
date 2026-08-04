'use client';

import React from 'react';
import { motion, Variants } from 'framer-motion';
import { ShieldCheck, Heart, Paintbrush } from 'lucide-react';
import Container from '@/components/ui/Container';

type ValueIcon = React.ComponentType<{ className?: string }>;

interface PhilosophyValue {
  icon: ValueIcon;
  title: string;
  description: string;
  badgeClassName: string;
  foldClassName: string;
}

const values: PhilosophyValue[] = [
  {
    icon: ShieldCheck,
    title: 'Precision & Safety',
    description:
      'Utilizing 3D cone-beam imaging and computer-guided implant placement for surgical perfection.',
    badgeClassName: 'bg-[#f4efe3]',
    foldClassName: 'bg-gray-100',
  },
  {
    icon: Heart,
    title: 'Patient-Centered Care',
    description:
      'Designed for low anxiety. Personalized sedation options and calming, tailored dental journeys.',
    badgeClassName: 'bg-[#96d5a3]',
    foldClassName: 'bg-[#ece2c3]',
  },
  {
    icon: Paintbrush,
    title: 'Aesthetic Artistry',
    description:
      'Crafting customized porcelain veneers and smile alignments that match your unique facial symmetry.',
    badgeClassName: 'bg-[#f4efe3]',
    foldClassName: 'bg-gray-100',
  },
];

const easing = [0.22, 1, 0.36, 1] as const;

export const Philosophy: React.FC = () => {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: easing },
    },
  };

  return (
    <section className="py-20 md:py-24 bg-[var(--color-bg-alt)] overflow-hidden">
      <Container>
        {/* Split Header Block */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: easing }}
          className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6"
        >
          <div>
            <h2 className="text-xs font-bold tracking-widest text-[var(--color-primary)] uppercase mb-4">
              Our Philosophy
            </h2>
            <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-[var(--color-dark-text)]">
              The pillars of boutique clinical excellence.
            </h3>
          </div>
          <div className="hidden md:block w-32 h-px bg-[var(--color-border)] mb-4"></div>
        </motion.div>

        {/* 3-Column Card Row */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full"
        >
          {values.map((val, idx) => (
            <motion.div key={idx} variants={cardVariants} className="h-full">
              <div className="group relative bg-white p-8 rounded-xl border border-gray-100 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl overflow-hidden text-left h-full">
                {/* Top-Right Folded Corner Accent */}
                <div
                  className={`absolute top-0 right-0 w-12 h-12 ${val.foldClassName} transition-all duration-300 group-hover:w-full group-hover:h-full group-hover:opacity-10`}
                  style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%)' }}
                />
                {/* Icon Badge */}
                <div
                  className={`w-14 h-14 rounded-full flex items-center justify-center mb-6 text-[var(--color-primary)] ${val.badgeClassName}`}
                >
                  <val.icon className="w-7 h-7" />
                </div>
                <h3 className="font-serif text-xl font-bold text-[var(--color-primary)] mb-4">
                  {val.title}
                </h3>
                <p className="text-sm text-[var(--color-body-text)] leading-relaxed">
                  {val.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
};

export default Philosophy;
