import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { settingsApi, leadsApi, servicesApi, projectsApi, mediaApi } from '../../services/api';
import { PageHeader, AdminCard, LoadingState } from '../../components/admin/shared';
import {
  ChartPanel,
  KpiGrid,
  LiveDoughnut,
  LiveLine,
  LivePolar,
  LiveRadar,
  LiveBar,
  LivePie,
  countsFrom,
  num,
} from '../../components/admin/charts';

type DashLead = { id: number; name: string; email: string; source: string; status: string; created_at: string };
type StatusCount = { status: string; count: number | string };
type MonthCount = { month: string; count: number | string };

export default function AdminDashboard() {
  const { data, isLoading } = useQuery({
    queryKey: ['dashboard'],
    queryFn: () => settingsApi.getDashboard(),
  });
  const servicesQ = useQuery({ queryKey: ['admin-services'], queryFn: () => servicesApi.getAll() });
  const projectsQ = useQuery({ queryKey: ['admin-projects'], queryFn: () => projectsApi.getAll({ limit: '200' }) });
  const mediaQ = useQuery({ queryKey: ['admin-media'], queryFn: () => mediaApi.getAll({ limit: '200' }) });

  if (isLoading) return <LoadingState />;

  const stats = data?.data?.data;
  const services = (servicesQ.data?.data?.data || []) as { is_active?: number; is_featured?: number; parent_id?: number | null }[];
  const projects = (projectsQ.data?.data?.data || []) as { is_active?: number; is_featured?: number; category?: string }[];
  const media = (mediaQ.data?.data?.data || []) as { file_type?: string }[];

  const leadsByStatus = (stats?.leadsByStatus || []) as StatusCount[];
  const leadsByMonth = (stats?.leadsByMonth || []) as MonthCount[];
  const recentLeads = (stats?.recentLeads || []) as DashLead[];

  const totalLeads = num(stats?.leads?.total);
  const newLeads = num(stats?.leads?.new_leads);
  const conversion = totalLeads ? Math.round((num(stats?.leads?.won ?? 0) / totalLeads) * 100) : 0;

  return (
    <div>
      <PageHeader
        title="Command dashboard"
        description="Live operations snapshot from MySQL — no placeholder metrics"
      />

      <KpiGrid
        items={[
          { label: 'Leads', value: totalLeads, hint: `${newLeads} new in pipeline` },
          { label: 'Projects', value: num(stats?.projects), hint: 'Active records' },
          { label: 'Published blogs', value: num(stats?.blogs) },
          { label: 'Applications', value: num(stats?.newApplications), hint: `${num(stats?.unreadInquiries)} unread inquiries` },
        ]}
      />

      <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-4 mb-6">
        <ChartPanel title="Lead intake" subtitle="Last 6 months (live)">
          <LiveLine
            label="Leads"
            labels={leadsByMonth.map((m) => m.month)}
            values={leadsByMonth.map((m) => num(m.count))}
          />
        </ChartPanel>
        <ChartPanel title="Pipeline mix" subtitle="Leads by status">
          <LiveDoughnut
            labels={leadsByStatus.map((s) => s.status)}
            values={leadsByStatus.map((s) => num(s.count))}
          />
        </ChartPanel>
        <ChartPanel title="Pipeline polar" subtitle="Status volume">
          <LivePolar
            labels={leadsByStatus.map((s) => s.status)}
            values={leadsByStatus.map((s) => num(s.count))}
          />
        </ChartPanel>
        <ChartPanel title="Content radar" subtitle="Live CMS inventory">
          <LiveRadar
            label="Records"
            labels={['Services', 'Projects', 'Blogs', 'Media', 'Leads']}
            values={[services.length, projects.length, num(stats?.blogs), media.length, totalLeads]}
          />
        </ChartPanel>
        <ChartPanel title="Service composition" subtitle="Main vs sub vs featured">
          <LiveBar
            label="Count"
            labels={['Main', 'Sub-service', 'Featured', 'Inactive']}
            values={[
              services.filter((s) => !s.parent_id).length,
              services.filter((s) => s.parent_id).length,
              services.filter((s) => s.is_featured).length,
              services.filter((s) => !s.is_active).length,
            ]}
          />
        </ChartPanel>
        <ChartPanel title="Media types" subtitle="Library by file type">
          <LiveDoughnut
            labels={['image', 'video', 'document', 'other']}
            values={['image', 'video', 'document', 'other'].map(
              (t) => media.filter((m) => (m.file_type || 'other') === t).length,
            )}
          />
        </ChartPanel>
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        <AdminCard className="p-5">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-700 mb-3">Latest consultations</h2>
          <div className="space-y-3">
            {recentLeads.map((lead) => (
              <div key={lead.id} className="flex items-center justify-between py-2 border-b border-slate-100 last:border-0">
                <div>
                  <p className="font-medium text-sm text-slate-900">{lead.name}</p>
                  <p className="text-xs text-slate-500">{lead.email}</p>
                </div>
                <span className="text-[10px] uppercase tracking-wide px-2 py-1 rounded-full bg-amber-100 text-amber-900">
                  {lead.status}
                </span>
              </div>
            ))}
            {recentLeads.length === 0 && <p className="text-slate-400 text-sm">No live leads in the database yet.</p>}
          </div>
          {totalLeads > 0 && (
            <p className="text-xs text-slate-500 mt-4">Won rate from live statuses: {conversion}%</p>
          )}
        </AdminCard>
        <ChartPanel title="Project categories" subtitle="From live project records">
          <LiveBar
            horizontal
            label="Projects"
            labels={[...new Set(projects.map((p) => p.category || 'Uncategorised'))]}
            values={[...new Set(projects.map((p) => p.category || 'Uncategorised'))].map(
              (c) => projects.filter((p) => (p.category || 'Uncategorised') === c).length,
            )}
          />
        </ChartPanel>
      </div>
    </div>
  );
}

type LeadRow = {
  id: number;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  source: string;
  status: string;
  message?: string;
  service_title?: string;
  created_at: string;
};

export function AdminLeadsPage() {
  const qc = useQueryClient();
  const [selected, setSelected] = useState<LeadRow | null>(null);
  const { data, isLoading } = useQuery({
    queryKey: ['admin-leads'],
    queryFn: () => leadsApi.getAll({ limit: '200' }),
    staleTime: 60_000,
  });

  const updateStatus = useMutation({
    mutationFn: ({ id, status }: { id: number; status: string }) => leadsApi.update(id, { status }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['admin-leads'] }),
  });

  const handleExport = async () => {
    const res = await leadsApi.exportExcel();
    const url = window.URL.createObjectURL(new Blob([res.data]));
    const a = document.createElement('a');
    a.href = url;
    a.download = 'flux-corp-leads.xlsx';
    a.click();
  };

  if (isLoading) return <LoadingState />;
  const leads = (data?.data?.data || []) as LeadRow[];
  const byStatus = countsFrom(leads as unknown as Record<string, unknown>[], 'status');
  const bySource = countsFrom(leads as unknown as Record<string, unknown>[], 'source');

  const statuses = ['new', 'contacted', 'qualified', 'proposal', 'negotiation', 'won', 'lost'];

  return (
    <div>
      <PageHeader
        title="Consultations & leads"
        description="Live submissions from the website — charts update from the API"
        action={<button type="button" onClick={handleExport} className="btn-primary text-sm">Export Excel</button>}
      />

      <KpiGrid
        items={[
          { label: 'Total', value: leads.length },
          { label: 'New', value: leads.filter((l) => l.status === 'new').length },
          { label: 'Won', value: leads.filter((l) => l.status === 'won').length },
          { label: 'Lost', value: leads.filter((l) => l.status === 'lost').length },
        ]}
      />

      <div className="grid md:grid-cols-2 gap-4 mb-6">
        <ChartPanel title="Status mix" subtitle="Live lead statuses">
          <LivePie labels={byStatus.map((x) => x.label)} values={byStatus.map((x) => x.value)} />
        </ChartPanel>
        <ChartPanel title="Intake source" subtitle="How consultations arrived">
          <LiveBar horizontal label="Leads" labels={bySource.map((x) => x.label)} values={bySource.map((x) => x.value)} />
        </ChartPanel>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <AdminCard className="lg:col-span-2 overflow-x-auto">
          <table className="w-full text-sm min-w-[640px]">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Name</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Service</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Phone</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Status</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Date</th>
              </tr>
            </thead>
            <tbody>
              {(leads as LeadRow[]).map((lead) => (
                <tr
                  key={lead.id}
                  onClick={() => setSelected(lead)}
                  className={`border-b border-gray-50 hover:bg-gray-50 cursor-pointer ${selected?.id === lead.id ? 'bg-primary-50' : ''}`}
                >
                  <td className="px-4 py-3">
                    <p className="font-medium">{lead.name}</p>
                    <p className="text-xs text-gray-500">{lead.email}</p>
                  </td>
                  <td className="px-4 py-3 text-xs text-gray-600 max-w-[140px] truncate">
                    {lead.service_title || lead.source.replace(/_/g, ' ')}
                  </td>
                  <td className="px-4 py-3 text-gray-600">{lead.phone || '—'}</td>
                  <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                    <select
                      value={lead.status}
                      onChange={(e) => updateStatus.mutate({ id: lead.id, status: e.target.value })}
                      className="text-xs border border-gray-200 rounded-lg px-2 py-1 capitalize"
                    >
                      {statuses.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </td>
                  <td className="px-4 py-3 text-gray-500 whitespace-nowrap">{new Date(lead.created_at).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {leads.length === 0 && <p className="p-8 text-center text-gray-400 text-sm">No leads yet. Submissions appear when the API and database are connected.</p>}
        </AdminCard>

        <AdminCard className="p-6 h-fit sticky top-24">
          {selected ? (
            <div className="space-y-4 text-sm">
              <h3 className="font-semibold text-gray-900 text-lg">{selected.name}</h3>
              <p><span className="text-gray-500">Email:</span> {selected.email}</p>
              <p><span className="text-gray-500">Phone:</span> {selected.phone || '—'}</p>
              <p><span className="text-gray-500">Company:</span> {selected.company || '—'}</p>
              <p><span className="text-gray-500">Source:</span> {selected.source}</p>
              {selected.service_title && <p><span className="text-gray-500">Service:</span> {selected.service_title}</p>}
              <div>
                <p className="text-gray-500 mb-1">Project details</p>
                <p className="whitespace-pre-wrap text-gray-800 bg-gray-50 border rounded-lg p-3 text-xs leading-relaxed max-h-64 overflow-y-auto">
                  {selected.message || '—'}
                </p>
              </div>
            </div>
          ) : (
            <p className="text-gray-400 text-sm">Select a row to view full consultation details.</p>
          )}
        </AdminCard>
      </div>
    </div>
  );
}
