'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ShieldCheck } from 'lucide-react';
import Container from '@/components/ui/Container';

const stats = [
  { value: '98%', label: 'Patient Satisfaction' },
  { value: '15k+', label: 'Procedures Completed' },
];

export const ConsultationBanner: React.FC = () => {
  return (
    <section className="py-20 md:py-24 bg-bg overflow-hidden">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="bg-[#003b1b] rounded-[32px] overflow-hidden shadow-xl"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Left: copy */}
            <div className="p-8 md:p-12 xl:p-16 flex flex-col justify-center text-left">
              <span className="inline-flex items-center w-fit text-[10px] font-bold uppercase tracking-wider text-[#b1f2be] bg-white/10 px-4 py-2 rounded-full mb-6">
                Custom Consultation
              </span>
              <h2 className="font-serif font-bold text-3xl sm:text-4xl lg:text-[40px] lg:leading-[52px] text-white tracking-[-0.5px] mb-5">
                Your Smile, Designed Just for You
              </h2>
              <p className="text-sm sm:text-base text-white/70 leading-relaxed font-sans font-normal mb-8 max-w-md">
                Every smile is unique — and so is our plan. Our specialists map out a treatment
                roadmap tailored to your teeth, your goals, and your timeline before we begin.
              </p>
              <div className="flex flex-wrap items-center gap-8 mb-10">
                {stats.map((s) => (
                  <div key={s.label}>
                    <p className="font-serif font-bold text-3xl sm:text-4xl text-[#b1f2be]">
                      {s.value}
                    </p>
                    <p className="text-xs text-white/60 mt-1 font-sans font-normal">{s.label}</p>
                  </div>
                ))}
              </div>
              <Link
                href="/book-appointment"
                className="inline-flex items-center justify-center w-fit font-semibold transition-all duration-300 rounded-full text-sm px-8 py-3.5 bg-[#b1f2be] text-[#003b1b] hover:bg-[#96d5a3] btn-diagonal-stripe shadow-lg cursor-pointer"
              >
                Request Consultation
              </Link>
            </div>

            {/* Right: studio photo */}
            <div className="relative min-h-[280px] lg:min-h-full">
              <Image
                src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=1200"
                alt="Inside our calm, modern dental studio"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              {/* Floating ISO badge */}
              <div className="absolute bottom-6 left-6 flex items-center gap-3 bg-white rounded-2xl px-5 py-4 shadow-lg">
                <span className="flex items-center justify-center w-10 h-10 rounded-full bg-[#003b1b] flex-shrink-0">
                  <ShieldCheck className="w-5 h-5 text-[#b1f2be]" />
                </span>
                <div>
                  <p className="text-sm font-bold text-[#18181b] font-sans leading-tight">
                    ISO 9001:2015
                  </p>
                  <p className="text-[10px] text-[#18181b]/60 font-sans font-semibold uppercase tracking-wider mt-0.5">
                    Certified Quality Management
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
};

export default ConsultationBanner;
