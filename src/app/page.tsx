import React from 'react';
import Hero from '@/components/sections/home/Hero';
import Philosophy from '@/components/sections/home/Philosophy';
import HomeServicesCarousel from '@/components/sections/home/HomeServicesCarousel';
import StatsBar from '@/components/sections/home/StatsBar';
import TestimonialCarousel from '@/components/sections/home/TestimonialCarousel';
import FinalCTA from '@/components/sections/home/FinalCTA';
import ScrollReveal from '@/components/ui/ScrollReveal';
import { getApprovedReviews, getSiteStats, getApprovedReviewsCount } from '@/lib/reviews';
import { getHomeServices } from '@/data/homeServices';
import { Testimonial, HomeService } from '@/types';
import { SiteStat } from '@/types/reviews';

export const dynamic = 'force-dynamic';

export default async function Home() {
  // Fire all 4 independent queries in parallel instead of sequentially
  const [statsResult, countResult, reviewsResult, servicesResult] =
    await Promise.allSettled([
      getSiteStats('home'),
      getApprovedReviewsCount(),
      getApprovedReviews({ page: 1, pageSize: 6, featured: true }),
      getHomeServices(),
    ]);

  const homeStats: SiteStat[] = statsResult.status === 'fulfilled' ? statsResult.value : [];
  const liveReviewsCount = countResult.status === 'fulfilled' ? countResult.value : 0;

  const mappedTestimonials: Testimonial[] =
    reviewsResult.status === 'fulfilled'
      ? reviewsResult.value.map((r) => ({
          id: r.id,
          author: r.patientName,
          role: r.treatmentType ?? r.category,
          rating: r.rating,
          text: r.body,
          date: r.createdAt,
        }))
      : [];

  const initialServices: HomeService[] =
    servicesResult.status === 'fulfilled' ? servicesResult.value : [];

  // Filter out duplicate reviews stats from database stats, append dynamic live reviews count
  const filteredHomeStats = homeStats.filter(
    (s) => !s.label.toLowerCase().includes('review')
  );
  const statsList: SiteStat[] = [
    ...filteredHomeStats,
    {
      id: 'live-reviews-stat',
      value: `${liveReviewsCount || 50}+`,
      label: 'Five Star Reviews',
      page: 'home',
      displayOrder: 99,
      updatedAt: new Date().toISOString(),
    },
  ];

  return (
    <>
      <Hero />
      <ScrollReveal>
        <Philosophy />
      </ScrollReveal>
      <ScrollReveal>
        <StatsBar stats={statsList} />
      </ScrollReveal>
      <ScrollReveal>
        <HomeServicesCarousel initialServices={initialServices.length > 0 ? initialServices : undefined} />
      </ScrollReveal>
      <ScrollReveal>
        <TestimonialCarousel initialTestimonials={mappedTestimonials.length > 0 ? mappedTestimonials : undefined} />
      </ScrollReveal>
      <ScrollReveal>
        <FinalCTA />
      </ScrollReveal>
    </>
  );
}
