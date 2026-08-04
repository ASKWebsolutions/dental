'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';

interface AnimatedCounterProps {
  value: string | number; // e.g. "1,520+", 1500, "98%"
  className?: string;
}

export function AnimatedCounter({ value, className }: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [displayValue, setDisplayValue] = useState('0');

  useEffect(() => {
    if (!isInView) return;

    // Parse the value to find the number and any non-numeric suffixes/prefixes
    const valueString = String(value);
    const numericMatch = valueString.match(/\d+([.,]\d+)?/);
    if (!numericMatch) {
      setDisplayValue(valueString);
      return;
    }

    const rawNumberStr = numericMatch[0];
    const cleanNumberStr = rawNumberStr.replace(/,/g, '');
    const targetNumber = parseFloat(cleanNumberStr);
    const hasComma = rawNumberStr.includes(',');

    const prefix = valueString.slice(0, numericMatch.index);
    const suffix = valueString.slice((numericMatch.index || 0) + rawNumberStr.length);

    const start = 0;
    const duration = 1500; // 1.5 seconds animation
    const frameRate = 1000 / 60; // 60fps
    const totalFrames = Math.round(duration / frameRate);
    let frame = 0;

    const counter = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;
      // Easing out quad
      const easedProgress = progress * (2 - progress);
      const current = Math.round(start + (targetNumber - start) * easedProgress);

      let formattedCurrent = String(current);
      if (hasComma) {
        formattedCurrent = current.toLocaleString('en-US');
      }

      setDisplayValue(`${prefix}${formattedCurrent}${suffix}`);

      if (frame >= totalFrames) {
        clearInterval(counter);
        setDisplayValue(valueString); // Ensure exact final value is set
      }
    }, frameRate);

    return () => clearInterval(counter);
  }, [value, isInView]);

  return (
    <span ref={ref} className={className}>
      {displayValue}
    </span>
  );
}

export default AnimatedCounter;
