import type { Metadata } from 'next';
import React from 'react';
import BlogsHero from '@/components/sections/blogs/BlogsHero';
import BlogsGrid from '@/components/sections/blogs/BlogsGrid';
import { getPublishedBlogs } from '@/lib/blog';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Dental Blog - Implants, Veneers & Oral Health Advice',
  description:
    'Practical articles from Dental Cosmetics & Implant Centre on implant aftercare, veneers, gum health, orthodontics, and everyday dental care.',
};

export default async function BlogsPage() {
  const posts = await getPublishedBlogs();

  return (
    <>
      <BlogsHero />
      <BlogsGrid initialPosts={posts} />
    </>
  );
}
