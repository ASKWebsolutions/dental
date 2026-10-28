'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Plus } from 'lucide-react';
import Container from '@/components/ui/Container';
import { ServiceCard } from './ServiceCard';
import { ServiceModal } from './ServiceModal';
import { Service } from '@/types';

interface ServicesGridProps {
  services: Service[];
  onReset?: () => void;
  searchQuery?: string;
}

const INITIAL_VISIBLE = 6;
const LOAD_MORE_COUNT = 6;

export const ServicesGrid: React.FC<ServicesGridProps> = ({ services, onReset }) => {
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  /* After loading a new batch, bring the first newly added card into view
     so the user immediately sees the services that just loaded. */
  useEffect(() => {
    if (visibleCount <= INITIAL_VISIBLE) return;
    const firstNewIndex = visibleCount - LOAD_MORE_COUNT;
    const card = sectionRef.current?.querySelectorAll<HTMLElement>(
      '#services-list article'
    )[firstNewIndex];
    if (!card) return;
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    card.scrollIntoView({ behavior: prefersReduced ? 'auto' : 'smooth', block: 'nearest' });
  }, [visibleCount]);

  const visibleServices = services.slice(0, visibleCount);
  const hasMore = services.length > visibleCount;

  return (
    <section ref={sectionRef} id="services-list" className="py-20 md:py-24 bg-bg-alt overflow-hidden">
      <Container>
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 mb-16 w-full">
          <div className="max-w-2xl text-left">
            <h2 className="font-serif font-bold text-3xl md:text-4xl text-primary leading-tight mb-4">
              Clinical Excellence & Bespoke Services
            </h2>
            <p className="text-sm sm:text-base text-body-text font-sans leading-relaxed font-normal">
              Explore our comprehensive range of dental treatments, structured around biometric stability
              and aesthetic perfection.
            </p>
          </div>
        </div>

        {/* Uniform Responsive Grid Layout (3 cols desktop, 2 cols tablet, 1 col mobile) */}
        {services.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-500 text-sm mb-4">No matching procedures found.</p>
            {onReset && (
              <button
                onClick={onReset}
                className="px-6 py-2 bg-[#003b1b] text-white rounded-full text-xs font-semibold"
              >
                Show All Services
              </button>
            )}
          </div>
        ) : (
          <>
            {/* Plain grid: every card self-animates via its own whileInView,
                so cards appended by Load More are never left invisible. */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
              {visibleServices.map((service, index) => (
                <ServiceCard
                  key={service.id || service.title}
                  service={service}
                  index={index}
                  onViewMore={setSelectedService}
                />
              ))}
            </div>

            {/* Load More */}
            {hasMore && (
              <div className="mt-12 flex flex-col items-center gap-3">
                <button
                  type="button"
                  onClick={() => setVisibleCount((count) => count + LOAD_MORE_COUNT)}
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3.5 text-xs font-bold tracking-wide text-white transition-colors hover:bg-primary-hover shadow-md cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
                >
                  <Plus className="w-4 h-4" />
                  <span>Load More Services</span>
                </button>
                <p className="text-xs text-body-text font-sans">
                  Showing {visibleServices.length} of {services.length} treatments
                </p>
              </div>
            )}
          </>
        )}
      </Container>

      {/* Service Detail Modal */}
      <ServiceModal service={selectedService} onClose={() => setSelectedService(null)} />
    </section>
  );
};

export default ServicesGrid;
