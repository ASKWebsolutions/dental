'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import Container from '@/components/ui/Container';
import { HomeService } from '@/types';
import homeServices from '@/data/homeServices';
import { resolveImageUrl } from '@/lib/media';

interface HomeServicesCarouselProps {
  initialServices?: HomeService[];
}

const easing = [0.22, 1, 0.36, 1] as const;
const SCROLL_SPEED = 1.2;

export const HomeServicesCarousel: React.FC<HomeServicesCarouselProps> = ({
  initialServices,
}) => {
  const [services, setServices] = useState<HomeService[]>(
    initialServices && initialServices.length > 0 ? initialServices : homeServices
  );

  const scrollRef = useRef<HTMLDivElement>(null);
  const isPaused = useRef(false);
  const dragState = useRef<{ startX: number; startScrollLeft: number } | null>(null);
  const shouldReduceMotion = useReducedMotion();

  // Client-side dynamic fetch from public API, falling back to static homeServices
  useEffect(() => {
    let cancelled = false;
    fetch('/api/home-services')
      .then((res) => res.json())
      .then((data) => {
        if (!cancelled && Array.isArray(data) && data.length > 0) {
          setServices(data);
        }
      })
      .catch(() => {
        // silently keep static fallback
      });
    return () => {
      cancelled = true;
    };
  }, []);

  // Continuous auto-scroll loop (pauses on hover/drag, disabled for reduced motion)
  useEffect(() => {
    const el = scrollRef.current;
    if (!el || shouldReduceMotion) return;

    let rafId = 0;
    const tick = () => {
      if (!isPaused.current) {
        const firstHalf = el.scrollWidth / 2;
        el.scrollLeft += SCROLL_SPEED;
        if (el.scrollLeft >= firstHalf) {
          el.scrollLeft -= firstHalf;
        }
      }
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [shouldReduceMotion, services.length]);

  const defaultFallback = '/images/home/dental-implants.png';
  // Duplicate the list once for a seamless infinite loop
  const displayServices = [...services, ...services];

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    isPaused.current = true;
    dragState.current = { startX: e.clientX, startScrollLeft: e.currentTarget.scrollLeft };
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragState.current) return;
    const dx = e.clientX - dragState.current.startX;
    e.currentTarget.scrollLeft = dragState.current.startScrollLeft - dx;
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    dragState.current = null;
    isPaused.current = false;
    e.currentTarget.releasePointerCapture(e.pointerId);
  };

  return (
    <section className="py-20 md:py-24 bg-[var(--color-bg)] overflow-hidden">
      <Container>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: easing }}
          className="mb-12"
        >
          <div className="w-8 h-px bg-[var(--color-primary)] inline-block mr-3"></div>
          <span className="text-xs font-bold tracking-widest text-[var(--color-primary)]">
            Premium Services
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-[var(--color-dark-text)] mt-2">
            Curated clinical solutions.
          </h2>
        </motion.div>

        {/* Auto-Scrolling Card Track */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: easing }}
        >
          <div
            ref={scrollRef}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            onMouseEnter={() => {
              if (!dragState.current) isPaused.current = true;
            }}
            onMouseLeave={() => {
              if (!dragState.current) isPaused.current = false;
            }}
            onTouchStart={() => {
              isPaused.current = true;
            }}
            onTouchEnd={() => {
              isPaused.current = false;
            }}
            className="no-scrollbar overflow-x-auto flex gap-6 pb-4 cursor-grab active:cursor-grabbing select-none"
          >
            {displayServices.map((service, idx) => (
              <article
                key={`${service.id}-${idx}`}
                className="w-[320px] lg:w-[350px] flex-shrink-0 group"
              >
                {/* Image Container */}
                <div className="relative h-[420px] rounded-2xl overflow-hidden mb-4">
                  <Image
                    src={resolveImageUrl(service.image, defaultFallback)}
                    alt={service.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 350px"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Gradient Overlay + Reveal Badge on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-5 text-white translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    <span className="text-xs font-bold tracking-widest text-[#b1f2be]">
                      {service.category}
                    </span>
                    <h3 className="font-serif text-2xl font-bold mt-1">{service.title}</h3>
                  </div>
                </div>
                {/* Clean 2-line clamped description */}
                <p className="text-sm text-[var(--color-body-text)] line-clamp-2 leading-relaxed px-1">
                  {service.description}
                </p>
              </article>
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  );
};

export default HomeServicesCarousel;
