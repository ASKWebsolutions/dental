import React from 'react';
import { Star, ShieldCheck, BadgeCheck, HeartHandshake } from 'lucide-react';

const platforms = [
  { name: 'Google Reviews', icon: Star },
  { name: 'HealthGrade', icon: ShieldCheck },
  { name: 'TrustPilot', icon: BadgeCheck },
  { name: 'PatientConnect', icon: HeartHandshake },
];

export const TrustLogos: React.FC = () => {
  return (
    <section className="py-10 bg-bg overflow-hidden font-sans">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8">
        <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
          {platforms.map((platform) => {
            const Icon = platform.icon;
            return (
              <div
                key={platform.name}
                className="flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-white border border-gray-100 shadow-sm select-none"
              >
                <Icon className="w-4 h-4 text-[#003b1b]" />
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  {platform.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TrustLogos;
