import { MapPin, Phone, Mail } from 'lucide-react';
import { company } from '../../data/companyContent';

export default function CompanyContactDetails({
  tone = 'light',
}: {
  tone?: 'light' | 'dark';
}) {
  const icon = tone === 'dark' ? 'text-white/50' : 'text-kinetic-primary';
  const title = tone === 'dark' ? 'text-white' : 'text-kinetic-primary';
  const body = tone === 'dark' ? 'text-white/70' : 'text-kinetic-on-surface-variant';
  const linkHover = tone === 'dark' ? 'hover:text-white' : 'hover:text-kinetic-primary';

  return (
    <div className="space-y-4 text-sm">
      {company.locations.map((loc) => (
        <div key={loc.name} className="flex items-start gap-3">
          <MapPin size={18} className={`mt-0.5 shrink-0 ${icon}`} strokeWidth={1.5} />
          <div>
            <h5 className={`text-xs font-semibold uppercase tracking-widest mb-1 ${title}`}>{loc.name}</h5>
            <p className={body}>{loc.address}</p>
          </div>
        </div>
      ))}
      <div className="flex items-center gap-3">
        <Phone size={18} className={`shrink-0 ${icon}`} strokeWidth={1.5} />
        <a href={`tel:${company.phone.replace(/\s/g, '')}`} className={`${body} ${linkHover} transition`}>
          {company.phone}
        </a>
      </div>
      {company.emails.map((email) => (
        <div key={email} className="flex items-center gap-3">
          <Mail size={18} className={`shrink-0 ${icon}`} strokeWidth={1.5} />
          <a href={`mailto:${email}`} className={`${body} ${linkHover} transition`}>
            {email}
          </a>
        </div>
      ))}
    </div>
  );
}
