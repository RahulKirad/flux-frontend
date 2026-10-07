import type { ReactNode } from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  RadialLinearScale,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import { Doughnut, Pie, Line, Bar, PolarArea, Radar } from 'react-chartjs-2';

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  RadialLinearScale,
  Filler,
  Tooltip,
  Legend,
);

export const ADMIN_PALETTE = ['#E8A317', '#2EB8C2', '#4F7CFF', '#C45C26', '#34D399', '#A78BFA', '#F472B6', '#94A3B8'];

export function num(v: unknown) {
  const n = Number(v);
  return Number.isFinite(n) ? n : 0;
}

export function countsFrom(rows: Record<string, unknown>[], key: string) {
  const map = new Map<string, number>();
  for (const row of rows) {
    const label = String(row[key] ?? 'Unspecified').trim() || 'Unspecified';
    map.set(label, (map.get(label) || 0) + 1);
  }
  return [...map.entries()].map(([label, value]) => ({ label, value }));
}

function chartColors(n: number) {
  return Array.from({ length: n }, (_, i) => ADMIN_PALETTE[i % ADMIN_PALETTE.length]);
}

const tooltip = {
  backgroundColor: '#0B1220',
  titleColor: '#F8FAFC',
  bodyColor: '#CBD5E1',
  padding: 10,
  cornerRadius: 8,
};

export function ChartPanel({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-[0_12px_40px_-24px_rgba(15,23,42,0.45)]">
      <div className="mb-4">
        <h3 className="text-sm font-semibold tracking-wide text-slate-800 uppercase">{title}</h3>
        {subtitle && <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>}
      </div>
      {children}
    </div>
  );
}

export function ChartEmpty({ label = 'No live records yet' }: { label?: string }) {
  return (
    <div className="h-48 flex items-center justify-center text-sm text-slate-400 border border-dashed border-slate-200 rounded-xl bg-slate-50/80">
      {label}
    </div>
  );
}

export function LiveDoughnut({ labels, values }: { labels: string[]; values: number[] }) {
  if (!values.some((v) => v > 0)) return <ChartEmpty />;
  return (
    <div className="h-56">
      <Doughnut
        data={{
          labels,
          datasets: [{ data: values, backgroundColor: chartColors(labels.length), borderWidth: 0, hoverOffset: 6 }],
        }}
        options={{
          maintainAspectRatio: false,
          cutout: '62%',
          plugins: { legend: { position: 'right', labels: { boxWidth: 10, font: { size: 11 } } }, tooltip },
        }}
      />
    </div>
  );
}

export function LivePie({ labels, values }: { labels: string[]; values: number[] }) {
  if (!values.some((v) => v > 0)) return <ChartEmpty />;
  return (
    <div className="h-56">
      <Pie
        data={{
          labels,
          datasets: [{ data: values, backgroundColor: chartColors(labels.length), borderWidth: 0 }],
        }}
        options={{
          maintainAspectRatio: false,
          plugins: { legend: { position: 'bottom', labels: { boxWidth: 10, font: { size: 11 } } }, tooltip },
        }}
      />
    </div>
  );
}

export function LiveLine({ labels, values, label }: { labels: string[]; values: number[]; label: string }) {
  if (!values.length) return <ChartEmpty />;
  return (
    <div className="h-56">
      <Line
        data={{
          labels,
          datasets: [{
            label,
            data: values,
            borderColor: '#C45C26',
            backgroundColor: 'rgba(196,92,38,0.12)',
            fill: true,
            tension: 0.35,
            pointBackgroundColor: '#E8A317',
            pointRadius: 4,
          }],
        }}
        options={{
          maintainAspectRatio: false,
          plugins: { legend: { display: false }, tooltip },
          scales: {
            x: { grid: { display: false }, ticks: { font: { size: 10 } } },
            y: { beginAtZero: true, ticks: { precision: 0 }, grid: { color: 'rgba(15,23,42,0.06)' } },
          },
        }}
      />
    </div>
  );
}

export function LiveBar({ labels, values, label, horizontal }: { labels: string[]; values: number[]; label: string; horizontal?: boolean }) {
  if (!values.some((v) => v > 0)) return <ChartEmpty />;
  return (
    <div className="h-56">
      <Bar
        data={{
          labels,
          datasets: [{ label, data: values, backgroundColor: chartColors(labels.length), borderRadius: 8, maxBarThickness: 28 }],
        }}
        options={{
          indexAxis: horizontal ? 'y' : 'x',
          maintainAspectRatio: false,
          plugins: { legend: { display: false }, tooltip },
          scales: {
            x: { beginAtZero: true, ticks: { precision: 0 }, grid: { color: 'rgba(15,23,42,0.06)' } },
            y: { grid: { display: false }, ticks: { font: { size: 10 } } },
          },
        }}
      />
    </div>
  );
}

export function LivePolar({ labels, values }: { labels: string[]; values: number[] }) {
  if (!values.some((v) => v > 0)) return <ChartEmpty />;
  return (
    <div className="h-56">
      <PolarArea
        data={{
          labels,
          datasets: [{ data: values, backgroundColor: chartColors(labels.length).map((c) => `${c}cc`) }],
        }}
        options={{
          maintainAspectRatio: false,
          plugins: { legend: { position: 'right', labels: { boxWidth: 10, font: { size: 11 } } }, tooltip },
        }}
      />
    </div>
  );
}

export function LiveRadar({ labels, values, label }: { labels: string[]; values: number[]; label: string }) {
  if (!values.some((v) => v > 0)) return <ChartEmpty />;
  return (
    <div className="h-56">
      <Radar
        data={{
          labels,
          datasets: [{
            label,
            data: values,
            backgroundColor: 'rgba(46,184,194,0.18)',
            borderColor: '#2EB8C2',
            pointBackgroundColor: '#E8A317',
          }],
        }}
        options={{
          maintainAspectRatio: false,
          plugins: { legend: { display: false }, tooltip },
          scales: { r: { beginAtZero: true, ticks: { display: false }, grid: { color: 'rgba(15,23,42,0.08)' } } },
        }}
      />
    </div>
  );
}

export function KpiGrid({
  items,
}: {
  items: { label: string; value: number | string; hint?: string; tone?: string }[];
}) {
  return (
    <div className="grid grid-cols-2 xl:grid-cols-4 gap-3 mb-6">
      {items.map((item) => (
        <div
          key={item.label}
          className="relative overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-900 to-slate-800 p-4 text-white"
        >
          <div className="absolute -right-6 -top-6 h-20 w-20 rounded-full bg-amber-400/15" />
          <p className="text-[11px] uppercase tracking-[0.16em] text-slate-300">{item.label}</p>
          <p className="text-3xl font-semibold mt-1 tabular-nums">{item.value}</p>
          {item.hint && <p className="text-xs text-amber-300/90 mt-1">{item.hint}</p>}
        </div>
      ))}
    </div>
  );
}
