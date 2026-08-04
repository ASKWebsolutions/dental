'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { X, Calendar, GraduationCap, CheckCircle2, Quote } from 'lucide-react';
import { Doctor } from '@/types';
import { resolveImageUrl } from '@/lib/media';

interface DoctorModalProps {
  doctor: Doctor | null;
  onClose: () => void;
}

const DEFAULT_PORTRAIT = '/images/home/doctor-elena.png';

interface DoctorPortraitProps {
  doctor: Doctor;
}

const DoctorPortrait: React.FC<DoctorPortraitProps> = ({ doctor }) => {
  const [colorized, setColorized] = useState(false);

  return (
    <div className="relative w-28 h-28 md:w-36 md:h-36 rounded-2xl overflow-hidden bg-slate-100 shrink-0">
      <Image
        src={resolveImageUrl(doctor.imagePath, DEFAULT_PORTRAIT)}
        alt={doctor.name}
        fill
        sizes="144px"
        className={`object-cover transition-[filter] duration-1000 ease-out ${
          colorized ? 'grayscale-0 contrast-100' : 'grayscale contrast-125'
        }`}
        onLoad={() => setColorized(true)}
      />
    </div>
  );
};

export const DoctorModal: React.FC<DoctorModalProps> = ({ doctor, onClose }) => {
  const prefersReducedMotion = useReducedMotion();
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Escape key + body scroll lock while open
  useEffect(() => {
    if (!doctor) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [doctor, onClose]);

  if (!doctor) return null;

  const education = (doctor.education ?? []).filter(Boolean);
  const specialties = (doctor.specialties ?? []).filter(Boolean);
  const quote = doctor.quote?.trim();
  const experience = doctor.experience?.trim();

  return (
    <AnimatePresence>
      {doctor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 font-sans text-slate-800">
          {/* Overlay */}
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={prefersReducedMotion ? undefined : { opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Dialog Panel */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`${doctor.name} — Profile`}
            initial={prefersReducedMotion ? false : { opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={prefersReducedMotion ? undefined : { opacity: 0, y: 24, scale: 0.97 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="relative w-full max-w-2xl bg-white rounded-[2rem] shadow-2xl border border-slate-100 overflow-hidden z-10 max-h-[90vh] flex flex-col"
          >
            {/* Close Button */}
            <button
              ref={closeButtonRef}
              onClick={onClose}
              aria-label="Close profile"
              className="absolute top-5 right-5 z-20 p-2 rounded-full bg-white/85 backdrop-blur-sm text-slate-500 hover:bg-white hover:text-slate-800 shadow-sm transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Scrollable Body */}
            <div className="overflow-y-auto">
              {/* Header */}
              <div className="p-6 md:p-8 pb-0">
                <div className="flex flex-col sm:flex-row items-start gap-5">
                  {/* Headshot with grayscale-to-color transition on load (keyed per doctor) */}
                  <DoctorPortrait key={doctor.id} doctor={doctor} />

                  <div className="text-left min-w-0">
                    <span className="inline-block px-3 py-1 rounded-full bg-primary-light/20 text-primary text-[10px] md:text-xs font-bold uppercase tracking-wider mb-2">
                      {doctor.title}
                    </span>
                    <h3 className="font-serif font-bold text-2xl md:text-3xl text-primary leading-tight">
                      {doctor.name}
                    </h3>

                    {experience && (
                      <p className="mt-2 inline-flex items-center gap-1.5 text-xs font-bold text-accent">
                        <Calendar className="w-3.5 h-3.5" />
                        {experience}
                      </p>
                    )}
                  </div>
                </div>

                {/* Quote */}
                {quote && (
                  <blockquote className="relative mt-6 pl-4 md:pl-5 border-l-2 border-primary">
                    <Quote className="absolute -left-1 -top-4 w-5 h-5 text-primary/30" />
                    <p className="font-serif italic text-sm md:text-base text-slate-600 leading-relaxed">
                      &ldquo;{quote}&rdquo;
                    </p>
                  </blockquote>
                )}
              </div>

              {/* Bio */}
              <div className="p-6 md:p-8">
                <p className="text-sm text-body-text leading-relaxed font-normal">{doctor.bio}</p>

                {/* Education & Specialties */}
                <div className="mt-7 grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* Education */}
                  <div className="bg-bg-alt/60 rounded-2xl p-5 border border-slate-100">
                    <h4 className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-primary mb-3">
                      <GraduationCap className="w-4 h-4" />
                      Qualifications
                    </h4>
                    {education.length > 0 ? (
                      <ul className="space-y-2.5">
                        {education.map((item) => (
                          <li key={item} className="flex items-start gap-2 text-xs text-slate-700 leading-relaxed">
                            <CheckCircle2 className="w-3.5 h-3.5 text-primary mt-0.5 shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-xs text-slate-400">Qualifications available on request.</p>
                    )}
                  </div>

                  {/* Specialties */}
                  <div className="bg-bg-alt/60 rounded-2xl p-5 border border-slate-100">
                    <h4 className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-primary mb-3">
                      <CheckCircle2 className="w-4 h-4" />
                      Specialties
                    </h4>
                    {specialties.length > 0 ? (
                      <div className="flex flex-wrap gap-2">
                        {specialties.map((item) => (
                          <span
                            key={item}
                            className="px-3 py-1.5 rounded-full bg-white border border-slate-200 text-xs font-semibold text-slate-700"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <p className="text-xs text-slate-400">Specialties available on request.</p>
                    )}
                  </div>
                </div>
              </div>

              {/* CTA Footer */}
              <div className="p-6 md:p-8 pt-0">
                <Link
                  href={`/book-appointment?doctor=${encodeURIComponent(doctor.id)}`}
                  onClick={onClose}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-primary text-white hover:bg-primary-hover btn-diagonal-stripe shadow-md transition-all duration-300 text-xs font-bold"
                >
                  <Calendar className="w-4 h-4" />
                  Book Appointment with {doctor.name}
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default DoctorModal;
