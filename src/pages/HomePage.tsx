import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import {
  Cog, Layers, Printer, Wrench, Car, Bus, Train, Factory, ChevronRight, MapPin, Mail, Phone, Shield, Truck,
} from 'lucide-react';
import { AnimatedSection, SEOHead, SectionHeading } from '../components/common';
import HeroBannerSlider from '../components/home/HeroBannerSlider';
import { railwaysImage, electricVehiclesImage } from '../assets/images';
import ImageTextBannerSlider from '../components/home/ImageTextBannerSlider';
import ContactForm from '../components/forms/ContactForm';
import { BulletList, ImageTextBlock, PageSection, StatStrip } from '../components/layout/ContentBlocks';
import {
  about,
  company,
  homeBannerSections,
  marketTrends,
  partners,
  servicesContent,
} from '../data/companyContent';
import { servicesApi, settingsApi } from '../services/api';
import type { Service } from '../types';

const serviceIcons: Record<string, React.ElementType> = {
  'engineering-design': Cog,
  'composites-forming': Layers,
  prototyping: Printer,
  'tools-die': Wrench,
  'automotive-styling': Car,
  'bus-body-manufacturing': Bus,
  'railway-components': Train,
  'industrial-components': Factory,
};

const bentoIndustries = [
  {
    title: 'Automotive',
    slug: 'automotive',
    description: 'Passenger vehicles, EV platforms, and construction equipment components.',
    image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1200&q=80',
    span: 'md:col-span-12 lg:col-span-8',
    height: 'min-h-[240px] sm:min-h-[280px] lg:min-h-[320px] xl:min-h-[380px]',
  },
  {
    title: 'Commercial Vehicles',
    slug: 'commercial-vehicles',
    description: 'Bus body manufacturing and fleet lightweighting at scale.',
    image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&q=80',
    span: 'md:col-span-12 lg:col-span-4',
    height: 'min-h-[240px] sm:min-h-[280px] lg:min-h-[320px] xl:min-h-[380px]',
  },
  {
    title: 'Electric Vehicles',
    slug: 'electric-vehicles',
    description: 'EV platform design and lightweighting solutions.',
    image: electricVehiclesImage,
    span: 'md:col-span-6 lg:col-span-4 xl:col-span-4 bento-row-span-2',
    height: 'min-h-[240px] sm:min-h-[280px] lg:min-h-[300px] xl:min-h-[520px]',
    imageClass: 'object-cover object-center',
  },
  {
    title: 'Railways',
    slug: 'railways',
    description: 'RDSO-certified railway component manufacturing.',
    image: railwaysImage,
    span: 'md:col-span-6 lg:col-span-8',
    height: 'min-h-[240px] sm:min-h-[280px] lg:min-h-[320px] xl:min-h-[400px]',
    imageClass: 'object-cover object-center',
  },
  {
    title: 'Industrial Equipment',
    slug: 'industrial-equipment',
    description: 'Heavy machinery and industrial component engineering.',
    image: 'https://images.unsplash.com/photo-1565793300263-d78378306091?w=1200&q=80',
    span: 'md:col-span-12 lg:col-span-8',
    height: 'min-h-[240px] sm:min-h-[280px] lg:min-h-[320px] xl:min-h-[360px]',
    imageClass: 'object-cover object-center',
  },
  {
    title: 'Material Handling',
    slug: 'material-handling',
    description: 'Conveyor, crane, and handling system components.',
    image: 'https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=800&q=80',
    span: 'md:col-span-6 lg:col-span-5',
    height: 'min-h-[220px] sm:min-h-[260px] lg:min-h-[280px] xl:min-h-[320px]',
  },
  {
    title: 'Packaging Systems',
    slug: 'packaging-systems',
    description: 'Automated packaging machinery components.',
    image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&q=80',
    span: 'md:col-span-6 lg:col-span-7',
    height: 'min-h-[220px] sm:min-h-[260px] lg:min-h-[280px] xl:min-h-[320px]',
  },
];

export default function HomePage() {
  const { data: servicesRes } = useQuery({ queryKey: ['services-main'], queryFn: () => servicesApi.getAll({ main: 'true' }) });
  const { data: settingsRes } = useQuery({ queryKey: ['settings-public'], queryFn: () => settingsApi.getPublic() });

  const services: Service[] = servicesRes?.data?.data || [];
  const stats = settingsRes?.data?.data?.statistics || {};
  const featuredServices = services.length > 0 ? services.slice(0, 6) : Object.entries(servicesContent).slice(0, 6).map(([slug, c], i) => ({
    id: i,
    slug,
    title: slug.split('-').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
    short_description: c.intro.slice(0, 120) + '…',
  } as Service));

  return (
    <>
      <SEOHead
        title="Flux Corp | Integrated Engineering for Bus Body & Railway Manufacturing"
        description="Integrated engineering design, composites, prototyping, tools & die, bus body and railway parts manufacturing in Chikhali & Chakan, Pune."
        keywords="bus body manufacturing, railway parts, composites, prototyping, tools & die, engineering design"
      />

      <HeroBannerSlider
        stats={{
          projects: stats.stats_projects || '150+',
          clients: stats.stats_clients || '40+',
          years: stats.stats_years || '15+',
          engineers: stats.stats_engineers || '200+',
        }}
      />

      <div id="home-content">
        {/* About intro from PDF */}
        <PageSection>
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <AnimatedSection>
              <span className="stitch-label block mb-4">About Flux Corp</span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-kinetic-primary leading-tight uppercase mb-6 text-balance">
                Integrated Engineering
                <br />
                Solutions.
              </h2>
              {about.overview.map((p) => (
                <p key={p.slice(0, 40)} className="text-kinetic-on-surface-variant leading-relaxed mb-4 last:mb-0">
                  {p}
                </p>
              ))}
              <Link to="/about" className="inline-flex items-center gap-2 mt-8 text-xs font-semibold uppercase tracking-widest text-kinetic-primary border-b border-kinetic-primary pb-1">
                Learn More <ChevronRight size={16} />
              </Link>
            </AnimatedSection>
            <AnimatedSection delay={0.15}>
              <div className="relative min-h-[280px] sm:min-h-[320px] lg:min-h-[400px] xl:min-h-[480px] border border-kinetic-outline-variant overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=1000&q=80"
                  alt="Flux Corp engineering facility"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
            </AnimatedSection>
          </div>
        </PageSection>

        {/* Image + text banner slider */}
        <ImageTextBannerSlider />

        {/* Core services from PDF */}
        <PageSection tone="muted">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 lg:mb-16 gap-8">
            <div className="max-w-2xl">
              <span className="stitch-label block mb-4">Products & Services</span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-kinetic-primary leading-tight uppercase text-balance">
                End-to-End
                <br />
                Capabilities.
              </h2>
            </div>
            <p className="text-kinetic-on-surface-variant max-w-md text-base lg:text-lg">
              From initial design through final production and assembly — engineering design, composites,
              prototyping, tools & die, styling, bus body, and railway manufacturing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredServices.map((service) => {
              const Icon = serviceIcons[service.slug] || Cog;
              const extra = servicesContent[service.slug];
              return (
                <AnimatedSection key={service.id}>
                  <Link
                    to={`/services/${service.slug}`}
                    className="group block border border-kinetic-outline-variant p-8 hover:border-kinetic-primary transition-colors bg-white h-full"
                  >
                    <Icon className="w-10 h-10 text-kinetic-primary mb-6 stroke-[1.5]" />
                    <h3 className="text-lg font-semibold uppercase mb-3 text-kinetic-primary">{service.title}</h3>
                    <p className="text-kinetic-on-surface-variant text-sm mb-5 line-clamp-3">
                      {extra?.intro || service.short_description}
                    </p>
                    <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-kinetic-primary">
                      Explore <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </span>
                  </Link>
                </AnimatedSection>
              );
            })}
          </div>
        </PageSection>

        {/* Alternating image/text banners from PDF */}
        <PageSection>
          <div className="space-y-20 lg:space-y-28">
            {homeBannerSections.map((section) => (
              <ImageTextBlock key={section.title} {...section} />
            ))}
          </div>
        </PageSection>

        {/* Industries bento */}
        <PageSection tone="muted">
          <SectionHeading label="Industries Served" title="Sectors We Serve" description="Tailored solutions for transportation and industrial sectors across India and global export markets." />
          <div className="bento-grid bento-grid-industries">
            {bentoIndustries.map((item) => (
              <AnimatedSection
                key={item.title}
                className={`col-span-12 ${item.span} min-w-0`}
              >
                <Link
                  to={`/industries/${item.slug}`}
                  className={`group relative block w-full overflow-hidden border border-kinetic-outline-variant ${item.height}`}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className={`absolute inset-0 w-full h-full transition-transform duration-700 group-hover:scale-105 ${item.imageClass ?? 'object-cover'}`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-5 sm:p-6 lg:p-8 text-white max-w-full">
                    <h4 className="text-base sm:text-lg lg:text-xl font-semibold uppercase mb-1 sm:mb-2">{item.title}</h4>
                    <p className="text-white/75 max-w-md text-xs sm:text-sm leading-relaxed">{item.description}</p>
                  </div>
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </PageSection>

        {/* Quality + supply chain highlights */}
        <PageSection>
          <SectionHeading
            label="Quality Assurance"
            title="Joining, Inspection & Testing"
            description="Advanced joining methods, NDT, CMM inspection, and comprehensive validation protocols for automotive and railway sectors."
          />
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Shield, title: 'Inspection & QA', items: ['NDT — ultrasonic, radiographic, eddy current', 'CMM high-precision measurement', 'ISO, IATF, RDSO compliance'] },
              { icon: Truck, title: 'Supply Chain', items: ['Strategic sourcing & supplier audits', 'Just-in-time inventory management', 'Export documentation & clearance'] },
              { icon: Factory, title: 'Market Focus', items: marketTrends.bus.slice(0, 2).concat(marketTrends.railway[0]) },
            ].map(({ icon: Icon, title, items }, i) => (
              <AnimatedSection key={title} delay={i * 0.1}>
                <div className="border border-kinetic-outline-variant p-8 h-full bg-white">
                  <Icon className="w-10 h-10 text-kinetic-primary mb-6 stroke-[1.5]" />
                  <h3 className="text-lg font-semibold uppercase text-kinetic-primary mb-4">{title}</h3>
                  <BulletList items={items} />
                </div>
              </AnimatedSection>
            ))}
          </div>
        </PageSection>

        {/* Stats */}
        <PageSection tone="muted">
          <StatStrip
            stats={[
              { label: 'Projects Delivered', value: stats.stats_projects || '150+' },
              { label: 'Global Clients', value: stats.stats_clients || '40+' },
              { label: 'Years Experience', value: stats.stats_years || '15+' },
              { label: 'Engineers', value: stats.stats_engineers || '200+' },
            ]}
          />
        </PageSection>

        {/* Partners */}
        <PageSection>
          <p className="stitch-label text-center mb-10 tracking-[0.4em]">Trusted Partners & Clients</p>
          <div className="flex flex-wrap xl:flex-nowrap justify-center xl:justify-between items-center gap-x-4 gap-y-3 lg:gap-6 opacity-50 w-full max-w-full">
            {partners.map((client) => (
              <span key={client} className="shrink-0 whitespace-nowrap text-[10px] sm:text-xs lg:text-sm xl:text-base font-bold tracking-tight text-kinetic-primary uppercase">
                {client}
              </span>
            ))}
          </div>
        </PageSection>

        {/* Contact from PDF */}
        <PageSection tone="muted">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            <AnimatedSection>
              <span className="stitch-label block mb-4">Contact Us</span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-kinetic-primary leading-tight uppercase mb-6 text-balance">
                {company.tagline}
              </h2>
              <p className="text-kinetic-on-surface-variant text-lg mb-10 leading-relaxed">
                Flux Corp welcomes inquiries from domestic and international clients seeking integrated
                engineering solutions for bus body manufacturing, railway parts, and industrial applications.
              </p>
              <div className="space-y-6">
                {company.locations.map((loc) => (
                  <div key={loc.name} className="flex items-start gap-4">
                    <MapPin className="w-5 h-5 text-kinetic-primary shrink-0 mt-0.5" strokeWidth={1.5} />
                    <div>
                      <h5 className="text-xs font-semibold uppercase tracking-widest text-kinetic-primary mb-1">{loc.name}</h5>
                      <p className="text-kinetic-on-surface-variant text-sm">{loc.address}</p>
                    </div>
                  </div>
                ))}
                <div className="flex items-center gap-4">
                  <Phone className="w-5 h-5 text-kinetic-primary shrink-0" strokeWidth={1.5} />
                  <a href={`tel:${company.phone.replace(/\s/g, '')}`} className="text-kinetic-on-surface-variant hover:text-kinetic-primary transition">
                    {company.phone}
                  </a>
                </div>
                <div className="flex items-center gap-4">
                  <Mail className="w-5 h-5 text-kinetic-primary shrink-0" strokeWidth={1.5} />
                  <a href={`mailto:${company.email}`} className="text-kinetic-on-surface-variant hover:text-kinetic-primary transition">
                    {company.email}
                  </a>
                </div>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.15}>
              <div className="bg-white p-8 lg:p-10 border border-kinetic-outline-variant">
                <ContactForm source="quote_request" variant="stitch" />
              </div>
            </AnimatedSection>
          </div>
        </PageSection>
      </div>
    </>
  );
}
