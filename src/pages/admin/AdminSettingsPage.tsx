import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Save } from 'lucide-react';
import { settingsApi } from '../../services/api';
import { PageHeader, AdminCard, FormField, inputClass, LoadingState } from '../../components/admin/shared';
import { ChartPanel, KpiGrid, LiveDoughnut } from '../../components/admin/charts';

export default function AdminSettingsPage() {
  const qc = useQueryClient();
  const [form, setForm] = useState<Record<string, string>>({});

  const { data, isLoading } = useQuery({
    queryKey: ['admin-settings'],
    queryFn: () => settingsApi.getAll(),
  });

  useEffect(() => {
    const grouped = data?.data?.data;
    if (grouped) {
      const flat: Record<string, string> = {};
      Object.values(grouped).forEach((group) => {
        Object.entries(group as Record<string, string>).forEach(([k, v]) => { flat[k] = v; });
      });
      setForm(flat);
    }
  }, [data]);

  const save = useMutation({
    mutationFn: (payload: Record<string, string>) => settingsApi.update(payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['admin-settings'] });
      alert('Settings saved successfully');
    },
  });

  if (isLoading) return <LoadingState />;

  const fields = [
    { key: 'company_name', label: 'Company Name', group: 'company' },
    { key: 'company_tagline', label: 'Tagline', group: 'company' },
    { key: 'company_email', label: 'Email', group: 'company' },
    { key: 'company_email_alt', label: 'Alternate email', group: 'company' },
    { key: 'company_phone', label: 'Phone', group: 'company' },
    { key: 'company_address', label: 'Address', group: 'company' },
    { key: 'vision', label: 'Vision', group: 'company', textarea: true },
    { key: 'mission', label: 'Mission', group: 'company', textarea: true },
    { key: 'stats_projects', label: 'Projects Stat', group: 'statistics' },
    { key: 'stats_clients', label: 'Clients Stat', group: 'statistics' },
    { key: 'stats_years', label: 'Years Stat', group: 'statistics' },
    { key: 'stats_engineers', label: 'Engineers Stat', group: 'statistics' },
    { key: 'social_linkedin', label: 'LinkedIn URL', group: 'social' },
    { key: 'social_twitter', label: 'Twitter URL', group: 'social' },
    { key: 'social_youtube', label: 'YouTube URL', group: 'social' },
  ];

  return (
    <div>
      <PageHeader
        title="Settings"
        description="Live company profile stored in the database"
        action={
          <button onClick={() => save.mutate(form)} disabled={save.isPending} className="btn-primary text-sm flex items-center gap-2">
            <Save size={16} /> {save.isPending ? 'Saving...' : 'Save Changes'}
          </button>
        }
      />

      <KpiGrid
        items={[
          { label: 'Fields', value: fields.length },
          { label: 'Filled', value: fields.filter((f) => (form[f.key] || '').trim()).length },
          { label: 'Empty', value: fields.filter((f) => !(form[f.key] || '').trim()).length },
        ]}
      />
      <div className="max-w-md mb-6">
        <ChartPanel title="Profile completeness">
          <LiveDoughnut
            labels={['Filled', 'Empty']}
            values={[
              fields.filter((f) => (form[f.key] || '').trim()).length,
              fields.filter((f) => !(form[f.key] || '').trim()).length,
            ]}
          />
        </ChartPanel>
      </div>

      <AdminCard className="p-6">
        <div className="grid md:grid-cols-2 gap-4">
          {fields.map((f) => (
            <FormField key={f.key} label={f.label}>
              {f.textarea ? (
                <textarea
                  className={inputClass}
                  rows={3}
                  value={form[f.key] || ''}
                  onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                />
              ) : (
                <input
                  className={inputClass}
                  value={form[f.key] || ''}
                  onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                />
              )}
            </FormField>
          ))}
        </div>
      </AdminCard>
    </div>
  );
}
