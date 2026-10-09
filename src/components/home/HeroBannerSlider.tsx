import { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Play } from 'lucide-react';
import HeroStatsBar from './HeroStatsBar';
import HeroGalaxyStars from './HeroGalaxyStars';
import heroVideo from '../../assets/hero-banner.mp4';
import secondHeroVideo from '../../assets/gemini_generated_video_843113fb.mp4';
import { busImage } from '../../assets/images';
import { useSiteContent } from '../../hooks/useSiteContent';
import { resolveMediaUrl } from '../../utils/mediaUrl';

interface HeroBannerSliderProps {
  stats?: {
    projects?: string;
    clients?: string;
    years?: string;
    engineers?: string;
  };
}

export default function HeroBannerSlider({ stats = {} }: HeroBannerSliderProps) {
  const { data: site } = useSiteContent();
  const hero = site?.hero;
  const [index, setIndex] = useState(0);
  const indexRef = useRef(0);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const advanceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  indexRef.current = index;

  const slides = useMemo(() => {
    const firstVideo = resolveMediaUrl(hero?.videoUrl || site?.assets?.['hero.video']) || heroVideo;
    const secondVideo =
      resolveMediaUrl(hero?.videoUrl2 || site?.assets?.['hero.video2']) || secondHeroVideo;

    return [
      {
        video: firstVideo,
        poster: resolveMediaUrl(hero?.posterUrl || site?.assets?.['hero.poster']) || undefined,
        badge: hero?.badge || 'Precision Engineering',
        titleLine1: hero?.titleLine1 || 'Engineering the',
        titleHighlight: hero?.titleHighlight || 'Future of',
        titleAccent: hero?.titleAccent || 'Mobility',
        description:
          hero?.description ||
          'Integrated engineering design, composites, prototyping, and tools & die for bus body and railway parts manufacturing — from concept to series production.',
        ctaPrimary: hero?.ctaPrimary || 'Request Quote',
        ctaPrimaryHref: hero?.ctaPrimaryHref || '/contact',
        ctaSecondary: hero?.ctaSecondary || 'Our Services',
        ctaSecondaryHref: hero?.ctaSecondaryHref || '/services',
      },
      {
        video: secondVideo,
        poster: busImage,
        badge: 'Bus Body Manufacturing',
        titleLine1: 'Lightweight',
        titleHighlight: 'Composite',
        titleAccent: 'Bus Bodies',
        description:
          'FRP and vacuum-formed panels engineered for fuel efficiency, AIS 153 compliance, and electrification-ready lightweighting across commercial fleets.',
        ctaPrimary: 'View Projects',
        ctaPrimaryHref: '/projects',
        ctaSecondary: 'Case Studies',
        ctaSecondaryHref: '/case-studies',
      },
    ];
  }, [hero, site]);

  const slide = slides[index];
  const slideCount = slides.length;

  const goTo = (next: number) => {
    if (advanceTimer.current) {
      clearTimeout(advanceTimer.current);
      advanceTimer.current = null;
    }
    setIndex(((next % slideCount) + slideCount) % slideCount);
  };

  useEffect(() => {
    return () => {
      if (advanceTimer.current) clearTimeout(advanceTimer.current);
    };
  }, []);

  useEffect(() => {
    videoRefs.current.forEach((video, i) => {
      if (!video) return;
      if (i === index) {
        void video.play().catch(() => {});
      } else {
        video.pause();
        try {
          video.currentTime = 0;
        } catch {
          /* ignore seek errors while metadata loads */
        }
      }
    });
  }, [index]);

  return (
    <section className="relative">
      <div className="relative overflow-hidden bg-[#0a1628]">
        <div className="hero-video-area relative">
          <div className="absolute inset-0 z-0 overflow-hidden">
            <div
              className="flex h-full transition-transform duration-700 ease-in-out"
              style={{
                width: `${slideCount * 100}%`,
                transform: `translateX(-${index * (100 / slideCount)}%)`,
              }}
            >
              {slides.map((item, i) => (
                <div
                  key={`${item.video}-${i}`}
                  className="relative h-full shrink-0"
                  style={{ width: `${100 / slideCount}%` }}
                >
                  <video
                    ref={(el) => {
                      videoRefs.current[i] = el;
                    }}
                    muted
                    playsInline
                    preload={i === 0 ? 'auto' : 'metadata'}
                    poster={item.poster}
                    className="absolute inset-0 w-full h-full object-cover"
                    aria-hidden
                    onCanPlay={() => {
                      if (i === indexRef.current) void videoRefs.current[i]?.play().catch(() => {});
                    }}
                    onEnded={() => {
                      if (i !== indexRef.current) return;
                      if (advanceTimer.current) clearTimeout(advanceTimer.current);
                      advanceTimer.current = setTimeout(() => {
                        setIndex((current) => (current + 1) % slideCount);
                        advanceTimer.current = null;
                      }, 1000);
                    }}
                  >
                    <source src={item.video} type="video/mp4" />
                  </video>
                </div>
              ))}
            </div>

            <HeroGalaxyStars />

            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent z-[2] pointer-events-none" />
            <div className="absolute inset-0 gradient-dull-blue opacity-25 mix-blend-multiply z-[2] pointer-events-none" />
          </div>
        </div>

        <div className="hero-banner-patch hero-banner-patch--shadow">
          <div className="stitch-container-home py-4 sm:py-5 lg:py-6">
            <div className="flex justify-center gap-2 mb-3">
              {slides.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={`Show banner video ${i + 1}`}
                  onClick={() => goTo(i)}
                  className={`h-1.5 rounded-full transition-all ${
                    i === index ? 'w-8 bg-white' : 'w-3 bg-white/40 hover:bg-white/70'
                  }`}
                />
              ))}
            </div>
            <AnimatePresence mode="wait">
              <motion.div
                key={slide.badge + slide.titleAccent}
                initial={{ opacity: 0, x: 48 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -48 }}
                transition={{ duration: 0.45, ease: 'easeOut' }}
                className="flex flex-col items-center text-center max-w-3xl xl:max-w-4xl mx-auto w-full min-w-0 px-1"
              >
                <span className="inline-flex items-center gap-2 px-2.5 py-0.5 border border-white/15 bg-white/5 backdrop-blur-sm uppercase tracking-widest text-[10px] sm:text-xs font-semibold mb-2 text-white/85">
                  <span className="w-1.5 h-1.5 bg-white/70 rounded-full animate-pulse" />
                  {slide.badge}
                </span>

                <h1 className="text-[clamp(1.2rem,2.6vw,2.35rem)] font-bold leading-tight tracking-tight mb-2 w-full text-white/95 text-balance">
                  {slide.titleLine1}{' '}
                  <span className="text-white/70">{slide.titleHighlight}</span>{' '}
                  <span className="relative inline-block">
                    {slide.titleAccent}
                    <span className="absolute bottom-0.5 left-0 w-full h-px bg-white/30" />
                  </span>
                </h1>

                <p className="text-xs sm:text-sm lg:text-[clamp(0.8rem,1.2vw,1rem)] text-white/65 mb-3 sm:mb-4 max-w-2xl xl:max-w-3xl mx-auto leading-relaxed text-pretty">
                  {slide.description}
                </p>

                <div className="flex flex-wrap gap-2 sm:gap-3 justify-center">
                  <Link
                    to={slide.ctaPrimaryHref}
                    className="stitch-btn-white !bg-white/85 hover:!bg-white !px-5 !py-2.5 text-[10px] sm:text-xs"
                  >
                    {slide.ctaPrimary}
                    <ArrowRight size={14} />
                  </Link>
                  <Link
                    to={slide.ctaSecondaryHref}
                    className="stitch-btn-ghost !border-white/30 !bg-black/20 !backdrop-blur-sm hover:!bg-black/35 !px-5 !py-2.5 text-[10px] sm:text-xs"
                  >
                    <Play size={14} fill="currentColor" />
                    {slide.ctaSecondary}
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      <HeroStatsBar stats={stats} shadow />
    </section>
  );
}
