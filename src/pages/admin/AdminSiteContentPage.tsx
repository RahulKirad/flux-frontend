import { useEffect, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Save, Upload, Film } from 'lucide-react';
import { mediaApi, siteContentApi } from '../../services/api';
import type { SiteContent } from '../../hooks/useSiteContent';
import { PageHeader, AdminCard, FormField, inputClass, LoadingState } from '../../components/admin/shared';
import { resolveMediaUrl } from '../../utils/mediaUrl';

const ASSET_KEYS = [
  { key: 'hero.video', label: 'Hero background video' },
  { key: 'hero.poster', label: 'Hero video poster image' },
  { key: 'home.about.image', label: 'Home — about section image' },
  { key: 'page.about.banner', label: 'About page banner' },
  { key: 'industry.automotive.image', label: 'Industry — Automotive' },
  { key: 'industry.commercial-vehicles.image', label: 'Industry — Commercial vehicles' },
  { key: 'industry.electric-vehicles.image', label: 'Industry — Electric vehicles' },
  { key: 'industry.railways.image', label: 'Industry — Railways' },
  { key: 'industry.industrial-equipment.image', label: 'Industry — Industrial equipment' },
];

type Tab = 'hero' | 'home' | 'assets' | 'contact';

export default function AdminSiteContentPage() {
  const qc = useQueryClient();
  const [tab, setTab] = useState<Tab>('hero');
  const [form, setForm] = useState<SiteContent | null>(null);
  const [uploadingVideo, setUploadingVideo] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ['admin-site-content'],
    queryFn: () => siteContentApi.getAdmin(),
  });

  useEffect(() => {
    if (data?.data?.data) setForm(data.data.data as SiteContent);
  }, [data]);

  const save = useMutation({
    mutationFn: (payload: SiteContent) => siteContentApi.update(payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['admin-site-content'] });
      qc.invalidateQueries({ queryKey: ['site-content'] });
      alert('Site content saved. Changes appear on the public site within a few minutes (or immediately on refresh).');
    },
  });

  const handleVideoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !form) return;
    setUploadingVideo(true);
    try {
      const fd = new FormData();
      fd.append('file', file);
      const res = await mediaApi.upload(fd, 'videos');
      const path = res.data.data.file_path as string;
      setForm({
        ...form,
        hero: { ...form.hero, videoUrl: path },
        assets: { ...form.assets, 'hero.video': path },
      });
    } finally {
      setUploadingVideo(false);
      e.target.value = '';
    }
  };

  if (isLoading || !form) return <LoadingState />;

  const tabs: { id: Tab; label: string }[] = [
    { id: 'hero', label: 'Hero & video' },
    { id: 'home', label: 'Homepage' },
    { id: 'contact', label: 'Contact' },
    { id: 'assets', label: 'Images & media URLs' },
  ];

  const videoSrc = resolveMediaUrl(form.hero.videoUrl || form.assets['hero.video']);

  return (
    <div>
      <PageHeader
        title="Site content"
        description="Manage homepage hero, copy, banners, and media URLs used across the public site"
        action={
          <button
            type="button"
            onClick={() => save.mutate(form)}
            disabled={save.isPending}
            className="btn-primary text-sm flex items-center gap-2"
          >
            <Save size={16} /> {save.isPending ? 'Saving…' : 'Save all changes'}
          </button>
        }
      />

      <div className="flex flex-wrap gap-2 mb-6">
        {tabs.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(t.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
              tab === t.id ? 'bg-primary-600 text-white' : 'bg-white border border-gray-200 text-gray-600 hover:border-primary-300'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === 'hero' && (
        <div className="grid lg:grid-cols-2 gap-6">
          <AdminCard className="p-6 space-y-4">
            <FormField label="Badge text">
              <input className={inputClass} value={form.hero.badge} onChange={(e) => setForm({ ...form, hero: { ...form.hero, badge: e.target.value } })} />
            </FormField>
            <FormField label="Headline (line 1)">
              <input className={inputClass} value={form.hero.titleLine1} onChange={(e) => setForm({ ...form, hero: { ...form.hero, titleLine1: e.target.value } })} />
            </FormField>
            <FormField label="Headline (muted)">
              <input className={inputClass} value={form.hero.titleHighlight} onChange={(e) => setForm({ ...form, hero: { ...form.hero, titleHighlight: e.target.value } })} />
            </FormField>
            <FormField label="Headline (accent)">
              <input className={inputClass} value={form.hero.titleAccent} onChange={(e) => setForm({ ...form, hero: { ...form.hero, titleAccent: e.target.value } })} />
            </FormField>
            <FormField label="Description">
              <textarea className={inputClass} rows={4} value={form.hero.description} onChange={(e) => setForm({ ...form, hero: { ...form.hero, description: e.target.value } })} />
            </FormField>
            <div className="grid sm:grid-cols-2 gap-4">
              <FormField label="Primary CTA">
                <input className={inputClass} value={form.hero.ctaPrimary} onChange={(e) => setForm({ ...form, hero: { ...form.hero, ctaPrimary: e.target.value } })} />
              </FormField>
              <FormField label="Primary link">
                <input className={inputClass} value={form.hero.ctaPrimaryHref} onChange={(e) => setForm({ ...form, hero: { ...form.hero, ctaPrimaryHref: e.target.value } })} />
              </FormField>
            </div>
            <FormField label="Hero video URL (or upload below)">
              <input
                className={inputClass}
                value={form.hero.videoUrl}
                onChange={(e) =>
                  setForm({
                    ...form,
                    hero: { ...form.hero, videoUrl: e.target.value },
                    assets: { ...form.assets, 'hero.video': e.target.value },
                  })
                }
                placeholder="/uploads/videos/… or https://…"
              />
            </FormField>
            <label className="btn-primary text-sm inline-flex items-center gap-2 cursor-pointer w-fit">
              <Upload size={16} />
              {uploadingVideo ? 'Uploading…' : 'Upload hero video (MP4)'}
              <input type="file" className="hidden" accept="video/mp4,video/webm" onChange={handleVideoUpload} />
            </label>
            <p className="text-xs text-gray-500">Uploads go to Media → videos. Leave empty to use the built-in default video in the codebase.</p>
          </AdminCard>
          <AdminCard className="p-6">
            <p className="text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
              <Film size={18} /> Video preview
            </p>
            <div className="aspect-video bg-gray-900 rounded-lg overflow-hidden border">
              {videoSrc ? (
                <video src={videoSrc} controls muted className="w-full h-full object-cover" />
              ) : (
                <p className="text-gray-400 text-sm p-8 text-center">Using default bundled hero video on the live site</p>
              )}
            </div>
          </AdminCard>
        </div>
      )}

      {tab === 'home' && (
        <AdminCard className="p-6 space-y-4 max-w-2xl">
          <FormField label="About section label">
            <input className={inputClass} value={form.home.aboutLabel} onChange={(e) => setForm({ ...form, home: { ...form.home, aboutLabel: e.target.value } })} />
          </FormField>
          <FormField label="About section title">
            <input className={inputClass} value={form.home.aboutTitle} onChange={(e) => setForm({ ...form, home: { ...form.home, aboutTitle: e.target.value } })} />
          </FormField>
          <FormField label="About body (optional — leave blank to use default site copy)">
            <textarea className={inputClass} rows={6} value={form.home.aboutBody} onChange={(e) => setForm({ ...form, home: { ...form.home, aboutBody: e.target.value } })} />
          </FormField>
        </AdminCard>
      )}

      {tab === 'contact' && (
        <AdminCard className="p-6 space-y-4 max-w-2xl">
          <FormField label="Contact page headline">
            <input className={inputClass} value={form.contact.headline} onChange={(e) => setForm({ ...form, contact: { ...form.contact, headline: e.target.value } })} />
          </FormField>
          <FormField label="Contact page subheadline">
            <textarea className={inputClass} rows={3} value={form.contact.subheadline} onChange={(e) => setForm({ ...form, contact: { ...form.contact, subheadline: e.target.value } })} />
          </FormField>
        </AdminCard>
      )}

      {tab === 'assets' && (
        <AdminCard className="p-6 space-y-4">
          <p className="text-sm text-gray-600 mb-2">
            Paste paths from <strong>Media Library</strong> (e.g. <code className="text-xs bg-gray-100 px-1">/uploads/general/…</code>) or full URLs. These override default images on the homepage and key pages.
          </p>
          {ASSET_KEYS.map(({ key, label }) => (
            <FormField key={key} label={label}>
              <input
                className={inputClass}
                value={form.assets[key] || ''}
                onChange={(e) => setForm({ ...form, assets: { ...form.assets, [key]: e.target.value } })}
                placeholder="Leave empty for built-in default"
              />
            </FormField>
          ))}
        </AdminCard>
      )}
    </div>
  );
}
