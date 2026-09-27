import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Share2 } from 'lucide-react';
import FluxLogo from '../common/FluxLogo';
import { company } from '../../data/companyContent';

const footerLinks = {
  Services: [
    { label: 'Engineering Design', path: '/services/engineering-design' },
    { label: 'Composites & Forming', path: '/services/composites-forming' },
    { label: 'Prototyping', path: '/services/prototyping' },
    { label: 'Bus Body Manufacturing', path: '/services/bus-body-manufacturing' },
    { label: 'Railway Components', path: '/services/railway-components' },
  ],
  Company: [
    { label: 'About Us', path: '/about' },
    { label: 'Facilities', path: '/facilities' },
    { label: 'Certifications', path: '/certifications' },
    { label: 'Careers', path: '/careers' },
    { label: 'Blog', path: '/blog' },
  ],
  Resources: [
    { label: 'Projects', path: '/projects' },
    { label: 'Case Studies', path: '/case-studies' },
    { label: 'Industries', path: '/industries' },
    { label: 'Contact', path: '/contact' },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-kinetic-primary text-white/70">
      <div className="stitch-section !pb-8">
        <div className="stitch-container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
            <div className="lg:col-span-2">
              <Link to="/" className="inline-block mb-4">
                <FluxLogo className="h-12 w-auto rounded-lg bg-white px-2 py-1" />
              </Link>
              <p className="text-white/60 mb-6 max-w-sm text-sm leading-relaxed">
                {company.tagline}. Integrated engineering for bus body manufacturing, railway parts,
                and industrial applications from Chikhali & Chakan, Pune.
              </p>
              <div className="space-y-3 text-sm">
                {company.locations.map((loc) => (
                  <div key={loc.name} className="flex items-start gap-2">
                    <MapPin size={16} className="mt-0.5 text-white/50 shrink-0" />
                    <span>{loc.address}</span>
                  </div>
                ))}
                <div className="flex items-center gap-2">
                  <Phone size={16} className="text-white/50" />
                  <a href={`tel:${company.phone.replace(/\s/g, '')}`} className="hover:text-white transition">{company.phone}</a>
                </div>
                <div className="flex items-center gap-2">
                  <Mail size={16} className="text-white/50" />
                  <a href={`mailto:${company.email}`} className="hover:text-white transition">{company.email}</a>
                </div>
              </div>
            </div>

            {Object.entries(footerLinks).map(([title, links]) => (
              <div key={title}>
                <h4 className="text-white font-semibold uppercase text-xs tracking-widest mb-4">{title}</h4>
                <ul className="space-y-2.5">
                  {links.map((link) => (
                    <li key={link.path}>
                      <Link to={link.path} className="text-sm hover:text-white transition">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="stitch-container py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-white/40">&copy; {new Date().getFullYear()} {company.name}. All rights reserved.</p>
          <div className="flex items-center gap-4 text-sm">
            <Link to="/admin" className="text-white/40 hover:text-white transition">Staff login</Link>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">LinkedIn</a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">Twitter</a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">YouTube</a>
            <Share2 size={18} className="text-white/30" />
          </div>
        </div>
      </div>
    </footer>
  );
}
