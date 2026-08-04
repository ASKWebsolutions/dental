'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ShieldCheck, Award, Sparkles, CircleDot } from 'lucide-react';
import Container from '@/components/ui/Container';
import { heroConfig } from '@/data/siteConfig';
import { HeroTrustIcon } from '@/types';

const easing = [0.22, 1, 0.36, 1] as const;

const trustIcons: Record<HeroTrustIcon, React.ElementType> = {
  ShieldCheck,
  Award,
};

export const Hero: React.FC = () => {
  return (
    <section className="relative min-h-[850px] bg-[var(--color-bg)] overflow-hidden pt-6 sm:pt-8 lg:pt-10 pb-20">
      {/* Decorative Blur Blobs */}
      <div className="absolute top-1/4 right-10 w-72 h-72 rounded-full bg-[var(--color-accent)]/5 blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-10 w-96 h-96 rounded-full bg-[var(--color-primary)]/5 blur-3xl pointer-events-none -z-10" />

      {/* 12-Column Grid */}
      <Container className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        {/* Left Column */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: easing }}
          className="lg:col-span-5 flex flex-col items-start z-10"
        >
          {/* Eyebrow */}
          <motion.span
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: easing }}
            className="text-[11px] tracking-[0.3em] text-[var(--color-primary)] font-bold uppercase mb-6"
          >
            {heroConfig.eyebrow}
          </motion.span>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: easing }}
            className="font-serif font-bold text-3xl sm:text-4xl lg:text-5xl text-[var(--color-dark-text)] tracking-[-0.96px] mb-6 leading-tight"
          >
            {heroConfig.headline.line1}
            <br />
            <span className="italic smile-underline text-[var(--color-primary)]">
              {heroConfig.headline.highlight}
            </span>
            <br />
            {heroConfig.headline.line2}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3, ease: easing }}
            className="text-sm sm:text-base text-[var(--color-body-text)] mb-8 max-w-md leading-relaxed font-sans font-normal"
          >
            {heroConfig.subtitle}
          </motion.p>

          {/* Button Group */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4, ease: easing }}
            className="flex flex-wrap gap-4 w-full sm:w-auto mb-10"
          >
            <Link
              href={heroConfig.primaryCta.href}
              className="inline-flex items-center justify-center font-semibold transition-all duration-300 rounded-full text-xs px-6 py-3 bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-hover)] btn-diagonal-stripe shadow-lg cursor-pointer"
            >
              {heroConfig.primaryCta.label}
            </Link>
            <Link
              href={heroConfig.secondaryCta.href}
              className="inline-flex items-center justify-center font-semibold transition-all duration-300 rounded-full text-xs px-6 py-3 border-2 border-[var(--color-primary)] text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white bg-transparent cursor-pointer"
            >
              {heroConfig.secondaryCta.label}
            </Link>
          </motion.div>

          {/* Trust Bar - Glassmorphism Panel */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5, ease: easing }}
            className="flex items-center gap-5 glass-badge rounded-2xl p-4 w-full max-w-md shadow-sm"
          >
            {heroConfig.trustBar.map((item, idx) => {
              const Icon = trustIcons[item.icon];
              return (
                <React.Fragment key={item.label}>
                  {idx > 0 && <div className="w-px h-8 bg-white/70" aria-hidden="true" />}
                  <div className="flex items-center gap-2.5">
                    <span className="w-9 h-9 rounded-full bg-[var(--color-primary-light)] flex items-center justify-center text-[var(--color-primary)] shrink-0">
                      <Icon className="w-4 h-4" />
                    </span>
                    <span className="text-[11px] sm:text-xs font-bold text-[var(--color-dark-text)] tracking-wider whitespace-nowrap">
                      {item.label}
                    </span>
                  </div>
                </React.Fragment>
              );
            })}
          </motion.div>
        </motion.div>

        {/* Right Column - Wipe Slider */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.15, ease: easing }}
            className="lg:col-span-7 relative h-[600px] lg:h-[750px] lg:-mr-[calc((100vw-100%)/2)] lg:w-[calc(100%+((100vw-100%)/2))]"
        >
          {/* Floating Decorative Icons */}
          <div className="absolute top-8 right-8 w-12 h-12 rounded-full bg-white/80 backdrop-blur-md border border-white/60 shadow-lg flex items-center justify-center text-[var(--color-primary)] z-20 animate-pulse">
            <Sparkles className="w-5 h-5" />
          </div>
          <div className="absolute bottom-12 right-10 w-12 h-12 rounded-full bg-white/80 backdrop-blur-md border border-white/60 shadow-lg flex items-center justify-center text-[var(--color-primary)] z-20">
            <CircleDot className="w-5 h-5" />
          </div>

          {/* Peel Shape Wipe Slider */}
          <div className="hero-peel-shape w-full h-full overflow-hidden bg-[var(--color-dark)] drop-shadow-[30px_30px_60px_rgba(0,59,27,0.1)]">
            <div className="wipe-slider-container w-full h-full">
              {/* Base layer - After / Clinic */}
              <Image
                src={heroConfig.images.base}
                alt="Smile result achieved at our clinic"
                fill
                sizes="(max-width: 768px) 100vw, 55vw"
                priority
                className="object-cover"
              />

              {/* Overlay layer - Before / Lab */}
              <div className="wipe-overlay" aria-hidden="true">
                <Image
                  src={heroConfig.images.overlay}
                  alt=""
                  fill
                  sizes="(max-width: 768px) 100vw, 55vw"
                  className="wipe-layer object-cover"
                />
              </div>
            </div>
          </div>

          {/* Floating Live Badge */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.5, ease: easing }}
            className="absolute top-12 left-12 peel-card bg-white p-5 pr-7 shadow-xl z-20 max-w-[240px]"
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="relative flex w-2.5 h-2.5">
                <span className="absolute inline-flex h-full w-full rounded-full bg-[var(--color-primary-light)] opacity-75 animate-ping" />
                <span className="relative inline-flex rounded-full w-2.5 h-2.5 bg-[var(--color-primary)]" />
              </span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-primary)]">
                {heroConfig.liveBadge.label}
              </span>
            </div>
            <p className="text-sm font-bold text-[var(--color-dark-text)] leading-snug">
              {heroConfig.liveBadge.status}
            </p>
            <p className="text-xs font-semibold text-[var(--color-body-text)] mt-1">
              {heroConfig.liveBadge.nextAvailable}
            </p>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
};

export default Hero;