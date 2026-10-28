import {
  Sparkles,
  Droplets,
  Smile,
  ShieldCheck,
  Activity,
  Scissors,
  Anchor,
  Layers,
  Grid,
  Crown,
  Flame,
  Scan,
  Stethoscope,
  type LucideIcon,
} from 'lucide-react';

const iconRules: { keywords: string[]; icon: LucideIcon }[] = [
  { keywords: ['whitening'], icon: Sparkles },
  { keywords: ['scaling', 'cleaning'], icon: Droplets },
  { keywords: ['polish'], icon: Smile },
  { keywords: ['fill'], icon: ShieldCheck },
  { keywords: ['root canal', 'endodontic'], icon: Activity },
  { keywords: ['extract'], icon: Scissors },
  { keywords: ['implant'], icon: Anchor },
  { keywords: ['denture'], icon: Layers },
  { keywords: ['aligner', 'brace'], icon: Grid },
  { keywords: ['crown', 'bridge', 'veneer'], icon: Crown },
  { keywords: ['gum', 'periodont'], icon: Flame },
  { keywords: ['x-ray', 'scan', 'digital'], icon: Scan },
  { keywords: ['emergency'], icon: Stethoscope },
];

export function getServiceIcon(title: string): LucideIcon {
  const lower = (title || '').toLowerCase();
  const match = iconRules.find(({ keywords }) =>
    keywords.some((keyword) => lower.includes(keyword))
  );
  return match?.icon ?? Smile;
}
