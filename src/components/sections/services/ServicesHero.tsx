'use client';

import React, { useMemo, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Search, X } from 'lucide-react';
import Container from '@/components/ui/Container';
import { ServicesGrid } from './ServicesGrid';
import { services as staticServices } from '@/data/services';
import { Service } from '@/types';

interface ServicesHeroProps {
  initialServices?: Service[];
}

export const ServicesHero: React.FC<ServicesHeroProps> = ({ initialServices }) => {
  const prefersReducedMotion = useReducedMotion();
  const [searchQuery, setSearchQuery] = useState('');

  const allServices =
    initialServices && initialServices.length > 0 ? initialServices : staticServices;

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const clearSearch = () => {
    setSearchQuery('');
  };

  const filteredServices = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    // If query is empty, return ALL services
    if (!query) {
      return allServices;
    }

    return allServices.filter((service) => {
      const titleMatch = service.title?.toLowerCase().includes(query);
      const shortDescMatch = service.shortDescription?.toLowerCase().includes(query);
      const descMatch = service.description?.toLowerCase().includes(query);
      const featureMatch = service.bullets?.some((f) => f.toLowerCase().includes(query));

      return titleMatch || shortDescMatch || descMatch || featureMatch;
    });
  }, [searchQuery, allServices]);

  return (
    <>
      <section className="relative pt-12 pb-16 md:pt-16 md:pb-20 overflow-hidden bg-bg flex flex-col justify-center items-center text-center">
        <Container className="max-w-[768px] flex flex-col items-center">
          {/* Top Subtle Vertical Divider Line */}
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="w-px h-8 bg-[#003b1b] mx-auto mb-4"
          />

          {/* Eyebrow */}
          <motion.span
            initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="text-xs font-bold tracking-[0.3em] text-[#003b1b] uppercase block mb-3"
          >
            Precision &amp; Artistry
          </motion.span>

          {/* H1 Title */}
          <motion.h1
            initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
            className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4"
          >
            Comprehensive Dental <span className="italic font-normal text-[#003b1b]">Solutions</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
            className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto mb-8 font-sans leading-relaxed"
          >
            From routine maintenance to complex reconstructive surgery, our boutique clinic offers
            a full spectrum of restorative and cosmetic services tailored to your unique anatomy.
          </motion.p>

          {/* Rounded Search Bar */}
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3, ease: 'easeOut' }}
            className="max-w-md mx-auto relative w-full"
          >
            <Search className="w-5 h-5 absolute left-5 top-1/2 -translate-y-1/2 text-emerald-600" />
            <input
              type="text"
              placeholder="Search for a procedure..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full pl-13 pr-10 py-3.5 rounded-full bg-white border border-gray-200/80 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#003b1b]/20 text-sm text-gray-800 placeholder-gray-400"
            />
            {searchQuery && (
              <button
                onClick={clearSearch}
                aria-label="Clear search"
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </motion.div>
        </Container>
      </section>

      <ServicesGrid
        key={searchQuery || 'all'}
        services={filteredServices}
        onReset={clearSearch}
        searchQuery={searchQuery}
      />
    </>
  );
};

export default ServicesHero;
