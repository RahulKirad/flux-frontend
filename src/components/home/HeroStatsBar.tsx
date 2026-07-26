interface HeroStatsBarProps {
  stats: {
    projects?: string;
    clients?: string;
    years?: string;
    engineers?: string;
  };
  shadow?: boolean;
}

export default function HeroStatsBar({ stats, shadow = false }: HeroStatsBarProps) {
  const items = [
    { value: stats.projects || '500+', label: 'Projects Delivered' },
    { value: stats.clients || '150+', label: 'Happy Clients' },
    { value: stats.years || '15+', label: 'Years Experience' },
    { value: stats.engineers || '200+', label: 'Expert Engineers' },
  ];

  return (
    <div className={`hero-banner-patch ${shadow ? 'hero-banner-patch--shadow-solid' : ''}`}>
      <div className="stitch-container-home py-6 sm:py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {items.map((stat) => (
            <div key={stat.label} className="text-center md:text-left">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-1">{stat.value}</div>
              <div className="text-xs font-semibold uppercase tracking-widest text-white/60">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
