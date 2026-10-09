import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ExternalLink, Save, Upload } from 'lucide-react';
import { mediaApi, siteContentApi } from '../../services/api';
import type { SiteContent, SiteContentHero } from '../../hooks/useSiteContent';
import { PAGE_FALLBACKS, WEBSITE_PAGES, type SitePageCopy, type WebsitePageId } from '../../data/adminPages';
import { PageHeader, AdminCard, FormField, inputClass, LoadingState } from '../../components/admin/shared';
import { resolveMediaUrl } from '../../utils/mediaUrl';

const INDUSTRY_ASSETS = [
  { key: 'industry.automotive.image', label: 'Automotive image' },
  { key: 'industry.commercial-vehicles.image', label: 'Commercial vehicles image' },
  { key: 'industry.electric-vehicles.image', label: 'Electric vehicles image' },
  { key: 'industry.railways.image', label: 'Railways image' },
  { key: 'industry.industrial-equipment.image', label: 'Industrial equipment image' },
];

function emptyHero(): SiteContentHero {
  return {
    badge: '',
    titleLine1: '',
    titleHighlight: '',
    titleAccent: '',
    description: '',
    ctaPrimary: '',
    ctaPrimaryHref: '/contact',
    ctaSecondary: '',
    ctaSecondaryHref: '/services',
    videoUrl: '',
    videoUrl2: '',
    posterUrl: '',
  };
}

export default function AdminWebsitePagesHub() {
  return (
    <div>
      <PageHeader
        title="Pages"
        description="Edit copy and images for every public page. Changes publish to the live site immediately after save."
      />
      <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {WEBSITE_PAGES.map((page) => (
          <Link
            key={page.id}
            to={`/admin/pages/${page.id}`}
            className="block bg-white rounded-xl border border-gray-200 p-5 hover:border-amber-400 hover:shadow-sm transition"
          >
            <p className="text-xs uppercase tracking-widest text-amber-700 font-semibold">{page.nav}</p>
            <p className="text-lg font-semibold text-slate-900 mt-1">{PAGE_FALLBACKS[page.id].title}</p>
            <p className="text-sm text-slate-500 mt-2 line-clamp-2">{PAGE_FALLBACKS[page.id].subtitle}</p>
            <p className="text-xs text-slate-400 mt-4">
              Related: {page.related.map((r) => r.label).join(' · ')}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export function AdminWebsitePageEditor() {
  const { pageId } = useParams();
  const navigate = useNavigate();
  const qc = useQueryClient();
  const meta = WEBSITE_PAGES.find((p) => p.id === pageId);
  const id = pageId as WebsitePageId | undefined;

  const [copy, setCopy] = useState<SitePageCopy>(PAGE_FALLBACKS.home);
  const [hero, setHero] = useState<SiteContentHero>(emptyHero());
  const [home, setHome] = useState({ aboutLabel: '', aboutTitle: '', aboutBody: '' });
  const [assets, setAssets] = useState<Record<string, string>>({});
  const [uploading, setUploading] = useState(false);
  const [previewTick, setPreviewTick] = useState(0);

  const { data, isLoading } = useQuery({
    queryKey: ['admin-site-content'],
    queryFn: () => siteContentApi.getAdmin(),
  });

  const site = data?.data?.data as SiteContent | undefined;

  useEffect(() => {
    if (!id || !site) return;
    const fallback = PAGE_FALLBACKS[id];
    const p = site.pages?.[id];
    setCopy({
      label: p?.label ?? fallback.label,
      title: p?.title ?? (id === 'contact' ? site.contact?.headline : undefined) ?? fallback.title,
      subtitle: p?.subtitle ?? (id === 'contact' ? site.contact?.subheadline : undefined) ?? fallback.subtitle,
      body: p?.body ?? '',
      bannerImage: p?.bannerImage || site.assets?.[`page.${id}.banner`] || '',
    });
    if (site.hero) setHero({ ...emptyHero(), ...site.hero });
    if (site.home) setHome({ aboutLabel: '', aboutTitle: '', aboutBody: '', ...site.home });
    if (site.assets) setAssets({ ...site.assets });
  }, [id, site]);

  const save = useMutation({
    mutationFn: async () => {
      if (!id) return;
      const payload: Record<string, unknown> = {
        pages: { [id]: copy },
        assets: {
          ...assets,
          [`page.${id}.banner`]: copy.bannerImage,
        },
      };
      if (id === 'home') {
        payload.hero = hero;
        payload.home = home;
      }
      if (id === 'contact') {
        payload.contact = { headline: copy.title, subheadline: copy.subtitle };
      }
      return siteContentApi.update(payload);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['admin-site-content'] });
      qc.invalidateQueries({ queryKey: ['site-content'] });
      setPreviewTick((n) => n + 1);
    },
  });

  const uploadImage = async (file: File, onPath: (path: string) => void) => {
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append('file', file);
      const res = await mediaApi.upload(fd, 'pages');
      onPath(res.data.data.file_path as string);
    } finally {
      setUploading(false);
    }
  };

  const publicPath = meta?.publicPath || '/';
  const previewSrc = `${window.location.origin}${publicPath}?cmsPreview=${previewTick}`;
  const bannerSrc = resolveMediaUrl(copy.bannerImage);

  const previewTitle = useMemo(() => {
    if (id === 'home') {
      return [hero.titleLine1, hero.titleHighlight, hero.titleAccent].filter(Boolean).join(' ');
    }
    return copy.title;
  }, [id, hero, copy.title]);

  if (!meta || !id) {
    return (
      <p className="text-sm text-slate-600">
        Unknown page.{' '}
        <button type="button" className="text-amber-700 underline" onClick={() => navigate('/admin/pages')}>
          Back to Pages
        </button>
      </p>
    );
  }

  if (isLoading) return <LoadingState />;

  return (
    <div>
      <PageHeader
        title={`${meta.nav} page`}
        description={`Public URL ${publicPath} · Saved copy and images appear on the live site (including Hostinger).`}
        action={
          <div className="flex flex-wrap gap-2">
            <a
              href={publicPath}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-200 bg-white text-sm"
            >
              <ExternalLink size={14} /> Open live page
            </a>
            <button
              type="button"
              onClick={() => save.mutate()}
              disabled={save.isPending}
              className="btn-primary text-sm flex items-center gap-2"
            >
              <Save size={16} /> {save.isPending ? 'Saving…' : 'Save & publish'}
            </button>
          </div>
        }
      />

      {meta.related.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          {meta.related.map((rel) => (
            <Link
              key={rel.to}
              to={rel.to}
              className="text-xs font-medium px-3 py-1.5 rounded-full bg-white border border-gray-200 text-slate-700 hover:border-amber-400"
            >
              {rel.label}
            </Link>
          ))}
        </div>
      )}

      {save.isSuccess && (
        <p className="text-sm text-emerald-700 bg-emerald-50 border border-emerald-100 rounded-lg px-3 py-2 mb-4">
          Published. Refresh the live page if the preview iframe still shows the previous version.
        </p>
      )}

      <div className="grid xl:grid-cols-2 gap-6">
        <div className="space-y-4">
          <AdminCard className="p-6 space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500">Page copy</h3>
            <FormField label="Eyebrow label">
              <input className={inputClass} value={copy.label} onChange={(e) => setCopy({ ...copy, label: e.target.value })} />
            </FormField>
            <FormField label="Headline">
              <input className={inputClass} value={copy.title} onChange={(e) => setCopy({ ...copy, title: e.target.value })} />
            </FormField>
            <FormField label="Subtitle">
              <textarea className={inputClass} rows={3} value={copy.subtitle} onChange={(e) => setCopy({ ...copy, subtitle: e.target.value })} />
            </FormField>
            <FormField label="Intro body (shown under the hero on the public page)">
              <textarea className={inputClass} rows={5} value={copy.body} onChange={(e) => setCopy({ ...copy, body: e.target.value })} />
            </FormField>
            <FormField label="Hero / banner image">
              <input
                className={inputClass}
                value={copy.bannerImage}
                onChange={(e) => setCopy({ ...copy, bannerImage: e.target.value })}
                placeholder="/uploads/pages/… or https://…"
              />
            </FormField>
            <label className="btn-primary text-sm inline-flex items-center gap-2 cursor-pointer w-fit">
              <Upload size={16} />
              {uploading ? 'Uploading…' : 'Upload image'}
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) void uploadImage(file, (path) => setCopy((c) => ({ ...c, bannerImage: path })));
                  e.target.value = '';
                }}
              />
            </label>
          </AdminCard>

          {id === 'home' && (
            <>
              <AdminCard className="p-6 space-y-4">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500">Homepage hero</h3>
                <FormField label="Badge">
                  <input className={inputClass} value={hero.badge} onChange={(e) => setHero({ ...hero, badge: e.target.value })} />
                </FormField>
                <FormField label="Title line 1">
                  <input className={inputClass} value={hero.titleLine1} onChange={(e) => setHero({ ...hero, titleLine1: e.target.value })} />
                </FormField>
                <FormField label="Title (muted)">
                  <input className={inputClass} value={hero.titleHighlight} onChange={(e) => setHero({ ...hero, titleHighlight: e.target.value })} />
                </FormField>
                <FormField label="Title (accent)">
                  <input className={inputClass} value={hero.titleAccent} onChange={(e) => setHero({ ...hero, titleAccent: e.target.value })} />
                </FormField>
                <FormField label="Hero description">
                  <textarea className={inputClass} rows={4} value={hero.description} onChange={(e) => setHero({ ...hero, description: e.target.value })} />
                </FormField>
                <FormField label="Hero video URL">
                  <input
                    className={inputClass}
                    value={hero.videoUrl}
                    onChange={(e) => setHero({ ...hero, videoUrl: e.target.value })}
                    placeholder="/uploads/videos/… or https://…"
                  />
                </FormField>
                <label className="btn-primary text-sm inline-flex items-center gap-2 cursor-pointer w-fit">
                  <Upload size={16} />
                  Upload hero video
                  <input
                    type="file"
                    className="hidden"
                    accept="video/mp4,video/webm"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        void uploadImage(file, (path) => {
                          setHero((h) => ({ ...h, videoUrl: path }));
                          setAssets((a) => ({ ...a, 'hero.video': path }));
                        });
                      }
                      e.target.value = '';
                    }}
                  />
                </label>
                <FormField label="Second banner video URL (plays after the first video ends)">
                  <input
                    className={inputClass}
                    value={hero.videoUrl2 || ''}
                    onChange={(e) =>
                      setHero({
                        ...hero,
                        videoUrl2: e.target.value,
                      })
                    }
                    placeholder="/uploads/videos/… or leave blank for the placeholder bus clip"
                  />
                </FormField>
                <label className="btn-primary text-sm inline-flex items-center gap-2 cursor-pointer w-fit">
                  <Upload size={16} />
                  Upload second banner video
                  <input
                    type="file"
                    className="hidden"
                    accept="video/mp4,video/webm"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        void uploadImage(file, (path) => {
                          setHero((h) => ({ ...h, videoUrl2: path }));
                          setAssets((a) => ({ ...a, 'hero.video2': path }));
                        });
                      }
                      e.target.value = '';
                    }}
                  />
                </label>
              </AdminCard>
              <AdminCard className="p-6 space-y-4">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500">Home about section</h3>
                <FormField label="About label">
                  <input className={inputClass} value={home.aboutLabel} onChange={(e) => setHome({ ...home, aboutLabel: e.target.value })} />
                </FormField>
                <FormField label="About title">
                  <input className={inputClass} value={home.aboutTitle} onChange={(e) => setHome({ ...home, aboutTitle: e.target.value })} />
                </FormField>
                <FormField label="About body">
                  <textarea className={inputClass} rows={5} value={home.aboutBody} onChange={(e) => setHome({ ...home, aboutBody: e.target.value })} />
                </FormField>
                <FormField label="About image">
                  <input
                    className={inputClass}
                    value={assets['home.about.image'] || ''}
                    onChange={(e) => setAssets({ ...assets, 'home.about.image': e.target.value })}
                  />
                </FormField>
                <label className="btn-primary text-sm inline-flex items-center gap-2 cursor-pointer w-fit">
                  <Upload size={16} />
                  Upload about image
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) void uploadImage(file, (path) => setAssets((a) => ({ ...a, 'home.about.image': path })));
                      e.target.value = '';
                    }}
                  />
                </label>
              </AdminCard>
            </>
          )}

          {id === 'industries' && (
            <AdminCard className="p-6 space-y-4">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500">Industry images (homepage + industries)</h3>
              {INDUSTRY_ASSETS.map(({ key, label }) => (
                <FormField key={key} label={label}>
                  <input
                    className={inputClass}
                    value={assets[key] || ''}
                    onChange={(e) => setAssets({ ...assets, [key]: e.target.value })}
                  />
                  <label className="mt-2 text-xs inline-flex items-center gap-1 cursor-pointer text-amber-800">
                    <Upload size={12} /> Upload
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) void uploadImage(file, (path) => setAssets((a) => ({ ...a, [key]: path })));
                        e.target.value = '';
                      }}
                    />
                  </label>
                  {assets[key] ? (
                    <img src={resolveMediaUrl(assets[key])} alt="" className="mt-2 h-20 w-32 object-cover rounded border" />
                  ) : null}
                </FormField>
              ))}
            </AdminCard>
          )}
        </div>

        <div className="space-y-4">
          <AdminCard className="p-6">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500 mb-3">On-page preview</h3>
            <div className="rounded-xl overflow-hidden border border-slate-800 bg-[#101820] min-h-[220px] relative">
              {bannerSrc ? <img src={bannerSrc} alt="" className="absolute inset-0 w-full h-full object-cover opacity-50" /> : null}
              <div className="relative p-8 text-white">
                <p className="text-[10px] uppercase tracking-[0.35em] text-white/60 mb-3">{copy.label}</p>
                <h2 className="text-2xl font-bold uppercase leading-tight">{previewTitle || copy.title}</h2>
                <p className="text-sm text-white/70 mt-3 max-w-md">{id === 'home' ? hero.description : copy.subtitle}</p>
              </div>
            </div>
            {bannerSrc ? (
              <img src={bannerSrc} alt="Banner" className="mt-3 w-full max-h-48 object-cover rounded-lg border" />
            ) : (
              <p className="text-xs text-slate-500 mt-3">No banner uploaded — the public page uses the default graphic background.</p>
            )}
            {id === 'home' && (hero.videoUrl || assets['hero.video']) ? (
              <video
                src={resolveMediaUrl(hero.videoUrl || assets['hero.video'])}
                controls
                muted
                className="mt-3 w-full rounded-lg border"
              />
            ) : null}
            {id === 'home' && (hero.videoUrl2 || assets['hero.video2']) ? (
              <video
                src={resolveMediaUrl(hero.videoUrl2 || assets['hero.video2'])}
                controls
                muted
                className="mt-3 w-full rounded-lg border"
              />
            ) : null}
          </AdminCard>

          <AdminCard className="p-0 overflow-hidden">
            <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500">Live site preview</h3>
              <span className="text-xs text-slate-400">{publicPath}</span>
            </div>
            <iframe
              key={previewTick}
              title={`${meta.nav} preview`}
              src={previewSrc}
              className="w-full h-[640px] bg-white"
            />
          </AdminCard>
        </div>
      </div>
    </div>
  );
}
