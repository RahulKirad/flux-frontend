import { Link } from 'react-router-dom';
import { AnimatedSection } from './index';
import ProjectCardSlideshow from './ProjectCardSlideshow';
import type { ProjectLayout } from '../../data/projectsContent';

interface ProjectGridCardProps {
  to: string;
  title: string;
  category: string;
  description: string;
  images: string[];
  layout: ProjectLayout;
  imagePosition?: 'left' | 'right';
  delay?: number;
}

const GRID_SPAN: Record<ProjectLayout, string> = {
  featured: 'col-span-12 lg:col-span-8',
  horizontal: 'col-span-12 lg:col-span-6',
  vertical: 'col-span-12 sm:col-span-6 lg:col-span-4',
  tall: 'col-span-12 sm:col-span-6 lg:col-span-4',
  compact: 'col-span-12 sm:col-span-6 lg:col-span-4',
};

const IMAGE_HEIGHT: Record<ProjectLayout, string> = {
  featured: 'h-56 md:h-72',
  horizontal: 'h-48 md:h-full md:min-h-[220px]',
  vertical: 'h-48',
  tall: 'h-72',
  compact: 'h-40',
};

function CardBody({ category, title, description, compact }: {
  category: string;
  title: string;
  description: string;
  compact?: boolean;
}) {
  return (
    <div className={compact ? 'p-5' : 'p-6'}>
      <span className="stitch-label">{category}</span>
      <h3 className={`font-semibold uppercase text-kinetic-primary mt-2 mb-2 ${compact ? 'text-base' : 'text-lg'}`}>
        {title}
      </h3>
      <p className={`text-kinetic-on-surface-variant ${compact ? 'text-xs line-clamp-2' : 'text-sm line-clamp-3'}`}>
        {description}
      </p>
    </div>
  );
}

export default function ProjectGridCard({
  to,
  title,
  category,
  description,
  images,
  layout,
  imagePosition = 'left',
  delay = 0,
}: ProjectGridCardProps) {
  const spanClass = GRID_SPAN[layout];
  const imageClass = IMAGE_HEIGHT[layout];
  const isWide = layout === 'featured' || layout === 'horizontal';

  if (isWide) {
    const imageFirst = imagePosition === 'left';
    return (
      <AnimatedSection className={spanClass} delay={delay}>
        <Link
          to={to}
          className="group flex h-full flex-col overflow-hidden border border-kinetic-outline-variant bg-white transition hover:border-kinetic-primary md:flex-row"
        >
          <div
            className={`overflow-hidden ${imageClass} ${
              layout === 'featured' ? 'md:w-3/5' : 'md:w-1/2'
            } ${!imageFirst ? 'md:order-2' : ''}`}
          >
            <ProjectCardSlideshow images={images} alt={title} />
          </div>
          <div className={`flex flex-1 flex-col justify-center ${!imageFirst ? 'md:order-1' : ''}`}>
            <CardBody category={category} title={title} description={description} />
          </div>
        </Link>
      </AnimatedSection>
    );
  }

  return (
    <AnimatedSection className={spanClass} delay={delay}>
      <Link
        to={to}
        className="group block h-full overflow-hidden border border-kinetic-outline-variant bg-white transition hover:border-kinetic-primary"
      >
        <div className={`overflow-hidden ${imageClass}`}>
          <ProjectCardSlideshow images={images} alt={title} />
        </div>
        <CardBody
          category={category}
          title={title}
          description={description}
          compact={layout === 'compact'}
        />
      </Link>
    </AnimatedSection>
  );
}
