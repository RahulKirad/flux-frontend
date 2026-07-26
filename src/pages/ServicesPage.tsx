import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ArrowRight, Download } from 'lucide-react';
import {
  AnimatedSection,
  PageHero,
  SectionHeading,
  SEOHead,
  LoadingSpinner,
} from '../components/common';
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

    return (
      <>
        <SEOHead title={`${displayService.title} | Flux Corp`} description={displayService.short_description} />
        <PageHero label="Service" title={displayService.title} subtitle={displayService.short_description} />

        <PageSection className={isToolsDie ? '[&_.stitch-container]:max-w-[1400px]' : undefined}>
          {isToolsDie ? (
            <div className="space-y-12 lg:space-y-16">
              <AnimatedSection>
                <div className="max-w-3xl">
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
                <AnimatedSection delay={0.15}>
                  <div className="w-full h-[280px] sm:h-[360px] lg:h-[520px] xl:h-[580px] border border-kinetic-outline-variant overflow-hidden bg-[#141414]">
                    <img
                      src={content.image}
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
            <SectionHeading label="Deliverables" title="Components & Applications" centered={false} />
            <BulletList items={content.deliverables} />
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

        <PageSection tone="muted">
          <div className="grid lg:grid-cols-2 gap-12">
            <AnimatedSection>
              <SectionHeading title="Request a Consultation" centered={false} />
              <ContactForm source="service_inquiry" serviceId={displayService.id} compact variant="stitch" />
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
      <PageHero
        label="Products & Services"
        title="Integrated Manufacturing Services"
        subtitle="End-to-end support from initial design through final production and assembly."
      />

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
