import { useEffect, useState } from 'react';
import { carFrameSrc } from './carFrames';

const HERO_CAR_FRAME = 16;

interface HeroScrollFramesProps {
  className?: string;
}

export default function HeroScrollFrames({ className = '' }: HeroScrollFramesProps) {
  const [loaded, setLoaded] = useState(false);
  const src = carFrameSrc(HERO_CAR_FRAME);

  useEffect(() => {
    const img = new Image();
    img.onload = () => setLoaded(true);
    img.onerror = console.error;
    img.src = src;
  }, [src]);

  return (
    <div className={`relative ${className}`}>
      {!loaded ? (
        <div className="flex items-center justify-center w-full h-full min-h-[140px] max-h-[200px] sm:max-h-[220px] lg:max-h-[260px]">
          <div className="w-12 h-12 border-4 border-white/20 border-t-primary-400 rounded-full animate-spin" />
        </div>
      ) : (
        <img
          src={src}
          alt="Automotive engineering 3D showcase"
          className="w-full h-full object-contain object-center mix-blend-lighten select-none pointer-events-none drop-shadow-[0_24px_80px_rgba(0,0,0,0.4)]"
          draggable={false}
        />
      )}
    </div>
  );
}
