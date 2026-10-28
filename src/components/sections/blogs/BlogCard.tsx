'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Clock, ArrowUpRight } from 'lucide-react';
import { BlogPost } from '@/types/blog';
import { resolveImageUrl } from '@/lib/media';

interface BlogCardProps {
  post: BlogPost;
}

function formatDate(iso?: string | null): string {
  if (!iso) return '';
  try {
    return new Date(iso).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  } catch {
    return '';
  }
}

export const BlogCard: React.FC<BlogCardProps> = ({ post }) => {
  const coverUrl = post.coverImage ? resolveImageUrl(post.coverImage) : '';

  return (
    <Link
      href={`/blogs/${post.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 text-left h-full"
    >
      {/* Cover image */}
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-100 shrink-0">
        {coverUrl ? (
          <Image
            src={coverUrl}
            alt={post.coverImage?.altText || post.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/10 to-accent/10">
            <span className="font-serif italic text-primary/60 text-lg">Dental Journal</span>
          </div>
        )}
        <span className="absolute top-3 left-3 z-10 rounded-full bg-[#003b1b]/90 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-sm">
          {post.category}
        </span>
        {post.featured && (
          <span className="absolute top-3 right-3 z-10 rounded-full bg-accent px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-sm">
            Featured
          </span>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-2">
          {formatDate(post.publishedAt || post.createdAt) && (
            <span>{formatDate(post.publishedAt || post.createdAt)}</span>
          )}
          <span className="flex items-center gap-1 text-gray-400">
            <Clock className="w-3 h-3" />
            {post.readTimeMins} min read
          </span>
        </div>

        <h3 className="font-serif text-base font-bold text-gray-900 leading-snug group-hover:text-[#003b1b] transition-colors">
          {post.title}
        </h3>
        <p className="mt-2 text-xs leading-relaxed text-gray-500 line-clamp-3">{post.excerpt}</p>

        <div className="mt-auto pt-4 flex items-center justify-between">
          {post.tags.length > 0 && (
            <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 truncate pr-2">
              {post.tags.slice(0, 2).join(' · ')}
            </span>
          )}
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#003b1b] shrink-0">
            Read
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;
