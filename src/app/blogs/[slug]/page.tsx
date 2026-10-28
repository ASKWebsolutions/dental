import type { Metadata } from 'next';
import React from 'react';
import { notFound } from 'next/navigation';
import BlogDetail from '@/components/sections/blogs/BlogDetail';
import { getBlogBySlug, getRelatedBlogs } from '@/lib/blog';

export const dynamic = 'force-dynamic';

interface BlogDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: BlogDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogBySlug(slug);

  if (!post) {
    return {
      title: 'Article Not Found | Dental Cosmetics & Implant Centre',
      description: 'The requested article could not be found.',
    };
  }

  return {
    title: `${post.title} | Dental Cosmetics & Implant Centre`,
    description: post.excerpt,
  };
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { slug } = await params;
  const post = await getBlogBySlug(slug);

  if (!post) {
    notFound();
  }

  const related = await getRelatedBlogs(post.slug, post.category, 3);

  return <BlogDetail post={post} related={related} />;
}
