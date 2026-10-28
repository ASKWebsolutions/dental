import type { Metadata } from 'next';
import React from 'react';
import LocationHero from '@/components/sections/location/LocationHero';
import LocationMap from '@/components/sections/location/LocationMap';
import LocationDetails from '@/components/sections/location/LocationDetails';
import LocationGallery from '@/components/sections/location/LocationGallery';
import LocationCta from '@/components/sections/location/LocationCta';
import { getClinicSettings } from '@/lib/contact';

export const metadata: Metadata = {
  title: 'Our Location - Dental Cosmetics & Implant Centre',
  description:
    'Find Dental Cosmetics & Implant Centre at Zaki Centre, I-8 Markaz Islamabad. Get directions, phone, WhatsApp, email, and weekly opening hours.',
};

export default async function OurLocationPage() {
  const settings = await getClinicSettings();
  const openingHours = [...(settings.openingHours || [])].sort(
    (a, b) => a.displayOrder - b.displayOrder
  );

  return (
    <>
      <LocationHero />
      <LocationMap settings={settings} />
      <LocationDetails settings={{ ...settings, openingHours }} />
      <LocationGallery />
      <LocationCta settings={settings} />
    </>
  );
}
