'use client';

import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

/**
 * Thin scroll-progress bar pinned to the top of the viewport,
 * so readers can gauge article length at a glance.
 */
export const ReadingProgress: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 z-50 h-1 origin-left bg-primary"
    />
  );
};

export default ReadingProgress;
