'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ShieldCheck, AlertCircle, Loader, ChevronDown } from 'lucide-react';
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
  'bg-[#003b1b]',
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
          <div className="text-left max-w-lg">
            <h2 className="font-serif text-3xl md:text-4xl text-gray-900 leading-tight">
              All Patient Reviews
            </h2>
            <p className="text-xs text-gray-500 mt-2">
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
                className="bg-stone-100/70 p-6 rounded-2xl flex flex-col justify-between text-left hover:-translate-y-1 hover:shadow-md transition-all duration-300"
              >
                <div className="flex flex-col gap-4">
                  {/* Rating stars + Verified badge */}
                  <div className="flex justify-between items-center">
                    <div className="flex gap-1">{renderStars(rev.rating)}</div>
                    {rev.isVerifiedPatient && (
                      <span className="flex items-center gap-1 text-[9px] font-bold text-emerald-700 uppercase tracking-wider bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                        <ShieldCheck className="w-3 h-3" /> Verified
                      </span>
                    )}
                  </div>

                  {/* Review body */}
                  <p className="text-sm text-slate-700 leading-relaxed line-clamp-5 whitespace-pre-line">
                    {rev.body}
                  </p>
                </div>

                {/* Patient row */}
                <div className="flex items-center justify-between mt-6 border-t border-stone-200 pt-4">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-full ${
                        avatarPalette[index % avatarPalette.length]
                      } text-white flex items-center justify-center font-bold text-sm flex-shrink-0`}
                    >
                      {rev.patientName.charAt(0).toUpperCase()}
                    </div>
                    <span className="font-bold text-gray-900 text-sm">{rev.patientName}</span>
                  </div>

                  {(rev.treatmentType || rev.category) && (
                    <span className="px-2.5 py-1 rounded-full bg-white border border-stone-200 text-[9px] font-bold uppercase tracking-wider text-slate-500 flex-shrink-0">
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
