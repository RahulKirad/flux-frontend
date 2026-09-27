import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Users, FolderOpen, PenTool, MessageSquare, TrendingUp, Briefcase } from 'lucide-react';
import { settingsApi, leadsApi } from '../../services/api';
import { PageHeader, AdminCard, LoadingState } from '../../components/admin/shared';

export default function AdminDashboard() {
  const { data, isLoading } = useQuery({
    queryKey: ['dashboard'],
    queryFn: () => settingsApi.getDashboard(),
  });

  if (isLoading) return <LoadingState />;

  const stats = data?.data?.data;

  const cards = [
    { label: 'Total Leads', value: stats?.leads?.total || 0, icon: MessageSquare, color: 'bg-blue-500' },
    { label: 'New Leads', value: stats?.leads?.new_leads || 0, icon: TrendingUp, color: 'bg-green-500' },
    { label: 'Projects', value: stats?.projects || 0, icon: FolderOpen, color: 'bg-purple-500' },
    { label: 'Published Blogs', value: stats?.blogs || 0, icon: PenTool, color: 'bg-orange-500' },
    { label: 'Unread Inquiries', value: stats?.unreadInquiries || 0, icon: Briefcase, color: 'bg-red-500' },
    { label: 'New Applications', value: stats?.newApplications || 0, icon: Users, color: 'bg-teal-500' },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {cards.map((card) => (
          <div key={card.label} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">{card.label}</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{card.value}</p>
              </div>
              <div className={`w-12 h-12 ${card.color} rounded-xl flex items-center justify-center`}>
                <card.icon className="text-white" size={24} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold mb-4">Recent Leads</h2>
          <div className="space-y-3">
            {(stats?.recentLeads || []).map((lead: { id: number; name: string; email: string; source: string; status: string; created_at: string }) => (
              <div key={lead.id} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                <div>
                  <p className="font-medium text-sm">{lead.name}</p>
                  <p className="text-xs text-gray-500">{lead.email}</p>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  lead.status === 'new' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'
                }`}>
                  {lead.status}
                </span>
              </div>
            ))}
            {(!stats?.recentLeads || stats.recentLeads.length === 0) && (
              <p className="text-gray-400 text-sm">No leads yet</p>
            )}
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold mb-4">Leads by Status</h2>
          <div className="space-y-3">
            {(stats?.leadsByStatus || []).map((item: { status: string; count: number }) => (
              <div key={item.status} className="flex items-center justify-between">
                <span className="text-sm capitalize text-gray-600">{item.status}</span>
                <div className="flex items-center gap-3">
                  <div className="w-32 h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary-500 rounded-full"
                      style={{ width: `${Math.min(100, (item.count / (stats?.leads?.total || 1)) * 100)}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium w-8 text-right">{item.count}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
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
  const leads = data?.data?.data || [];

  const statuses = ['new', 'contacted', 'qualified', 'proposal', 'negotiation', 'won', 'lost'];

  return (
    <div>
      <PageHeader
        title="Consultations & leads"
        description="Engineering consultation requests from service pages and contact forms"
        action={<button type="button" onClick={handleExport} className="btn-primary text-sm">Export Excel</button>}
      />

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
