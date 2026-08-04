'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, useReducedMotion, Variants } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { testimonials as staticTestimonials } from '@/data/testimonials';
import { Testimonial } from '@/types';

const easing = [0.22, 1, 0.36, 1] as const;
const AUTOPLAY_MS = 6000;

interface TestimonialCarouselProps {
  initialTestimonials?: Testimonial[];
}

export const TestimonialCarousel: React.FC<TestimonialCarouselProps> = ({
  initialTestimonials,
}) => {
  const displayTestimonials =
    initialTestimonials && initialTestimonials.length > 0
      ? initialTestimonials
      : staticTestimonials;

  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  // Auto-play: advance every AUTOPLAY_MS, paused on hover and for reduced motion
  useEffect(() => {
    if (shouldReduceMotion || paused || displayTestimonials.length <= 1) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % displayTestimonials.length);
    }, AUTOPLAY_MS);
    return () => clearInterval(timer);
  }, [shouldReduceMotion, paused, displayTestimonials.length]);

  if (!displayTestimonials.length) return null;

  const current = displayTestimonials[index % displayTestimonials.length];

  // Realistic paper-unwrap page flip, simplified to a fade for reduced motion
  const pageVariants: Variants = {
    enter: (dir: number) =>
      shouldReduceMotion
        ? { opacity: 0 }
        : {
            opacity: 0,
            rotateY: dir > 0 ? 45 : -45,
            scale: 0.95,
            transformOrigin: dir > 0 ? 'top right' : 'bottom left',
          },
    center: shouldReduceMotion
      ? { opacity: 1, transition: { duration: 0.4, ease: easing } }
      : {
          opacity: 1,
          rotateY: 0,
          scale: 1,
          transition: { duration: 0.45, ease: easing },
        },
    exit: (dir: number) =>
      shouldReduceMotion
        ? { opacity: 0, transition: { duration: 0.3, ease: 'easeIn' } }
        : {
            opacity: 0,
            rotateY: dir > 0 ? -45 : 45,
            scale: 0.95,
            transformOrigin: dir > 0 ? 'bottom left' : 'top right',
            transition: { duration: 0.35, ease: 'easeIn' },
          },
  };

  const handlePrev = () => {
    setDirection(-1);
    setIndex((prev) => (prev - 1 + displayTestimonials.length) % displayTestimonials.length);
  };
  const handleNext = () => {
    setDirection(1);
    setIndex((prev) => (prev + 1) % displayTestimonials.length);
  };

  return (
    <section className="py-16 md:py-24 px-6 bg-[var(--color-bg)] flex justify-center">
      {/* Spotlight Card */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: easing }}
        className="max-w-4xl w-full bg-[#ece2c3] rounded-[2rem] p-8 md:p-14 relative overflow-hidden shadow-xl text-left"
        style={{ perspective: 1000 }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {/* Top-Right "Next Review" Peeled Corner */}
        <button
          onClick={handleNext}
          title="Next Review"
          aria-label="Next review"
          className="absolute top-0 right-0 w-16 h-16 bg-[var(--color-bg)] cursor-pointer group z-30 hover:scale-105 transition-transform duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-inset"
          style={{ clipPath: 'polygon(100% 0, 0 0, 100% 100%)' }}
        >
          {/* Subtle shadow/peel visual hint on hover */}
          <div className="absolute inset-0 bg-black/5 group-hover:bg-black/10 transition-colors" />
          {/* Corner turn indicator */}
          <ChevronRight className="absolute bottom-2 left-2 w-4 h-4 text-[var(--color-primary)]/40 group-hover:text-[var(--color-primary)] transition-colors" />
        </button>

        <AnimatePresence initial={false} mode="wait" custom={direction}>
          <motion.div
            key={`${current.id}-${index}`}
            custom={direction}
            variants={pageVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="relative z-10"
          >
            {/* Quote Icon */}
            <Quote className="w-8 h-8 text-[var(--color-primary)] rotate-180 mb-4" aria-hidden="true" />

            {/* Quote Text */}
            <blockquote className="font-serif italic text-lg md:text-2xl text-[var(--color-primary)] leading-relaxed mb-8 max-w-3xl">
              {current.text}
            </blockquote>

            {/* Patient Details Row */}
            <div className="flex items-center gap-4">
              <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-white shrink-0 bg-slate-100">
                <Image
                  src="/images/home/patient-avatar.png"
                  alt={`${current.author}'s photo`}
                  fill
                  sizes="56px"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col gap-0.5">
                <cite className="not-italic font-serif font-bold text-base md:text-lg text-[var(--color-primary)]">
                  {current.author}
                </cite>
                <span className="text-xs font-bold tracking-widest uppercase text-[var(--color-body-text)]">
                  {current.role}
                </span>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Bottom-Left "Previous Review" Peeled Corner */}
        <button
          onClick={handlePrev}
          title="Previous Review"
          aria-label="Previous review"
          className="absolute bottom-0 left-0 w-16 h-16 bg-[var(--color-bg)] cursor-pointer group z-30 hover:scale-105 transition-transform duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-inset"
          style={{ clipPath: 'polygon(0 100%, 0 0, 100% 100%)' }}
        >
          {/* Subtle shadow/peel visual hint on hover */}
          <div className="absolute inset-0 bg-black/5 group-hover:bg-black/10 transition-colors" />
          {/* Corner turn indicator */}
          <ChevronLeft className="absolute top-2 right-2 w-4 h-4 text-[var(--color-primary)]/40 group-hover:text-[var(--color-primary)] transition-colors" />
        </button>

        {/* Dots Indicator - subtle */}
        <div className="flex items-center justify-center gap-2 mt-8 pt-6 border-t border-[var(--color-primary)]/10">
          {displayTestimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              aria-label={`Go to testimonial ${i + 1}`}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                i === index ? 'w-6 bg-[var(--color-primary)]' : 'w-2 bg-[var(--color-primary)]/25 hover:bg-[var(--color-primary)]/40'
              }`}
            />
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default TestimonialCarousel;
