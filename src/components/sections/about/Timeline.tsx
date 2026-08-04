'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { timelineItems } from '@/data/aboutData';
import Container from '@/components/ui/Container';

export const AboutTimeline: React.FC = () => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const prefersReducedMotion = useReducedMotion();

  return (
    <section id="legacy-story" className="py-20 md:py-24 bg-[#fcf9f8] relative overflow-hidden">
      <Container clean className="max-w-4xl mx-auto px-4 sm:px-6 relative">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#003b1b] tracking-wide">
            Milestones of Excellence
          </h2>
          <div className="w-12 h-1 bg-[#003b1b] mx-auto mt-2 rounded-full" />
        </div>

        {/* Vertical Timeline Container */}
        <div className="relative">
          {/* Central Vertical Green Line */}
          <div
            aria-hidden="true"
            className="absolute left-1/2 top-0 bottom-0 w-px bg-gray-200 -translate-x-1/2 z-0"
          />

          <div className="space-y-16 sm:space-y-24 relative z-10">
            {timelineItems.map((item) => {
              const Icon = item.icon;
              const isHovered = hoveredId === item.id;
              const isLeft = item.align === 'left';

              return (
                <div key={item.id} className="relative flex items-center justify-between">
                  {/* Year + Title Column */}
                  <div
                    className={`w-1/2 ${
                      isLeft ? 'pr-8 text-right' : 'pl-8 order-last text-left'
                    }`}
                  >
                    <span className="font-serif text-5xl sm:text-6xl font-extrabold text-gray-200 block select-none">
                      {item.year}
                    </span>
                    <h3 className="font-serif text-base sm:text-lg font-bold text-[#003b1b] mt-1">
                      {item.title}
                    </h3>
                  </div>

                  {/* Central Interactive Icon Badge */}
                  <div className="absolute left-1/2 -translate-x-1/2 z-20">
                    <button
                      type="button"
                      onMouseEnter={() => setHoveredId(item.id)}
                      onMouseLeave={() => setHoveredId(null)}
                      onFocus={() => setHoveredId(item.id)}
                      onBlur={() => setHoveredId(null)}
                      aria-expanded={isHovered}
                      aria-controls={`timeline-panel-${item.id}`}
                      className={`w-12 h-12 rounded-full bg-[#003b1b] text-white flex items-center justify-center cursor-pointer shadow-lg transition-all duration-300 transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 ${
                        isHovered ? 'scale-125 bg-emerald-600 ring-4 ring-emerald-200' : 'hover:scale-110'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="sr-only">{item.title}</span>
                    </button>

                    {/* Hover Info Tooltip Card */}
                    <AnimatePresence>
                      {isHovered && (
                        <motion.div
                          id={`timeline-panel-${item.id}`}
                          role="tooltip"
                          initial={
                            prefersReducedMotion
                              ? { opacity: 0 }
                              : { opacity: 0, x: isLeft ? -15 : 15, scale: 0.95 }
                          }
                          animate={{ opacity: 1, x: 0, scale: 1 }}
                          exit={
                            prefersReducedMotion
                              ? { opacity: 0 }
                              : { opacity: 0, x: isLeft ? -15 : 15, scale: 0.95 }
                          }
                          transition={{
                            duration: prefersReducedMotion ? 0 : 0.2,
                            ease: 'easeOut',
                          }}
                          className={`absolute top-1/2 -translate-y-1/2 w-72 sm:w-80 p-5 bg-white rounded-2xl shadow-2xl border border-gray-100 z-30 pointer-events-none ${
                            isLeft
                              ? 'left-full ml-6'
                              : 'right-full mr-6'
                          }`}
                        >
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest">
                              {item.year}
                            </span>
                            <span className="text-xs text-gray-300">•</span>
                            <span className="text-xs font-semibold text-gray-600">
                              {item.title}
                            </span>
                          </div>
                          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-sans">
                            {item.description}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Empty Column to maintain symmetrical flex layout */}
                  <div className={`w-1/2 ${isLeft ? 'order-last' : ''}`} aria-hidden="true" />
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default AboutTimeline;
