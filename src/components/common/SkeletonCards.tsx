import React from 'react';

/**
 * Luxury Skeleton Loader Card for Tours & Excursions
 */
export const TourCardSkeleton: React.FC = () => {
  return (
    <div className="bg-[#142334]/60 border border-stone-800/90 rounded-2xl overflow-hidden flex flex-col justify-between shadow-lg relative">
      <div>
        {/* Visual Frame Skeleton */}
        <div className="relative h-56 bg-stone-900/90 skeleton-shimmer overflow-hidden">
          {/* Top badge skeleton */}
          <div className="absolute top-3 start-3 h-6 w-28 rounded-md bg-stone-800/80" />
          {/* Top-right AR badge skeleton */}
          <div className="absolute top-3 end-3 h-6 w-24 rounded-md bg-stone-800/80" />
          {/* Bottom photo trigger skeleton */}
          <div className="absolute bottom-3 start-3 h-6 w-16 rounded-md bg-stone-800/80" />
          {/* Bottom rating skeleton */}
          <div className="absolute bottom-3 end-3 h-6 w-14 rounded-md bg-stone-800/80" />
        </div>

        {/* Content Skeleton */}
        <div className="p-6 space-y-3">
          {/* Duration & Bank metadata */}
          <div className="flex items-center gap-2">
            <div className="h-3.5 w-20 rounded bg-stone-800 skeleton-shimmer" />
            <div className="h-2 w-2 rounded-full bg-stone-800" />
            <div className="h-3.5 w-24 rounded bg-stone-800 skeleton-shimmer" />
          </div>

          {/* Title skeleton */}
          <div className="h-5 w-4/5 rounded-md bg-stone-800 skeleton-shimmer" />

          {/* Subtitle skeleton */}
          <div className="h-3.5 w-2/3 rounded bg-stone-800/70 skeleton-shimmer" />

          {/* Description lines */}
          <div className="space-y-1.5 pt-1">
            <div className="h-3 w-full rounded bg-stone-800/60 skeleton-shimmer" />
            <div className="h-3 w-5/6 rounded bg-stone-800/60 skeleton-shimmer" />
          </div>

          {/* Highlights */}
          <div className="mt-4 pt-4 border-t border-stone-800/80 space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-3.5 h-3.5 rounded-full bg-[#D6AD60]/20 shrink-0" />
              <div className="h-3 w-3/4 rounded bg-stone-800/70 skeleton-shimmer" />
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3.5 h-3.5 rounded-full bg-[#D6AD60]/20 shrink-0" />
              <div className="h-3 w-2/3 rounded bg-stone-800/70 skeleton-shimmer" />
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3.5 h-3.5 rounded-full bg-[#D6AD60]/20 shrink-0" />
              <div className="h-3 w-4/5 rounded bg-stone-800/70 skeleton-shimmer" />
            </div>
          </div>
        </div>
      </div>

      {/* Card Footer Skeleton */}
      <div className="p-6 pt-0 border-t border-stone-800/60 mt-4 flex items-center justify-between">
        <div className="space-y-1">
          <div className="h-2.5 w-14 rounded bg-stone-800/80" />
          <div className="h-6 w-20 rounded-md bg-stone-800 skeleton-shimmer" />
        </div>
        <div className="flex items-center gap-2">
          <div className="h-9 w-12 rounded-xl bg-stone-800/80" />
          <div className="h-9 w-28 rounded-xl bg-gradient-to-r from-[#D6AD60]/20 to-[#E8C576]/20 skeleton-shimmer" />
        </div>
      </div>
    </div>
  );
};

/**
 * Luxury Skeleton Loader Card for Holiday Apartments & Nilefront Flats
 */
export const FlatCardSkeleton: React.FC = () => {
  return (
    <div className="bg-[#142334]/60 border border-stone-800/90 rounded-2xl overflow-hidden flex flex-col justify-between shadow-lg relative">
      <div>
        {/* Visual Frame Skeleton (h-64) */}
        <div className="relative h-64 bg-stone-900/90 skeleton-shimmer overflow-hidden">
          {/* Featured badge skeleton */}
          <div className="absolute top-4 start-4 h-6 w-32 rounded-md bg-stone-800/80" />
          {/* Bottom photos trigger */}
          <div className="absolute bottom-4 start-4 h-6 w-16 rounded-md bg-stone-800/80" />
          {/* Bottom rating */}
          <div className="absolute bottom-4 end-4 h-6 w-14 rounded-md bg-stone-800/80" />
        </div>

        {/* Content Skeleton */}
        <div className="p-6 space-y-3">
          {/* Bank tag */}
          <div className="h-3 w-28 rounded bg-[#D6AD60]/20" />

          {/* Residence title */}
          <div className="h-6 w-3/4 rounded-md bg-stone-800 skeleton-shimmer" />

          {/* Tagline */}
          <div className="h-3.5 w-2/3 rounded bg-stone-800/70 skeleton-shimmer" />

          {/* Description */}
          <div className="space-y-1.5 pt-1">
            <div className="h-3 w-full rounded bg-stone-800/60 skeleton-shimmer" />
            <div className="h-3 w-4/5 rounded bg-stone-800/60 skeleton-shimmer" />
          </div>

          {/* Capacity specs row */}
          <div className="flex items-center gap-4 py-2 border-y border-stone-800/80">
            <div className="h-4 w-20 rounded bg-stone-800/70" />
            <div className="h-4 w-20 rounded bg-stone-800/70" />
            <div className="h-4 w-20 rounded bg-stone-800/70" />
          </div>

          {/* Amenities grid */}
          <div className="grid grid-cols-2 gap-2 pt-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="w-3.5 h-3.5 rounded bg-emerald-500/20 shrink-0" />
                <div className="h-3 w-24 rounded bg-stone-800/60 skeleton-shimmer" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Card Footer Skeleton */}
      <div className="p-6 pt-0 border-t border-stone-800/60 mt-4 flex items-center justify-between">
        <div className="space-y-1">
          <div className="h-2.5 w-16 rounded bg-stone-800/80" />
          <div className="h-6 w-24 rounded-md bg-stone-800 skeleton-shimmer" />
        </div>
        <div className="h-10 w-32 rounded-xl bg-gradient-to-r from-[#D6AD60]/20 to-[#E8C576]/20 skeleton-shimmer" />
      </div>
    </div>
  );
};

/**
 * Luxury Skeleton Loader Card for VIP Transport & Chauffeur Fleet
 */
export const TransportCardSkeleton: React.FC = () => {
  return (
    <div className="bg-[#142334]/60 border border-stone-800/90 rounded-2xl overflow-hidden flex flex-col justify-between shadow-lg relative">
      <div>
        {/* Visual Frame Skeleton */}
        <div className="relative h-56 bg-stone-900/90 skeleton-shimmer overflow-hidden">
          {/* Top vehicle type badge */}
          <div className="absolute top-4 start-4 h-6 w-36 rounded-md bg-stone-800/80" />
          {/* Bottom photos trigger */}
          <div className="absolute bottom-4 end-4 h-6 w-24 rounded-md bg-stone-800/80" />
        </div>

        {/* Content Skeleton */}
        <div className="p-6 space-y-3">
          {/* Name */}
          <div className="h-5 w-4/5 rounded-md bg-stone-800 skeleton-shimmer" />

          {/* Capacity metadata */}
          <div className="flex items-center gap-4 py-2 border-b border-stone-800/80">
            <div className="h-4 w-24 rounded bg-stone-800/70" />
            <div className="h-4 w-24 rounded bg-stone-800/70" />
          </div>

          {/* Description */}
          <div className="space-y-1.5 pt-1">
            <div className="h-3 w-full rounded bg-stone-800/60 skeleton-shimmer" />
            <div className="h-3 w-5/6 rounded bg-stone-800/60 skeleton-shimmer" />
          </div>

          {/* Features check lines */}
          <div className="space-y-2 pt-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="w-3.5 h-3.5 rounded bg-[#D6AD60]/20 shrink-0" />
                <div className="h-3 w-4/5 rounded bg-stone-800/70 skeleton-shimmer" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Card Footer Skeleton */}
      <div className="p-6 pt-0 border-t border-stone-800/60 mt-4 flex items-center justify-between">
        <div className="space-y-1">
          <div className="h-2.5 w-16 rounded bg-stone-800/80" />
          <div className="h-6 w-20 rounded-md bg-stone-800 skeleton-shimmer" />
        </div>
        <div className="h-10 w-32 rounded-xl bg-gradient-to-r from-[#D6AD60]/20 to-[#E8C576]/20 skeleton-shimmer" />
      </div>
    </div>
  );
};
