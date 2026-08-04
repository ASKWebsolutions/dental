'use client';

import React from 'react';
import { motion, Variants } from 'framer-motion';
import Container from '@/components/ui/Container';
import { ServiceCard } from './ServiceCard';
import { Service } from '@/types';

interface ServicesGridProps {
  services: Service[];
  onReset?: () => void;
  searchQuery?: string;
}

export const ServicesGrid: React.FC<ServicesGridProps> = ({ services, onReset, searchQuery }) => {

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 },
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.45, ease: 'easeOut' as const },
    },
  };

  return (
    <section id="services-list" className="py-20 md:py-24 bg-bg-alt overflow-hidden">
      <Container>
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 mb-16 w-full">
          <div className="max-w-2xl text-left">
            <h2 className="font-serif font-bold text-3xl md:text-4xl text-primary leading-tight mb-4">
              Clinical Excellence & Bespoke Services
            </h2>
            <p className="text-sm sm:text-base text-body-text font-sans leading-relaxed font-normal">
              Explore our comprehensive range of dental treatments, structured around biometric stability
              and aesthetic perfection.
            </p>
          </div>
        </div>

        {/* Uniform Responsive Grid Layout (3 cols desktop, 2 cols tablet, 1 col mobile) */}
        {services.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-500 text-sm mb-4">No matching procedures found.</p>
            {onReset && (
              <button
                onClick={onReset}
                className="px-6 py-2 bg-[#003b1b] text-white rounded-full text-xs font-semibold"
              >
                Show All Services
              </button>
            )}
          </div>
        ) : (
          <motion.div
            key={searchQuery || 'all'}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full"
          >
            {services.map((service) => (
              <ServiceCard key={service.id || service.title} service={service} variants={cardVariants} />
            ))}
          </motion.div>
        )}
      </Container>
    </section>
  );
};

export default ServicesGrid;
