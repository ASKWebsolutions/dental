'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { Quote, Calendar, GraduationCap, ArrowRight, BadgeCheck } from 'lucide-react';
import Container from '@/components/ui/Container';
import { Doctor } from '@/types';
import { resolveImageUrl } from '@/lib/media';

interface FounderSpotlightProps {
  founder: Doctor | null;
  onViewProfile: (doctor: Doctor) => void;
}

const DEFAULT_PORTRAIT = '/images/home/doctor-elena.png';

export const FounderSpotlight: React.FC<FounderSpotlightProps> = ({ founder, onViewProfile }) => {
  const prefersReducedMotion = useReducedMotion();

  if (!founder) return null;

  const firstName = founder.name.replace(/^Dr\.?\s*/i, '').split(' ')[0];
  const education = (founder.education ?? []).filter(Boolean).slice(0, 2);
  const quote = founder.quote?.trim();
  const experience = founder.experience?.trim();

  return (
    <section className="py-16 md:py-20 bg-bg overflow-hidden">
      <Container>
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="grid grid-cols-1 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] bg-white rounded-[2rem] border border-slate-100 shadow-card overflow-hidden"
        >
          {/* Portrait */}
          <div className="relative aspect-[4/5] sm:aspect-[16/11] lg:aspect-auto lg:min-h-[520px] overflow-hidden group">
            <Image
              src={resolveImageUrl(founder.imagePath, DEFAULT_PORTRAIT)}
              alt={founder.name}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="object-cover grayscale contrast-125 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

            {/* Pill Badge */}
            <div className="absolute top-5 left-5 z-10 inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/15 backdrop-blur-md border border-white/25 text-white text-[11px] font-bold uppercase tracking-wider">
              <BadgeCheck className="w-4 h-4" />
              Founder &amp; Medical Director
            </div>

            {/* Bottom-left name caption on image (mobile focus) */}
            <div className="absolute bottom-5 left-5 z-10 lg:hidden">
              <h3 className="font-serif font-bold text-2xl text-white">{founder.name}</h3>
            </div>
          </div>

          {/* Profile Summary */}
          <div className="p-8 md:p-12 flex flex-col justify-center text-left">
            <span className="text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase text-primary mb-4">
              Meet Your Medical Director
            </span>

            <h2 className="font-serif font-bold text-3xl md:text-4xl lg:text-[42px] lg:leading-[52px] text-primary mb-2">
              {founder.name}
            </h2>
            <p className="text-xs md:text-sm font-bold uppercase tracking-wider text-accent mb-6">
              {founder.title}
            </p>

            {/* Quote */}
            {quote && (
              <blockquote className="relative mb-7 pl-5 md:pl-6">
                <Quote className="absolute -left-1 -top-4 w-6 h-6 text-primary/30" />
                <p className="font-serif italic text-sm md:text-base text-slate-600 leading-relaxed">
                  &ldquo;{quote}&rdquo;
                </p>
              </blockquote>
            )}

            {/* Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {experience && (
                <div className="bg-bg-alt/60 rounded-2xl p-4 border border-slate-100 flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-primary-light/20 text-primary flex items-center justify-center shrink-0">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Experience</p>
                    <p className="text-xs font-bold text-slate-800 mt-0.5 leading-snug">{experience}</p>
                  </div>
                </div>
              )}

              {education.length > 0 && (
                <div className="bg-bg-alt/60 rounded-2xl p-4 border border-slate-100 flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-primary-light/20 text-primary flex items-center justify-center shrink-0">
                    <GraduationCap className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Qualifications</p>
                    <ul className="mt-0.5 space-y-0.5">
                      {education.map((item) => (
                        <li key={item} className="text-xs font-bold text-slate-800 leading-snug">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => onViewProfile(founder)}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-primary text-white hover:bg-primary-hover btn-diagonal-stripe shadow-md transition-all duration-300 text-xs font-bold cursor-pointer"
              >
                View Full Profile
                <ArrowRight className="w-4 h-4" />
              </button>
              <Link
                href={`/book-appointment?doctor=${encodeURIComponent(founder.id)}`}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full border border-slate-200 text-slate-700 hover:border-primary hover:text-primary transition-colors text-xs font-bold"
              >
                Book Consultation with {firstName}
              </Link>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
};

export default FounderSpotlight;
