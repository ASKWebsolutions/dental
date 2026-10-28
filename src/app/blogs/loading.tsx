import React from 'react';

export default function BlogsLoading() {
  return (
    <div className="py-16 md:py-24 bg-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero skeleton */}
        <div className="max-w-3xl mx-auto text-center mb-14 space-y-4">
          <div className="h-3 w-40 bg-slate-200 rounded-full mx-auto animate-pulse" />
          <div className="h-8 w-3/4 bg-slate-200 rounded-lg mx-auto animate-pulse" />
          <div className="h-4 w-full bg-slate-100 rounded-lg mx-auto animate-pulse" />
          <div className="h-4 w-5/6 bg-slate-100 rounded-lg mx-auto animate-pulse" />
        </div>

        {/* Filter skeleton */}
        <div className="flex justify-center gap-3 mb-10">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-10 w-24 bg-slate-200 rounded-full animate-pulse" />
          ))}
        </div>

        {/* Cards skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl overflow-hidden border border-slate-100 animate-pulse"
            >
              <div className="aspect-[16/10] bg-slate-200" />
              <div className="p-5 space-y-3">
                <div className="h-3 w-24 bg-slate-100 rounded" />
                <div className="h-5 w-full bg-slate-200 rounded" />
                <div className="h-5 w-4/5 bg-slate-200 rounded" />
                <div className="h-3 w-full bg-slate-100 rounded" />
                <div className="h-3 w-2/3 bg-slate-100 rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
