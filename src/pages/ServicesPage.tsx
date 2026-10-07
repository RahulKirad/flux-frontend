import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ArrowRight, Download } from 'lucide-react';
import {
  AnimatedSection,
  PageHero,
  CmsPageHero,
  SectionHeading,
  SEOHead,
  LoadingSpinner,
} from '../components/common';
import { busImage, engineeringImage, prototypingImage, toolsDieImage, toolsAndDieImage } from '../assets/images';
import ContactForm from '../components/forms/ContactForm';
import { BulletList, ContentPanel, ImageTextBlock, PageSection } from '../components/layout/ContentBlocks';
import { getStaticServiceBySlug, getStaticServices, servicesContent } from '../data/companyContent';
import { servicesApi } from '../services/api';
import type { Service } from '../types';

export default function ServicesPage() {
  const { slug } = useParams();

  const { data: allRes, isLoading: allLoading } = useQuery({
    queryKey: ['services'],
    queryFn: () => servicesApi.getAll({ main: 'true' }),
    enabled: !slug,
    retry: 1,
  });

  const { data: detailRes, isLoading: detailLoading } = useQuery({
    queryKey: ['service', slug],
    queryFn: () => servicesApi.getBySlug(slug!),
    enabled: !!slug,
    retry: 1,
  });

  if (slug) {
    if (detailLoading) return <LoadingSpinner />;
    const service: Service | undefined = detailRes?.data?.data ?? getStaticServiceBySlug(slug);
    const content = servicesContent[slug];

    if (!service && !content) {
      return <div className="stitch-section text-center py-20">Service not found</div>;
    }

    const displayService = service ?? {
      id: 0,
      parent_id: null,
      slug,
      title: slug,
      short_description: content!.intro,
    };
    const isToolsDie = slug === 'tools-die';
    const isEngineeringDesign = slug === 'engineering-design';
    const splitConsultationMeta: Record<string, { label: string; heading: string }> = {
      'composites-forming': {
        label: 'Composites & Forming',
        heading: 'Lightweight, High-Strength Solutions',
      },
      'automotive-styling': {
        label: 'Automotive Styling',
        heading: 'Creative Vision, Production Ready',
      },
      'industrial-components': {
        label: 'Industrial Components',
        heading: 'Precision Components for Demanding Environments',
      },
    };
    const isPrototyping = slug === 'prototyping';
    const isBusBody = slug === 'bus-body-manufacturing';
    const isIndustrialComponents = slug === 'industrial-components';
    const hasSplitConsultation =
      isEngineeringDesign || isToolsDie || isPrototyping || isBusBody || isIndustrialComponents || slug in splitConsultationMeta;
    const consultationImage =
      isEngineeringDesign ? engineeringImage
      : isToolsDie ? toolsDieImage
      : isPrototyping ? prototypingImage
      : isBusBody ? busImage
      : null;

    const serviceConsultationProps = {
      source: 'service_inquiry' as const,
      serviceId: displayService.id > 0 ? displayService.id : undefined,
      serviceSlug: slug,
      serviceName: displayService.title,
      compact: true,
      variant: 'stitch' as const,
    };

    const consultationForm = (
      <AnimatedSection className="h-full flex flex-col justify-center" delay={isBusBody || isIndustrialComponents ? 0 : 0.15}>
        <SectionHeading
          title={`Request a Consultation — ${displayService.title}`}
          centered={false}
          className="!mb-8 lg:!mb-10"
        />
        <ContactForm {...serviceConsultationProps} />
      </AnimatedSection>
    );

    const consultationImageBlock = consultationImage ? (
      <AnimatedSection className="h-full" delay={isBusBody ? 0.15 : 0}>
        <div className="h-[280px] sm:h-[360px] lg:h-full lg:min-h-[520px] border border-kinetic-outline-variant overflow-hidden bg-[#141414]">
          <img
            src={consultationImage}
            alt={
              isToolsDie ? 'Tools and die manufacturing'
              : isPrototyping ? 'Rapid prototyping capabilities and processes'
              : isBusBody ? 'Bus body manufacturing'
              : 'Engineering design deliverables and components'
            }
            className="w-full h-full object-contain object-center"
          />
        </div>
      </AnimatedSection>
    ) : null;

    const consultationMeta = slug ? splitConsultationMeta[slug] : undefined;

    const consultationContentBlock = consultationMeta ? (
      <AnimatedSection className="h-full" delay={isIndustrialComponents ? 0.15 : 0}>
        <ContentPanel className="h-full flex flex-col justify-center">
          <span className="stitch-label block mb-4">{consultationMeta.label}</span>
          <h3 className="text-2xl lg:text-3xl font-bold uppercase text-kinetic-primary mb-4 leading-tight">
            {consultationMeta.heading}
          </h3>
          <p className="text-kinetic-on-surface-variant text-base lg:text-lg leading-relaxed mb-4">
            {content?.intro || displayService.short_description}
          </p>
          {'detail' in (content ?? {}) && content?.detail && (
            <p className="text-kinetic-on-surface-variant text-sm lg:text-base leading-relaxed mb-6">
              {content.detail}
            </p>
          )}
          {content && (
            <>
              <h4 className="text-sm font-semibold uppercase text-kinetic-primary mb-3">What We Deliver</h4>
              <BulletList items={isIndustrialComponents ? content.capabilities : content.capabilities.slice(0, 4)} />
            </>
          )}
          {isIndustrialComponents && (
            <p className="text-kinetic-on-surface-variant text-sm leading-relaxed mt-6 pt-6 border-t border-kinetic-outline-variant">
              Serving logistics, packaging, food processing, pharmaceutical, automotive ancillary, and heavy equipment
              programs across India and export markets.
            </p>
          )}
        </ContentPanel>
      </AnimatedSection>
    ) : null;

    return (
      <>
        <SEOHead
          title={`${displayService.title} | Flux Corp`}
          description={(content?.intro || displayService.short_description || '').slice(0, 160)}
        />
        <PageHero
          label="Service"
          title={displayService.title}
          subtitle={content?.intro || displayService.short_description}
        />

        <PageSection className={isToolsDie ? '[&_.stitch-container]:max-w-[1400px]' : undefined}>
          {isToolsDie ? (
            <div className="grid lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] gap-8 lg:gap-12 xl:gap-16 items-stretch">
              <AnimatedSection className="h-full">
                <div className="h-full flex flex-col justify-center">
                  <p className="text-kinetic-on-surface-variant text-lg leading-relaxed mb-8">
                    {content?.intro || displayService.short_description}
                  </p>
                  {content && (
                    <>
                      <h3 className="text-lg font-semibold uppercase text-kinetic-primary mb-4">Key Capabilities</h3>
                      <BulletList items={content.capabilities} />
                    </>
                  )}
                </div>
              </AnimatedSection>
              {content && (
                <AnimatedSection delay={0.15} className="h-full">
                  <div className="w-full h-[280px] sm:h-[360px] lg:h-full lg:min-h-[420px] xl:min-h-[480px] border border-kinetic-outline-variant overflow-hidden bg-[#141414]">
                    <img
                      src={toolsAndDieImage}
                      alt={displayService.title}
                      className="w-full h-full object-contain object-center"
                    />
                  </div>
                </AnimatedSection>
              )}
            </div>
          ) : (
            <div className="grid lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] gap-12 lg:gap-16 items-start">
              <AnimatedSection>
                <p className="text-kinetic-on-surface-variant text-lg leading-relaxed mb-8">
                  {content?.intro || displayService.short_description}
                </p>
                {content && (
                  <>
                    <h3 className="text-lg font-semibold uppercase text-kinetic-primary mb-4">Key Capabilities</h3>
                    <BulletList items={content.capabilities} />
                  </>
                )}
                {!content && displayService.description && (
                  <div className="prose max-w-none text-kinetic-on-surface-variant" dangerouslySetInnerHTML={{ __html: displayService.description }} />
                )}
              </AnimatedSection>
              {content && (
                <AnimatedSection delay={0.15}>
                  <div className="h-[360px] lg:h-[440px] border border-kinetic-outline-variant overflow-hidden">
                    <img src={content.image} alt={displayService.title} className="w-full h-full object-cover" />
                  </div>
                </AnimatedSection>
              )}
            </div>
          )}
        </PageSection>

        {content?.deliverables && (
          <PageSection tone="muted">
            <SectionHeading label="Deliverables" title="Components & Applications" />
            <BulletList items={content.deliverables} centered />
          </PageSection>
        )}

        {displayService.sub_services && displayService.sub_services.length > 0 && (
          <PageSection tone={content?.deliverables ? 'white' : 'muted'}>
            <SectionHeading title="Sub-Services" />
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayService.sub_services.map((sub, i) => (
                <AnimatedSection key={sub.id} delay={i * 0.05}>
                  <Link to={`/services/${sub.slug}`} className="block border border-kinetic-outline-variant p-6 bg-white hover:border-kinetic-primary transition h-full">
                    <h3 className="font-semibold uppercase text-kinetic-primary mb-2">{sub.title}</h3>
                    <p className="text-kinetic-on-surface-variant text-sm">{sub.short_description}</p>
                  </Link>
                </AnimatedSection>
              ))}
            </div>
          </PageSection>
        )}

        <PageSection
          tone="muted"
          className={`${hasSplitConsultation ? '!pt-6 md:!pt-8 lg:!pt-10' : ''} ${isToolsDie ? '[&_.stitch-container]:max-w-[1400px]' : ''}`.trim() || undefined}
        >
          {hasSplitConsultation ? (
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
              {isBusBody ? (
                <>
                  {consultationForm}
                  {consultationImageBlock}
                </>
              ) : isIndustrialComponents ? (
                <>
                  {consultationForm}
                  {consultationContentBlock}
                </>
              ) : (
                <>
                  {consultationImage ? consultationImageBlock : consultationContentBlock}
                  {consultationForm}
                </>
              )}
            </div>
          ) : (
            <div className="grid lg:grid-cols-2 gap-12">
              <AnimatedSection>
                <SectionHeading
                  title={`Request a Consultation — ${displayService.title}`}
                  centered={false}
                />
                <ContactForm {...serviceConsultationProps} />
              </AnimatedSection>
              {displayService.brochure_url && (
                <AnimatedSection delay={0.15}>
                  <ContentPanel className="text-center h-full flex flex-col justify-center">
                    <Download className="w-12 h-12 text-kinetic-primary mx-auto mb-4" />
                    <h3 className="text-xl font-bold uppercase mb-2">Download Brochure</h3>
                    <p className="text-kinetic-on-surface-variant mb-6">Detailed information about our {displayService.title} capabilities.</p>
                    <a href={displayService.brochure_url} className="stitch-btn-primary mx-auto" download>Download PDF</a>
                  </ContentPanel>
                </AnimatedSection>
              )}
            </div>
          )}
        </PageSection>
      </>
    );
  }

  if (allLoading) return <LoadingSpinner />;
  const apiServices: Service[] = allRes?.data?.data || [];
  const services = apiServices.length > 0 ? apiServices : getStaticServices();

  return (
    <>
      <SEOHead
        title="Services | Flux Corp"
        description="Engineering design, composites & forming, prototyping, tools & die, automotive styling, bus body manufacturing, and railway components."
      />
      <CmsPageHero pageId="services" />

      <PageSection>
        <div className="grid md:grid-cols-2 gap-8">
          {services.map((service, i) => {
            const content = servicesContent[service.slug];
            return (
              <AnimatedSection key={service.id} delay={i * 0.05}>
                <Link
                  to={`/services/${service.slug}`}
                  className="group flex gap-6 border border-kinetic-outline-variant p-6 lg:p-8 bg-white hover:border-kinetic-primary transition h-full"
                >
                  <div className="w-20 h-20 shrink-0 overflow-hidden border border-kinetic-outline-variant hidden sm:block">
                    {content ? (
                      <img src={content.image} alt="" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full bg-kinetic-surface-container flex items-center justify-center text-2xl font-bold text-kinetic-primary">
                        {service.title.charAt(0)}
                      </div>
                    )}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold uppercase text-kinetic-primary mb-2">{service.title}</h3>
                    <p className="text-kinetic-on-surface-variant text-sm mb-4 line-clamp-3">
                      {content?.intro || service.short_description}
                    </p>
                    <span className="inline-flex items-center text-xs font-semibold uppercase tracking-widest text-kinetic-primary">
                      Learn More <ArrowRight size={14} className="ml-1 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </Link>
              </AnimatedSection>
            );
          })}
        </div>
      </PageSection>

      <PageSection tone="muted">
        <ImageTextBlock
          label="Why Flux Corp"
          title="Holistic Product Lifecycle Support"
          description="Our offerings are structured to provide end-to-end support — from concept development and material qualification through tooling, production, joining, inspection, and series delivery."
          image="https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=1200&q=80"
          link={{ label: 'Contact Our Team', href: '/contact' }}
        />
      </PageSection>
    </>
  );
}
