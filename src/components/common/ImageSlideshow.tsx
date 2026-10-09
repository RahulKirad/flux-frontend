import { useEffect, useState } from 'react';

const INTERVAL_MS = 5000;

export default function ImageSlideshow({
  images,
  alt = '',
  className = 'absolute inset-0 w-full h-full object-cover',
}: {
  images: string[];
  alt?: string;
  className?: string;
}) {
  const slides = images.filter(Boolean);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setIndex(0);
  }, [slides.join('|')]);

  useEffect(() => {
    if (slides.length < 2) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % slides.length);
    }, INTERVAL_MS);
    return () => window.clearInterval(timer);
  }, [slides.length]);

  if (!slides.length) return null;

  if (slides.length === 1) {
    return <img src={slides[0]} alt={alt} className={className} />;
  }

  return (
    <>
      {slides.map((src, slideIndex) => (
        <img
          key={`${src}-${slideIndex}`}
          src={src}
          alt={slideIndex === index ? alt : ''}
          className={`${className} transition-opacity duration-700 ${
            slideIndex === index ? 'opacity-100' : 'opacity-0'
          }`}
        />
      ))}
    </>
  );
}
