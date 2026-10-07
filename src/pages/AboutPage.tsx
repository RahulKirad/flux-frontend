import { AnimatedSection, CmsPageHero, SectionHeading, SEOHead } from '../components/common';
import { useCmsPage } from '../hooks/useSiteContent';
import { BulletList, ContentPanel, ImageTextBlock, PageSection } from '../components/layout/ContentBlocks';
import { about, company, facilitiesContent, qualityAssurance, supplyChain } from '../data/companyContent';

const timeline = [
  { year: '2009', title: 'Company Founded', desc: 'Flux Corp established in Pune with integrated engineering design focus.' },
  { year: '2012', title: 'Chikhali Manufacturing', desc: 'Opened Chikhali facility for bus body and composite manufacturing.' },
  { year: '2015', title: 'ISO 9001 Certification', desc: 'Achieved ISO 9001 quality management certification.' },
  { year: '2018', title: 'Railway Division', desc: 'RDSO approval for railway component manufacturing.' },
  { year: '2021', title: 'Chakan Design Center', desc: 'Opened advanced prototyping, styling, and model shop facility.' },
  { year: '2024', title: 'EV & Lightweighting', desc: 'Leading EV bus body, battery enclosure, and composite lightweighting programs.' },
];

export default function AboutPage() {
  const cms = useCmsPage('about');
  const aboutImage = cms.bannerImage || 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=900&q=80';
  return (
    <>
      <SEOHead
        title="About Flux Corp | Integrated Engineering Excellence"
        description={about.overview[0].slice(0, 160)}
      />

      <CmsPageHero pageId="about" />

      <PageSection>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          <AnimatedSection>
            <SectionHeading label="Overview" title="Who We Are" centered={false} />
            {about.overview.map((p) => (
              <p key={p.slice(0, 50)} className="text-kinetic-on-surface-variant leading-relaxed mb-4">{p}</p>
            ))}
          </AnimatedSection>
          <AnimatedSection delay={0.15}>
            <div className="h-[400px] border border-kinetic-outline-variant overflow-hidden">
              <img src={aboutImage} alt="Flux Corp team" className="w-full h-full object-cover" />
            </div>
          </AnimatedSection>
        </div>
      </PageSection>

      <PageSection tone="muted">
        <div className="grid md:grid-cols-2 gap-8">
          <AnimatedSection>
            <ContentPanel className="h-full">
              <h3 className="text-xl font-bold uppercase text-kinetic-primary mb-4">Our Vision</h3>
              <p className="text-kinetic-on-surface-variant leading-relaxed">{about.vision}</p>
            </ContentPanel>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <ContentPanel className="h-full">
              <h3 className="text-xl font-bold uppercase text-kinetic-primary mb-4">Our Mission</h3>
              <p className="text-kinetic-on-surface-variant leading-relaxed">{about.mission}</p>
            </ContentPanel>
          </AnimatedSection>
        </div>
      </PageSection>

      <PageSection>
        <SectionHeading label="Philosophy" title="Core Approach" description="A holistic methodology across the entire product lifecycle." />
        <BulletList items={about.philosophy} />
      </PageSection>

      <PageSection tone="muted">
        <ImageTextBlock
          label="Facilities"
          title="Chikhali & Chakan, Pune"
          description={`Operating from advanced facilities in Chikhali and Chakan, ${company.name} leverages CNC machining, 3D printing, vacuum forming, model shops, and NDT/CMM inspection laboratories to deliver precision at scale.`}
          image="https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=1000&q=80"
          reverse
          link={{ label: 'View Facilities', href: '/facilities' }}
        />
      </PageSection>

      <PageSection>
        <SectionHeading label="History" title="Company Timeline" />
        <div className="max-w-3xl">
          {timeline.map((item, i) => (
            <AnimatedSection key={item.year} delay={i * 0.05}>
              <div className="flex gap-6 mb-8 last:mb-0">
                <div className="w-16 shrink-0 text-right">
                  <span className="text-kinetic-primary font-bold">{item.year}</span>
                </div>
                <div className="relative pb-8 border-l border-kinetic-outline-variant pl-6 last:pb-0">
                  <div className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 bg-kinetic-primary" />
                  <h4 className="font-semibold uppercase text-kinetic-primary">{item.title}</h4>
                  <p className="text-kinetic-on-surface-variant text-sm mt-1">{item.desc}</p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </PageSection>

      <PageSection tone="muted">
        <SectionHeading label="Operations" title="Quality & Supply Chain" />
        <div className="grid md:grid-cols-2 gap-8">
          <ContentPanel>
            <h3 className="text-lg font-semibold uppercase text-kinetic-primary mb-4">Joining & Inspection</h3>
            <BulletList items={[...qualityAssurance.joining, ...qualityAssurance.inspection]} />
          </ContentPanel>
          <ContentPanel>
            <h3 className="text-lg font-semibold uppercase text-kinetic-primary mb-4">Supply Chain</h3>
            <BulletList items={[...supplyChain.sourcing, ...supplyChain.logistics]} />
          </ContentPanel>
        </div>
      </PageSection>

      <PageSection tone="muted">
        <div className="grid md:grid-cols-2 gap-8">
          {facilitiesContent.map((f) => (
            <AnimatedSection key={f.slug}>
              <ContentPanel>
                <h3 className="text-lg font-semibold uppercase text-kinetic-primary mb-2">{f.name}</h3>
                <p className="text-sm text-kinetic-secondary mb-4">{f.location}</p>
                <p className="text-kinetic-on-surface-variant text-sm mb-4">{f.description}</p>
                <BulletList items={f.equipment.slice(0, 4)} />
              </ContentPanel>
            </AnimatedSection>
          ))}
        </div>
      </PageSection>
    </>
  );
}
