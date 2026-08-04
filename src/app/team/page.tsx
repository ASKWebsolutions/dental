import type { Metadata } from 'next';
import React from 'react';
import TeamPageContent from '@/components/sections/team/TeamPageContent';
import TeamFAQ from '@/components/sections/team/TeamFAQ';
import BeginTransformation from '@/components/sections/team/BeginTransformation';

export const metadata: Metadata = {
  title: 'Our Team',
  description:
    'Meet the multidisciplinary dental and surgical specialists at Dental Cosmetics & Implant Centre.',
};

export default function TeamPage() {
  return (
    <>
      <TeamPageContent />
      <TeamFAQ />
      <BeginTransformation />
    </>
  );
}
