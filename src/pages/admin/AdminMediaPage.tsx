import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Upload, Trash2, Image as ImageIcon } from 'lucide-react';
import { mediaApi } from '../../services/api';
import { resolveMediaUrl } from '../../utils/mediaUrl';
import { PageHeader, AdminCard, LoadingState, EmptyState } from '../../components/admin/shared';
import { ChartPanel, KpiGrid, LiveDoughnut, countsFrom } from '../../components/admin/charts';

interface MediaItem {
  id: number;
  filename: string;
  original_name?: string;
  file_path: string;
  file_type: string;
  file_size?: number;
  created_at: string;
}

export default function AdminMediaPage() {
  const qc = useQueryClient();
  const [uploading, setUploading] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ['admin-media'],
    queryFn: () => mediaApi.getAll({ limit: '100' }),
  });

  const remove = useMutation({
    mutationFn: (id: number) => mediaApi.delete(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['admin-media'] }),
  });

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append('file', file);
      await mediaApi.upload(fd);
      qc.invalidateQueries({ queryKey: ['admin-media'] });
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  };

  const media: MediaItem[] = data?.data?.data || [];

  if (isLoading) return <LoadingState />;

  return (
    <div>
      <PageHeader
        title="Media Library"
        description="Live files from the API — types charted from records"
        action={
          <label className="btn-primary text-sm flex items-center gap-2 cursor-pointer">
            <Upload size={16} />
            {uploading ? 'Uploading...' : 'Upload File'}
            <input type="file" className="hidden" onChange={handleUpload} accept="image/*,video/*,.pdf,.doc,.docx" />
          </label>
        }
      />

      <KpiGrid
        items={[
          { label: 'Files', value: media.length },
          { label: 'Images', value: media.filter((m) => m.file_type === 'image').length },
          { label: 'Video', value: media.filter((m) => m.file_type === 'video').length },
          { label: 'Other', value: media.filter((m) => m.file_type !== 'image' && m.file_type !== 'video').length },
        ]}
      />
      <div className="mb-6 max-w-xl">
        <ChartPanel title="Library composition">
          <LiveDoughnut
            labels={countsFrom(media as unknown as Record<string, unknown>[], 'file_type').map((x) => x.label)}
            values={countsFrom(media as unknown as Record<string, unknown>[], 'file_type').map((x) => x.value)}
          />
        </ChartPanel>
      </div>

      {media.length === 0 ? (
        <AdminCard><EmptyState message="No media files yet. Upload your first file." /></AdminCard>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {media.map((m) => (
            <AdminCard key={m.id} className="overflow-hidden group">
              <div className="aspect-square bg-gray-100 flex items-center justify-center overflow-hidden">
                {m.file_type === 'image' ? (
                  <img src={resolveMediaUrl(m.file_path)} alt={m.original_name || m.filename} className="w-full h-full object-cover" />
                ) : (
                  <ImageIcon size={40} className="text-gray-300" />
                )}
              </div>
              <div className="p-3">
                <p className="text-xs font-medium truncate">{m.original_name || m.filename}</p>
                <p className="text-xs text-gray-400 capitalize mt-0.5">{m.file_type}</p>
                <div className="flex items-center justify-between mt-2">
                  <code className="text-[10px] text-gray-400 truncate flex-1">{m.file_path}</code>
                  <button
                    onClick={() => { if (confirm('Delete?')) remove.mutate(m.id); }}
                    className="p-1 hover:bg-red-50 rounded text-red-500 shrink-0 ml-1"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </AdminCard>
          ))}
        </div>
      )}
    </div>
  );
}
