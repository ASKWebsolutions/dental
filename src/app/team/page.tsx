import type { Metadata } from 'next';
import React from 'react';
import TeamPageContent from '@/components/sections/team/TeamPageContent';
import Workflow from '@/components/sections/team/Workflow';
import TeamFAQ from '@/components/sections/team/TeamFAQ';
import ConsultationCTA from '@/components/sections/team/ConsultationCTA';

export const metadata: Metadata = {
  title: 'Our Team',
  description:
    'Meet the multidisciplinary dental and surgical specialists at Dental Cosmetics & Implant Centre.',
};

export default function TeamPage() {
  return (
    <>
      <TeamPageContent />
      <Workflow />
      <TeamFAQ />
      <ConsultationCTA />
    </>
  );
}
