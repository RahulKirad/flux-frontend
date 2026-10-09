import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import GraphiteBackground from './GraphiteBackground';
import HeroGalaxyStars from './HeroGalaxyStars';
import { useCmsPage } from '../../hooks/useSiteContent';
import type { WebsitePageId } from '../../data/adminPages';

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export function AnimatedSection({ children, className = '', delay = 0 }: AnimatedSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function Counter({ end, suffix = '', duration = 2 }: { end: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const increment = end / (duration * 60);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 1000 / 60);
    return () => clearInterval(timer);
  }, [isInView, end, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
}

export function PageHero({
  title,
  subtitle,
  label,
  background,
  aside,
}: {
  title: string;
  subtitle?: string;
  label?: string;
  background?: string;
  aside?: React.ReactNode;
}) {
  return (
    <section className={`page-hero galaxy-host ${aside ? 'lg:py-14' : ''}`}>
      {background ? (
        <>
          <img src={background} alt="" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-[#101820]/70" />
        </>
      ) : (
        <>
          <GraphiteBackground />
          <HeroGalaxyStars />
        </>
      )}
      <div className="stitch-container-home relative z-10">
        <div className={aside ? 'grid lg:grid-cols-[minmax(0,0.85fr)_minmax(420px,1.15fr)] items-center gap-6 lg:gap-8' : ''}>
          <div className="relative z-20">
            {label && (
              <motion.span
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                className="stitch-label text-white/60 block mb-4 tracking-[0.35em]"
              >
                {label}
              </motion.span>
            )}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className={`text-3xl md:text-4xl lg:text-5xl font-bold uppercase leading-tight mb-4 text-white/95 ${
                aside ? 'max-w-xl' : 'max-w-4xl'
              }`}
            >
              {title}
            </motion.h1>
            {subtitle && (
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.15 }}
                className={`text-base lg:text-lg text-white/70 leading-relaxed ${aside ? 'max-w-lg' : 'max-w-2xl'}`}
              >
                {subtitle}
              </motion.p>
            )}
          </div>
          {aside ? <div className="relative z-0 min-w-0 overflow-hidden">{aside}</div> : null}
        </div>
      </div>
    </section>
  );
}

export function SectionHeading({
  label,
  title,
  description,
  centered = true,
  className = '',
}: {
  label?: string;
  title: string;
  description?: string;
  centered?: boolean;
  className?: string;
}) {
  return (
    <div className={`mb-12 lg:mb-16 ${centered ? 'text-center' : ''} ${className}`.trim()}>
      {label && <span className="stitch-label block mb-4">{label}</span>}
      <h2 className="text-3xl lg:text-4xl font-bold text-kinetic-primary uppercase leading-tight mt-0 mb-4">
        {title}
      </h2>
      {description && (
        <p className={`text-kinetic-on-surface-variant text-base lg:text-lg max-w-3xl leading-relaxed ${centered ? 'mx-auto' : ''}`}>
          {description}
        </p>
      )}
    </div>
  );
}

export function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center py-20">
      <div className="w-10 h-10 border-4 border-primary-200 border-t-primary-500 rounded-full animate-spin" />
    </div>
  );
}

export function SEOHead({
  title,
  description,
  keywords,
}: {
  title: string;
  description?: string;
  keywords?: string;
}) {
  useEffect(() => {
    document.title = title;
    if (description) {
      let meta = document.querySelector('meta[name="description"]');
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('name', 'description');
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', description);
    }
    if (keywords) {
      let meta = document.querySelector('meta[name="keywords"]');
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('name', 'keywords');
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', keywords);
    }
  }, [title, description, keywords]);
  return null;
}

export function CmsPageHero({ pageId, aside }: { pageId: WebsitePageId; aside?: React.ReactNode }) {
  const copy = useCmsPage(pageId);
  return (
    <>
      <PageHero
        label={copy.label}
        title={copy.title}
        subtitle={copy.subtitle}
        background={copy.bannerImage || undefined}
        aside={aside}
      />
      {copy.body ? (
        <section className="stitch-section bg-white">
          <div className="stitch-container">
            <p className="text-kinetic-on-surface-variant leading-relaxed max-w-3xl whitespace-pre-line">{copy.body}</p>
          </div>
        </section>
      ) : null}
    </>
  );
}
