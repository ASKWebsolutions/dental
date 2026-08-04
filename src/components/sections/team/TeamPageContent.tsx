'use client';

import React, { useEffect, useState } from 'react';
import { Doctor } from '@/types';
import TeamHero from './TeamHero';
import FounderSpotlight from './FounderSpotlight';
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

  return (
    <>
      <TeamHero />
      <FounderSpotlight founder={founder} onViewProfile={setSelectedDoctor} />
      <DoctorsGrid doctors={allDoctors} onViewProfile={setSelectedDoctor} />
      <DoctorModal doctor={selectedDoctor} onClose={() => setSelectedDoctor(null)} />
    </>
  );
};

export default TeamPageContent;
