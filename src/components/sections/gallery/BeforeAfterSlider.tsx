'use client';

import React, { useCallback, useRef, useState } from 'react';
import Image from 'next/image';
import { MoveHorizontal } from 'lucide-react';
import type { GalleryImage } from '@/types/gallery';
import { resolveThumbnailUrl } from '@/lib/media';

interface BeforeAfterSliderProps {
  beforeImage?: GalleryImage | null;
  afterImage?: GalleryImage | null;
  title?: string;
}

export const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({
  beforeImage,
  afterImage,
  title,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(50);
  const [dragging, setDragging] = useState(false);

  const beforeUrl = resolveThumbnailUrl(beforeImage);
  const afterUrl = resolveThumbnailUrl(afterImage);

  const updateFromClientX = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const next = Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100));
    setPosition(next);
  }, []);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    setDragging(true);
    updateFromClientX(e.clientX);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging) return;
    updateFromClientX(e.clientX);
  };

  const stopDragging = () => setDragging(false);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowLeft') {
      setPosition((p) => Math.max(0, p - 5));
    } else if (e.key === 'ArrowRight') {
      setPosition((p) => Math.min(100, p + 5));
    }
  };

  if (!beforeUrl || !afterUrl) return null;

  return (
    <div
      ref={containerRef}
      role="slider"
      aria-label={title ? `Before and after comparison: ${title}` : 'Before and after comparison'}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(position)}
      tabIndex={0}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={stopDragging}
      onPointerCancel={stopDragging}
      onPointerLeave={stopDragging}
      onKeyDown={handleKeyDown}
      className="relative w-full aspect-[4/3] sm:aspect-[16/9] lg:aspect-[21/9] select-none touch-none cursor-ew-resize overflow-hidden rounded-2xl bg-slate-900 shadow-card focus:outline-none focus-visible:ring-2 focus-visible:ring-[#003b1b]"
    >
      {/* AFTER layer (base) */}
      <Image
        src={afterUrl}
        alt={afterImage?.altText || 'After treatment result'}
        fill
        sizes="(max-width: 1024px) 100vw, 1280px"
        className="object-cover"
        priority
      />

      {/* BEFORE layer (clipped overlay) */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: `polygon(0 0, ${position}% 0, ${position}% 100%, 0 100%)` }}
      >
        <Image
          src={beforeUrl}
          alt={beforeImage?.altText || 'Before treatment'}
          fill
          sizes="(max-width: 1024px) 100vw, 1280px"
          className="object-cover"
          priority
        />
      </div>

      {/* Slider divider + handle */}
      <div
        className="absolute top-0 bottom-0 w-0.5 bg-white/70 shadow-lg pointer-events-none z-20"
        style={{ left: `${position}%` }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white text-[#003b1b] flex items-center justify-center shadow-lg border border-slate-200">
          <MoveHorizontal className="w-5 h-5" strokeWidth={2.5} />
        </div>
      </div>

      {/* Floating badges */}
      <div className="absolute top-4 left-4 z-20 bg-emerald-950/80 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full backdrop-blur-sm pointer-events-none">
        Before Treatment
      </div>
      <div className="absolute top-4 right-4 z-20 bg-white/90 text-[#18181b] text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full backdrop-blur-sm pointer-events-none">
        After Transformation
      </div>
    </div>
  );
};

export default BeforeAfterSlider;
