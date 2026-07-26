export default function GraphiteBackground() {
  return (
    <div className="graphite-bg pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div className="graphite-bg__base" />
      <div className="graphite-bg__weave" />
      <div className="graphite-bg__mesh" />
      <div className="graphite-bg__shimmer" />
      <div className="graphite-bg__vignette" />
    </div>
  );
}
