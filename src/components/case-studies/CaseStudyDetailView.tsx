import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { AnimatedSection, PageHero, SectionHeading, SEOHead } from '../common';
import { BulletList, ContentPanel, FeatureGrid, ImageTextBlock, PageSection, StatStrip } from '../layout/ContentBlocks';
import type { CaseStudyContent } from '../../data/caseStudiesContent';
import { getProjectVisuals } from '../../data/projectsContent';

interface CaseStudyDetailViewProps {
  study: CaseStudyContent;
}

export default function CaseStudyDetailView({ study }: CaseStudyDetailViewProps) {
  const visuals = getProjectVisuals(study.slug);
  const banner = visuals?.banner ?? '';
  const gallery = visuals?.slides ?? [];

  return (
    <>
      <SEOHead
        title={`${study.title} | Flux Corp Case Study`}
        description={study.overview.slice(0, 160)}
      />
      <PageHero label="Case Study" title={study.title} subtitle={study.scope} />

      <PageSection tone="muted">
        <AnimatedSection>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {[
              { label: 'Client', value: study.client },
              { label: 'Industry', value: study.industry },
              { label: 'Duration', value: study.duration },
              { label: 'Scope', value: study.scope },
            ].map((item) => (
              <div key={item.label}>
                <span className="stitch-label block mb-1">{item.label}</span>
                <p className="text-kinetic-primary font-medium text-sm leading-snug">{item.value}</p>
              </div>
            ))}
          </div>
          <StatStrip stats={study.metrics} />
        </AnimatedSection>
      </PageSection>

      {banner && (
        <PageSection>
          <ImageTextBlock
            label="Project Overview"
            title={`Engineering ${study.industry}`}
            description={study.overview}
            image={banner}
          />
        </PageSection>
      )}

      <PageSection tone="muted">
        <SectionHeading
          label="The Challenge"
          title="What We Were Up Against"
          description="Understanding the constraints before engineering the solution."
        />
        <div className="grid lg:grid-cols-2 gap-8 mt-10">
          <AnimatedSection>
            <ContentPanel className="h-full">
              <p className="text-kinetic-on-surface-variant leading-relaxed">{study.challenge}</p>
            </ContentPanel>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <ContentPanel className="h-full">
              <h3 className="text-sm font-semibold uppercase text-kinetic-primary mb-4 tracking-widest">
                Key Requirements
              </h3>
              <BulletList items={study.challengePoints} />
            </ContentPanel>
          </AnimatedSection>
        </div>
      </PageSection>

      <PageSection>
        <SectionHeading
          label="Our Approach"
          title="Engineering Solution"
          description={study.solution}
        />
        <div className="mt-10">
          <FeatureGrid items={study.approach} />
        </div>
      </PageSection>

      <PageSection tone="muted">
        <SectionHeading label="Results" title="Measurable Outcomes" />
        <div className="grid lg:grid-cols-2 gap-8 mt-10 items-start">
          <AnimatedSection>
            <ContentPanel>
              <p className="text-kinetic-on-surface-variant leading-relaxed mb-6">{study.outcome}</p>
              <h3 className="text-sm font-semibold uppercase text-kinetic-primary mb-4 tracking-widest">
                Project Highlights
              </h3>
              <BulletList items={study.outcomePoints} />
            </ContentPanel>
          </AnimatedSection>
          {gallery[1] && (
            <AnimatedSection delay={0.1}>
              <div className="h-full min-h-[320px] border border-kinetic-outline-variant overflow-hidden">
                <img src={gallery[1]} alt={study.title} className="w-full h-full object-cover" />
              </div>
            </AnimatedSection>
          )}
        </div>
      </PageSection>

      <PageSection>
        <div className="grid md:grid-cols-2 gap-8">
          <AnimatedSection>
            <ContentPanel className="h-full">
              <h3 className="text-lg font-semibold uppercase text-kinetic-primary mb-4">Technologies Used</h3>
              <BulletList items={study.technologies} />
            </ContentPanel>
          </AnimatedSection>
          <AnimatedSection delay={0.08}>
            <ContentPanel className="h-full">
              <h3 className="text-lg font-semibold uppercase text-kinetic-primary mb-4">Standards & Compliance</h3>
              <BulletList items={study.standards} />
            </ContentPanel>
          </AnimatedSection>
        </div>
      </PageSection>

      {gallery.length > 0 && (
        <PageSection tone="muted">
          <SectionHeading label="Visual Documentation" title="Project Gallery" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
            {gallery.map((url, id) => (
              <AnimatedSection key={url} delay={id * 0.06}>
                <div className="h-56 lg:h-64 border border-kinetic-outline-variant overflow-hidden">
                  <img src={url} alt={`${study.title} — ${id + 1}`} className="w-full h-full object-cover" />
                </div>
              </AnimatedSection>
            ))}
          </div>
        </PageSection>
      )}

      <PageSection>
        <AnimatedSection>
          <ContentPanel>
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div>
                <span className="stitch-label block mb-2">Flux Corp Services</span>
                <div className="flex flex-wrap gap-2">
                  {study.services.map((service) => (
                    <span
                      key={service}
                      className="text-xs font-medium uppercase tracking-wide border border-kinetic-outline-variant px-3 py-1 text-kinetic-on-surface-variant"
                    >
                      {service}
                    </span>
                  ))}
                </div>
              </div>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 shrink-0 text-xs font-semibold uppercase tracking-widest text-kinetic-primary border border-kinetic-primary px-6 py-3 hover:bg-kinetic-primary hover:text-white transition"
              >
                Discuss a Similar Project
                <ChevronRight size={16} />
              </Link>
            </div>
          </ContentPanel>
        </AnimatedSection>
      </PageSection>
    </>
  );
}
