import {
  busImage,
  electricVehiclesImage,
  engineeringDesignImage,
  engineeringImage,
  industrialEquipmentImage,
  prototypingImage,
  railwaysImage,
  toolsAndDieImage,
  toolsDieImage,
} from '../assets/images';
import { busFleet, designStudio, trainInterior } from '../assets/projects';
import type { Project } from '../types';

export type ProjectLayout = 'featured' | 'horizontal' | 'vertical' | 'tall' | 'compact';

export interface ProjectVisuals {
  banner: string;
  slides: string[];
  layout?: ProjectLayout;
}

export const PROJECT_VISUALS_BY_SLUG: Record<string, ProjectVisuals> = {
  'electric-bus-body-platform': {
    banner: busFleet,
    slides: [busFleet, busImage],
    layout: 'featured',
  },
  'railway-coach-interior-module': {
    banner: trainInterior,
    slides: [trainInterior, railwaysImage],
    layout: 'vertical',
  },
  'automotive-class-a-surfacing': {
    banner: designStudio,
    slides: [designStudio, engineeringDesignImage],
    layout: 'horizontal',
  },
  'industrial-conveyor-enclosure': {
    banner: industrialEquipmentImage,
    slides: [industrialEquipmentImage, engineeringImage],
    layout: 'tall',
  },
  'composite-tooling-ev-battery': {
    banner: toolsAndDieImage,
    slides: [toolsAndDieImage, toolsDieImage, prototypingImage],
    layout: 'compact',
  },
  'bus-body-lightweighting': {
    banner: busImage,
    slides: [busImage, busFleet],
    layout: 'horizontal',
  },
  'railway-coach-interiors': {
    banner: trainInterior,
    slides: [trainInterior, railwaysImage],
    layout: 'tall',
  },
  'ev-battery-enclosure': {
    banner: electricVehiclesImage,
    slides: [electricVehiclesImage, prototypingImage],
    layout: 'vertical',
  },
};

const LAYOUT_CYCLE: ProjectLayout[] = ['vertical', 'horizontal', 'tall', 'compact'];

export function getProjectVisuals(slug: string): ProjectVisuals | undefined {
  return PROJECT_VISUALS_BY_SLUG[slug];
}

export function getProjectLayout(
  slug: string,
  index: number,
  isFeatured?: boolean,
): ProjectLayout {
  const configured = PROJECT_VISUALS_BY_SLUG[slug]?.layout;
  if (configured) return configured;
  if (isFeatured) return 'featured';
  return LAYOUT_CYCLE[index % LAYOUT_CYCLE.length];
}

export function getStaticProjects(): Project[] {
  return [
    {
      id: 1,
      title: 'Electric Bus Body Platform',
      slug: 'electric-bus-body-platform',
      category: 'Bus Manufacturing',
      client_name: 'Leading EV OEM',
      short_description: 'Complete electric bus body design and manufacturing for urban transit.',
      challenge: 'Design a lightweight, crash-compliant bus body structure for electric platform with modular assembly.',
      solution: 'Developed composite-aluminium hybrid structure with integrated battery mounting and modular panel system.',
      results: '30% weight reduction, 15% improved energy efficiency, RDSO compliance achieved.',
      is_featured: true,
      banner: PROJECT_VISUALS_BY_SLUG['electric-bus-body-platform'].banner,
    },
    {
      id: 2,
      title: 'Railway Coach Interior Module',
      slug: 'railway-coach-interior-module',
      category: 'Railway',
      client_name: 'Indian Railways Partner',
      short_description: 'Modular interior systems for premium railway coaches.',
      challenge: 'Create fire-retardant, lightweight interior modules meeting RDSO fire safety standards.',
      solution: 'Engineered FRP composite panels with integrated HVAC ducting and modular fit-out system.',
      results: 'Reduced installation time by 40%, full RDSO certification obtained.',
      is_featured: true,
      banner: PROJECT_VISUALS_BY_SLUG['railway-coach-interior-module'].banner,
    },
    {
      id: 3,
      title: 'Automotive Class A Surfacing',
      slug: 'automotive-class-a-surfacing',
      category: 'Automotive Styling',
      client_name: 'Global Automotive OEM',
      short_description: 'Production-ready Class A surfaces for new SUV platform.',
      challenge: 'Deliver photorealistic Class A surfaces with 0.1mm tolerance for production tooling.',
      solution: 'Completed full exterior surfacing with VR validation and tooling-ready data delivery.',
      results: 'Tooling released 2 weeks ahead of schedule, zero rework required.',
      is_featured: true,
      banner: PROJECT_VISUALS_BY_SLUG['automotive-class-a-surfacing'].banner,
    },
    {
      id: 4,
      title: 'Industrial Conveyor Enclosure',
      slug: 'industrial-conveyor-enclosure',
      category: 'Industrial',
      client_name: 'Material Handling Corp',
      short_description: 'Custom enclosure system for automated conveyor line.',
      challenge: 'Design modular, maintainable enclosures for harsh industrial environment.',
      solution: 'Developed snap-fit composite panels with integrated access panels and cable management.',
      results: 'Installation time reduced by 50%, maintenance access improved significantly.',
      is_featured: false,
      banner: PROJECT_VISUALS_BY_SLUG['industrial-conveyor-enclosure'].banner,
    },
    {
      id: 5,
      title: 'Composite Tooling for EV Battery Tray',
      slug: 'composite-tooling-ev-battery',
      category: 'Tool & Die',
      client_name: 'EV Startup',
      short_description: 'Production tooling for composite battery enclosure.',
      challenge: 'Develop cost-effective tooling for high-volume composite battery tray production.',
      solution: 'Designed and built epoxy-aluminium hybrid tooling with 500+ cycle capability.',
      results: 'Tooling cost 35% below target, first article approved on first try.',
      is_featured: true,
      banner: PROJECT_VISUALS_BY_SLUG['composite-tooling-ev-battery'].banner,
    },
  ];
}

export function getStaticProjectBySlug(slug: string): Project | undefined {
  return getStaticProjects().find((project) => project.slug === slug);
}

export function enrichProject(project: Project): Project {
  const visuals = getProjectVisuals(project.slug);
  return {
    ...project,
    banner: project.banner || visuals?.banner,
  };
}

/** Assign unique slides per project from slug-specific visuals */
export function assignProjectCardSlides(
  projects: { id: number; slug: string; banner?: string | null }[],
): Map<number, string[]> {
  const map = new Map<number, string[]>();

  projects.forEach((project) => {
    const visuals = getProjectVisuals(project.slug);
    if (visuals?.slides.length) {
      map.set(project.id, visuals.slides);
      return;
    }

    const fallback = project.banner ? [project.banner] : [];
    map.set(project.id, fallback);
  });

  return map;
}
