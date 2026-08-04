'use client';

import React, { useEffect, useState } from 'react';
import { Doctor } from '@/types';
import TeamHero from './TeamHero';
import FeaturedDoctors from './FeaturedDoctors';
import DoctorsGrid from './DoctorsGrid';
import DoctorModal from './DoctorModal';

export const TeamPageContent: React.FC = () => {
  const [allDoctors, setAllDoctors] = useState<Doctor[]>([]);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);

  useEffect(() => {
    fetch('/api/doctors')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setAllDoctors(data);
      })
      .catch(() => {});
  }, []);

  const founder = allDoctors.find((d) => d.isFounder) ?? allDoctors[0] ?? null;
  const adjacent = allDoctors.find((d) => d.id !== founder?.id) ?? null;
  const gridDoctors = allDoctors.filter(
    (d) => d.id !== founder?.id && d.id !== adjacent?.id
  );

  return (
    <>
      <TeamHero />
      <FeaturedDoctors
        founder={founder}
        adjacent={adjacent}
        onViewProfile={setSelectedDoctor}
      />
      <DoctorsGrid doctors={gridDoctors} onViewProfile={setSelectedDoctor} />
      <DoctorModal doctor={selectedDoctor} onClose={() => setSelectedDoctor(null)} />
    </>
  );
};

export default TeamPageContent;
