import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { CmsPageHero, SEOHead } from '../components/common';
import GalleryCoverflow from '../components/home/GalleryCoverflow';
import { productGalleryCardImages } from '../assets/Product gallery Cards';
import ImageSlideshow from '../components/common/ImageSlideshow';
import {
  PRODUCT_GALLERY_CATEGORIES,
  productGalleryItems,
  productSlides,
  type ProductGalleryItem,
} from '../data/productGallery';
import { resolveMediaUrl } from '../utils/mediaUrl';
import { useSiteContent } from '../hooks/useSiteContent';

type TileKind = 'poster' | 'photo' | 'caption' | 'darkSpec';

function tileFor(_item: ProductGalleryItem, index: number): { kind: TileKind; span: string } {
  const band = Math.floor(index / 6) % 2;
  const slot = index % 6;
  const fill = 'col-span-6 lg:col-span-3';

  if (band === 0) {
    switch (slot) {
      case 0:
        return { kind: 'poster', span: `${fill} row-span-3` };
      case 1:
        return { kind: 'photo', span: `${fill} row-span-2` };
      case 2:
        return { kind: 'caption', span: `${fill} row-span-2` };
      case 3:
        return { kind: 'darkSpec', span: `${fill} row-span-3` };
      case 4:
        return { kind: 'photo', span: 'col-span-3 lg:col-span-3 row-span-1' };
      default:
        return { kind: 'photo', span: 'col-span-3 lg:col-span-3 row-span-1' };
    }
  }

  switch (slot) {
    case 0:
      return { kind: 'photo', span: 'col-span-6 row-span-2 lg:col-span-6' };
    case 1:
      return { kind: 'poster', span: `${fill} row-span-2` };
    case 2:
      return { kind: 'caption', span: `${fill} row-span-2` };
    case 3:
      return { kind: 'darkSpec', span: `${fill} row-span-2` };
    case 4:
      return { kind: 'photo', span: `${fill} row-span-2` };
    default:
      return { kind: 'caption', span: 'col-span-6 row-span-2 lg:col-span-6' };
  }
}

export default function ProductGalleryPage() {
  const { data: site } = useSiteContent();
  const [category, setCategory] = useState('All');
  const [activeId, setActiveId] = useState<string | null>(null);

  const catalog = useMemo(() => {
    const extras = (site?.productGallery || [])
      .filter((item) => item.image && !productGalleryItems.some((base) => base.id === item.id))
      .map((item) => ({ ...item, image: resolveMediaUrl(item.image) }));
    return [...productGalleryItems, ...extras];
  }, [site?.productGallery]);

  const categories = useMemo(() => {
    const fromData = Array.from(new Set(catalog.map((item) => item.category)));
    const ordered = PRODUCT_GALLERY_CATEGORIES.filter((name) => fromData.includes(name));
    const rest = fromData.filter((name) => !ordered.includes(name as (typeof PRODUCT_GALLERY_CATEGORIES)[number]));
    return ['All', ...ordered, ...rest];
  }, [catalog]);

  const visible = category === 'All' ? catalog : catalog.filter((item) => item.category === category);
  const activeIndex = visible.findIndex((item) => item.id === activeId);
  const active = activeIndex >= 0 ? visible[activeIndex] : null;

  useEffect(() => {
    document.body.style.overflow = active ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [active]);

  useEffect(() => {
    if (!active) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setActiveId(null);
      if (event.key === 'ArrowRight') setActiveId(visible[(activeIndex + 1) % visible.length].id);
      if (event.key === 'ArrowLeft') setActiveId(visible[(activeIndex - 1 + visible.length) % visible.length].id);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [active, activeIndex, visible]);

  return (
    <>
      <SEOHead
        title="Product Gallery | Flux Corporation"
        description="Product specifications, materials, and compliance details for Flux Corporation bus body, railway, tooling, prototyping, and industrial work."
      />
      <CmsPageHero
        pageId="product-gallery"
        aside={
          <GalleryCoverflow
            items={productGalleryCardImages.map((image, index) => {
              const product = catalog[index % Math.max(catalog.length, 1)];
              return {
                id: product?.id ?? `card-${index}`,
                images: [image],
                title: product?.title ?? '',
              };
            })}
            onSelect={setActiveId}
          />
        }
      />

      <section className="bg-[#0c0c0c] text-white">
        <div className="max-w-[1600px] mx-auto px-3 sm:px-4 py-8 lg:py-10">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-6 px-1">
            <div>
              <p className="text-[10px] uppercase tracking-[0.28em] text-white/50 mb-2">Product gallery</p>
              <h2 className="text-2xl lg:text-3xl font-bold uppercase tracking-tight">Catalogue</h2>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {categories.map((name) => (
                <button
                  key={name}
                  type="button"
                  onClick={() => setCategory(name)}
                  className={`px-3 py-1.5 text-[10px] uppercase tracking-[0.16em] transition ${
                    category === name ? 'bg-white text-black' : 'text-white/55 hover:text-white border border-white/15'
                  }`}
                >
                  {name}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-6 lg:grid-cols-12 grid-flow-dense auto-rows-[92px] md:auto-rows-[104px] lg:auto-rows-[112px] gap-1.5 md:gap-2">
            {visible.map((item, index) => {
              const { kind, span } = tileFor(item, index);
              return (
                <MosaicTile
                  key={item.id}
                  item={item}
                  kind={kind}
                  span={span}
                  onOpen={() => setActiveId(item.id)}
                />
              );
            })}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {active && (
          <motion.div
            className="fixed inset-0 z-[80] bg-black/80 flex items-end lg:items-center justify-center p-0 lg:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveId(null)}
          >
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 32 }}
              className="bg-white w-full max-w-6xl max-h-[94vh] overflow-y-auto relative text-kinetic-primary"
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                aria-label="Close specifications"
                className="absolute top-4 right-4 z-10 p-2 bg-white/90 border border-kinetic-outline-variant hover:border-kinetic-primary"
                onClick={() => setActiveId(null)}
              >
                <X size={20} />
              </button>
              <button
                type="button"
                aria-label="Previous product"
                className="hidden lg:flex absolute left-3 top-1/2 -translate-y-1/2 z-10 p-2 border border-kinetic-outline-variant bg-white"
                onClick={() => setActiveId(visible[(activeIndex - 1 + visible.length) % visible.length].id)}
              >
                <ChevronLeft size={22} />
              </button>
              <button
                type="button"
                aria-label="Next product"
                className="hidden lg:flex absolute right-3 top-1/2 -translate-y-1/2 z-10 p-2 border border-kinetic-outline-variant bg-white"
                onClick={() => setActiveId(visible[(activeIndex + 1) % visible.length].id)}
              >
                <ChevronRight size={22} />
              </button>

              <div className="grid lg:grid-cols-2">
                <div className="relative min-h-[280px] lg:min-h-[640px] bg-[#101820] overflow-hidden">
                  <ImageSlideshow
                    images={productSlides(active)}
                    alt={active.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
                <div className="p-6 lg:p-10">
                  <p className="text-[10px] uppercase tracking-[0.22em] text-kinetic-secondary mb-2">
                    {active.category}
                    {active.code ? ` · ${active.code}` : ''}
                  </p>
                  <h3 className="text-2xl lg:text-3xl font-bold uppercase text-kinetic-primary leading-tight mb-4">{active.title}</h3>
                  <p className="text-kinetic-on-surface-variant leading-relaxed mb-6">{active.overview || active.caption}</p>

                  {active.highlights && active.highlights.length > 0 && (
                    <div className="mb-8">
                      <p className="text-[10px] uppercase tracking-[0.2em] text-kinetic-primary font-semibold mb-3">Highlights</p>
                      <ul className="flex flex-wrap gap-2">
                        {active.highlights.map((tag) => (
                          <li key={tag} className="text-[11px] uppercase tracking-widest border border-kinetic-primary text-kinetic-primary px-3 py-1.5">
                            {tag}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {active.specs && active.specs.length > 0 && (
                    <div className="mb-8">
                      <p className="text-[10px] uppercase tracking-[0.2em] text-kinetic-primary font-semibold mb-3">Specifications</p>
                      <dl className="divide-y divide-kinetic-outline-variant border-y border-kinetic-outline-variant">
                        {active.specs.map((spec) => (
                          <div key={spec.label} className="grid grid-cols-5 gap-3 py-3 text-sm">
                            <dt className="col-span-2 text-kinetic-secondary">{spec.label}</dt>
                            <dd className="col-span-3 text-kinetic-primary font-medium">{spec.value}</dd>
                          </div>
                        ))}
                      </dl>
                    </div>
                  )}

                  <div className="grid sm:grid-cols-2 gap-6 mb-8">
                    {active.materials && active.materials.length > 0 && (
                      <SpecList title="Materials" items={active.materials} />
                    )}
                    {active.applications && active.applications.length > 0 && (
                      <SpecList title="Applications" items={active.applications} />
                    )}
                  </div>

                  {active.compliance && active.compliance.length > 0 && (
                    <div className="mb-8">
                      <SpecList title="Compliance" items={active.compliance} />
                    </div>
                  )}

                  <Link to="/contact" className="stitch-btn-primary inline-flex">
                    Request this product <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function MosaicTile({
  item,
  kind,
  span,
  onOpen,
}: {
  item: ProductGalleryItem;
  kind: TileKind;
  span: string;
  onOpen: () => void;
}) {
  const specs = item.specs?.slice(0, 4) ?? [];

  if (kind === 'poster') {
    return (
      <button type="button" onClick={onOpen} className={`${span} group bg-[#f4efe6] text-[#111] text-left p-3 md:p-5 overflow-hidden flex flex-col min-h-0`}>
        <p className="text-[8px] md:text-[9px] uppercase tracking-[0.28em] text-[#111]/45 mb-2 shrink-0">
          {item.category}
          {item.code ? `  ·  ${item.code}` : ''}
        </p>
        <h3 className="font-serif text-[1.15rem] md:text-[1.65rem] leading-[0.95] tracking-tight mb-2">{item.title}</h3>
        <p className="text-[10px] md:text-[11px] leading-relaxed text-[#111]/70 line-clamp-4 mb-auto">{item.overview || item.caption}</p>
        {specs.length > 0 && (
          <dl className="mt-3 space-y-1 border-t border-black/10 pt-2 shrink-0">
            {specs.slice(0, 3).map((spec) => (
              <div key={spec.label} className="grid grid-cols-[auto_1fr] gap-x-3 text-[9px] md:text-[10px] uppercase tracking-wider">
                <dt className="text-[#111]/45 whitespace-nowrap">{spec.label}</dt>
                <dd className="text-right font-medium truncate">{spec.value}</dd>
              </div>
            ))}
          </dl>
        )}
      </button>
    );
  }

  if (kind === 'darkSpec') {
    return (
      <button type="button" onClick={onOpen} className={`${span} group bg-[#151515] text-white text-left p-4 md:p-5 overflow-hidden flex flex-col border border-white/5`}>
        <p className="text-[9px] uppercase tracking-[0.28em] text-white/40 mb-2">{item.category}</p>
        <h3 className="text-lg md:text-xl font-semibold uppercase leading-tight tracking-tight mb-3">{item.title}</h3>
        {item.highlights && (
          <ul className="flex flex-wrap gap-1.5 mb-3">
            {item.highlights.slice(0, 3).map((tag) => (
              <li key={tag} className="text-[9px] uppercase tracking-widest border border-white/20 px-2 py-0.5">
                {tag}
              </li>
            ))}
          </ul>
        )}
        {specs.length > 0 && (
          <dl className="mt-auto space-y-1.5">
            {specs.map((spec) => (
              <div key={spec.label} className="flex justify-between gap-3 text-[10px] uppercase tracking-wider">
                <dt className="text-white/40">{spec.label}</dt>
                <dd className="text-right">{spec.value}</dd>
              </div>
            ))}
          </dl>
        )}
      </button>
    );
  }

  if (kind === 'caption') {
    return (
      <button type="button" onClick={onOpen} className={`${span} group relative overflow-hidden bg-[#1a1a1a] text-left`}>
        <ImageSlideshow images={productSlides(item)} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition duration-700" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <p className="text-[9px] uppercase tracking-[0.24em] text-white/60 mb-1">{item.category}</p>
          <h3 className="text-sm md:text-base font-semibold uppercase leading-tight">{item.title}</h3>
        </div>
      </button>
    );
  }

  return (
    <button type="button" onClick={onOpen} className={`${span} group relative overflow-hidden bg-[#1a1a1a]`}>
      <ImageSlideshow images={productSlides(item)} alt={item.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition duration-700" />
      {item.code && (
        <span className="absolute top-3 left-3 text-[9px] uppercase tracking-[0.22em] text-white/80">{item.code}</span>
      )}
    </button>
  );
}

function SpecList({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <p className="text-[10px] uppercase tracking-[0.2em] text-kinetic-primary font-semibold mb-3">{title}</p>
      <ul className="space-y-1.5">
        {items.map((item) => (
          <li key={item} className="text-sm text-kinetic-on-surface-variant pl-3 border-l border-kinetic-outline-variant">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
