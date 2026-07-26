import type { CSSProperties } from 'react';

const LAYERS = [
  { count: 48, seed: 1, duration: 90, hoverDuration: 35, opacity: 0.35, hoverOpacity: 0.65 },
  { count: 32, seed: 2, duration: 60, hoverDuration: 22, opacity: 0.5, hoverOpacity: 0.85 },
  { count: 18, seed: 3, duration: 45, hoverDuration: 15, opacity: 0.7, hoverOpacity: 1 },
];

function buildStars(count: number, seed: number) {
  return Array.from({ length: count }, (_, i) => {
    const x = (i * 47 + seed * 13) % 100;
    const y = (i * 61 + seed * 29) % 100;
    const size = i % 6 === 0 ? 2.5 : i % 3 === 0 ? 1.5 : 1;
    const cyan = i % 4 === 0;
    return { x, y, size, cyan, twinkleDelay: (i % 12) * 0.4 };
  });
}

const starLayers = LAYERS.map((layer) => ({
  ...layer,
  stars: buildStars(layer.count, layer.seed),
}));

export default function HeroGalaxyStars() {
  return (
    <div className="hero-galaxy-stars pointer-events-none absolute inset-0 z-[1] overflow-hidden" aria-hidden>
      {starLayers.map((layer, layerIndex) => (
        <div
          key={layer.seed}
          className="hero-galaxy-stars__layer"
          style={
            {
              '--layer-duration': `${layer.duration}s`,
              '--layer-hover-duration': `${layer.hoverDuration}s`,
              '--layer-opacity': layer.opacity,
              '--layer-hover-opacity': layer.hoverOpacity,
              '--layer-index': layerIndex,
            } as CSSProperties
          }
        >
          {layer.stars.map((star, i) => (
            <span
              key={i}
              className={`hero-galaxy-stars__star ${star.cyan ? 'hero-galaxy-stars__star--cyan' : ''}`}
              style={{
                left: `${star.x}%`,
                top: `${star.y}%`,
                width: star.size,
                height: star.size,
                animationDelay: `${star.twinkleDelay}s`,
              }}
            />
          ))}
        </div>
      ))}
      <div className="hero-galaxy-stars__nebula" />
    </div>
  );
}
