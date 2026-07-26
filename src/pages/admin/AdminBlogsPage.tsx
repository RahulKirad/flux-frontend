import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { blogsApi } from '../../services/api';
import { PageHeader, AdminCard, Modal, FormField, inputClass, LoadingState, EmptyState, slugify } from '../../components/admin/shared';

interface Blog {
  id: number;
  title: string;
  slug: string;
  excerpt?: string;
  is_published: number;
  is_featured: number;
  category_name?: string;
}

const empty = { title: '', slug: '', excerpt: '', content: '', is_published: 0, is_featured: 0, category_id: 1 };

export default function AdminBlogsPage() {
  const qc = useQueryClient();
  const [open, setOpen] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [form, setForm] = useState(empty);

  const { data, isLoading } = useQuery({
    queryKey: ['admin-blogs'],
    queryFn: () => blogsApi.getAllAdmin(),
  });

  const { data: catData } = useQuery({
    queryKey: ['blog-categories'],
    queryFn: () => blogsApi.getCategories(),
  });

  const save = useMutation({
    mutationFn: (payload: Record<string, unknown>) =>
      editId ? blogsApi.update(editId, payload) : blogsApi.create(payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['admin-blogs'] });
      setOpen(false);
      setEditId(null);
      setForm(empty);
    },
  });

  const remove = useMutation({
    mutationFn: (id: number) => blogsApi.delete(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['admin-blogs'] }),
  });

  const blogs: Blog[] = data?.data?.data || [];
  const categories = catData?.data?.data || [];

  const openEdit = (b: Blog & { content?: string; category_id?: number }) => {
    setEditId(b.id);
    setForm({
      title: b.title,
      slug: b.slug,
      excerpt: b.excerpt || '',
      content: b.content || '',
      is_published: b.is_published,
      is_featured: b.is_featured,
      category_id: b.category_id || 1,
    });
    setOpen(true);
  };

  if (isLoading) return <LoadingState />;

  return (
    <div>
      <PageHeader
        title="Blog Posts"
        description="Create and publish blog articles"
        action={
          <button onClick={() => { setEditId(null); setForm(empty); setOpen(true); }} className="btn-primary text-sm flex items-center gap-2">
            <Plus size={16} /> New Post
          </button>
        }
      />

      <AdminCard className="overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="text-left px-4 py-3 font-medium text-gray-600">Title</th>
              <th className="text-left px-4 py-3 font-medium text-gray-600">Category</th>
              <th className="text-left px-4 py-3 font-medium text-gray-600">Status</th>
              <th className="text-right px-4 py-3 font-medium text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {blogs.map((b) => (
              <tr key={b.id} className="border-b border-gray-50 hover:bg-gray-50">
                <td className="px-4 py-3 font-medium">{b.title}</td>
                <td className="px-4 py-3 text-gray-500">{b.category_name || '—'}</td>
                <td className="px-4 py-3">
                  <span className={`text-xs px-2 py-1 rounded-full ${b.is_published ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                    {b.is_published ? 'Published' : 'Draft'}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <button onClick={() => openEdit(b)} className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-600 inline-flex"><Pencil size={16} /></button>
                  <button onClick={() => { if (confirm('Delete?')) remove.mutate(b.id); }} className="p-1.5 hover:bg-red-50 rounded-lg text-red-500 inline-flex ml-1"><Trash2 size={16} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {blogs.length === 0 && <EmptyState message="No blog posts yet" />}
      </AdminCard>

      <Modal open={open} onClose={() => setOpen(false)} title={editId ? 'Edit Post' : 'New Post'} wide>
        <form onSubmit={(e) => { e.preventDefault(); save.mutate({ ...form, is_published: form.is_published ? 1 : 0 }); }} className="space-y-4">
          <FormField label="Title" required>
            <input className={inputClass} value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value, slug: editId ? form.slug : slugify(e.target.value) })} required />
          </FormField>
          <FormField label="Slug" required>
            <input className={inputClass} value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} required />
          </FormField>
          <FormField label="Category">
            <select className={inputClass} value={form.category_id} onChange={(e) => setForm({ ...form, category_id: Number(e.target.value) })}>
              {categories.map((c: { id: number; name: string }) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </FormField>
          <FormField label="Excerpt">
            <textarea className={inputClass} rows={2} value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} />
          </FormField>
          <FormField label="Content">
            <textarea className={inputClass} rows={6} value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} />
          </FormField>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={!!form.is_published} onChange={(e) => setForm({ ...form, is_published: e.target.checked ? 1 : 0 })} />
            Publish immediately
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
