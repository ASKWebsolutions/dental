import React from 'react';
import Container from '@/components/ui/Container';
import { SiteStat } from '@/types/reviews';

interface StatsBarProps {
  stats: SiteStat[];
}

export const StatsBar: React.FC<StatsBarProps> = ({ stats }) => {
  if (!stats || stats.length === 0) return null;

  return (
    <section className="bg-[#003b1b] text-white py-8 my-8 overflow-hidden select-none font-sans">
      <Container>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-6 text-center">
          {stats.map((stat) => (
            <div key={stat.id} className="flex flex-col items-center justify-center">
              <span className="font-serif font-bold text-3xl text-amber-100 tracking-tight">
                {stat.value}
              </span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-200/80 mt-1">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default StatsBar;
