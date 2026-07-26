import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { heroSlides } from '../../data/companyContent';

export default function ImageTextBannerSlider() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setIndex((i) => (i + 1) % heroSlides.length), 7000);
    return () => clearInterval(timer);
  }, []);

  const slide = heroSlides[index];
  const prev = () => setIndex((i) => (i - 1 + heroSlides.length) % heroSlides.length);
  const next = () => setIndex((i) => (i + 1) % heroSlides.length);

  return (
    <section className="stitch-section bg-kinetic-surface-low border-y border-kinetic-outline-variant">
      <div className="stitch-container">
        <div className="relative overflow-hidden border border-kinetic-outline-variant bg-white min-h-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={slide.title}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="grid lg:grid-cols-2 min-h-0"
            >
              <div className="relative min-h-[220px] sm:min-h-[280px] lg:min-h-[360px] xl:min-h-[420px] overflow-hidden">
                <img src={slide.image} alt={slide.title} className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent lg:hidden" />
              </div>

              <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10 xl:p-12 min-w-0">
                <span className="stitch-label block mb-3 sm:mb-4">{slide.label}</span>
                <h2 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-kinetic-primary uppercase leading-tight mb-3 sm:mb-4 text-balance">
                  {slide.title}
                </h2>
                <p className="text-kinetic-on-surface-variant text-sm sm:text-base lg:text-lg leading-relaxed mb-6 sm:mb-8 max-w-lg">
                  {slide.description}
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link to={slide.cta.href} className="stitch-btn-primary">
                    {slide.cta.label}
                    <ArrowRight size={16} />
                  </Link>
                  <Link to={slide.secondary.href} className="stitch-btn-secondary">
                    {slide.secondary.label}
                  </Link>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="absolute bottom-6 right-6 lg:bottom-8 lg:right-8 flex items-center gap-3 z-10">
            <button type="button" onClick={prev} aria-label="Previous slide" className="w-10 h-10 border border-kinetic-outline-variant bg-white flex items-center justify-center hover:border-kinetic-primary transition">
              <ChevronLeft size={18} />
            </button>
            <button type="button" onClick={next} aria-label="Next slide" className="w-10 h-10 border border-kinetic-outline-variant bg-white flex items-center justify-center hover:border-kinetic-primary transition">
              <ChevronRight size={18} />
            </button>
          </div>

          <div className="absolute bottom-6 left-8 flex gap-2 z-10">
            {heroSlides.map((s, i) => (
              <button
                key={s.title}
                type="button"
                aria-label={`Go to slide ${i + 1}`}
                onClick={() => setIndex(i)}
                className={`h-1 transition-all ${i === index ? 'w-8 bg-kinetic-primary' : 'w-4 bg-kinetic-outline-variant'}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
