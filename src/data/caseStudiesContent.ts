export interface CaseStudyContent {
  slug: string;
  title: string;
  industry: string;
  client: string;
  duration: string;
  scope: string;
  overview: string;
  challenge: string;
  challengePoints: string[];
  solution: string;
  approach: { title: string; description: string }[];
  outcome: string;
  outcomePoints: string[];
  metrics: { label: string; value: string }[];
  technologies: string[];
  standards: string[];
  services: string[];
}

export const caseStudiesContent: CaseStudyContent[] = [
  {
    slug: 'bus-body-lightweighting',
    title: 'Bus Body Lightweighting',
    industry: 'Commercial Vehicles',
    client: 'Regional Transit Operator',
    duration: '8 months',
    scope: 'Full bus body panel redesign and structural validation',
    overview:
      'A leading regional transit operator approached Flux Corp to redesign their inter-city bus body structure with a primary focus on weight reduction. Rising fuel costs and tightening AIS 153 structural requirements meant the existing steel-intensive panel design was no longer competitive. Flux Corp delivered a complete composite-aluminium hybrid body solution — from concept CAD through FEA validation, prototype build, and production-ready documentation.',
    challenge:
      'The client\'s existing bus body relied heavily on conventional steel panels that added significant tare weight, reducing passenger capacity and increasing fuel consumption across long-distance routes. Regulatory updates under AIS 153 demanded improved crashworthiness and rollover performance, while the operator needed to maintain panel durability against road debris, UV exposure, and repeated wash cycles without increasing maintenance intervals.',
    challengePoints: [
      'Reduce overall body-in-white weight by at least 20% without compromising structural integrity',
      'Meet updated AIS 153 crash and rollover load cases for side-impact and roof crush scenarios',
      'Maintain panel fit-and-finish tolerances for modular assembly at the client\'s production line',
      'Ensure composite panels withstand 10-year service life including UV, moisture, and abrasion exposure',
      'Deliver production-ready tooling data within an aggressive 8-month programme timeline',
    ],
    solution:
      'Flux Corp engineered a modular FRP composite panel system bonded to a lightweight aluminium space-frame substructure. Advanced CAE simulation was used to optimise ply lay-up schedules and rib geometry before any tooling investment. Vacuum-infused composite panels with integrated stiffening ribs replaced stamped steel sections on non-structural surfaces, while critical load paths were retained in aluminium extrusions for predictable crash energy absorption.',
    approach: [
      {
        title: 'Structural Simulation & Optimisation',
        description:
          'Full vehicle-level FEA models were built to evaluate side-impact, rollover, and torsion load cases per AIS 153. Composite ply schedules were iterated in HyperWorks to minimise weight while maintaining factor of safety targets.',
      },
      {
        title: 'Material Qualification & Testing',
        description:
          'FRP laminate coupons underwent tensile, flexural, and impact testing. Environmental ageing tests validated UV and moisture resistance over accelerated 10-year equivalent exposure cycles.',
      },
      {
        title: 'Prototype Build & Validation',
        description:
          'A full-scale prototype section was manufactured at Flux Corp\'s facility, including roof bow, side panel, and window aperture assemblies. Dimensional inspection confirmed ±1.5 mm fit tolerances against the aluminium frame.',
      },
      {
        title: 'Production Documentation',
        description:
          'Complete manufacturing drawings, BOM, assembly sequence, and QC checklists were delivered for the client\'s line integration — enabling a seamless transition from prototype to series production.',
      },
    ],
    outcome:
      'The lightweighted bus body platform achieved a 22% reduction in panel weight compared to the baseline steel design, translating to measurable fuel savings and increased payload capacity. All AIS 153 structural load cases were passed on the first validation round, and the client proceeded to series tooling with zero design rework. The modular panel architecture also simplified future variant development for the operator\'s expanding fleet.',
    outcomePoints: [
      '22% reduction in body panel weight across the full body-in-white',
      'First-pass clearance on all AIS 153 structural load cases',
      'Improved fuel efficiency estimated at 6–8% on long-haul routes',
      'Modular panel system enabling faster variant changeovers on the production line',
      'Zero tooling rework required before series production release',
    ],
    metrics: [
      { value: '22%', label: 'Weight Reduction' },
      { value: '8 mo', label: 'Programme Duration' },
      { value: '0', label: 'Tooling Rework Cycles' },
      { value: 'AIS 153', label: 'Compliance Achieved' },
    ],
    technologies: [
      'HyperWorks FEA & structural optimisation',
      'Vacuum infusion composite manufacturing',
      'Aluminium extrusion space-frame design',
      '3D CAD (CATIA) surface and solid modelling',
      'CMM dimensional validation',
    ],
    standards: [
      'AIS 153 — Bus body construction and approval',
      'AIS 052 — Fire retardancy for passenger compartment materials',
      'CMVR — Central Motor Vehicle Rules compliance',
    ],
    services: ['Engineering Design', 'Composites & Forming', 'Prototyping', 'Bus Body Manufacturing'],
  },
  {
    slug: 'railway-coach-interiors',
    title: 'Railway Coach Interior Components',
    industry: 'Railways',
    client: 'Indian Railways Tier-1 Supplier',
    duration: '10 months',
    scope: 'Modular interior panel system for premium AC coaches',
    overview:
      'Flux Corp partnered with a Tier-1 Indian Railways supplier to design and manufacture a complete modular interior panel system for premium air-conditioned coaches. The project required fire-retardant composite panels that could be rapidly installed during coach refurbishment cycles, while meeting RDSO\'s stringent safety and durability specifications. The result was a fully qualified interior module that reduced fit-out time and improved passenger experience across the fleet.',
    challenge:
      'Indian Railway coach refurbishment programmes operate under tight turnaround windows — interior fit-out must be completed within days, not weeks. Existing interior panels were heavy, difficult to install, and did not consistently meet updated RDSO fire safety classifications. The client needed a lightweight, modular panel system with integrated cable routing and HVAC ducting channels that could be prefabricated off-site and snap-fitted during coach assembly.',
    challengePoints: [
      'Achieve RDSO fire safety classification for all interior surface materials',
      'Design modular panels enabling 40% faster installation vs. conventional fit-out',
      'Integrate HVAC ducting channels and electrical cable routing within panel thickness',
      'Meet durability requirements for 15-year service life including vandalism resistance',
      'Ensure acoustic performance targets for passenger comfort in AC coaches',
      'Support multiple coach configurations with a single modular panel family',
    ],
    solution:
      'Flux Corp developed a family of vacuum-formed FRP composite interior panels with integrated structural ribs, cable channels, and HVAC plenum sections. Fire-retardant resin systems were qualified to RDSO specifications, and a modular clip-and-rail mounting system eliminated on-site drilling. Panels were prefabricated at Flux Corp\'s facility with pre-cut apertures for lighting, PA speakers, and luggage rack interfaces.',
    approach: [
      {
        title: 'RDSO Specification Review',
        description:
          'Full review of applicable RDSO circulars for fire safety, material classification, and interior fit-out standards. Material resin systems were selected and tested against flame spread and smoke density requirements.',
      },
      {
        title: 'Modular Panel Architecture',
        description:
          'A clip-and-rail mounting system was designed for tool-free installation. Panel modules were sized for standard coach bay dimensions with adjustable end-caps to accommodate minor structural variations across coach types.',
      },
      {
        title: 'Integrated Services Routing',
        description:
          'HVAC supply plenums and electrical cable channels were moulded directly into panel sections, eliminating separate trunking and reducing overall fit-out complexity on the refurbishment line.',
      },
      {
        title: 'Prototype Fit-Out & RDSO Testing',
        description:
          'A full coach bay mock-up was assembled at Flux Corp\'s facility. Fire testing, acoustic measurement, and installation time studies were conducted before submitting documentation for RDSO approval.',
      },
    ],
    outcome:
      'The modular interior system reduced on-site installation time by 42% compared to the client\'s previous panel fit-out process. Full RDSO fire safety certification was obtained, and the panel family was approved for deployment across two coach configurations. Passenger comfort scores improved measurably due to integrated acoustic damping and cleaner interior aesthetics.',
    outcomePoints: [
      '42% reduction in on-site interior installation time',
      'Full RDSO fire safety certification on first submission',
      '15-year durability validated through accelerated ageing and impact testing',
      'Single modular panel family supporting multiple coach configurations',
      'Integrated HVAC and electrical routing eliminating separate trunking runs',
    ],
    metrics: [
      { value: '42%', label: 'Faster Installation' },
      { value: '10 mo', label: 'Programme Duration' },
      { value: 'RDSO', label: 'Certification Obtained' },
      { value: '15 yr', label: 'Design Service Life' },
    ],
    technologies: [
      'Vacuum forming & FRP composite manufacturing',
      'Fire-retardant resin qualification testing',
      'Modular clip-and-rail mounting systems',
      'Integrated HVAC plenum moulding',
      'Acoustic damping material integration',
    ],
    standards: [
      'RDSO fire safety and material classification',
      'RITES technical specifications for coach interiors',
      'Indian Railways coach refurbishment standards',
    ],
    services: ['Engineering Design', 'Composites & Forming', 'Prototyping', 'Industrial Components'],
  },
  {
    slug: 'ev-battery-enclosure',
    title: 'EV Battery Enclosure Engineering',
    industry: 'Electric Vehicles',
    client: 'Electric Bus OEM Startup',
    duration: '6 months',
    scope: 'Crash-safe composite battery enclosure for electric bus platform',
    overview:
      'An electric bus OEM startup engaged Flux Corp to engineer a production-ready battery enclosure for their new urban transit platform. The enclosure had to protect high-voltage battery modules during crash events, meet stringent thermal management requirements, and integrate within tight underfloor packaging constraints — all while achieving significant weight savings over a conventional steel design. Flux Corp delivered a validated composite enclosure from concept through first-article approval.',
    challenge:
      'Electric bus battery enclosures face competing demands: they must be lightweight to maximise range, rigid enough to protect modules during side-impact and underride events, and thermally stable across charging cycles and ambient temperature extremes. The startup\'s platform had limited underfloor height, leaving minimal clearance for enclosure depth. Tooling budget constraints required a design validated entirely through simulation and prototyping before any production mould investment.',
    challengePoints: [
      'Achieve minimum 15% weight reduction vs. baseline steel enclosure design',
      'Pass structural crash load cases including side-pole impact and floor intrusion scenarios',
      'Maintain thermal isolation between battery modules and ambient underfloor environment',
      'Fit within 180 mm maximum enclosure height including mounting and sealing interfaces',
      'Validate design through CAE and prototyping before committing to production tooling',
      'Deliver first-article parts approved on initial submission to avoid programme delays',
    ],
    solution:
      'Flux Corp designed a hybrid composite-aluminium battery enclosure combining epoxy composite side walls and floor panels with aluminium crash rails and mounting interfaces. Multi-physics CAE simulation validated structural, thermal, and vibration performance simultaneously. A rapid prototype was CNC-machined and vacuum-bagged for physical crash sled testing correlation, confirming simulation predictions before tooling release.',
    approach: [
      {
        title: 'Multi-Physics CAE Validation',
        description:
          'Structural crash, thermal cycling, and random vibration analyses were run in parallel using integrated FEA workflows. Composite lay-up schedules were optimised for crash energy absorption in side-impact zones.',
      },
      {
        title: 'Composite Material Qualification',
        description:
          'Epoxy-glass and epoxy-carbon laminate systems were tested for flammability, dielectric strength, and thermal conductivity to meet automotive HV enclosure requirements.',
      },
      {
        title: 'Rapid Prototype & Physical Testing',
        description:
          'A full-scale prototype enclosure was manufactured within 3 weeks using CNC-machined tooling blocks and vacuum-bagged composite panels. Physical testing correlated within 8% of CAE predictions.',
      },
      {
        title: 'Production Tooling & First Article',
        description:
          'Epoxy-aluminium hybrid production tooling was designed for 500+ cycle capability. First-article parts were delivered and approved on the initial submission — zero rework required.',
      },
    ],
    outcome:
      'The final enclosure design achieved an 18% weight reduction over the steel baseline while passing all structural crash load cases. First-article approval was granted on the first submission, keeping the startup\'s series production timeline on track. The validated CAE methodology established a reusable design framework for future battery enclosure variants on the platform.',
    outcomePoints: [
      '18% weight reduction compared to conventional steel enclosure',
      'All structural crash load cases passed in CAE and physical correlation testing',
      'First-article approval on initial submission — zero rework',
      'Production tooling delivered 35% below client\'s budget target',
      'Reusable CAE framework established for future platform variants',
    ],
    metrics: [
      { value: '18%', label: 'Weight Reduction' },
      { value: '6 mo', label: 'Concept to First Article' },
      { value: '1st', label: 'Article Pass Rate' },
      { value: '35%', label: 'Below Tooling Budget' },
    ],
    technologies: [
      'Multi-physics CAE (structural, thermal, vibration)',
      'Epoxy composite vacuum-bagging & curing',
      'CNC rapid prototyping for crash test articles',
      'Epoxy-aluminium hybrid production tooling',
      'HV battery enclosure sealing & IP rating design',
    ],
    standards: [
      'AIS 038 — Electric vehicle safety requirements',
      'UN ECE R100 — Electric power train safety',
      'ISO 6469 — Electric road vehicle safety specifications',
    ],
    services: ['Engineering Design', 'Composites & Forming', 'Prototyping', 'Tools & Die'],
  },
];

/** Minimal fields used for listing cards and legacy imports */
export const caseStudiesStatic = caseStudiesContent.map((cs) => ({
  slug: cs.slug,
  title: cs.title,
  industry: cs.industry,
  challenge: cs.challenge,
  solution: cs.solution,
  outcome: cs.outcome,
}));

export function getCaseStudyBySlug(slug: string): CaseStudyContent | undefined {
  return caseStudiesContent.find((cs) => cs.slug === slug);
}
