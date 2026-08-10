import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { AnimatedSection } from '../common';

export function PageSection({
  children,
  tone = 'white',
  className = '',
}: {
  children: React.ReactNode;
  tone?: 'white' | 'muted' | 'dark';
  className?: string;
}) {
  const bg =
    tone === 'muted'
      ? 'bg-kinetic-surface-low'
      : tone === 'dark'
        ? 'bg-kinetic-primary text-white'
        : 'bg-white';
  return (
    <section className={`stitch-section ${bg} ${className}`}>
      <div className="stitch-container">{children}</div>
    </section>
  );
}

export function ContentPanel({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`border border-kinetic-outline-variant bg-white p-8 lg:p-10 ${className}`}>
      {children}
    </div>
  );
}

export function BulletList({
  items,
  dark = false,
  centered = false,
}: {
  items: string[];
  dark?: boolean;
  centered?: boolean;
}) {
  return (
    <ul className={`space-y-3 ${centered ? 'max-w-2xl mx-auto' : ''}`}>
      {items.map((item) => (
        <li
          key={item}
          className={`flex gap-3 text-sm lg:text-base leading-relaxed ${
            centered ? 'justify-center text-center' : ''
          } ${dark ? 'text-white/80' : 'text-kinetic-on-surface-variant'}`}
        >
          <span className={`mt-2 w-1.5 h-1.5 shrink-0 ${dark ? 'bg-white' : 'bg-kinetic-primary'}`} />
          {item}
        </li>
      ))}
    </ul>
  );
}

export function ImageTextBlock({
  label,
  title,
  description,
  image,
  reverse = false,
  link,
}: {
  label?: string;
  title: string;
  description: string;
  image: string;
  reverse?: boolean;
  link?: { label: string; href: string };
}) {
  return (
    <AnimatedSection>
      <div
        className={`grid lg:grid-cols-2 gap-8 lg:gap-10 xl:gap-16 items-center ${reverse ? 'lg:[direction:rtl]' : ''}`}
      >
        <div className={`min-w-0 ${reverse ? 'lg:[direction:ltr]' : ''}`}>
          {label && <span className="stitch-label block mb-4">{label}</span>}
          <h2 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-kinetic-primary uppercase leading-tight mb-4 sm:mb-6 text-balance">
            {title}
          </h2>
          <p className="text-kinetic-on-surface-variant text-sm sm:text-base lg:text-lg leading-relaxed mb-6 sm:mb-8">
            {description}
          </p>
          {link && (
            <Link
              to={link.href}
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-kinetic-primary border-b border-kinetic-primary pb-1 hover:opacity-70 transition"
            >
              {link.label}
              <ChevronRight size={16} />
            </Link>
          )}
        </div>
        <div className={`relative min-h-[240px] sm:min-h-[280px] lg:min-h-[340px] xl:min-h-[400px] overflow-hidden border border-kinetic-outline-variant ${reverse ? 'lg:[direction:ltr]' : ''}`}>
          <img src={image} alt={title} className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
        </div>
      </div>
    </AnimatedSection>
  );
}

export function FeatureGrid({
  items,
}: {
  items: { title: string; description: string }[];
}) {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((item, i) => (
        <AnimatedSection key={item.title} delay={i * 0.05}>
          <ContentPanel className="h-full hover:border-kinetic-primary transition-colors">
            <h3 className="text-lg font-semibold uppercase text-kinetic-primary mb-3">{item.title}</h3>
            <p className="text-kinetic-on-surface-variant text-sm leading-relaxed">{item.description}</p>
          </ContentPanel>
        </AnimatedSection>
      ))}
    </div>
  );
}

export function StatStrip({ stats }: { stats: { label: string; value: string }[] }) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 border-y border-kinetic-outline-variant py-10">
      {stats.map((s) => (
        <div key={s.label} className="text-center lg:text-left">
          <p className="text-3xl lg:text-4xl font-bold text-kinetic-primary">{s.value}</p>
          <p className="stitch-label mt-2">{s.label}</p>
        </div>
      ))}
    </div>
  );
}
