import { electricVehiclesImage, railwaysImage, toolsDieImage } from '../assets/images';

/** Shared image pool for project card slideshows — no duplicates within a card */
export const PROJECT_IMAGE_POOL = [
  electricVehiclesImage,
  railwaysImage,
  toolsDieImage,
  'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&q=80',
  'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&q=80',
  'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&q=80',
  'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&q=80',
  'https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=800&q=80',
  'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&q=80',
  'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80',
  'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&q=80',
  'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80',
  'https://images.unsplash.com/photo-1565193566174-7e446e610093?w=800&q=80',
  'https://images.unsplash.com/photo-1474487548417-934cb8732a2d?w=800&q=80',
  'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80',
] as const;

const CATEGORY_IMAGES: Record<string, string> = {
  'Bus Manufacturing': 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&q=80',
  Railway: railwaysImage,
  'Automotive Styling': 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&q=80',
  Industrial: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&q=80',
  'Tool & Die': toolsDieImage,
};

const SLIDES_PER_CARD = 3;

function rotatePool(startIndex: number): string[] {
  const pool = [...PROJECT_IMAGE_POOL];
  const offset = ((startIndex % pool.length) + pool.length) % pool.length;
  return [...pool.slice(offset), ...pool.slice(0, offset)];
}

/** Assign 3 unique slides per project; spread images across the grid to avoid repetition */
export function assignProjectCardSlides(
  projects: { id: number; category?: string | null; banner?: string | null }[],
): Map<number, string[]> {
  const map = new Map<number, string[]>();
  const globallyUsed: string[] = [];

  projects.forEach((project, index) => {
    const slides: string[] = [];
    const primary = project.banner ?? (project.category ? CATEGORY_IMAGES[project.category] : undefined);

    if (primary) {
      slides.push(primary);
      globallyUsed.push(primary);
    }

    const candidates = rotatePool(project.id + index * 5);

    for (const img of candidates) {
      if (slides.length >= SLIDES_PER_CARD) break;
      if (slides.includes(img)) continue;
      if (globallyUsed.includes(img) && globallyUsed.length < PROJECT_IMAGE_POOL.length - SLIDES_PER_CARD) {
        continue;
      }
      slides.push(img);
      globallyUsed.push(img);
    }

    for (const img of PROJECT_IMAGE_POOL) {
      if (slides.length >= SLIDES_PER_CARD) break;
      if (!slides.includes(img)) slides.push(img);
    }

    map.set(project.id, slides.slice(0, SLIDES_PER_CARD));
  });

  return map;
}
