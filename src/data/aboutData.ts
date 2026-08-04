import { Home, Cpu, Globe, type LucideIcon } from 'lucide-react';

export interface TimelineItem {
  id: string;
  year: string;
  title: string;
  description: string;
  icon: LucideIcon;
  align: 'left' | 'right';
}

export interface TechFeature {
  title: string;
  description: string;
  style: 'large-image-card' | 'light-blue-card' | 'pink-card' | 'gray-card';
}


export const timelineItems: TimelineItem[] = [
  {
    id: '1998',
    year: '1998',
    title: 'The Foundation',
    description:
      'Founded by Dr. Elena Sterling, our clinic began with a singular vision: to bring world-class cosmetic dentistry to a personalized, boutique setting.',
    icon: Home,
    align: 'left',
  },
  {
    id: '2012',
    year: '2012',
    title: 'Tech Integration',
    description:
      'We pioneered the integration of 3D digital imaging and robotic surgical guides, setting a new standard for implant precision in the region.',
    icon: Cpu,
    align: 'right',
  },
  {
    id: 'today',
    year: 'Today',
    title: 'Modern Heights',
    description:
      'Today, we are a multi-disciplinary center recognized for Excellence in Every Smile, serving over 15,000 patients with bespoke care.',
    icon: Globe,
    align: 'left',
  },
];

export const techFeatures: TechFeature[] = [
  {
    title: '3D Digital Impressions',
    description:
      'Eliminating uncomfortable molds with micron-perfect digital scans for crown and bridge work.',
    style: 'large-image-card',
  },
  {
    title: 'Laser Dentistry',
    description:
      'Minimally invasive soft tissue procedures that reduce bleeding and accelerate healing times significantly.',
    style: 'light-blue-card',
  },
  {
    title: 'AI-Driven Diagnosis',
    description: 'Early detection of potential issues using neural-network analysis.',
    style: 'pink-card',
  },
  {
    title: 'Robotic Surgery',
    description: 'Pinpoint accuracy for complex implant placements.',
    style: 'gray-card',
  },
];

