'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import Container from '@/components/ui/Container';
import BlogCard from './BlogCard';
import { BlogPost, BLOG_CATEGORIES } from '@/types/blog';

interface BlogsGridProps {
  initialPosts: BlogPost[];
}

const ALL_LABEL = 'All';
type FilterCategory = typeof ALL_LABEL;

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

export const BlogsGrid: React.FC<BlogsGridProps> = ({ initialPosts }) => {
  const [activeCategory, setActiveCategory] = useState<FilterCategory | string>(ALL_LABEL);

  // Only show categories that actually have published posts
  const availableCategories = BLOG_CATEGORIES.filter((cat) =>
    initialPosts.some((post) => post.category === cat)
  );

  const filteredPosts =
    activeCategory === ALL_LABEL
      ? initialPosts
      : initialPosts.filter((post) => post.category === activeCategory);

  return (
    <section className="py-10 pb-20 md:pb-24 bg-bg overflow-hidden">
      <Container>
        {/* Category Filter Bar */}
        <div className="flex flex-wrap justify-center items-center gap-2.5 mb-10 font-sans text-sm">
          {[ALL_LABEL, ...availableCategories].map((cat) => (
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

        {/* Posts grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full"
        >
          <AnimatePresence mode="popLayout">
            {filteredPosts.map((post) => (
              <motion.div
                key={post.id}
                layout
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, scale: 0.95 }}
                className="h-full"
              >
                <BlogCard post={post} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredPosts.length === 0 && (
          <div className="py-20 text-center text-body-text font-sans">
            No articles published in this category yet.
          </div>
        )}
      </Container>
    </section>
  );
};

export default BlogsGrid;
