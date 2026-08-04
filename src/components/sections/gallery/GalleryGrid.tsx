'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import Container from '@/components/ui/Container';
import GalleryCard from './GalleryCard';
import BeforeAfterSlider from './BeforeAfterSlider';
import Lightbox from './Lightbox';
import { GalleryItem, GALLERY_CATEGORIES, GalleryCategory } from '@/types/gallery';

interface GalleryGridProps {
  initialItems: GalleryItem[];
}

const ALL_LABEL = 'All';
type FilterCategory = GalleryCategory | typeof ALL_LABEL;

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: 'easeOut' },
  },
};

export const GalleryGrid: React.FC<GalleryGridProps> = ({ initialItems }) => {
  const [activeCategory, setActiveCategory] = useState<FilterCategory>(ALL_LABEL);
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [lightboxType, setLightboxType] = useState<'main' | 'before' | 'after'>('main');
  const [lightboxSession, setLightboxSession] = useState(0);

  // Featured before/after case for the hero slider
  const featured =
    initialItems.find(
      (item) => item.variant === 'comparison' && item.images.before && item.images.after
    ) ||
    initialItems.find((item) => item.featured) ||
    initialItems[0];

  const gridItems = initialItems.filter((item) => item.id !== featured?.id);

  // Filter items based on active category
  const filteredItems = gridItems.filter((item) => {
    if (activeCategory === ALL_LABEL) return true;
    return item.category === activeCategory;
  });

  const categoriesList: FilterCategory[] = [ALL_LABEL, ...GALLERY_CATEGORIES];

  const handleOpenLightbox = (item: GalleryItem, type?: 'main' | 'before' | 'after') => {
    setSelectedItem(item);
    setLightboxType(type || 'main');
    setLightboxSession((s) => s + 1);
  };

  return (
    <section className="py-10 pb-20 md:pb-24 bg-bg overflow-hidden">
      <Container>
        {/* Featured before/after comparison slider */}
        {featured && featured.images.before && featured.images.after && (
          <div className="mb-12 md:mb-16">
            <BeforeAfterSlider
              beforeImage={featured.images.before}
              afterImage={featured.images.after}
              title={featured.title}
              beforeLabel={`Before ${featured.category}`}
              afterLabel={`After ${featured.category}`}
            />
          </div>
        )}

        {/* Category Filter Bar */}
        <div className="flex flex-wrap justify-center items-center gap-2.5 mb-10 font-sans text-sm">
          {categoriesList.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 rounded-full font-semibold transition-all duration-300 cursor-pointer shadow-sm border ${
                activeCategory === cat
                  ? 'bg-[#003b1b] text-white border-[#003b1b]'
                  : 'bg-white hover:bg-slate-50 text-slate-600 border-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Uniform 3-column grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, scale: 0.95 }}
              >
                <GalleryCard item={item} onOpenLightbox={handleOpenLightbox} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredItems.length === 0 && (
          <div className="py-20 text-center text-body-text font-sans">
            No transformations published in this category yet.
          </div>
        )}
      </Container>

      {/* Full screen Lightbox */}
      <Lightbox
        key={`${selectedItem?.id || 'none'}-${lightboxSession}`}
        item={selectedItem}
        initialType={lightboxType}
        onClose={() => setSelectedItem(null)}
      />
    </section>
  );
};

export default GalleryGrid;
