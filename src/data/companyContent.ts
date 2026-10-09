/** Flux Corp website content sourced from company brochure (DOC-20260323-WA0015) */

import { busImage, electricVehiclesImage, industrialEquipmentImage, railwaysImage, toolsDieImage, toolsAndDieImage, engineeringDesignImage } from '../assets/images';

export const company = {
  name: 'Flux Corporation',
  tagline: 'Engineering the Future of Mobility and Infrastructure',
  phone: '+91 75592 46461',
  email: 'Info@fluxcorporation.in',
  emails: ['Info@fluxcorporation.in', 'Info.fluxcorp@gmail.com'],
  website: 'www.fluxcorporation.in',
  locations: [
    { name: 'Registered office', address: 'Chikhali, Pune' },
    { name: 'Manufacturing facility — Plant 1', address: 'Chakan MIDC, Pune' },
    { name: 'Manufacturing facility — Plant 2', address: 'Bhosari MIDC, Pune' },
  ],
  addressSummary:
    'Registered office — Chikhali, Pune. Manufacturing facility — Plant 1 Chakan MIDC, Pune; Plant 2 Bhosari MIDC, Pune.',
};

export const about = {
  overview: [
    'Flux Corp stands at the forefront of integrated engineering solutions, delivering a comprehensive approach that spans research and development, specification, prototyping, and the delivery of fully assembled parts. With a strong foundation in both technical expertise and creative design, Flux Corp is uniquely positioned to serve the evolving needs of the bus body manufacturing and railway parts sectors, both within India and globally.',
    'Our core philosophy is to provide clients with a seamless experience across the entire product lifecycle — from concept development and material selection through joining, inspection, and material implementation. By embracing a holistic methodology, Flux Corp ensures that every project benefits from rigorous engineering, innovative styling, and robust quality assurance.',
    'Operating from a registered office in Chikhali and manufacturing plants at Chakan MIDC and Bhosari MIDC, Pune, Flux Corporation leverages state-of-the-art equipment and a highly skilled workforce to deliver solutions that meet the highest standards of precision, durability, and regulatory compliance.',
  ],
  vision: 'To be the most trusted integrated engineering and manufacturing partner for bus body, railway, automotive, and industrial sectors globally — from initial consultation through series production.',
  mission: 'Deliver end-to-end engineering solutions and world-class manufacturing through advanced technology, regulatory compliance, and a customer-centric approach across the full product lifecycle.',
  philosophy: [
    'Seamless product lifecycle support',
    'Holistic engineering and styling integration',
    'Rigorous quality assurance at every stage',
    'Performance, safety, and sustainability by design',
  ],
};

export const heroSlides = [
  {
    label: 'Integrated Engineering',
    title: 'Engineering the Future of Mobility',
    description:
      'Integrated design, composites, prototyping, and tools & die solutions for bus body and railway parts manufacturing — from concept to series production.',
    image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1400&q=80',
    cta: { label: 'Request Quote', href: '/contact' },
    secondary: { label: 'Our Services', href: '/services' },
  },
  {
    label: 'Bus Body Manufacturing',
    title: 'Lightweight Composite Bus Bodies',
    description:
      'FRP and vacuum-formed panels engineered for fuel efficiency, AIS 153 compliance, and electrification-ready lightweighting across commercial fleets.',
    image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=1400&q=80',
    cta: { label: 'View Projects', href: '/projects' },
    secondary: { label: 'Case Studies', href: '/case-studies' },
  },
  {
    label: 'Railway Components',
    title: 'RDSO-Certified Railway Solutions',
    description:
      'Coach interiors, structural components, and toilet modules manufactured to RDSO and RITES standards for Indian Railways and export markets.',
    image: railwaysImage,
    cta: { label: 'Railway Services', href: '/services/railway-components' },
    secondary: { label: 'Certifications', href: '/certifications' },
  },
  {
    label: 'Tools & Die',
    title: 'Precision Tooling Solutions',
    description:
      'Precision tooling solutions for manufacturing excellence — wooden, epoxy, and metal tools delivered at speed without compromising quality.',
    image: toolsDieImage,
    cta: { label: 'Tools & Die Services', href: '/services/tools-die' },
    secondary: { label: 'Our Services', href: '/services' },
  },
  {
    label: 'Automotive Styling',
    title: 'Class-A Surfacing & CAS Modeling',
    description:
      'From concept sketches to production-ready surfaces — CAS, VR simulation, and full-scale model shop capabilities for global OEM programs.',
    image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=1400&q=80',
    cta: { label: 'Styling Services', href: '/services/automotive-styling' },
    secondary: { label: 'About Us', href: '/about' },
  },
];

export const homeBannerSections = [
  {
    label: 'End-to-End Capability',
    title: 'From R&D to Fully Assembled Parts',
    description:
      'Flux Corp offers integrated services spanning concept development, material qualification, prototyping, tooling, production, joining, and inspection — structured to support modern vehicle and railway component manufacturing at scale.',
    image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=1200&q=80',
    reverse: false,
    link: { label: 'Explore Services', href: '/services' },
  },
  {
    label: 'Manufacturing Excellence',
    title: 'Chakan MIDC & Bhosari MIDC Plants',
    description:
      'Our Pune facilities house CNC machining centers, 3D printing, vacuum forming, compression molding, model shops, and NDT/CMM inspection laboratories — scalable from prototype to full production.',
    image: 'https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=1200&q=80',
    reverse: true,
    link: { label: 'Tour Our Facilities', href: '/facilities' },
  },
  {
    label: 'Quality & Compliance',
    title: 'Certified for Global Standards',
    description:
      'ISO 9001, IATF 16949, RDSO, and RITES certifications with compliance to AIS 153, CMVR, and international EN standards — ensuring every component meets the most demanding requirements.',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&q=80',
    reverse: false,
    link: { label: 'View Certifications', href: '/certifications' },
  },
];

export const servicesContent: Record<
  string,
  { intro: string; detail?: string; capabilities: string[]; deliverables?: string[]; image: string }
> = {
  'engineering-design': {
    intro:
      'Engineering design is the cornerstone of all successful products. At Flux Corp, we blend advanced technology with aesthetic sensibility to deliver engineering solutions that are both functional and visually compelling.',
    capabilities: [
      'Concept development and feasibility studies',
      'Functional model creation and prototyping',
      'Kinematic and functional analysis',
      'Design space examinations and packaging',
      'Detailed design, drafting, and geometric integration',
      'Tolerance analysis and series production support',
    ],
    deliverables: [
      'Interior: instrument panels, consoles, door panels, switch systems, acoustic components',
      'Exterior: fascias, bumpers, lighting, doors, escape hatches, wheel arches, side panels',
    ],
    image: engineeringDesignImage,
  },
  'composites-forming': {
    intro:
      'Flux Corp specializes in fiber-reinforced materials and vacuum-formed plastic parts — lightweight, high-strength solutions for automotive and railway applications.',
    capabilities: [
      'Material consultation and design assessment',
      'Concept analysis and process selection',
      'Material qualification and production technology development',
      'Tool concept development and weight estimation',
      'Safety strategies and design principles',
      'Proto and production tool development for FRP and VF',
      'Part supply and scalable production systems',
    ],
    image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=1000&q=80',
  },
  prototyping: {
    intro:
      'Rapid prototyping validates designs and accelerates product development. Flux Corp delivers high-quality prototypes quickly through advanced technologies and close client collaboration.',
    capabilities: [
      '3D printing for complex geometries',
      'CNC machining from metals, plastics, and composites',
      'Vacuum casting for production-like properties',
      'Hand layup and spray-up for custom FRP parts',
      'Fast turnaround within days',
      'Functional and dimensional testing',
    ],
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1000&q=80',
  },
  'tools-die': {
    intro:
      'Precision tooling solutions for manufacturing excellence. Flux Corp rapid tooling services deliver high-quality tools in the shortest timescales without compromising precision.',
    capabilities: [
      'Wooden tools for prototyping and concept validation',
      'Epoxy tools for short-run and complex geometries',
      'Metal tools for high-volume production',
      'Epoxy-aluminium hybrid tools for specialized applications',
      '1:1 scale models, aero models, and running models',
    ],
    image: toolsAndDieImage,
  },
  'automotive-styling': {
    intro:
      'Our styling division helps clients realize creative vision while ensuring manufacturability and ergonomic excellence through advanced digital tools and deep vehicle aesthetics expertise.',
    capabilities: [
      'Computer-Aided Styling (CAS) and Class-A surfacing',
      'Whole exterior body development',
      'Interior component design',
      'Reflection analysis and ergonomic compensation',
      'Virtual reality interaction and cockpit simulation',
      'Exterior/interior volumetric models and aero models',
    ],
    image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=1000&q=80',
  },
  'bus-body-manufacturing': {
    intro:
      'End-to-end bus body design and manufacturing with expertise in structural design, composite panels, and assembly for commercial vehicle OEMs — optimized for lightweighting and AIS 153 compliance.',
    capabilities: [
      'Structural bus body engineering',
      'FRP composite panel manufacturing',
      'Vacuum-formed interior and exterior panels',
      'Assembly and integration support',
      'EV-ready lightweighting solutions',
    ],
    image: busImage,
  },
  'railway-components': {
    intro:
      'RDSO-approved railway component engineering and manufacturing meeting RDSO and RITES standards for rolling stock applications across Indian Railways and export markets.',
    capabilities: [
      'Coach body and interior panel design',
      'Railway toilet module development',
      'Fire-safe composite interior fittings',
      'Structural components for rolling stock',
      'Regulatory compliance testing',
    ],
    image: railwaysImage,
  },
  'industrial-components': {
    intro:
      'Custom industrial component engineering and production for material handling, packaging systems, and special-purpose equipment across diverse industrial sectors.',
    detail:
      'Flux Corporation partners with OEMs, system integrators, and plant operators to deliver robust components engineered for high-cycle duty, tight tolerances, and reliable field performance. Our Plant 1 at Chakan MIDC and Plant 2 at Bhosari MIDC combine CAD-driven design, CNC machining, composites forming, and assembly support — helping you move from concept validation to repeatable series production with shorter lead times.',
    capabilities: [
      'Packaging trays, dunnage, and logistics handling solutions',
      'Conveyor, crane, and material handling sub-assemblies',
      'Special-purpose machine frames, guards, and enclosures',
      'Precision CNC machined parts in metals, plastics, and composites',
      'Vacuum-formed and FRP panels for industrial equipment',
      'Prototype builds, pilot runs, and scalable production support',
    ],
    image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=1000&q=80',
  },
};

const staticServiceTitles: Record<string, string> = {
  'engineering-design': 'Engineering Design',
  'composites-forming': 'Composites & Forming',
  prototyping: 'Prototyping',
  'tools-die': 'Tools & Die',
  'automotive-styling': 'Automotive Styling',
  'bus-body-manufacturing': 'Bus Body Manufacturing',
  'railway-components': 'Railway Components',
  'industrial-components': 'Industrial Components',
};

export function getStaticServices() {
  return Object.entries(servicesContent).map(([slug, content], id) => ({
    id,
    parent_id: null,
    slug,
    title: staticServiceTitles[slug] ?? slug,
    short_description: content.intro.length > 120 ? `${content.intro.slice(0, 120)}…` : content.intro,
  }));
}

export function getStaticServiceBySlug(slug: string) {
  const content = servicesContent[slug];
  if (!content) return undefined;
  return {
    id: 0,
    parent_id: null,
    slug,
    title: staticServiceTitles[slug] ?? slug,
    short_description: content.intro.length > 150 ? `${content.intro.slice(0, 150)}…` : content.intro,
  };
}

export const industriesContent = [
  {
    slug: 'automotive',
    title: 'Automotive',
    description: 'Passenger and commercial vehicle engineering solutions.',
    items: [
      'Passenger vehicles — interior and exterior components for cars and SUVs',
      'Commercial vehicles — robust parts for trucks and buses',
      'Construction equipment — cabs, panels, and structural parts',
      'Electric vehicles — lightweighting and advanced materials',
      'Ambulance & utility vehicle conversions',
    ],
    image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1000&q=80',
  },
  {
    slug: 'commercial-vehicles',
    title: 'Commercial Vehicles',
    description: 'Truck, bus, and specialty vehicle solutions.',
    items: [
      'Complete bus body engineering',
      'Composite panel lightweighting',
      'Fleet modernization programs',
      'Electric and hybrid bus platforms',
    ],
    image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=1000&q=80',
  },
  {
    slug: 'electric-vehicles',
    title: 'Electric Vehicles',
    description: 'EV platform design and lightweighting solutions.',
    items: [
      'Battery enclosure engineering',
      'Lightweight composite structures',
      'Thermal management components',
      'EV bus and fleet platform lightweighting',
    ],
    image: electricVehiclesImage,
  },
  {
    slug: 'railways',
    title: 'Railways',
    description: 'RDSO-certified railway component manufacturing.',
    items: [
      'Coach body design and manufacture',
      'Railway toilet modules',
      'Interior panels, linings, and functional components',
      'RDSO and RITES compliant production',
    ],
    image: railwaysImage,
  },
  {
    slug: 'industrial-equipment',
    title: 'Industrial Equipment',
    description: 'Heavy machinery and industrial component engineering.',
    items: [
      'Mining and construction equipment components',
      'Process industry machinery parts',
      'Precision tooling and production dies',
      'Custom industrial assemblies',
    ],
    image: industrialEquipmentImage,
  },
  {
    slug: 'material-handling',
    title: 'Material Handling',
    description: 'Conveyor, crane, and handling system components.',
    items: [
      'Conveyor and lift structural components',
      'Operator cabins and enclosures',
      'Automated system integration parts',
      'Material handling equipment upgrades',
    ],
    image: 'https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=1000&q=80',
  },
  {
    slug: 'packaging-systems',
    title: 'Packaging Systems',
    description: 'Automated packaging machinery components.',
    items: [
      'Custom packaging trays for logistics',
      'Automated packaging line components',
      'Precision enclosures and guards',
      'Special-purpose packaging equipment',
    ],
    image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=1000&q=80',
  },
  {
    slug: 'industrial',
    title: 'Industrial',
    description: 'Material handling, packaging, and bespoke industrial equipment solutions.',
    items: [
      'Custom packaging trays',
      'Conveyor and lift components',
      'Automated system parts',
      'Special purpose equipment',
    ],
    image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=1000&q=80',
  },
];

export const certifications = [
  { title: 'ISO 9001', category: 'Quality Management', description: 'Quality management systems for consistent product quality across all operations.', issuedBy: 'International Organization for Standardization' },
  { title: 'IATF 16949', category: 'Automotive Quality', description: 'Automotive sector-specific quality management for OEM-grade manufacturing.', issuedBy: 'International Automotive Task Force' },
  { title: 'RDSO Approval', category: 'Railway Compliance', description: 'Research Design and Standards Organisation approval for railway components.', issuedBy: 'Indian Railways RDSO' },
  { title: 'RITES Certification', category: 'Railway Systems', description: 'Certification for railway equipment and systems meeting Indian Railways standards.', issuedBy: 'RITES Ltd.' },
];

export const regulatoryStandards = ['AIS 153 — Bus body building norms', 'CMVR — Central Motor Vehicle Rules', 'ISO & EN international benchmarks', 'RDSO & RITES railway standards'];

export const facilitiesContent = [
  {
    slug: 'chikhali',
    name: 'Registered office — Chikhali',
    location: 'Chikhali, Pune',
    description:
      'Registered office of Flux Corporation, supporting operations, coordination, and client engagement in Pune.',
    equipment: ['Operations & administration', 'Client coordination', 'Quality documentation'],
    image: 'https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=1000&q=80',
  },
  {
    slug: 'chakan',
    name: 'Plant 1 — Chakan MIDC',
    location: 'Chakan MIDC, Pune',
    description:
      'Manufacturing facility at Chakan MIDC for production, design support, and prototyping with scalable capacity.',
    equipment: ['CNC machining centers', '3D printing & additive manufacturing', 'Model shop — clay, FRP, MDF models', 'CAS and Class-A surfacing workstations', 'CNC prototype machining'],
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1000&q=80',
  },
  {
    slug: 'bhosari',
    name: 'Plant 2 — Bhosari MIDC',
    location: 'Bhosari MIDC, Pune',
    description:
      'Manufacturing facility at Bhosari MIDC for bus body, composite forming, and assembly operations.',
    equipment: ['Vacuum forming & compression molding', 'FRP hand layup and spray-up', 'Assembly bays', 'NDT and CMM inspection labs'],
    image: 'https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=1000&q=80',
  },
];

export const qualityAssurance = {
  joining: ['Adhesive bonding for composites', 'Mechanical fastening for serviceability', 'Welding and brazing for metal components'],
  inspection: ['Non-destructive testing (ultrasonic, radiographic, eddy current)', 'CMM high-precision dimensional inspection', 'Visual and functional inspection'],
  testing: ['Environmental testing — temperature, humidity, vibration', 'Fatigue and tolerance testing', 'Functional testing', 'Regulatory compliance testing'],
};

export const supplyChain = {
  sourcing: ['Strategic sourcing with reliable suppliers', 'Inventory management for just-in-time production', 'Supplier audits and quality control'],
  logistics: ['Customs documentation and clearance', 'Export certifications for international markets', 'Efficient transportation network'],
};

export { caseStudiesStatic } from './caseStudiesContent';

export const marketTrends = {
  bus: [
    'Urban mobility growth driving demand for new buses and coaches',
    'Fleet modernization replacing aging vehicles with safer, modern designs',
    'Electrification creating opportunities for lightweight composites',
    'Stricter AIS 153 and environmental regulations increasing certified component demand',
  ],
  railway: [
    'Rail network expansion driving coach and interior component demand',
    'Advanced composites and modular designs for lighter rolling stock',
    'Enhanced passenger comfort and safety as standard requirements',
  ],
};

export const commercialTerms = {
  pricing: ['Fixed-price contracts for defined projects', 'Time-and-materials for evolving development', 'Volume-based pricing for high-volume runs'],
  terms: ['Transparent quotations with detailed deliverables', 'Milestone-based payments', 'Comprehensive warranty and after-sales support'],
  timelines: ['Rapid prototyping within days', 'Optimized tooling lead times', 'On-time delivery through efficient project management'],
};

export const partners = [
  'Ashok Leyland', 'Tata Motors', 'Indian Railways', 'Mahindra', 'Force Motors', 'Volvo', 'Eicher', 'Pennar Industries', 'JBM Auto',
];

export const blogArticles = [
  {
    slug: 'composite-lightweighting-bus-bodies',
    title: 'Composite Lightweighting for Modern Bus Bodies',
    category: 'Composites',
    excerpt: 'How FRP and vacuum forming enable AIS 153 compliance while reducing fleet operating costs through strategic lightweighting.',
    readTime: 6,
  },
  {
    slug: 'rdso-railway-component-guide',
    title: 'A Guide to RDSO-Approved Railway Components',
    category: 'Railways',
    excerpt: 'Understanding RDSO vendor approval, RITES certification, and the quality protocols required for Indian Railways supply.',
    readTime: 8,
    banner: railwaysImage,
  },
  {
    slug: 'rapid-prototyping-workflows',
    title: 'Rapid Prototyping Workflows That Accelerate Time-to-Market',
    category: 'Prototyping',
    excerpt: 'From 3D printing to vacuum casting — selecting the right prototyping technology for automotive and railway programs.',
    readTime: 5,
  },
];

export const careersStatic = [
  { slug: 'senior-design-engineer', title: 'Senior Design Engineer', department: 'Engineering Design', location: 'Plant 1, Chakan MIDC, Pune', type: 'Full-time', description: 'Lead concept-to-production engineering for automotive and railway interior/exterior programs.', requirements: 'B.E./B.Tech in Mechanical/Automotive, 5+ years CAD/CAE experience, CATIA/NX proficiency.' },
  { slug: 'composite-process-engineer', title: 'Composite Process Engineer', department: 'Composites & Forming', location: 'Plant 2, Bhosari MIDC, Pune', type: 'Full-time', description: 'Develop FRP and vacuum forming processes, material qualification, and production tooling.', requirements: 'B.E./B.Tech in Materials/Mechanical, 3+ years composites manufacturing experience.' },
  { slug: 'quality-inspection-specialist', title: 'Quality & Inspection Specialist', department: 'Quality Assurance', location: 'Plant 1, Chakan MIDC, Pune', type: 'Full-time', description: 'Manage NDT, CMM inspection, and regulatory compliance testing across production lines.', requirements: 'Diploma/Degree in Quality/Mechanical, NDT Level II certification preferred, ISO audit experience.' },
];
