'use client';

import React, { useMemo } from 'react';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { Tag, ArrowRight } from 'lucide-react';
import Container from '@/components/ui/Container';
import ReadingProgress from './ReadingProgress';
import BlogHero from './BlogHero';
import BlogContent from './BlogContent';
import BlogSidebar from './BlogSidebar';
import BlogCard from './BlogCard';
import { BlogPost } from '@/types/blog';
import { extractToc } from '@/lib/blogFormat';

interface BlogDetailProps {
  post: BlogPost;
  related: BlogPost[];
}

/**
 * Article page: full-bleed hero, reading-progress bar, two-column
 * layout with a sticky TOC sidebar, and a "keep reading" footer grid.
 */
export const BlogDetail: React.FC<BlogDetailProps> = ({ post, related }) => {
  const prefersReducedMotion = useReducedMotion();
  const fade = prefersReducedMotion ? false : { opacity: 0, y: 16 };
  const headings = useMemo(() => extractToc(post.content), [post.content]);

  return (
    <article className="bg-bg pb-20">
      <ReadingProgress />
      <BlogHero post={post} />

      {/* Body + sticky sidebar */}
      <Container className="pt-10 md:pt-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          <motion.div
            initial={fade}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="lg:col-span-8 min-w-0"
          >
            <div className="rounded-3xl bg-white border border-slate-100 shadow-card p-6 sm:p-9 lg:p-11">
              <BlogContent content={post.content} />

              {/* Tags */}
              {post.tags.length > 0 && (
                <div className="mt-10 pt-6 border-t border-slate-100 flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-gray-400 mr-1">
                    <Tag className="w-3.5 h-3.5" />
                    Tagged
                  </span>
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3.5 py-1.5 rounded-full bg-bg-alt text-xs font-semibold text-body-text"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Inline CTA (visible where the sidebar hides on mobile) */}
            <motion.div
              initial={fade}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
              className="mt-6 lg:hidden rounded-3xl bg-primary p-6 sm:p-7 flex flex-col gap-4"
            >
              <div>
                <h2 className="font-serif font-bold text-xl text-white leading-snug">
                  Have a question about your own smile?
                </h2>
                <p className="text-sm text-white/70 mt-1.5">
                  Book a consultation and we will walk you through what is realistic for your teeth.
                </p>
              </div>
              <Link
                href="/book-appointment"
                className="inline-flex items-center justify-center gap-2 self-start rounded-full bg-primary-light text-black font-bold text-xs px-6 py-3 transition-colors hover:bg-primary-soft"
              >
                Book a Consultation
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </motion.div>
          </motion.div>

          {/* Sidebar */}
          <motion.aside
            initial={fade}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15, ease: 'easeOut' }}
            className="lg:col-span-4"
          >
            <BlogSidebar post={post} headings={headings} />
          </motion.aside>
        </div>
      </Container>

      {/* Related articles */}
      {related.length > 0 && (
        <section className="mt-16 pt-12 border-t border-slate-100">
          <Container>
            <div className="text-center mb-9">
              <span className="text-xs font-bold tracking-[0.25em] text-primary uppercase block mb-3">
                Keep Reading
              </span>
              <h2 className="font-serif font-bold text-2xl sm:text-3xl text-dark">
                More from the journal
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((item) => (
                <BlogCard key={item.id} post={item} />
              ))}
            </div>
          </Container>
        </section>
      )}
    </article>
  );
};

export default BlogDetail;
