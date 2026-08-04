import type { Metadata } from 'next';
import React from 'react';
import AboutHero from '@/components/sections/about/AboutHero';
import AboutTimeline from '@/components/sections/about/Timeline';
import TechBento from '@/components/sections/about/TechBento';
import Visionaries from '@/components/sections/about/Visionaries';
import AboutCTA from '@/components/sections/about/AboutCTA';

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Learn about our legacy of dedicated care, cutting-edge digital dentistry innovation, and the dental cosmetics and implant specialists leading our practice.',
};

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <AboutTimeline />
      <TechBento />
      <Visionaries />
      <AboutCTA />
    </>
  );
}
