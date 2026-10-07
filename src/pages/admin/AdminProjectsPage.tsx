import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { projectsApi } from '../../services/api';
import { PageHeader, AdminCard, Modal, FormField, inputClass, LoadingState, EmptyState, slugify } from '../../components/admin/shared';
import { ChartPanel, KpiGrid, LiveBar, LiveDoughnut, LivePolar, LiveRadar, countsFrom } from '../../components/admin/charts';

interface Project {
  id: number;
  title: string;
  slug: string;
  category?: string;
  short_description?: string;
  is_featured: number;
  is_active: number;
}

const empty = { title: '', slug: '', category: '', short_description: '', is_featured: 0, is_active: 1 };

export default function AdminProjectsPage() {
  const qc = useQueryClient();
  const [open, setOpen] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [form, setForm] = useState(empty);

  const { data, isLoading } = useQuery({
    queryKey: ['admin-projects'],
    queryFn: () => projectsApi.getAll({ limit: '100' }),
  });

  const save = useMutation({
    mutationFn: (payload: Record<string, unknown>) =>
      editId ? projectsApi.update(editId, payload) : projectsApi.create(payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['admin-projects'] });
      setOpen(false);
      setEditId(null);
      setForm(empty);
    },
  });

  const remove = useMutation({
    mutationFn: (id: number) => projectsApi.delete(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['admin-projects'] }),
  });

  const projects: Project[] = data?.data?.data || [];

  const openEdit = (p: Project) => {
    setEditId(p.id);
    setForm({
      title: p.title,
      slug: p.slug,
      category: p.category || '',
      short_description: p.short_description || '',
      is_featured: p.is_featured,
      is_active: p.is_active,
    });
    setOpen(true);
  };

  if (isLoading) return <LoadingState />;

  return (
    <div>
      <PageHeader
        title="Projects"
        description="Live portfolio inventory"
        action={
          <button onClick={() => { setEditId(null); setForm(empty); setOpen(true); }} className="btn-primary text-sm flex items-center gap-2">
            <Plus size={16} /> Add Project
          </button>
        }
      />

      <KpiGrid
        items={[
          { label: 'Total', value: projects.length },
          { label: 'Active', value: projects.filter((p) => p.is_active).length },
          { label: 'Featured', value: projects.filter((p) => p.is_featured).length },
          { label: 'Categories', value: new Set(projects.map((p) => p.category || 'Uncategorised')).size },
        ]}
      />
      <div className="grid md:grid-cols-2 gap-4 mb-6">
        <ChartPanel title="Category polar">
          <LivePolar
            labels={countsFrom(projects as unknown as Record<string, unknown>[], 'category').map((x) => x.label)}
            values={countsFrom(projects as unknown as Record<string, unknown>[], 'category').map((x) => x.value)}
          />
        </ChartPanel>
        <ChartPanel title="Featured doughnut">
          <LiveDoughnut
            labels={['Featured', 'Standard']}
            values={[projects.filter((p) => p.is_featured).length, projects.filter((p) => !p.is_featured).length]}
          />
        </ChartPanel>
        <ChartPanel title="Category bars">
          <LiveBar
            label="Projects"
            labels={countsFrom(projects as unknown as Record<string, unknown>[], 'category').map((x) => x.label)}
            values={countsFrom(projects as unknown as Record<string, unknown>[], 'category').map((x) => x.value)}
          />
        </ChartPanel>
        <ChartPanel title="Health radar">
          <LiveRadar
            label="Count"
            labels={['Total', 'Active', 'Featured', 'Inactive']}
            values={[
              projects.length,
              projects.filter((p) => p.is_active).length,
              projects.filter((p) => p.is_featured).length,
              projects.filter((p) => !p.is_active).length,
            ]}
          />
        </ChartPanel>
      </div>

      <AdminCard className="overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="text-left px-4 py-3 font-medium text-gray-600">Title</th>
              <th className="text-left px-4 py-3 font-medium text-gray-600">Category</th>
              <th className="text-left px-4 py-3 font-medium text-gray-600">Featured</th>
              <th className="text-right px-4 py-3 font-medium text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((p) => (
              <tr key={p.id} className="border-b border-gray-50 hover:bg-gray-50">
                <td className="px-4 py-3 font-medium">{p.title}</td>
                <td className="px-4 py-3 text-gray-500">{p.category || '—'}</td>
                <td className="px-4 py-3">{p.is_featured ? 'Yes' : 'No'}</td>
                <td className="px-4 py-3 text-right">
                  <button onClick={() => openEdit(p)} className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-600 inline-flex"><Pencil size={16} /></button>
                  <button onClick={() => { if (confirm('Delete?')) remove.mutate(p.id); }} className="p-1.5 hover:bg-red-50 rounded-lg text-red-500 inline-flex ml-1"><Trash2 size={16} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {projects.length === 0 && <EmptyState message="No projects yet" />}
      </AdminCard>

      <Modal open={open} onClose={() => setOpen(false)} title={editId ? 'Edit Project' : 'Add Project'} wide>
        <form onSubmit={(e) => { e.preventDefault(); save.mutate(form); }} className="space-y-4">
          <FormField label="Title" required>
            <input className={inputClass} value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value, slug: editId ? form.slug : slugify(e.target.value) })} required />
          </FormField>
          <FormField label="Slug" required>
            <input className={inputClass} value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} required />
          </FormField>
          <FormField label="Category">
            <input className={inputClass} value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} />
          </FormField>
          <FormField label="Short Description">
            <textarea className={inputClass} rows={3} value={form.short_description} onChange={(e) => setForm({ ...form, short_description: e.target.value })} />
          </FormField>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={!!form.is_featured} onChange={(e) => setForm({ ...form, is_featured: e.target.checked ? 1 : 0 })} />
            Featured
          </label>
          <div className="flex justify-end gap-3">
            <button type="button" onClick={() => setOpen(false)} className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg">Cancel</button>
            <button type="submit" disabled={save.isPending} className="btn-primary text-sm">{save.isPending ? 'Saving...' : 'Save'}</button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
