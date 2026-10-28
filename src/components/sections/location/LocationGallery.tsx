'use client';

import React from 'react';
import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import Container from '@/components/ui/Container';
import SectionHeading from '@/components/ui/SectionHeading';
import { ourLocation } from '@/data/ourLocation';

export const LocationGallery: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();
  const entrance = prefersReducedMotion
    ? {}
    : { initial: { opacity: 0, y: 24 }, whileInView: { opacity: 1, y: 0 } };

  return (
    <section id="gallery" className="py-16 md:py-20 bg-white scroll-mt-24">
      <Container>
        <SectionHeading
          eyebrow={ourLocation.gallery.eyebrow}
          title={ourLocation.gallery.title}
          highlightedText={ourLocation.gallery.highlightedText}
          highlightColor="teal-clean"
          subtitle={ourLocation.gallery.subtitle}
          align="center"
          className="mx-auto mb-10"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {ourLocation.gallery.images.map((image, i) => (
            <motion.figure
              key={`${image.src}-${i}`}
              {...entrance}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: 'easeOut' }}
              className={`relative rounded-[28px] overflow-hidden group shadow-card ${image.className}`}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 66vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/5 to-transparent" />
              <figcaption className="absolute left-5 bottom-4 text-white text-xs font-bold tracking-wide">
                {image.caption}
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default LocationGallery;
