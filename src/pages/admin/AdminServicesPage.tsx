import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { servicesApi } from '../../services/api';
import { PageHeader, AdminCard, Modal, FormField, inputClass, LoadingState, EmptyState, slugify } from '../../components/admin/shared';
import { ChartPanel, KpiGrid, LiveDoughnut, LiveBar, LiveRadar, LivePolar } from '../../components/admin/charts';

interface Service {
  id: number;
  title: string;
  slug: string;
  short_description?: string;
  is_active: number;
  is_featured: number;
  parent_id: number | null;
}

const empty = { title: '', slug: '', short_description: '', is_active: 1, is_featured: 0 };

export default function AdminServicesPage() {
  const qc = useQueryClient();
  const [open, setOpen] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [form, setForm] = useState(empty);

  const { data, isLoading } = useQuery({
    queryKey: ['admin-services'],
    queryFn: () => servicesApi.getAll(),
  });

  const save = useMutation({
    mutationFn: (payload: Record<string, unknown>) =>
      editId ? servicesApi.update(editId, payload) : servicesApi.create(payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['admin-services'] });
      setOpen(false);
      setEditId(null);
      setForm(empty);
    },
  });

  const remove = useMutation({
    mutationFn: (id: number) => servicesApi.delete(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['admin-services'] }),
  });

  const services: Service[] = data?.data?.data || [];

  const openCreate = () => {
    setEditId(null);
    setForm(empty);
    setOpen(true);
  };

  const openEdit = (s: Service) => {
    setEditId(s.id);
    setForm({
      title: s.title,
      slug: s.slug,
      short_description: s.short_description || '',
      is_active: s.is_active,
      is_featured: s.is_featured,
    });
    setOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    save.mutate(form);
  };

  if (isLoading) return <LoadingState />;

  return (
    <div>
      <PageHeader
        title="Services"
        description="Live catalogue — charts reflect current API records"
        action={
          <button onClick={openCreate} className="btn-primary text-sm flex items-center gap-2">
            <Plus size={16} /> Add Service
          </button>
        }
      />

      <KpiGrid
        items={[
          { label: 'Total', value: services.length },
          { label: 'Main', value: services.filter((s) => !s.parent_id).length },
          { label: 'Sub-services', value: services.filter((s) => !!s.parent_id).length },
          { label: 'Featured', value: services.filter((s) => s.is_featured).length },
        ]}
      />
      <div className="grid md:grid-cols-2 gap-4 mb-6">
        <ChartPanel title="Catalogue doughnut" subtitle="Active vs inactive">
          <LiveDoughnut
            labels={['Active', 'Inactive']}
            values={[services.filter((s) => s.is_active).length, services.filter((s) => !s.is_active).length]}
          />
        </ChartPanel>
        <ChartPanel title="Structure bars" subtitle="Main, sub, featured">
          <LiveBar
            label="Services"
            labels={['Main', 'Sub-service', 'Featured']}
            values={[
              services.filter((s) => !s.parent_id).length,
              services.filter((s) => !!s.parent_id).length,
              services.filter((s) => s.is_featured).length,
            ]}
          />
        </ChartPanel>
        <ChartPanel title="Inventory radar">
          <LiveRadar
            label="Count"
            labels={['Main', 'Sub', 'Featured', 'Inactive']}
            values={[
              services.filter((s) => !s.parent_id).length,
              services.filter((s) => !!s.parent_id).length,
              services.filter((s) => s.is_featured).length,
              services.filter((s) => !s.is_active).length,
            ]}
          />
        </ChartPanel>
        <ChartPanel title="Featured polar">
          <LivePolar
            labels={['Featured', 'Standard']}
            values={[services.filter((s) => s.is_featured).length, services.filter((s) => !s.is_featured).length]}
          />
        </ChartPanel>
      </div>

      <AdminCard className="overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="text-left px-4 py-3 font-medium text-gray-600">Title</th>
              <th className="text-left px-4 py-3 font-medium text-gray-600">Slug</th>
              <th className="text-left px-4 py-3 font-medium text-gray-600">Type</th>
              <th className="text-left px-4 py-3 font-medium text-gray-600">Status</th>
              <th className="text-right px-4 py-3 font-medium text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {services.map((s) => (
              <tr key={s.id} className="border-b border-gray-50 hover:bg-gray-50">
                <td className="px-4 py-3 font-medium">{s.title}</td>
                <td className="px-4 py-3 text-gray-500">{s.slug}</td>
                <td className="px-4 py-3">{s.parent_id ? 'Sub-service' : 'Main'}</td>
                <td className="px-4 py-3">
                  <span className={`text-xs px-2 py-1 rounded-full ${s.is_active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                    {s.is_active ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <button onClick={() => openEdit(s)} className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-600 inline-flex">
                    <Pencil size={16} />
                  </button>
                  <button
                    onClick={() => { if (confirm('Delete this service?')) remove.mutate(s.id); }}
                    className="p-1.5 hover:bg-red-50 rounded-lg text-red-500 inline-flex ml-1"
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {services.length === 0 && <EmptyState message="No services yet" />}
      </AdminCard>

      <Modal open={open} onClose={() => setOpen(false)} title={editId ? 'Edit Service' : 'Add Service'} wide>
        <form onSubmit={handleSubmit} className="space-y-4">
          <FormField label="Title" required>
            <input
              className={inputClass}
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value, slug: editId ? form.slug : slugify(e.target.value) })}
              required
            />
          </FormField>
          <FormField label="Slug" required>
            <input className={inputClass} value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} required />
          </FormField>
          <FormField label="Short Description">
            <textarea className={inputClass} rows={3} value={form.short_description} onChange={(e) => setForm({ ...form, short_description: e.target.value })} />
          </FormField>
          <div className="flex gap-4">
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={!!form.is_active} onChange={(e) => setForm({ ...form, is_active: e.target.checked ? 1 : 0 })} />
              Active
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={!!form.is_featured} onChange={(e) => setForm({ ...form, is_featured: e.target.checked ? 1 : 0 })} />
              Featured
            </label>
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={() => setOpen(false)} className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg">Cancel</button>
            <button type="submit" disabled={save.isPending} className="btn-primary text-sm disabled:opacity-50">
              {save.isPending ? 'Saving...' : 'Save'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
