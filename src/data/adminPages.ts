export type WebsitePageId =
  | 'home'
  | 'about'
  | 'services'
  | 'projects'
  | 'industries'
  | 'case-studies'
  | 'certifications'
  | 'facilities'
  | 'careers'
  | 'blog'
  | 'contact';

export type SitePageCopy = {
  label: string;
  title: string;
  subtitle: string;
  body: string;
  bannerImage: string;
};

export const PAGE_FALLBACKS: Record<WebsitePageId, SitePageCopy> = {
  home: {
    label: 'Home',
    title: 'Engineering the Future of Mobility',
    subtitle: 'Integrated engineering design, composites, prototyping, and manufacturing for bus body and railway parts.',
    body: '',
    bannerImage: '',
  },
  about: {
    label: 'About Us',
    title: 'Integrated Engineering Solutions',
    subtitle: 'Research, specification, prototyping, and fully assembled parts for bus body and railway manufacturing.',
    body: '',
    bannerImage: '',
  },
  services: {
    label: 'Products & Services',
    title: 'Integrated Manufacturing Services',
    subtitle: 'End-to-end support from initial design through final production and assembly.',
    body: '',
    bannerImage: '',
  },
  projects: {
    label: 'Portfolio',
    title: 'Our Projects',
    subtitle: 'Proven engineering across bus body lightweighting, railway interiors, and industrial applications.',
    body: '',
    bannerImage: '',
  },
  industries: {
    label: 'Industries Served',
    title: 'Sectors We Serve',
    subtitle: 'Integrated solutions tailored to transportation and industrial regulatory environments.',
    body: '',
    bannerImage: '',
  },
  'case-studies': {
    label: 'Portfolio',
    title: 'Case Studies',
    subtitle: 'Real-world results demonstrating our integrated engineering capabilities.',
    body: '',
    bannerImage: '',
  },
  certifications: {
    label: 'Compliance',
    title: 'Certifications & Standards',
    subtitle: 'Quality, safety, and regulatory approvals for automotive and railway manufacturing.',
    body: '',
    bannerImage: '',
  },
  facilities: {
    label: 'Manufacturing',
    title: 'Our Facilities',
    subtitle: 'State-of-the-art equipment in Chikhali and Chakan, Pune — scalable from prototype to production.',
    body: '',
    bannerImage: '',
  },
  careers: {
    label: 'Careers',
    title: 'Build With Us',
    subtitle: 'Join a team delivering integrated engineering for mobility and infrastructure.',
    body: '',
    bannerImage: '',
  },
  blog: {
    label: 'Insights',
    title: 'Engineering Blog',
    subtitle: 'In-depth articles for engineers, procurement professionals, and decision-makers.',
    body: '',
    bannerImage: '',
  },
  contact: {
    label: 'Contact',
    title: 'Get In Touch',
    subtitle: 'Project consultations, technical inquiries, and partnership opportunities.',
    body: '',
    bannerImage: '',
  },
};

export const WEBSITE_PAGES: {
  id: WebsitePageId;
  nav: string;
  publicPath: string;
  related: { label: string; to: string }[];
}[] = [
  { id: 'home', nav: 'Home', publicPath: '/', related: [{ label: 'Media library', to: '/admin/media' }, { label: 'Company settings', to: '/admin/settings' }] },
  { id: 'about', nav: 'About', publicPath: '/about', related: [{ label: 'Company settings', to: '/admin/settings' }, { label: 'Facilities records', to: '/admin/facilities' }] },
  { id: 'services', nav: 'Services', publicPath: '/services', related: [{ label: 'Service catalogue', to: '/admin/services' }] },
  { id: 'projects', nav: 'Projects', publicPath: '/projects', related: [{ label: 'Project records', to: '/admin/projects' }] },
  { id: 'industries', nav: 'Industries', publicPath: '/industries', related: [{ label: 'Project records', to: '/admin/projects' }] },
  { id: 'case-studies', nav: 'Case studies', publicPath: '/case-studies', related: [{ label: 'Case study records', to: '/admin/case-studies' }] },
  { id: 'certifications', nav: 'Certifications', publicPath: '/certifications', related: [{ label: 'Certification records', to: '/admin/certifications' }] },
  { id: 'facilities', nav: 'Facilities', publicPath: '/facilities', related: [{ label: 'Facility records', to: '/admin/facilities' }] },
  { id: 'careers', nav: 'Careers', publicPath: '/careers', related: [{ label: 'Job records', to: '/admin/careers' }] },
  { id: 'blog', nav: 'Blog', publicPath: '/blog', related: [{ label: 'Blog posts', to: '/admin/blogs' }] },
  { id: 'contact', nav: 'Contact', publicPath: '/contact', related: [{ label: 'Leads inbox', to: '/admin/leads' }] },
];
