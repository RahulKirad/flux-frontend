import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

interface ProjectCardSlideshowProps {
  images: string[];
  alt: string;
  intervalMs?: number;
}

export default function ProjectCardSlideshow({
  images,
  alt,
  intervalMs = 4000,
}: ProjectCardSlideshowProps) {
  const slides = images.length > 0 ? images : [];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setIndex(0);
  }, [images]);

  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = setInterval(() => {
      setIndex((current) => (current + 1) % slides.length);
    }, intervalMs);
    return () => clearInterval(timer);
  }, [slides.length, intervalMs]);

  if (slides.length === 0) return null;

  return (
    <div className="relative h-full w-full bg-kinetic-surface-low">
      <AnimatePresence mode="wait">
        <motion.img
          key={`${alt}-${index}-${slides[index]}`}
          src={slides[index]}
          alt={alt}
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.55, ease: 'easeInOut' }}
          className="absolute inset-0 h-full w-full object-cover"
        />
      </AnimatePresence>

      {slides.length > 1 && (
        <div className="absolute bottom-2.5 left-1/2 z-10 flex -translate-x-1/2 gap-1.5 pointer-events-none">
          {slides.map((_, i) => (
            <span
              key={i}
              className={`h-1 rounded-full transition-all duration-300 ${
                i === index ? 'w-5 bg-white' : 'w-1.5 bg-white/45'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
