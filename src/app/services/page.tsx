import type { Metadata } from 'next';
import React from 'react';
import ServicesHero from '@/components/sections/services/ServicesHero';
import ConsultationBanner from '@/components/sections/services/ConsultationBanner';
import VisitOurStudio from '@/components/sections/services/VisitOurStudio';
import ScrollReveal from '@/components/ui/ScrollReveal';
import { getServices } from '@/data/services';
import { getClinicSettings } from '@/lib/contact';

export const metadata: Metadata = {
  title: 'Our Services',
  description:
    'Discover our specialized dental solutions. We offer cosmetic makeovers, dental implants, Invisalign, and priority emergency dental care.',
};

export default async function ServicesPage() {
  const initialServices = await getServices();
  const settings = await getClinicSettings();

  return (
    <>
      <ServicesHero initialServices={initialServices} />
      <ScrollReveal>
        <ConsultationBanner />
      </ScrollReveal>
      <ScrollReveal>
        <VisitOurStudio settings={settings} />
      </ScrollReveal>
    </>
  );
}
