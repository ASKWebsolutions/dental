import React from 'react';
import Container from '@/components/ui/Container';
import SectionHeading from '@/components/ui/SectionHeading';
import { ourLocation } from '@/data/ourLocation';

export const LocationHero: React.FC = () => {
  return (
    <section className="relative pt-12 pb-12 md:pt-16 md:pb-16 bg-bg overflow-hidden flex flex-col items-center">
      {/* Decorative ambient blobs */}
      <div className="absolute top-[10%] left-[5%] w-16 h-16 rounded-full bg-primary/5 blur-xl pointer-events-none" />
      <div className="absolute bottom-[20%] right-[10%] w-24 h-24 rounded-full bg-accent/5 blur-2xl pointer-events-none" />

      <Container className="flex flex-col items-center text-center">
        <h1 className="sr-only">{ourLocation.title}</h1>
        <SectionHeading
          eyebrow={ourLocation.eyebrow}
          title={ourLocation.title}
          highlightedText={ourLocation.highlightedText}
          highlightColor="teal-clean"
          subtitle={ourLocation.subtitle}
          align="center"
          showDots={true}
        />

        <nav
          aria-label="Page sections"
          className="flex flex-wrap items-center justify-center gap-3 mt-8"
        >
          {ourLocation.chips.map((chip) => (
            <a
              key={chip.href}
              href={chip.href}
              className="px-5 py-2.5 rounded-full bg-white border border-slate-100 shadow-sm text-xs font-bold text-primary hover:bg-primary hover:text-white hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary transition-all"
            >
              {chip.label}
            </a>
          ))}
        </nav>
      </Container>
    </section>
  );
};

export default LocationHero;
