import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Play } from 'lucide-react';
import HeroStatsBar from './HeroStatsBar';
import HeroGalaxyStars from './HeroGalaxyStars';
import heroVideo from '../../assets/hero-banner.mp4';

interface HeroBannerSliderProps {
  stats?: {
    projects?: string;
    clients?: string;
    years?: string;
    engineers?: string;
  };
}

export default function HeroBannerSlider({ stats = {} }: HeroBannerSliderProps) {
  return (
    <section className="relative">
      {/* Video banner + shadow text overlay — extends under transparent navbar */}
      <div className="relative overflow-hidden bg-[#0a1628]">
        <div className="hero-video-area relative">
          <div className="absolute inset-0 z-0">
            <video
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              className="absolute inset-0 w-full h-full object-cover"
              aria-hidden
            >
              <source src={heroVideo} type="video/mp4" />
            </video>

            <HeroGalaxyStars />

            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent z-[2]" />
            <div className="absolute inset-0 gradient-dull-blue opacity-25 mix-blend-multiply z-[2]" />
          </div>
        </div>

        {/* Transparent shadow patch — overlaps video bottom */}
        <div className="hero-banner-patch hero-banner-patch--shadow">
          <div className="stitch-container-home py-4 sm:py-5 lg:py-6">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="flex flex-col items-center text-center max-w-3xl xl:max-w-4xl mx-auto w-full min-w-0 px-1"
            >
              <span className="inline-flex items-center gap-2 px-2.5 py-0.5 border border-white/15 bg-white/5 backdrop-blur-sm uppercase tracking-widest text-[10px] sm:text-xs font-semibold mb-2 text-white/85">
                <span className="w-1.5 h-1.5 bg-white/70 rounded-full animate-pulse" />
                Precision Engineering
              </span>

              <h1 className="text-[clamp(1.2rem,2.6vw,2.35rem)] font-bold leading-tight tracking-tight mb-2 w-full text-white/95 text-balance">
                Engineering the{' '}
                <span className="text-white/70">Future of</span>{' '}
                <span className="relative inline-block">
                  Mobility
                  <span className="absolute bottom-0.5 left-0 w-full h-px bg-white/30" />
                </span>
              </h1>

              <p className="text-xs sm:text-sm lg:text-[clamp(0.8rem,1.2vw,1rem)] text-white/65 mb-3 sm:mb-4 max-w-2xl xl:max-w-3xl mx-auto leading-relaxed text-pretty">
                Integrated engineering design, composites, prototyping, and tools & die for bus body
                and railway parts manufacturing — from concept to series production.
              </p>

              <div className="flex flex-wrap gap-2 sm:gap-3 justify-center">
                <Link to="/contact" className="stitch-btn-white !bg-white/85 hover:!bg-white !px-5 !py-2.5 text-[10px] sm:text-xs">
                  Request Quote
                  <ArrowRight size={14} />
                </Link>
                <Link to="/services" className="stitch-btn-ghost !border-white/30 !bg-black/20 !backdrop-blur-sm hover:!bg-black/35 !px-5 !py-2.5 text-[10px] sm:text-xs">
                  <Play size={14} fill="currentColor" />
                  Our Services
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <HeroStatsBar stats={stats} shadow />
    </section>
  );
}
