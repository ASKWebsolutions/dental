'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ShieldCheck, AlertCircle, Loader, ChevronDown, Quote } from 'lucide-react';
import { Review } from '@/types/reviews';

interface StoriesGridProps {
  initialReviews: Review[];
}

interface FilterOption {
  label: string;
  value: string;
}

const FILTERS: FilterOption[] = [
  { label: 'All', value: '' },
  { label: 'Implants', value: 'Implants' },
  { label: 'Cosmetic', value: 'Cosmetic' },
  { label: 'General', value: 'General Care' },
];

const avatarPalette = [
  'bg-primary',
  'bg-accent',
  'bg-amber-500',
  'bg-emerald-600',
  'bg-slate-600',
];

export const StoriesGrid: React.FC<StoriesGridProps> = ({ initialReviews }) => {
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [activeCategory, setActiveCategory] = useState<string>('');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(initialReviews.length >= 6);
  const activeRef = useRef<string>('');

  const handleFilterChange = async (value: string) => {
    activeRef.current = value;
    setActiveCategory(value);
    setLoading(true);

    try {
      if (value === '') {
        setReviews(initialReviews);
        setPage(1);
        setHasMore(initialReviews.length >= 6);
      } else {
        const res = await fetch(`/api/reviews?page=1&pageSize=6&category=${value}`);
        const data = await res.json();

        if (activeRef.current !== value) return; // ignore stale responses
        setReviews(data);
        setPage(1);
        setHasMore(data.length >= 6);
      }
    } catch (err) {
      console.error('Error fetching filtered reviews:', err);
    } finally {
      if (activeRef.current === value) setLoading(false);
    }
  };

  const handleLoadMore = async () => {
    if (loading) return;
    setLoading(true);
    const nextPage = page + 1;

    try {
      const catParam = activeCategory ? `&category=${activeCategory}` : '';
      const res = await fetch(`/api/reviews?page=${nextPage}&pageSize=6${catParam}`);
      const data = await res.json();

      if (data.length > 0) {
        setReviews((prev) => [...prev, ...data]);
        setPage(nextPage);
        setHasMore(data.length >= 6);
      } else {
        setHasMore(false);
      }
    } catch (err) {
      console.error('Error loading more reviews:', err);
    } finally {
      setLoading(false);
    }
  };

  // Render review stars helper
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        className={`w-3.5 h-3.5 ${
          i < rating ? 'text-[#FFB020] fill-[#FFB020]' : 'text-slate-200'
        }`}
      />
    ));
  };

  // Animation layout configs
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.06,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring' as const, damping: 20, stiffness: 100 },
    },
  };

  return (
    <section className="py-16 md:py-20 bg-bg overflow-hidden font-sans text-slate-800">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8">
        {/* Heading + Filter Pills */}
        <header className="flex flex-col md:flex-row gap-6 justify-between items-start md:items-end mb-12">
          <div className="text-left max-w-xl">
            <span className="text-[11px] font-bold tracking-[0.25em] text-primary uppercase block mb-3">
              Patient Stories
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-dark leading-tight">
              All Patient Reviews
            </h2>
            <div className="w-12 h-1.5 bg-primary rounded-full mt-4" />
            <p className="text-sm md:text-base text-body-text mt-4 leading-relaxed">
              Hear from our community about their treatment journeys.
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-2 select-none">
            {FILTERS.map((cat) => (
              <button
                key={cat.label}
                onClick={() => handleFilterChange(cat.value)}
                className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all cursor-pointer border ${
                  activeCategory === cat.value
                    ? 'bg-[#003b1b] text-white border-[#003b1b] shadow-sm'
                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </header>

        {/* Reviews Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          key={activeCategory}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch"
        >
          <AnimatePresence mode="popLayout">
            {reviews.map((rev, index) => (
              <motion.article
                key={rev.id}
                variants={cardVariants}
                layout
                className="group relative bg-white rounded-3xl p-6 md:p-7 shadow-card border border-slate-100/70 flex flex-col justify-between text-left hover:-translate-y-1.5 hover:shadow-xl transition-all duration-300 h-full overflow-hidden"
              >
                {/* Hover top accent */}
                <span
                  aria-hidden="true"
                  className="absolute top-0 left-6 right-6 h-1 bg-gradient-to-r from-primary via-primary-soft to-transparent rounded-b-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />

                {/* Quote watermark */}
                <Quote
                  aria-hidden="true"
                  className="absolute top-14 right-5 w-12 h-12 text-primary/[0.06] rotate-180 pointer-events-none"
                />

                <div className="relative z-10 flex flex-col gap-3.5">
                  {/* Rating stars + Verified badge */}
                  <div className="flex justify-between items-center">
                    <div className="flex gap-1">{renderStars(rev.rating)}</div>
                    {rev.isVerifiedPatient && (
                      <span className="flex items-center gap-1 text-[9px] font-bold text-emerald-700 uppercase tracking-wider bg-emerald-50 border border-emerald-200 px-2 py-1 rounded-full">
                        <ShieldCheck className="w-3 h-3" /> Verified
                      </span>
                    )}
                  </div>

                  {/* Review title */}
                  {rev.title && (
                    <h3 className="relative font-serif font-bold text-base md:text-lg text-dark leading-snug">
                      {rev.title}
                    </h3>
                  )}

                  {/* Review body */}
                  <p className="relative text-[15px] text-body-text leading-relaxed line-clamp-5 whitespace-pre-line">
                    {rev.body}
                  </p>
                </div>

                {/* Patient row */}
                <div className="relative z-10 flex items-center justify-between gap-3 mt-6 pt-5 border-t border-slate-100">
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`w-11 h-11 rounded-full ${
                        avatarPalette[index % avatarPalette.length]
                      } text-white flex items-center justify-center font-bold text-sm flex-shrink-0`}
                    >
                      {rev.patientName.charAt(0).toUpperCase()}
                    </div>
                    <span className="font-bold text-dark text-sm leading-tight">
                      {rev.patientName}
                    </span>
                  </div>

                  {(rev.treatmentType || rev.category) && (
                    <span className="px-3 py-1.5 rounded-full bg-primary/5 text-primary text-[10px] font-bold uppercase tracking-wider flex-shrink-0">
                      {rev.treatmentType || rev.category}
                    </span>
                  )}
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {reviews.length === 0 && !loading && (
          <div className="py-12 bg-slate-50 rounded-3xl text-center text-slate-400 font-semibold border flex flex-col items-center justify-center gap-2">
            <AlertCircle className="w-8 h-8 text-slate-300" /> No reviews found in this category.
          </div>
        )}

        {/* Load More Button */}
        {hasMore && (
          <div className="flex justify-center mt-12 select-none">
            <button
              onClick={handleLoadMore}
              disabled={loading}
              className="px-6 py-2.5 rounded-full border border-gray-200 text-xs font-semibold hover:bg-gray-50 flex items-center gap-2 text-slate-600 transition-colors cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader className="w-4 h-4 animate-spin" /> Loading...
                </>
              ) : (
                <>
                  Load More Experiences <ChevronDown className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default StoriesGrid;
