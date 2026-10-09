import { useQuery } from '@tanstack/react-query';
import { siteContentApi } from '../services/api';
import { PAGE_FALLBACKS, type WebsitePageId, type SitePageCopy } from '../data/adminPages';
import type { ProductGalleryItem } from '../data/productGallery';
import { resolveMediaUrl } from '../utils/mediaUrl';

export interface SiteContentHero {
  badge: string;
  titleLine1: string;
  titleHighlight: string;
  titleAccent: string;
  description: string;
  ctaPrimary: string;
  ctaPrimaryHref: string;
  ctaSecondary: string;
  ctaSecondaryHref: string;
  videoUrl: string;
  videoUrl2?: string;
  posterUrl: string;
}

export interface SiteContent {
  hero: SiteContentHero;
  home: { aboutLabel: string; aboutTitle: string; aboutBody: string };
  contact: { headline: string; subheadline: string };
  pages?: Record<string, Partial<SitePageCopy>>;
  productGallery?: ProductGalleryItem[];
  assets: Record<string, string>;
}

export function useSiteContent() {
  return useQuery({
    queryKey: ['site-content'],
    queryFn: async () => {
      const res = await siteContentApi.getPublic();
      return res.data.data as SiteContent;
    },
    staleTime: 15_000,
    gcTime: 5 * 60 * 1000,
    retry: 1,
    refetchOnWindowFocus: true,
  });
}

export function useSiteAsset(key: string, fallback = ''): string {
  const { data } = useSiteContent();
  const fromAssets = data?.assets?.[key];
  if (fromAssets) return resolveMediaUrl(fromAssets);
  return fallback;
}

export function useCmsPage(pageId: WebsitePageId): SitePageCopy {
  const { data } = useSiteContent();
  const fallback = PAGE_FALLBACKS[pageId];
  const p = data?.pages?.[pageId];
  const assetBanner = data?.assets?.[`page.${pageId}.banner`];
  const contactTitle = pageId === 'contact' ? data?.contact?.headline : undefined;
  const contactSub = pageId === 'contact' ? data?.contact?.subheadline : undefined;
  return {
    label: p?.label || fallback.label,
    title: p?.title || contactTitle || fallback.title,
    subtitle: p?.subtitle || contactSub || fallback.subtitle,
    body: p?.body || '',
    bannerImage: resolveMediaUrl(p?.bannerImage || assetBanner || fallback.bannerImage),
  };
}
