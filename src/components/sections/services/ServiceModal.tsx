import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { X, CheckCircle2, ArrowRight, Calendar } from 'lucide-react';
import { Service } from '@/types';
import { resolveImageUrl } from '@/lib/media';

interface ServiceModalProps {
  service: Service | null;
  onClose: () => void;
}

const DEFAULT_FALLBACK = '/images/home/dental-tech.png';

interface ServiceModalContentProps {
  service: Service;
  onClose: () => void;
}

const ServiceModalContent: React.FC<ServiceModalContentProps> = ({ service, onClose }) => {
  const prefersReducedMotion = useReducedMotion();

  const [imgSrc, setImgSrc] = useState(() =>
    resolveImageUrl(service.imagePath, DEFAULT_FALLBACK)
  );

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  const bullets = (Array.isArray(service.bullets) ? service.bullets : []).filter(
    (b): b is string => typeof b === 'string' && b.trim().length > 0
  );
  const paragraphs = (service.description || '').split('\n\n').filter(Boolean);
  const bookingUrl = `/book-appointment?service=${encodeURIComponent(
    service.slug || service.id
  )}`;

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Dialog Panel */}
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label={`${service.title} details`}
        initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.98 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto no-scrollbar rounded-3xl bg-white shadow-2xl"
      >
        {/* Image Header */}
        <div className="relative aspect-[16/9] sm:aspect-[2/1] bg-slate-100">
          <Image
            src={imgSrc}
            alt={service.title}
            fill
            sizes="(max-width: 768px) 100vw, 672px"
            className="object-cover"
            onError={() => setImgSrc(DEFAULT_FALLBACK)}
            unoptimized={typeof imgSrc === 'string' && imgSrc.startsWith('data:')}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />
          <div className="absolute bottom-5 left-6 right-16">
            <span className="inline-block rounded-full bg-accent px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white mb-2">
              Treatment
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white drop-shadow-sm">
              {service.title}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close service details"
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/90 backdrop-blur-md shadow-sm flex items-center justify-center text-slate-700 hover:bg-white hover:text-dark transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 sm:p-8">
          {service.shortDescription && (
            <p className="mb-4 font-sans text-base sm:text-lg font-medium leading-relaxed text-primary">
              {service.shortDescription}
            </p>
          )}

          <div className="mb-6 space-y-4 font-sans text-sm leading-relaxed text-body-text">
            {paragraphs.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>

          {bullets.length > 0 && (
            <ul className="mb-7 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {bullets.map((bullet, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-2.5 rounded-2xl bg-bg-alt border border-slate-100 p-3"
                >
                  <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm font-sans font-semibold text-slate-800 leading-snug">
                    {bullet}
                  </span>
                </li>
              ))}
            </ul>
          )}

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 border-t border-slate-200/70 pt-6">
            <Link
              href={bookingUrl}
              onClick={onClose}
              className="flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-xs font-bold text-white transition-colors hover:bg-primary-hover shadow-md text-center"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Appointment</span>
            </Link>
            <Link
              href={`/services/${service.slug || service.id}`}
              onClick={onClose}
              className="flex-1 inline-flex items-center justify-center gap-2 rounded-full border-2 border-primary px-6 py-3.5 text-xs font-bold text-primary transition-colors hover:bg-primary hover:text-white text-center"
            >
              <span>View Full Details</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export const ServiceModal: React.FC<ServiceModalProps> = ({ service, onClose }) => (
  <AnimatePresence>
    {service && (
      <ServiceModalContent
        key={service.id || service.slug || service.title}
        service={service}
        onClose={onClose}
      />
    )}
  </AnimatePresence>
);

export default ServiceModal;
