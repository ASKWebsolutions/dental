'use client';

import React from 'react';
import Image from 'next/image';
import { motion, Variants } from 'framer-motion';
import Container from '@/components/ui/Container';
import SectionHeading from '@/components/ui/SectionHeading';
import { Doctor } from '@/types';
import { resolveImageUrl } from '@/lib/media';

interface DoctorsGridProps {
  doctors: Doctor[];
  onViewProfile: (doctor: Doctor) => void;
}

export const DoctorsGrid: React.FC<DoctorsGridProps> = ({ doctors, onViewProfile }) => {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  return (
    <section className="py-20 md:py-24 bg-bg-alt overflow-hidden">
      <Container className="flex flex-col items-center">
        {/* Header Block */}
        <div className="text-center flex flex-col items-center mb-16 max-w-2xl">
          <SectionHeading
            eyebrow="Our Dental Specialists"
            title="World-Class Clinical Mastery & Artistic Vision"
            highlightedText="Clinical Mastery"
            highlightColor="teal-clean"
            subtitle="Meet our multidisciplinary team of cosmetic surgeons, implantologists, and aesthetic specialists dedicated to restoring your smile."
            align="center"
            showDots={true}
          />
        </div>

        {/* 3-Column Responsive Doctors Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={doctors.length > 0 ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full min-h-[400px]"
        >
          {doctors.map((doc, idx) => (
            <motion.div
              key={doc.id || idx}
              variants={cardVariants}
              className="bg-white rounded-3xl p-6 sm:p-7 shadow-card border border-slate-100 flex flex-col justify-between h-full text-left group hover:-translate-y-1.5 hover:shadow-lg transition-all duration-300 relative overflow-hidden"
            >
              <div>
                {/* Photo Frame - grayscale to color on hover */}
                <div className="relative w-full h-[260px] sm:h-[280px] rounded-2xl overflow-hidden bg-slate-100 mb-6 shrink-0">
                  <Image
                    src={resolveImageUrl(doc.imagePath, '/images/home/doctor-elena.png')}
                    alt={doc.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 360px"
                    className="object-cover grayscale contrast-125 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Doctor Name & Title */}
                <h3 className="font-serif font-bold text-2xl text-primary mb-1 tracking-tight">
                  {doc.name}
                </h3>
                <p className="text-xs font-bold uppercase tracking-wider text-accent mb-4">
                  {doc.title}
                </p>

                {/* Bio */}
                <p className="text-sm text-body-text leading-relaxed font-sans font-normal mb-5 line-clamp-3">
                  {doc.bio}
                </p>
              </div>

              {/* View Profile Action */}
              <div className="pt-4 border-t border-slate-100 mt-auto">
                <button
                  onClick={() => onViewProfile(doc)}
                  className="w-full py-2.5 px-4 rounded-full border border-gray-200 hover:border-emerald-700 hover:text-emerald-700 text-xs font-semibold text-gray-700 transition-colors cursor-pointer"
                >
                  View Profile
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
};

export default DoctorsGrid;
