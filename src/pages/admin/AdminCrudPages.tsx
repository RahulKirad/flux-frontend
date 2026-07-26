import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { PageHeader, AdminCard, Modal, FormField, inputClass, LoadingState, EmptyState, slugify } from '../../components/admin/shared';

type CrudApi = {
  getAll: () => Promise<{ data: { data: Record<string, unknown>[] } }>;
  create: (data: Record<string, unknown>) => Promise<unknown>;
  update: (id: number, data: Record<string, unknown>) => Promise<unknown>;
  delete: (id: number) => Promise<unknown>;
};

interface CrudPageProps {
  title: string;
  description: string;
  queryKey: string;
  apiClient: CrudApi;
  fields: { key: string; label: string; required?: boolean; textarea?: boolean }[];
  columns: { key: string; label: string }[];
}

export function CrudAdminPage({ title, description, queryKey, apiClient, fields, columns }: CrudPageProps) {
  const qc = useQueryClient();
  const [open, setOpen] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [form, setForm] = useState<Record<string, string>>({});

  const { data, isLoading } = useQuery({
    queryKey: [queryKey],
    queryFn: () => apiClient.getAll(),
  });

  const save = useMutation({
    mutationFn: (payload: Record<string, unknown>) =>
      editId ? apiClient.update(editId, payload) : apiClient.create(payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: [queryKey] });
      setOpen(false);
      setEditId(null);
      setForm({});
    },
  });

  const remove = useMutation({
    mutationFn: (id: number) => apiClient.delete(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: [queryKey] }),
  });

  const items = (data?.data?.data || []) as Record<string, unknown>[];

  const openEdit = (item: Record<string, unknown>) => {
    setEditId(item.id as number);
    const f: Record<string, string> = {};
    fields.forEach(({ key }) => { f[key] = String(item[key] ?? ''); });
    setForm(f);
    setOpen(true);
  };

  if (isLoading) return <LoadingState />;

  return (
    <div>
      <PageHeader
        title={title}
        description={description}
        action={
          <button onClick={() => { setEditId(null); setForm({}); setOpen(true); }} className="btn-primary text-sm flex items-center gap-2">
            <Plus size={16} /> Add New
          </button>
        }
      />
      <AdminCard className="overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b">
            <tr>
              {columns.map((c) => (
                <th key={c.key} className="text-left px-4 py-3 font-medium text-gray-600">{c.label}</th>
              ))}
              <th className="text-right px-4 py-3 font-medium text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id as number} className="border-b border-gray-50 hover:bg-gray-50">
                {columns.map((c) => (
                  <td key={c.key} className="px-4 py-3">{String(item[c.key] ?? '—').slice(0, 80)}</td>
                ))}
                <td className="px-4 py-3 text-right">
                  <button onClick={() => openEdit(item)} className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-600 inline-flex"><Pencil size={16} /></button>
                  <button onClick={() => { if (confirm('Delete?')) remove.mutate(item.id as number); }} className="p-1.5 hover:bg-red-50 rounded-lg text-red-500 inline-flex ml-1"><Trash2 size={16} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {items.length === 0 && <EmptyState message={`No ${title.toLowerCase()} yet`} />}
      </AdminCard>

      <Modal open={open} onClose={() => setOpen(false)} title={editId ? `Edit ${title}` : `Add ${title}`} wide>
        <form onSubmit={(e) => {
          e.preventDefault();
          const payload = { ...form };
          if (payload.title && !editId && !payload.slug) payload.slug = slugify(payload.title);
          save.mutate(payload);
        }} className="space-y-4">
          {fields.map((f) => (
            <FormField key={f.key} label={f.label} required={f.required}>
              {f.textarea ? (
                <textarea className={inputClass} rows={4} value={form[f.key] || ''} onChange={(e) => setForm({ ...form, [f.key]: e.target.value })} required={f.required} />
              ) : (
                <input className={inputClass} value={form[f.key] || ''} onChange={(e) => setForm({ ...form, [f.key]: f.key === 'title' && !editId ? e.target.value : e.target.value, ...(f.key === 'title' && !editId ? { slug: slugify(e.target.value) } : {}) })} required={f.required} />
              )}
            </FormField>
          ))}
          <div className="flex justify-end gap-3">
            <button type="button" onClick={() => setOpen(false)} className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg">Cancel</button>
            <button type="submit" disabled={save.isPending} className="btn-primary text-sm">{save.isPending ? 'Saving...' : 'Save'}</button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

// Pre-configured module pages
import { caseStudiesApi, certificationsApi, facilitiesApi, careersApi } from '../../services/api';

export function AdminCaseStudiesPage() {
  return (
    <CrudAdminPage
      title="Case Studies"
      description="Manage case studies and outcomes"
      queryKey="admin-case-studies"
      apiClient={caseStudiesApi}
      columns={[{ key: 'title', label: 'Title' }, { key: 'slug', label: 'Slug' }]}
      fields={[
        { key: 'title', label: 'Title', required: true },
        { key: 'slug', label: 'Slug', required: true },
        { key: 'challenge', label: 'Challenge', textarea: true },
        { key: 'solution', label: 'Solution', textarea: true },
        { key: 'outcome', label: 'Outcome', textarea: true },
      ]}
    />
  );
}

export function AdminCertificationsPage() {
  return (
    <CrudAdminPage
      title="Certifications"
      description="Manage quality certifications"
      queryKey="admin-certifications"
      apiClient={certificationsApi}
      columns={[{ key: 'title', label: 'Title' }, { key: 'category', label: 'Category' }, { key: 'issued_by', label: 'Issued By' }]}
      fields={[
        { key: 'title', label: 'Title', required: true },
        { key: 'slug', label: 'Slug', required: true },
        { key: 'category', label: 'Category', required: true },
        { key: 'description', label: 'Description', textarea: true },
        { key: 'issued_by', label: 'Issued By' },
      ]}
    />
  );
}

export function AdminFacilitiesPage() {
  return (
    <CrudAdminPage
      title="Facilities"
      description="Manage manufacturing plants"
      queryKey="admin-facilities"
      apiClient={facilitiesApi}
      columns={[{ key: 'name', label: 'Name' }, { key: 'location', label: 'Location' }]}
      fields={[
        { key: 'name', label: 'Name', required: true },
        { key: 'slug', label: 'Slug', required: true },
        { key: 'location', label: 'Location' },
        { key: 'address', label: 'Address', textarea: true },
        { key: 'description', label: 'Description', textarea: true },
      ]}
    />
  );
}

export function AdminCareersPage() {
  return (
    <CrudAdminPage
      title="Careers"
      description="Manage job openings"
      queryKey="admin-careers"
      apiClient={careersApi}
      columns={[{ key: 'title', label: 'Title' }, { key: 'department', label: 'Department' }, { key: 'location', label: 'Location' }]}
      fields={[
        { key: 'title', label: 'Title', required: true },
        { key: 'slug', label: 'Slug', required: true },
        { key: 'department', label: 'Department' },
        { key: 'location', label: 'Location' },
        { key: 'experience', label: 'Experience' },
        { key: 'description', label: 'Description', textarea: true },
        { key: 'requirements', label: 'Requirements', textarea: true },
      ]}
    />
  );
}
