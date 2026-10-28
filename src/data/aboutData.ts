import { Home, Cpu, Globe, type LucideIcon } from 'lucide-react';

export interface TimelineItem {
  id: string;
  year: string;
  title: string;
  description: string;
  icon: LucideIcon;
  align: 'left' | 'right';
}

export const timelineItems: TimelineItem[] = [
  {
    id: '2006',
    year: '2006',
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
    id: 'onwards',
    year: 'Onwards',
    title: 'Modern Heights',
    description:
      'Today, we are a multi-disciplinary center recognized for Excellence in Every Smile, serving over 15,000 patients with bespoke care.',
    icon: Globe,
    align: 'left',
  },
];

