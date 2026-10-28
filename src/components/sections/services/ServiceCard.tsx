import { createElement, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Eye } from 'lucide-react';
import { Service } from '@/types';
import { resolveImageUrl } from '@/lib/media';
import { getServiceIcon } from '@/lib/serviceIcons';

interface ServiceCardProps {
  service: Service;
  index?: number;
  onViewMore?: (service: Service) => void;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service, index = 0, onViewMore }) => {
  const prefersReducedMotion = useReducedMotion();
  const defaultFallback = '/images/home/dental-tech.png';
  const title = service?.title || 'Dental Service';
  const shortDescription = service?.shortDescription || service?.description || '';

  const [imgSrc, setImgSrc] = useState(() =>
    resolveImageUrl(service?.imagePath, defaultFallback)
  );

  const features = (service?.bullets ?? []).filter((b) => typeof b === 'string' && b.trim());
  const bookingUrl = `/book-appointment?service=${encodeURIComponent(
    service?.slug || service?.id || ''
  )}`;
  const ServiceIcon = getServiceIcon(title);

  /* Self-driven entrance: each card animates when IT enters the viewport,
     so cards appended later (Load More) always end up visible — no reliance
     on parent whileInView variant propagation. */
  const motionProps = prefersReducedMotion
    ? {}
    : {
        initial: { opacity: 0, y: 24 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: '-40px' as const },
        transition: {
          duration: 0.45,
          ease: 'easeOut' as const,
          delay: (index % 3) * 0.08,
        },
      };

  return (
    <motion.article
      {...motionProps}
      className="group flex h-full flex-col overflow-hidden rounded-3xl bg-white shadow-card border border-slate-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
    >
      {/* Service Image */}
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-100 shrink-0">
        <Image
          src={imgSrc}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          onError={() => setImgSrc(defaultFallback)}
          unoptimized={typeof imgSrc === 'string' && imgSrc.startsWith('data:')}
        />
        <div className="absolute top-4 left-4 w-10 h-10 rounded-xl bg-white/90 backdrop-blur-md border border-white shadow-sm flex items-center justify-center text-primary">
          {createElement(ServiceIcon, { className: 'w-5 h-5' })}
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <h3 className="font-serif text-lg font-bold text-primary mb-2">{title}</h3>
        <p className="font-sans text-sm text-body-text leading-relaxed line-clamp-3 mb-4">
          {shortDescription}
        </p>

        {features.length > 0 && (
          <div className="mb-5 flex flex-wrap gap-2">
            {features.slice(0, 3).map((feature, idx) => (
              <span
                key={idx}
                className="rounded-full bg-bg-alt border border-slate-100 px-3 py-1 text-[11px] font-semibold text-primary"
              >
                {feature}
              </span>
            ))}
          </div>
        )}

        <div className="mt-auto flex items-center gap-3 pt-1">
          <button
            type="button"
            onClick={() => onViewMore?.(service)}
            className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-full border-2 border-primary px-3 py-2.5 text-xs font-bold text-primary transition-colors hover:bg-primary hover:text-white cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
          >
            <Eye className="w-3.5 h-3.5 shrink-0" />
            <span>View More</span>
          </button>
          <Link
            href={bookingUrl}
            className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-full bg-primary px-3 py-2.5 text-xs font-bold text-white transition-colors hover:bg-primary-hover focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
          >
            <span>Book Now</span>
            <ArrowRight className="w-3.5 h-3.5 shrink-0 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </motion.article>
  );
};

export default ServiceCard;
