'use client';

import React from 'react';
import Image from 'next/image';
import { Sparkles } from 'lucide-react';
import { GalleryItem } from '@/types/gallery';
import { resolveThumbnailUrl } from '@/lib/media';

interface GalleryCardProps {
  item: GalleryItem;
  onOpenLightbox: (item: GalleryItem, type?: 'main' | 'before' | 'after') => void;
}

export const GalleryCard: React.FC<GalleryCardProps> = ({ item, onOpenLightbox }) => {
  const mediaUrl = item.images.after
    ? resolveThumbnailUrl(item.images.after)
    : item.images.main
    ? resolveThumbnailUrl(item.images.main)
    : '';

  const tagLines = (item.tags || []).slice(0, 2);

  return (
    <article
      onClick={() => onOpenLightbox(item, 'after')}
      className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 cursor-pointer text-left"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-slate-50">
        {mediaUrl && (
          <Image
            src={mediaUrl}
            alt={item.images.after?.altText || item.images.main?.altText || item.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        )}
        <span className="absolute top-3 right-3 z-10 rounded-full bg-[#003b1b]/90 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-sm">
          {item.category}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-serif text-sm font-bold text-gray-900 leading-snug">
          {item.title}
        </h3>
        <p className="mt-1.5 text-xs leading-relaxed text-gray-500 line-clamp-2">
          {item.description}
        </p>

        {tagLines.length > 0 && (
          <div className="mt-auto flex flex-wrap gap-x-4 gap-y-1 pt-4">
            {tagLines.map((tag, idx) => (
              <span
                key={idx}
                className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-gray-400"
              >
                <Sparkles className="h-3 w-3 text-[#003b1b]" />
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </article>
  );
};

export default GalleryCard;
