'use client';

import React from 'react';
import Link from 'next/link';
import { HandHeart, HeartPulse, Palette, Sparkles } from 'lucide-react';

const pillars = [
  {
    icon: <HandHeart className="w-5 h-5 text-[#b1f2be]" />,
    label: 'SERVICE',
    value: '100% Attentive',
  },
  {
    icon: <HeartPulse className="w-5 h-5 text-[#b1f2be]" />,
    label: 'COMFORT',
    value: 'Anxiety-Free',
  },
  {
    icon: <Palette className="w-5 h-5 text-[#b1f2be]" />,
    label: 'AESTHETIC',
    value: "Artist's Touch",
  },
  {
    icon: <Sparkles className="w-5 h-5 text-[#b1f2be]" />,
    label: 'RESULTS',
    value: 'Clinical Precision',
  },
];

interface BottomCTAProps {
  onOpenModal: () => void;
}

export const BottomCTA: React.FC<BottomCTAProps> = ({ onOpenModal }) => {
  return (
    <section className="py-14 md:py-18 bg-bg overflow-hidden font-sans">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8">
        <div className="bg-[#003b1b] text-white rounded-3xl p-8 md:p-10 flex flex-col lg:flex-row gap-8 items-center">
          {/* Left: copy + buttons */}
          <div className="w-full lg:w-[45%] flex flex-col text-left">
            <h2 className="font-serif font-bold text-3xl md:text-4xl text-white leading-tight">
              Share Your Story
            </h2>
            <p className="text-sm text-white/70 leading-relaxed mt-3 max-w-md">
              Your feedback helps us maintain our boutique standards and helps others choose their
              dental home with confidence.
            </p>

            <div className="flex flex-wrap items-center gap-4 mt-8">
              <button
                onClick={onOpenModal}
                className="px-6 py-3 rounded-full bg-emerald-200 text-[#003b1b] font-bold text-xs transition-colors hover:bg-emerald-100 cursor-pointer"
              >
                Write a Review
              </button>
              <Link
                href="/gallery"
                className="px-6 py-3 rounded-full border border-white/30 text-white font-bold text-xs transition-colors hover:bg-white/10 cursor-pointer"
              >
                View Gallery
              </Link>
            </div>
          </div>

          {/* Right: 2x2 glass feature cards */}
          <div className="w-full lg:w-[55%] grid grid-cols-1 sm:grid-cols-2 gap-4">
            {pillars.map((p) => (
              <div
                key={p.label}
                className="p-5 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 flex flex-col items-start text-left transition-colors hover:bg-white/10"
              >
                <div className="p-2.5 rounded-xl bg-white/10 mb-4 flex items-center justify-center shadow-inner">
                  {p.icon}
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#b1f2be]">
                  {p.label}
                </span>
                <span className="text-sm font-bold text-white mt-1">{p.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BottomCTA;
