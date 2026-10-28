'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowLeft, Calendar, Clock, User } from 'lucide-react';
import Container from '@/components/ui/Container';
import { BlogPost } from '@/types/blog';
import { resolveImageUrl } from '@/lib/media';
import { formatBlogDate } from '@/lib/blogFormat';

interface BlogHeroProps {
  post: BlogPost;
}

/**
 * Full-bleed article hero: cover image with a dark scrim so the
 * title, excerpt and meta stay readable over any photo.
 */
export const BlogHero: React.FC<BlogHeroProps> = ({ post }) => {
  const prefersReducedMotion = useReducedMotion();
  const coverUrl = post.coverImage ? resolveImageUrl(post.coverImage) : '';
  const fade = prefersReducedMotion ? false : { opacity: 0, y: 18 };

  return (
    <section className="relative flex min-h-[430px] md:min-h-[540px] items-end overflow-hidden bg-primary">
      {coverUrl && (
        <Image
          src={coverUrl}
          alt={post.coverImage?.altText || post.title}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      )}

      {/* Scrim: guarantees white-text contrast over any cover image */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/55 to-black/30"
      />
      <div
        aria-hidden="true"
        className="absolute top-[-15%] right-[-10%] h-[45%] w-[45%] rounded-full bg-primary-light/25 blur-[120px] pointer-events-none"
      />

      <Container className="relative z-10 pt-28 pb-10 md:pb-14">
        <motion.div
          initial={fade}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <Link
            href="/blogs"
            className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-white/75 hover:text-white transition-colors mb-6"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            All Articles
          </Link>

          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="rounded-full bg-primary-light px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-black">
              {post.category}
            </span>
            {post.featured && (
              <span className="rounded-full border border-white/30 bg-white/15 backdrop-blur px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
                Featured
              </span>
            )}
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-[1.12] tracking-tight max-w-4xl">
            {post.title}
          </h1>

          <p className="mt-4 text-sm sm:text-base md:text-lg text-white/80 leading-relaxed max-w-2xl">
            {post.excerpt}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-semibold text-white/70">
            {post.author && (
              <span className="inline-flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-primary-light" />
                {post.author}
              </span>
            )}
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-primary-light" />
              {formatBlogDate(post.publishedAt || post.createdAt, 'long')}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-primary-light" />
              {post.readTimeMins} min read
            </span>
          </div>
        </motion.div>
      </Container>
    </section>
  );
};

export default BlogHero;
