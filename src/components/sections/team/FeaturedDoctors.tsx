'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { Award, GraduationCap, Quote, ArrowRight } from 'lucide-react';
import Container from '@/components/ui/Container';
import { Doctor } from '@/types';
import { resolveImageUrl } from '@/lib/media';

interface FeaturedDoctorsProps {
  founder: Doctor | null;
  adjacent: Doctor | null;
  onViewProfile: (doctor: Doctor) => void;
}

const DEFAULT_PORTRAIT = '/images/home/doctor-elena.png';

export const FeaturedDoctors: React.FC<FeaturedDoctorsProps> = ({
  founder,
  adjacent,
  onViewProfile,
}) => {
  const prefersReducedMotion = useReducedMotion();

  if (!founder) return null;

  const quote = founder.quote?.trim();
  const experience = founder.experience?.trim();
  const education = (founder.education ?? []).filter(Boolean);
  const adjacentBio = adjacent?.bio?.trim();

  return (
    <section className="py-8 md:py-12 bg-bg overflow-hidden">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
          {/* Founder Spotlight (spans 2 columns) */}
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className={`${
              adjacent ? 'lg:col-span-2' : 'lg:col-span-3'
            } bg-white rounded-[2rem] border border-slate-100 shadow-card overflow-hidden group`}
          >
            <div className="grid grid-cols-1 md:grid-cols-2">
              {/* Portrait — full color by default */}
              <div className="relative aspect-[3/4] md:h-full overflow-hidden">
                <Image
                  src={resolveImageUrl(founder.imagePath, DEFAULT_PORTRAIT)}
                  alt={founder.name}
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 45vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              </div>

              {/* Profile content */}
              <div className="p-8 md:p-10 flex flex-col justify-center text-left">
                <span className="text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase text-primary mb-3">
                  Founder &amp; Medical Director
                </span>
                <h2 className="font-serif font-bold text-2xl md:text-3xl lg:text-[34px] lg:leading-[42px] text-gray-900 mb-1">
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
                        <Award className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                          Experience
                        </p>
                        <p className="text-xs font-bold text-slate-800 mt-0.5 leading-snug">
                          {experience}
                        </p>
                      </div>
                    </div>
                  )}

                  {education.length > 0 && (
                    <div className="bg-bg-alt/60 rounded-2xl p-4 border border-slate-100 flex items-start gap-3">
                      <div className="w-9 h-9 rounded-xl bg-primary-light/20 text-primary flex items-center justify-center shrink-0">
                        <GraduationCap className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                          Qualifications
                        </p>
                        <p className="text-xs font-bold text-slate-800 mt-0.5 leading-snug">
                          {education[0]}
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Book CTA */}
                <Link
                  href={`/book-appointment?doctor=${encodeURIComponent(founder.id)}`}
                  className="inline-flex items-center justify-center gap-2 w-fit px-7 py-3.5 rounded-full bg-[#003b1b] text-white hover:bg-emerald-900 btn-diagonal-stripe shadow-md transition-all duration-300 text-xs font-bold cursor-pointer"
                >
                  Book with {founder.name}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Adjacent Doctor Card (spans 1 column) */}
          {adjacent && (
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
              className="bg-white rounded-[2rem] border border-slate-100 shadow-card overflow-hidden flex flex-col group hover:-translate-y-1.5 hover:shadow-lg transition-all duration-300"
            >
              <div className="relative w-full aspect-[4/5] overflow-hidden bg-slate-100">
                <Image
                  src={resolveImageUrl(adjacent.imagePath, DEFAULT_PORTRAIT)}
                  alt={adjacent.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="object-cover grayscale contrast-125 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
              </div>

              <div className="p-6 flex flex-col flex-1 text-left">
                <h3 className="font-serif font-bold text-xl text-gray-900 mb-1">{adjacent.name}</h3>
                <p className="text-[10px] font-bold uppercase tracking-wider text-accent mb-4">
                  {adjacent.title}
                </p>
                {adjacentBio && (
                  <p className="text-xs text-body-text leading-relaxed font-sans font-normal mb-5 line-clamp-3 flex-1">
                    {adjacentBio}
                  </p>
                )}
                <button
                  onClick={() => onViewProfile(adjacent)}
                  className="w-full py-2.5 px-4 rounded-full border border-gray-200 hover:border-emerald-700 hover:text-emerald-700 text-xs font-semibold text-gray-700 transition-colors cursor-pointer"
                >
                  View Profile
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </Container>
    </section>
  );
};

export default FeaturedDoctors;
