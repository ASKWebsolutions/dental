'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ListTree, ShieldCheck, CalendarCheck, Sparkles } from 'lucide-react';
import { BlogPost, TocHeading } from '@/types/blog';
import { cn } from '@/lib/utils';

interface BlogSidebarProps {
  post: BlogPost;
  headings: TocHeading[];
}

/**
 * Sticky article sidebar: scroll-linked table of contents,
 * author card, and a consultation CTA.
 */
export const BlogSidebar: React.FC<BlogSidebarProps> = ({ post, headings }) => {
  const [activeId, setActiveId] = useState<string>('');

  // Highlight the heading currently in the reading zone
  useEffect(() => {
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]?.target.id) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: '-120px 0px -65% 0px', threshold: 0 }
    );

    headings.forEach((heading) => {
      const el = document.getElementById(heading.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  return (
    <div className="flex flex-col gap-5 lg:sticky lg:top-24">
      {/* Table of contents */}
      {headings.length > 1 && (
        <nav
          aria-label="Table of contents"
          className="rounded-3xl bg-white border border-slate-100 shadow-card p-6"
        >
          <h2 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary mb-4">
            <ListTree className="w-4 h-4" />
            On This Page
          </h2>
          <ul className="space-y-1.5">
            {headings.map((heading) => (
              <li key={heading.id}>
                <a
                  href={`#${heading.id}`}
                  className={cn(
                    'block rounded-xl px-3 py-2 text-sm leading-snug border-l-2 transition-all duration-200',
                    heading.level === 3 && 'pl-6',
                    activeId === heading.id
                      ? 'border-primary bg-primary/5 text-primary font-semibold'
                      : 'border-slate-100 text-body-text hover:border-primary/40 hover:text-primary'
                  )}
                >
                  {heading.text}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}

      {/* Author card */}
      {post.author && (
        <div className="rounded-3xl bg-white border border-slate-100 shadow-card p-6 flex items-start gap-4">
          <div className="shrink-0 w-12 h-12 rounded-full bg-primary-light/30 text-primary flex items-center justify-center font-serif font-bold text-lg">
            {post.author.charAt(0)}
          </div>
          <div className="min-w-0">
            <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
              Written by
            </p>
            <p className="font-serif font-bold text-dark leading-snug">{post.author}</p>
            <p className="text-xs text-body-text mt-1 leading-relaxed">
              Clinical team at Dental Cosmetics &amp; Implant Centre.
            </p>
          </div>
        </div>
      )}

      {/* Consultation CTA */}
      <div className="rounded-3xl bg-primary p-6 text-white">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2.5 rounded-2xl bg-primary-light/25">
            <Sparkles className="w-5 h-5 text-primary-light" />
          </div>
          <h3 className="font-serif font-bold text-base leading-snug">
            Questions about your smile?
          </h3>
        </div>
        <p className="text-xs text-white/70 leading-relaxed mb-4">
          Book a consultation and we will walk you through what is realistic for your teeth.
        </p>
        <Link
          href="/book-appointment"
          className="block w-full text-center rounded-full bg-primary-light text-black font-bold text-xs px-5 py-3 transition-colors hover:bg-primary-soft"
        >
          Book a Consultation
        </Link>
        <div className="mt-4 pt-4 border-t border-white/15 space-y-2.5 text-xs text-white/75">
          <p className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-primary-light shrink-0" />
            Honest recommendations, no pressure
          </p>
          <p className="flex items-center gap-2">
            <CalendarCheck className="w-4 h-4 text-primary-light shrink-0" />
            Flexible appointment scheduling
          </p>
        </div>
      </div>
    </div>
  );
};

export default BlogSidebar;
