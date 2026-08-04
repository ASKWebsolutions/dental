import React from 'react';
import Image from 'next/image';
import { Star } from 'lucide-react';

export const SpotlightTestimonial: React.FC = () => {
  return (
    <section className="py-10 md:py-14 bg-bg overflow-hidden font-sans">
      <div className="max-w-6xl mx-auto my-12 px-4 md:px-8">
        <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-xl border border-gray-100 relative overflow-hidden flex flex-col md:flex-row items-center gap-10 shimmer-sheen">
          {/* Soft background glow top right */}
          <div className="absolute -top-12 -right-12 w-64 h-64 bg-amber-50/60 rounded-full blur-3xl pointer-events-none" />

          {/* Left: image with subtle tilt */}
          <div className="w-full md:w-1/2 flex justify-center z-10">
            <div className="relative w-full max-w-sm aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl transform -rotate-2 hover:rotate-0 transition-transform duration-500 ease-out">
              {/* TODO: replace with the patient's mirror reaction photo (warm boutique setting) */}
              <Image
                src="/images/home/cosmetic-smile.png"
                alt="Happy Patient in Mirror"
                fill
                sizes="(max-width: 768px) 100vw, 420px"
                className="object-cover"
                priority
              />
            </div>
          </div>

          {/* Right: testimonial details */}
          <div className="w-full md:w-1/2 flex flex-col justify-center z-10">
            {/* 5 Star Rating */}
            <div className="flex items-center gap-1 text-amber-400 mb-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
              ))}
            </div>

            {/* Quote */}
            <blockquote className="font-serif text-sm sm:text-base lg:text-lg text-[#003b1b] font-medium leading-relaxed mb-6">
              &ldquo;The level of precision and artistry is unmatched. I walked in nervous and
              walked out with a confidence I haven&rsquo;t felt in years. Truly the boutique
              experience they promise.&rdquo;
            </blockquote>

            {/* Author meta */}
            <div className="flex items-center gap-3 pt-2">
              <div className="w-10 h-10 rounded-md bg-[#d8e3dc] flex items-center justify-center text-[#003b1b] font-bold text-xs">
                EV
              </div>
              <div>
                <div className="font-bold text-xs sm:text-sm text-gray-900">Eleanor Vance</div>
                <div className="text-[10px] tracking-wider text-gray-400 uppercase font-medium">
                  Smile Makeover Patient
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SpotlightTestimonial;
