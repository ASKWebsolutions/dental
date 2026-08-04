import { createElement, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, Variants, useReducedMotion } from 'framer-motion';
import {
  ArrowRight,
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
import { Service } from '@/types';
import { resolveImageUrl } from '@/lib/media';

interface ServiceCardProps {
  service: Service;
  variants?: Variants;
}

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

function getServiceIcon(title: string): LucideIcon {
  const lower = title.toLowerCase();
  const match = iconRules.find(({ keywords }) =>
    keywords.some((keyword) => lower.includes(keyword))
  );
  return match?.icon ?? Smile;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service, variants }) => {
  const prefersReducedMotion = useReducedMotion();
  const defaultFallback = '/images/home/dental-tech.png';
  const title = service?.title || 'Dental Service';
  const shortDescription = service?.shortDescription || service?.description || '';

  const [imgSrc, setImgSrc] = useState(() =>
    resolveImageUrl(service?.imagePath, defaultFallback)
  );

  const features = (service?.bullets ?? []).filter((b) => typeof b === 'string' && b.trim());

  return (
    <motion.div
      variants={variants}
      initial={prefersReducedMotion ? false : undefined}
      className="relative group rounded-3xl overflow-hidden aspect-[4/5] shadow-lg group-hover:shadow-2xl transition-all duration-300 shimmer-sheen"
    >
      {/* Prominent Service Image */}
      <Image
        src={imgSrc}
        alt=""
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
        className="object-cover group-hover:scale-105 transition-transform duration-500"
        onError={() => setImgSrc(defaultFallback)}
        unoptimized={typeof imgSrc === 'string' && imgSrc.startsWith('data:')}
      />

      {/* Dark Gradient Overlay for text contrast */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10" />

      {/* Top Category Icon Badge */}
      <div className="absolute top-5 left-6 z-20">
        <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-emerald-400">
          {createElement(getServiceIcon(title), { className: 'w-5 h-5' })}
        </div>
      </div>

      {/* Content Overlay - bottom-aligned */}
      <div className="absolute inset-0 z-20 p-6 flex flex-col justify-end">
        {/* Title & Description */}
        <h3 className="font-serif text-xl font-bold text-white mb-2">{title}</h3>
        <p className="font-sans text-xs text-gray-200 leading-relaxed line-clamp-2 mb-4">
          {shortDescription}
        </p>

        {/* Key Features */}
        {features.length > 0 && (
          <div className="space-y-1.5 mb-6">
            {features.slice(0, 2).map((feature, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                <span className="text-xs text-gray-300">{feature}</span>
              </div>
            ))}
          </div>
        )}

        {/* Bottom "Book Now" Button Bar */}
        <Link
          href={`/book-appointment?service=${encodeURIComponent(title)}`}
          className="w-full py-2.5 px-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-white font-semibold text-xs flex items-center justify-between transition-colors"
        >
          <span>Book Now</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </motion.div>
  );
};

export default ServiceCard;

