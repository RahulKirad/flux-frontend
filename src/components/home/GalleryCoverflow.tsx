import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import ImageSlideshow from '../common/ImageSlideshow';

export type CoverflowCard = {
  id: string;
  images: string[];
  title: string;
};

const VISIBLE = 2;

function shortestOffset(index: number, active: number, total: number) {
  let delta = index - active;
  delta = ((delta % total) + total) % total;
  if (delta > total / 2) delta -= total;
  return delta;
}

export default function GalleryCoverflow({
  items,
  onSelect,
}: {
  items: CoverflowCard[];
  onSelect?: (id: string) => void;
}) {
  const [active, setActive] = useState(0);
  const total = items.length;

  useEffect(() => {
    if (total < 2) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;
    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % total);
    }, 5000);
    return () => window.clearInterval(timer);
  }, [total]);

  if (!total) return null;

  return (
    <div className="relative h-[340px] sm:h-[400px] lg:h-[440px] w-full">
      <div className="absolute inset-0 flex items-center justify-center">
        {items.map((item, index) => {
          const offset = shortestOffset(index, active, total);
          const hidden = Math.abs(offset) > VISIBLE;
          const depth = Math.abs(offset);
          const isCenter = offset === 0;

          return (
            <motion.button
              key={item.id}
              type="button"
              aria-label={item.title}
              onClick={() => onSelect?.(item.id)}
              className="absolute overflow-hidden rounded-[1.35rem] border border-white/20 bg-[#161616] shadow-[0_22px_50px_rgba(0,0,0,0.42)]"
              style={{ width: 268, height: 348 }}
              initial={false}
              animate={{
                x: offset * 178,
                y: 0,
                rotate: hidden ? 0 : offset * 5,
                scale: hidden ? 0.72 : isCenter ? 1.14 : depth === 1 ? 0.9 : 0.78,
                opacity: hidden ? 0 : depth === 2 ? 0.92 : 1,
                zIndex: hidden ? 0 : 20 - depth,
                filter: isCenter ? 'brightness(1)' : 'brightness(0.88)',
              }}
              transition={{ type: 'spring', stiffness: 240, damping: 28, mass: 0.85 }}
            >
              <ImageSlideshow images={item.images} alt="" className="absolute inset-0 w-full h-full object-cover" />
              <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/35 to-transparent px-4 pb-4 pt-10 text-center">
                <span className="block text-[11px] uppercase tracking-[0.18em] text-white/90 line-clamp-2 font-medium">
                  {item.title}
                </span>
              </span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
