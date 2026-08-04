'use client';

import React, { useState } from 'react';
import ReviewsHero from './ReviewsHero';
import StatsBar from './StatsBar';
import SpotlightTestimonial from './SpotlightTestimonial';
import StoriesGrid from './StoriesGrid';
import BottomCTA from './BottomCTA';
import TrustLogos from './TrustLogos';
import ReviewSubmitModal from './ReviewSubmitModal';
import { Review, SiteStat } from '@/types/reviews';

interface ReviewsPageContentProps {
  initialReviews: Review[];
  stats: SiteStat[];
}

export const ReviewsPageContent: React.FC<ReviewsPageContentProps> = ({ initialReviews, stats }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <ReviewsHero />
      <StatsBar stats={stats} />
      <SpotlightTestimonial />
      <StoriesGrid initialReviews={initialReviews} />
      <BottomCTA onOpenModal={openModal} />
      <TrustLogos />
      <ReviewSubmitModal isOpen={isModalOpen} onClose={closeModal} />
    </>
  );
};

export default ReviewsPageContent;
