import {
  busImage,
  electricVehiclesImage,
  engineeringDesignImage,
  engineeringImage,
  industrialEquipmentImage,
  prototypingImage,
  railwaysImage,
  toolsAndDieImage,
  toolsDieImage,
} from '../assets/images';
import { productGalleryAssets } from '../assets/product gallery';
import { busFleet, designStudio, trainInterior } from '../assets/projects';

export type GallerySpan = 'standard' | 'wide' | 'tall';

export type ProductSpec = { label: string; value: string };

export type ProductGalleryItem = {
  id: string;
  title: string;
  category: string;
  image: string;
  images?: string[];
  caption: string;
  code?: string;
  overview?: string;
  highlights?: string[];
  specs?: ProductSpec[];
  materials?: string[];
  applications?: string[];
  compliance?: string[];
  featured?: boolean;
  span?: GallerySpan;
};

export const PRODUCT_GALLERY_CATEGORIES = [
  'Bus Body',
  'Railway',
  'Engineering Design',
  'Prototyping',
  'Tools & Die',
  'Composites',
  'Industrial',
] as const;

export const productGalleryItems: ProductGalleryItem[] = [
  {
    id: 'bus-body-platform',
    title: 'Bus Body Platform',
    code: 'FC-BB-01',
    category: 'Bus Body',
    image: busImage,
    caption: 'End-to-end bus body design, composite panels, and AIS 153-ready assembly.',
    overview:
      'Complete bus body architecture from structure and outer skin to interior fit-out. Engineered for OEM series production with lightweighting, crash paths, and serviceable joints.',
    highlights: ['AIS 153 ready', 'Composite + metal hybrid', 'Series assembly'],
    specs: [
      { label: 'Body type', value: 'City / intercity / staff bus' },
      { label: 'Structure', value: 'Aluminium / steel space frame' },
      { label: 'Skin', value: 'FRP composite & vacuum-formed panels' },
      { label: 'Weight save', value: 'Up to 25–30% vs steel-intensive body' },
      { label: 'Lead time', value: 'Prototype 6–10 weeks · series as programmed' },
      { label: 'Plant', value: 'Plant 1 Chakan MIDC · Plant 2 Bhosari MIDC' },
    ],
    materials: ['FRP / GFRP', 'Aluminium extrusions', 'Vacuum-formed ABS/PC', 'Structural adhesives'],
    applications: ['OEM bus programmes', 'Fleet refurbishment', 'Electric bus body platforms'],
    compliance: ['AIS 153', 'CMVR', 'OEM crash & durability protocols'],
    featured: true,
    span: 'wide',
  },
  {
    id: 'commercial-fleet',
    title: 'Commercial Fleet Bodies',
    code: 'FC-BB-02',
    category: 'Bus Body',
    image: busFleet,
    caption: 'Lightweight fleet bodywork engineered for series production.',
    overview:
      'Repeatable body modules for high-volume fleet operators — common parts, jigged assembly, and documented quality gates for every unit.',
    highlights: ['Modular jig assembly', 'Repeatable QC', 'Service access designed-in'],
    specs: [
      { label: 'Volume', value: 'Pilot to series fleet batches' },
      { label: 'Panel system', value: 'Bonded FRP with aluminium rails' },
      { label: 'Tolerance', value: '±1.5 mm aperture / frame fit' },
      { label: 'Finish', value: 'Paint-ready Class-A exterior skins' },
      { label: 'Inspection', value: 'CMM + visual / functional gates' },
    ],
    materials: ['FRP', 'Aluminium', 'PU adhesives', 'E-coat / paint-ready primers'],
    applications: ['Staff transport', 'City fleet', 'Intercity coaches'],
    compliance: ['AIS 153 structural checks', 'OEM dimensional reports'],
    featured: true,
    span: 'tall',
  },
  {
    id: 'ev-enclosure',
    title: 'EV Platform Components',
    code: 'FC-EV-03',
    category: 'Bus Body',
    image: electricVehiclesImage,
    caption: 'Electrification-ready structures and battery-adjacent body modules.',
    overview:
      'Lightweight body and enclosure parts for EV bus platforms — crash rails, underfloor interfaces, and composite covers designed with thermal and HV packaging in mind.',
    highlights: ['EV packaging', 'Crash-rail integration', 'Thermal clearances'],
    specs: [
      { label: 'Use', value: 'Battery-adjacent covers & body modules' },
      { label: 'Construction', value: 'Composite + aluminium hybrid' },
      { label: 'Simulation', value: 'Structural / thermal CAE correlation' },
      { label: 'Prototype', value: 'CNC + vacuum-bag first articles' },
    ],
    materials: ['Epoxy composites', 'Aluminium crash rails', 'Fire-retardant resins'],
    applications: ['Electric city buses', 'Battery pack covers', 'Underfloor body modules'],
    compliance: ['OEM HV packaging rules', 'Fire-retardant resin specs'],
  },
  {
    id: 'coach-interiors',
    title: 'Railway Coach Interiors',
    code: 'FC-RW-04',
    category: 'Railway',
    image: trainInterior,
    caption: 'RDSO-aligned interior modules for premium coach programmes.',
    overview:
      'Prefabricated interior panel families with integrated ribs, cable routes, and HVAC interfaces — built for rapid coach fit-out and RDSO documentation.',
    highlights: ['RDSO documentation', 'Clip-and-rail fit', 'Fire-retardant systems'],
    specs: [
      { label: 'Scope', value: 'Sidewall, ceiling, luggage & HVAC panels' },
      { label: 'Mounting', value: 'Modular clip-and-rail, no on-site drilling' },
      { label: 'Fire', value: 'FR resin systems to RDSO specification' },
      { label: 'Install', value: 'Prefabricated apertures for lighting / PA' },
    ],
    materials: ['Vacuum-formed FRP', 'Fire-retardant resins', 'Aluminium rails'],
    applications: ['AC coach interiors', 'Refurbishment cycles', 'Export rolling stock'],
    compliance: ['RDSO', 'RITES', 'OEM acoustic / fire tests'],
    featured: true,
    span: 'wide',
  },
  {
    id: 'railway-collage',
    title: 'Rolling Stock Components',
    code: 'FC-RW-05',
    category: 'Railway',
    image: railwaysImage,
    caption: 'Structural and interior railway parts manufactured to RITES protocols.',
    overview:
      'Coach body details, toilet modules, and structural fittings produced under railway quality gates for Indian Railways and export programmes.',
    highlights: ['RITES inspection', 'Modular toilet kits', 'Traceable lots'],
    specs: [
      { label: 'Components', value: 'Interiors, toilets, structural fittings' },
      { label: 'Quality', value: 'Lot traceability + NDT as specified' },
      { label: 'Docs', value: 'FAI, CoC, and inspection dossiers' },
    ],
    materials: ['FRP', 'Stainless interfaces', 'Fire-safe laminates'],
    applications: ['New-build coaches', 'Mid-life upgrades'],
    compliance: ['RDSO vendor protocols', 'RITES inspection'],
  },
  {
    id: 'class-a-studio',
    title: 'Class-A Surfacing Studio',
    code: 'FC-ED-06',
    category: 'Engineering Design',
    image: designStudio,
    caption: 'CAS modelling and production-ready Class-A surfaces.',
    overview:
      'Styling-to-tooling Class-A work: CAS, reflection analysis, and production surfaces that manufacturing can tool without rework loops.',
    highlights: ['Class-A continuity', 'VR review', 'Tooling-ready data'],
    specs: [
      { label: 'Software', value: 'Alias / ICEM / CATIA Class-A' },
      { label: 'Output', value: 'Production surfaces + strak data' },
      { label: 'Review', value: 'VR cockpit / reflection sessions' },
      { label: 'Handover', value: 'OEM-ready CAD packages' },
    ],
    materials: ['Digital CAS', 'Clay / FRP show models'],
    applications: ['Exterior skins', 'Interior volumes', 'Aero models'],
    compliance: ['OEM surfacing standards'],
    span: 'tall',
  },
  {
    id: 'engineering-design',
    title: 'Integrated Engineering Design',
    code: 'FC-ED-07',
    category: 'Engineering Design',
    image: engineeringDesignImage,
    caption: 'Concept through packaging design for automotive and railway OEMs.',
    overview:
      'Full engineering stack — concept, packaging, CAE, and drawing release — so design intent survives into tooling and series parts.',
    highlights: ['Concept to 2D/3D release', 'CAE loops', 'DFM built-in'],
    specs: [
      { label: 'Disciplines', value: 'Mechanical, packaging, CAE' },
      { label: 'CAD', value: 'CATIA / NX' },
      { label: 'Deliverables', value: '3D, drawings, BOM, DFMEA support' },
    ],
    materials: ['CAD / CAE datasets'],
    applications: ['Bus body', 'Railway interiors', 'Industrial frames'],
    compliance: ['OEM CAD quality checks'],
  },
  {
    id: 'engineering-deliverables',
    title: 'Design Deliverables',
    code: 'FC-ED-08',
    category: 'Engineering Design',
    image: engineeringImage,
    caption: 'CAD, CAE, and manufacturing documentation for series release.',
    overview:
      'Release packs that manufacturing and quality can run: drawings, inspection balloons, process notes, and revision control.',
    highlights: ['Rev-controlled packs', 'Inspection balloons', 'Build notes'],
    specs: [
      { label: 'Pack', value: '3D + 2D + BOM + process notes' },
      { label: 'QA', value: 'Ballooned drawings for CMM' },
      { label: 'Format', value: 'Native CAD + STEP / PDF' },
    ],
    materials: ['Native CAD', 'Neutral STEP/IGES'],
    applications: ['Tooling release', 'PPAP / FAI support'],
    compliance: ['ISO drawing practices', 'OEM transmittal rules'],
  },
  {
    id: 'rapid-prototyping',
    title: 'Rapid Prototyping Cell',
    code: 'FC-PR-09',
    category: 'Prototyping',
    image: prototypingImage,
    caption: '3D printing, CNC prototypes, and vacuum-cast validation parts.',
    overview:
      'Fast physical parts to lock design before tooling — additive, CNC, and vacuum casting chosen to the test that matters.',
    highlights: ['Days not months', 'Fit / function / show models', 'Tooling correlation'],
    specs: [
      { label: 'Processes', value: 'FDM / SLA, CNC, vacuum casting' },
      { label: 'Typical TAT', value: '2–10 days depending on process' },
      { label: 'Size', value: 'Hand samples to large body sections' },
    ],
    materials: ['Engineering plastics', 'Soft tooling resins', 'Machined metals'],
    applications: ['Design freeze', 'Fit-up jigs', 'Show / aero models'],
    compliance: ['Dimensional reports on request'],
    span: 'wide',
  },
  {
    id: 'tools-die',
    title: 'Precision Tools & Die',
    code: 'FC-TD-10',
    category: 'Tools & Die',
    image: toolsAndDieImage,
    caption: 'Wooden, epoxy, and metal tooling delivered at production speed.',
    overview:
      'Production and prototype tools — patterns, epoxy tools, and metal dies — sized to volume so you do not over-invest before the process is proven.',
    highlights: ['Wood / epoxy / metal', 'Short-run to series', 'In-house tryout'],
    specs: [
      { label: 'Tool types', value: 'Patterns, epoxy, metal forming tools' },
      { label: 'Tryout', value: 'In-house first-off validation' },
      { label: 'Life', value: 'Matched to prototype or series volume' },
    ],
    materials: ['Pattern timber', 'Epoxy tooling board', 'Tool steels'],
    applications: ['Composites forming', 'Vacuum forming', 'Press tools'],
    compliance: ['Tool tryout reports', 'Dimensional first-off'],
    featured: true,
    span: 'tall',
  },
  {
    id: 'tooling-shop',
    title: 'Tooling Shop',
    code: 'FC-TD-11',
    category: 'Tools & Die',
    image: toolsDieImage,
    caption: 'Shop-floor tooling for composites, forming, and assembly.',
    overview:
      'Jigs, fixtures, and forming aids that hold rate and repeatability on the shop floor at Chakan and Bhosari.',
    highlights: ['Assembly jigs', 'Forming fixtures', 'Poka-yoke locators'],
    specs: [
      { label: 'Scope', value: 'Jigs, fixtures, checking gauges' },
      { label: 'Accuracy', value: 'Locator strategy to part GD&T' },
    ],
    materials: ['Fabricated steel', 'Machined locators', 'Wear pads'],
    applications: ['Body assembly', 'Composite layup', 'Inspection'],
    compliance: ['Fixture capability studies as specified'],
  },
  {
    id: 'industrial-equipment',
    title: 'Industrial Equipment Parts',
    code: 'FC-IN-12',
    category: 'Industrial',
    image: industrialEquipmentImage,
    caption: 'High-cycle components for handling, packaging, and plant equipment.',
    overview:
      'Guards, trays, frames, and formed parts for plant machinery — designed for duty cycle, washdown, and service access.',
    highlights: ['High-cycle duty', 'Custom dunnage / trays', 'Plant-ready finishes'],
    specs: [
      { label: 'Parts', value: 'Trays, guards, frames, enclosures' },
      { label: 'Duty', value: 'Continuous industrial cycle' },
      { label: 'Finish', value: 'Paint / powder / as-specified' },
    ],
    materials: ['Metals', 'Engineering plastics', 'Composites'],
    applications: ['Material handling', 'Packaging lines', 'SPM frames'],
    compliance: ['Customer FAT / incoming inspection'],
    span: 'wide',
  },
];

export function productSlides(item: Pick<ProductGalleryItem, 'image' | 'images'>): string[] {
  return [...new Set([item.image, ...(item.images || [])].filter(Boolean))];
}

productGalleryItems.forEach((item, index) => {
  const extraA = productGalleryAssets[index % productGalleryAssets.length];
  const extraB = productGalleryAssets[(index + 4) % productGalleryAssets.length];
  item.images = [item.image, extraA, extraB].filter((src, i, all) => all.indexOf(src) === i);
});
