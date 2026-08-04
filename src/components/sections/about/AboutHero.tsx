'use client';

import React from 'react';
import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import Container from '@/components/ui/Container';

export const AboutHero: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="bg-bg py-16 md:py-24">
      <Container className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Left Column - Text Block */}
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="lg:col-span-6 flex flex-col items-start text-left"
        >
          {/* Eyebrow */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-px bg-primary" />
            <span className="text-xs font-bold tracking-widest text-primary uppercase">
              Our Legacy of Care
            </span>
          </div>

          {/* H1 Title */}
          <h1 className="font-serif text-2xl sm:text-3xl font-semibold text-dark-text mb-6 leading-snug">
            Crafting <span className="italic font-normal text-primary">Brilliant Smiles</span>{' '}
            through Precision and Artistry.
          </h1>

          {/* Paragraphs */}
          <p className="font-sans text-sm sm:text-base text-body-text mb-4 leading-relaxed">
            Since our inception, Dental Cosmetics &amp; Implant Centre has been at the forefront of
            restorative excellence. We believe every patient deserves a smile that reflects their
            inner confidence.
          </p>
          <p className="font-sans text-sm sm:text-base text-body-text leading-relaxed">
            Our mission is to merge advanced clinical technology with a boutique, patient-first
            experience, ensuring that every procedure—from routine whitening to complex full-mouth
            reconstructions—is performed with unparalleled meticulousness.
          </p>
        </motion.div>

        {/* Right Column - Image & Dark Green Quote Card */}
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.15, ease: 'easeOut' }}
          className="lg:col-span-6 relative"
        >
          {/* Sized + Tilted Wrapper */}
          <div className="relative w-full max-w-[460px] h-[580px] lg:h-[620px] mx-auto lg:ml-auto rotate-2 hover:rotate-0 transition-transform duration-500 ease-out">
            {/* Asymmetric Peel Image Container */}
            <div className="relative w-full h-full rounded-tl-[3.5rem] rounded-tr-[1.5rem] rounded-br-[3.5rem] rounded-bl-[2rem] overflow-hidden shadow-2xl bg-white">
              <Image
                src="/images/home/about-hero.png"
                alt="Dental Cosmetics & Implant Centre team"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
                className="object-cover"
              />
            </div>

            {/* Floating Quote Card (Bottom-Left) - counter-rotated upright */}
            <div className="absolute -bottom-4 -left-6 sm:-bottom-6 sm:-left-10 bg-[#003b1b] text-white p-6 sm:p-7 rounded-2xl shadow-2xl max-w-[260px] sm:max-w-[290px] z-20 border border-white/10 -rotate-2">
              <p className="font-serif italic text-sm sm:text-base mb-3 leading-relaxed text-emerald-100">
                &ldquo;Precision is the foundation of beauty.&rdquo;
              </p>
              <p className="font-sans text-xs tracking-wider uppercase text-emerald-300 font-semibold">
                &mdash; Dr. Julian Vance
              </p>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
};

export default AboutHero;
