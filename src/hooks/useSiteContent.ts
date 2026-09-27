import { useQuery } from '@tanstack/react-query';
import { siteContentApi } from '../services/api';

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
  posterUrl: string;
}

export interface SiteContent {
  hero: SiteContentHero;
  home: { aboutLabel: string; aboutTitle: string; aboutBody: string };
  contact: { headline: string; subheadline: string };
  assets: Record<string, string>;
}

const STALE_MS = 10 * 60 * 1000;

export function useSiteContent() {
  return useQuery({
    queryKey: ['site-content'],
    queryFn: async () => {
      const res = await siteContentApi.getPublic();
      return res.data.data as SiteContent;
    },
    staleTime: STALE_MS,
    gcTime: STALE_MS * 2,
    retry: 1,
  });
}

export function useSiteAsset(key: string, fallback = ''): string {
  const { data } = useSiteContent();
  const fromAssets = data?.assets?.[key];
  if (fromAssets) return fromAssets;
  return fallback;
}
