import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useMemo, useState } from 'react';
import { Search, Download, Phone, Mail, MapPin } from 'lucide-react';
import { AnimatedSection, PageHero, CmsPageHero, SectionHeading, SEOHead, LoadingSpinner } from '../components/common';
import CaseStudyDetailView from '../components/case-studies/CaseStudyDetailView';
import ProjectGridCard from '../components/common/ProjectGridCard';
import ContactForm from '../components/forms/ContactForm';
import { BulletList, ContentPanel, ImageTextBlock, PageSection } from '../components/layout/ContentBlocks';
import {
  blogArticles,
  careersStatic,
  caseStudiesStatic,
  certifications,
  commercialTerms,
  company,
  facilitiesContent,
  qualityAssurance,
  regulatoryStandards,
} from '../data/companyContent';
import { getCaseStudyBySlug } from '../data/caseStudiesContent';
import { assignProjectCardSlides, getProjectLayout, getProjectVisuals } from '../data/projectsContent';
import { caseStudiesApi, blogsApi, certificationsApi, facilitiesApi, careersApi } from '../services/api';
import type { CaseStudy, Blog, Certification, Facility, Career } from '../types';

function DetailSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <AnimatedSection>
      <h2 className="text-xl font-bold uppercase text-kinetic-primary mb-4">{title}</h2>
      <div className="text-kinetic-on-surface-variant leading-relaxed">{children}</div>
    </AnimatedSection>
  );
}

export function CaseStudiesPage() {
  const { slug } = useParams();
  const { data: allRes, isLoading } = useQuery({
    queryKey: ['case-studies'],
    queryFn: () => caseStudiesApi.getAll(),
    enabled: !slug,
  });
  const { data: detailRes, isLoading: detailLoading } = useQuery({
    queryKey: ['case-study', slug],
    queryFn: () => caseStudiesApi.getBySlug(slug!),
    enabled: !!slug,
    retry: false,
  });

  const staticCase = getCaseStudyBySlug(slug ?? '');

  if (slug) {
    if (staticCase) {
      return <CaseStudyDetailView study={staticCase} />;
    }

    if (detailLoading) return <LoadingSpinner />;
    const cs: CaseStudy | undefined = detailRes?.data?.data;

    if (cs) {
      return (
        <>
          <SEOHead title={`${cs.title} | Flux Corp Case Study`} />
          <PageHero label="Case Study" title={cs.title} subtitle={cs.industry_name} />
          <PageSection>
            <div className="max-w-4xl space-y-10">
              {cs.challenge && <DetailSection title="Challenge"><p>{cs.challenge}</p></DetailSection>}
              {cs.solution && <DetailSection title="Solution"><p>{cs.solution}</p></DetailSection>}
              {cs.outcome && <DetailSection title="Outcome"><p>{cs.outcome}</p></DetailSection>}
            </div>
          </PageSection>
        </>
      );
    }

    return <div className="stitch-section text-center py-20">Case study not found</div>;
  }

  if (isLoading) return <LoadingSpinner />;
  const items: CaseStudy[] = allRes?.data?.data || [];

  const displayItems = items.length > 0 ? items : caseStudiesStatic.map((c, id) => ({
    id,
    slug: c.slug,
    title: c.title,
    industry_name: c.industry,
    outcome: c.outcome,
    banner: getProjectVisuals(c.slug)?.banner,
  } as CaseStudy));

  const caseSlides = useMemo(
    () => assignProjectCardSlides(displayItems.map((cs) => ({ id: cs.id, slug: cs.slug, banner: cs.banner }))),
    [displayItems],
  );

  return (
    <>
      <SEOHead title="Case Studies | Flux Corp" description="Bus body lightweighting, railway coach interiors, and EV engineering success stories." />
      <CmsPageHero pageId="case-studies" />
      <PageSection>
        <div className="grid grid-cols-12 gap-6 lg:gap-8">
          {displayItems.map((cs, i) => (
            <ProjectGridCard
              key={cs.id}
              to={`/case-studies/${cs.slug}`}
              title={cs.title}
              category={cs.industry_name ?? 'Engineering'}
              description={cs.outcome ?? ''}
              images={caseSlides.get(cs.id) ?? (cs.banner ? [cs.banner] : [])}
              layout={getProjectLayout(cs.slug, i, cs.is_featured)}
              imagePosition={i % 2 === 0 ? 'left' : 'right'}
              delay={i * 0.08}
            />
          ))}
        </div>
      </PageSection>
    </>
  );
}

export function BlogPage() {
  const { slug } = useParams();
  const [search, setSearch] = useState('');

  const { data: allRes, isLoading } = useQuery({
    queryKey: ['blogs', search],
    queryFn: () => blogsApi.getAll({ search }),
    enabled: !slug,
  });
  const { data: detailRes, isLoading: detailLoading } = useQuery({
    queryKey: ['blog', slug],
    queryFn: () => blogsApi.getBySlug(slug!),
    enabled: !!slug,
  });

  if (slug) {
    if (detailLoading) return <LoadingSpinner />;
    const blog: Blog = detailRes?.data?.data;
    if (!blog) return <div className="stitch-section text-center py-20">Blog not found</div>;
    return (
      <>
        <SEOHead title={`${blog.title} | Flux Corp Blog`} description={blog.excerpt} />
        <PageHero label="Blog" title={blog.title} subtitle={`${blog.category_name} · ${blog.read_time} min read`} />
        <PageSection>
          <div className="max-w-3xl">
            <AnimatedSection>
              <div className="prose max-w-none text-kinetic-on-surface-variant" dangerouslySetInnerHTML={{ __html: blog.content || '' }} />
            </AnimatedSection>
          </div>
        </PageSection>
      </>
    );
  }

  if (isLoading) return <LoadingSpinner />;
  const blogs: Blog[] = allRes?.data?.data || [];
  const displayBlogs = blogs.length > 0 ? blogs : blogArticles.map((b, id) => ({
    id,
    slug: b.slug,
    title: b.title,
    excerpt: b.excerpt,
    category_name: b.category,
    read_time: b.readTime,
    banner: b.banner || `https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&q=80&sig=${id}`,
  } as Blog));

  return (
    <>
      <SEOHead title="Blog | Flux Corp" description="Technical insights on composites, railway compliance, prototyping, and bus body manufacturing." />
      <CmsPageHero pageId="blog" />
      <PageSection>
        <div className="relative max-w-md mb-10">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-kinetic-outline" size={20} />
          <input type="text" placeholder="Search articles..." value={search} onChange={(e) => setSearch(e.target.value)} className="stitch-input pl-10" />
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayBlogs.map((blog, i) => (
            <AnimatedSection key={blog.id} delay={i * 0.05}>
              <Link to={`/blog/${blog.slug}`} className="group block border border-kinetic-outline-variant overflow-hidden bg-white hover:border-kinetic-primary transition">
                <div className="h-48 overflow-hidden">
                  <img src={blog.banner || ''} alt={blog.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                </div>
                <div className="p-6">
                  <span className="stitch-label">{blog.category_name}</span>
                  <h3 className="text-lg font-semibold uppercase text-kinetic-primary mt-2 mb-2">{blog.title}</h3>
                  <p className="text-kinetic-on-surface-variant text-sm line-clamp-2">{blog.excerpt}</p>
                </div>
              </Link>
            </AnimatedSection>
          ))}
        </div>
      </PageSection>
    </>
  );
}

export function CertificationsPage() {
  const { data, isLoading } = useQuery({ queryKey: ['certifications'], queryFn: () => certificationsApi.getAll() });
  if (isLoading) return <LoadingSpinner />;
  const certs: Certification[] = data?.data?.data || [];
  const displayCerts = certs.length > 0 ? certs : certifications.map((c, id) => ({
    id,
    title: c.title,
    category: c.category,
    description: c.description,
    issued_by: c.issuedBy,
  } as Certification));

  return (
    <>
      <SEOHead title="Certifications | Flux Corp" description="ISO 9001, IATF 16949, RDSO, RITES — quality and regulatory compliance credentials." />
      <CmsPageHero pageId="certifications" />

      <PageSection>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {displayCerts.map((cert, i) => (
            <AnimatedSection key={cert.id} delay={i * 0.08}>
              <ContentPanel className="h-full">
                <span className="stitch-label">{cert.category}</span>
                <h3 className="text-xl font-semibold uppercase text-kinetic-primary mt-2 mb-3">{cert.title}</h3>
                <p className="text-kinetic-on-surface-variant text-sm mb-4">{cert.description}</p>
                <p className="text-xs text-kinetic-secondary">Issued by: {cert.issued_by}</p>
                {cert.pdf_url && (
                  <a href={cert.pdf_url} className="inline-flex items-center text-kinetic-primary text-sm font-medium mt-4 hover:underline">
                    <Download size={14} className="mr-1" /> Download
                  </a>
                )}
              </ContentPanel>
            </AnimatedSection>
          ))}
        </div>

        <SectionHeading label="Regulatory Standards" title="Standards We Meet" centered={false} />
        <BulletList items={regulatoryStandards} />
      </PageSection>

      <PageSection tone="muted">
        <SectionHeading label="Quality Assurance" title="Testing & Validation" description="Comprehensive testing protocols ensuring safety, durability, and performance." />
        <BulletList items={qualityAssurance.testing} />
      </PageSection>
    </>
  );
}

export function FacilitiesPage() {
  const { slug } = useParams();
  const { data: allRes, isLoading } = useQuery({
    queryKey: ['facilities'],
    queryFn: () => facilitiesApi.getAll(),
    enabled: !slug,
  });
  const { data: detailRes, isLoading: detailLoading } = useQuery({
    queryKey: ['facility', slug],
    queryFn: () => facilitiesApi.getBySlug(slug!),
    enabled: !!slug,
  });

  const staticFacility = facilitiesContent.find((f) => f.slug === slug);

  if (slug) {
    if (detailLoading) return <LoadingSpinner />;
    const facility: Facility | undefined = detailRes?.data?.data;
    const name = facility?.name || staticFacility?.name;
    const location = facility?.location || staticFacility?.location;
    const description = facility?.description || staticFacility?.description;
    const equipment = staticFacility?.equipment || [];

    if (!name) return <div className="stitch-section text-center py-20">Facility not found</div>;

    return (
      <>
        <SEOHead title={`${name} | Flux Corp`} />
        <PageHero label="Facility" title={name!} subtitle={location} />
        <PageSection>
          <div className="grid lg:grid-cols-2 gap-12">
            <AnimatedSection>
              <p className="text-kinetic-on-surface-variant leading-relaxed mb-8">{description}</p>
              {facility?.machinery_listing && (
                <>
                  <h3 className="text-lg font-semibold uppercase text-kinetic-primary mb-4">Machinery</h3>
                  <BulletList items={(typeof facility.machinery_listing === 'string' ? JSON.parse(facility.machinery_listing) : facility.machinery_listing) as string[]} />
                </>
              )}
              {!facility?.machinery_listing && equipment.length > 0 && (
                <>
                  <h3 className="text-lg font-semibold uppercase text-kinetic-primary mb-4">Equipment</h3>
                  <BulletList items={equipment} />
                </>
              )}
            </AnimatedSection>
            {staticFacility && (
              <AnimatedSection delay={0.15}>
                <div className="h-[400px] border border-kinetic-outline-variant overflow-hidden">
                  <img src={staticFacility.image} alt={name} className="w-full h-full object-cover" />
                </div>
              </AnimatedSection>
            )}
          </div>
        </PageSection>
      </>
    );
  }

  if (isLoading) return <LoadingSpinner />;
  const facilities: Facility[] = allRes?.data?.data || [];
  const displayFacilities = facilities.length > 0
    ? facilities
    : facilitiesContent.map((f, id) => ({ id, slug: f.slug, name: f.name, location: f.location, description: f.description, banner: f.image } as Facility));

  return (
    <>
      <SEOHead title="Facilities | Flux Corp" description="Chikhali manufacturing and Chakan design & prototyping facilities in Pune." />
      <CmsPageHero pageId="facilities" />
      <PageSection>
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {displayFacilities.map((f, i) => {
            const staticData = facilitiesContent.find((s) => s.slug === f.slug);
            return (
              <AnimatedSection key={f.id} delay={i * 0.1}>
                <Link to={`/facilities/${f.slug}`} className="group block border border-kinetic-outline-variant overflow-hidden bg-white hover:border-kinetic-primary transition">
                  <div className="h-56 overflow-hidden">
                    <img src={f.banner || staticData?.image} alt={f.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                  </div>
                  <div className="p-8">
                    <h3 className="text-xl font-bold uppercase text-kinetic-primary">{f.name}</h3>
                    <p className="text-kinetic-secondary text-sm mt-1">{f.location}</p>
                    <p className="text-kinetic-on-surface-variant mt-4 line-clamp-3">{f.description}</p>
                  </div>
                </Link>
              </AnimatedSection>
            );
          })}
        </div>

        <SectionHeading label="Capabilities" title="Key Equipment" description="CNC machining, additive manufacturing, vacuum forming, model shops, and inspection laboratories." />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {['CNC machining centers', '3D printing & additive manufacturing', 'Vacuum forming & compression molding', 'Model shop — clay, FRP, MDF', 'NDT & CMM inspection labs', 'Assembly and production bays'].map((item) => (
            <ContentPanel key={item} className="text-sm text-kinetic-on-surface-variant">{item}</ContentPanel>
          ))}
        </div>
      </PageSection>
    </>
  );
}

export function CareersPage() {
  const { slug } = useParams();
  const { data: allRes, isLoading } = useQuery({
    queryKey: ['careers'],
    queryFn: () => careersApi.getAll(),
    enabled: !slug,
  });
  const { data: detailRes, isLoading: detailLoading } = useQuery({
    queryKey: ['career', slug],
    queryFn: () => careersApi.getBySlug(slug!),
    enabled: !!slug,
  });

  if (slug) {
    if (detailLoading) return <LoadingSpinner />;
    const career: Career = detailRes?.data?.data;
    const staticJob = careersStatic.find((j) => j.slug === slug);

    if (!career && !staticJob) return <div className="stitch-section text-center py-20">Job not found</div>;

    const title = career?.title || staticJob!.title;
    const dept = career?.department || staticJob!.department;
    const location = career?.location || staticJob!.location;

    return (
      <>
        <SEOHead title={`${title} | Flux Corp Careers`} />
        <PageHero label="Careers" title={title} subtitle={`${dept} · ${location}`} />
        <PageSection>
          <div className="grid lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2 space-y-8">
              <DetailSection title="Description">
                <p className="whitespace-pre-line">{career?.description || staticJob!.description}</p>
              </DetailSection>
              <DetailSection title="Requirements">
                <p className="whitespace-pre-line">{career?.requirements || staticJob!.requirements}</p>
              </DetailSection>
            </div>
            <AnimatedSection delay={0.15}>
              <ContentPanel>
                <ContactForm source="career" title="Apply Now" compact variant="stitch" />
              </ContentPanel>
            </AnimatedSection>
          </div>
        </PageSection>
      </>
    );
  }

  if (isLoading) return <LoadingSpinner />;
  const careers: Career[] = allRes?.data?.data || [];
  const displayCareers = careers.length > 0 ? careers : careersStatic.map((j, id) => ({
    id,
    slug: j.slug,
    title: j.title,
    department: j.department,
    location: j.location,
    employment_type: j.type,
  } as Career));

  return (
    <>
      <SEOHead title="Careers | Flux Corp" description="Join our engineering, composites, and manufacturing teams in Pune." />
      <CmsPageHero pageId="careers" />
      <PageSection>
        <div className="space-y-4 max-w-4xl">
          {displayCareers.map((job, i) => (
            <AnimatedSection key={job.id} delay={i * 0.05}>
              <Link to={`/careers/${job.slug}`} className="flex flex-col md:flex-row md:items-center justify-between border border-kinetic-outline-variant p-6 bg-white hover:border-kinetic-primary transition gap-4">
                <div>
                  <h3 className="text-lg font-semibold uppercase text-kinetic-primary">{job.title}</h3>
                  <p className="text-kinetic-on-surface-variant text-sm mt-1">{job.department} · {job.location} · {job.employment_type}</p>
                </div>
                <span className="text-xs font-semibold uppercase tracking-widest text-kinetic-primary">Apply →</span>
              </Link>
            </AnimatedSection>
          ))}
        </div>
      </PageSection>
    </>
  );
}

export function ContactPage() {
  return (
    <>
      <SEOHead title="Contact | Flux Corp" description={`Contact Flux Corp — ${company.phone}, ${company.email}, Chikhali & Chakan, Pune.`} />
      <CmsPageHero pageId="contact" />

      <PageSection>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          <AnimatedSection>
            <p className="text-kinetic-on-surface-variant text-lg mb-10 leading-relaxed">
              Flux Corp welcomes inquiries from domestic and international clients seeking integrated
              engineering solutions for bus body manufacturing, railway parts, and industrial applications.
            </p>
            <div className="space-y-6">
              {company.locations.map((loc) => (
                <div key={loc.name} className="flex items-start gap-4">
                  <MapPin className="w-5 h-5 text-kinetic-primary shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold uppercase text-sm text-kinetic-primary">{loc.name}</h4>
                    <p className="text-kinetic-on-surface-variant text-sm mt-1">{loc.address}</p>
                  </div>
                </div>
              ))}
              <div className="flex items-center gap-4">
                <Phone className="w-5 h-5 text-kinetic-primary" />
                <a href={`tel:${company.phone.replace(/\s/g, '')}`} className="text-kinetic-on-surface-variant hover:text-kinetic-primary">{company.phone}</a>
              </div>
              <div className="flex items-center gap-4">
                <Mail className="w-5 h-5 text-kinetic-primary" />
                <a href={`mailto:${company.email}`} className="text-kinetic-on-surface-variant hover:text-kinetic-primary">{company.email}</a>
              </div>
            </div>

            <div className="mt-10 grid sm:grid-cols-3 gap-4">
              {commercialTerms.pricing.map((item) => (
                <ContentPanel key={item} className="text-xs text-kinetic-on-surface-variant">{item}</ContentPanel>
              ))}
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.15}>
            <ContentPanel>
              <ContactForm source="contact_form" title="Send Us a Message" variant="stitch" />
            </ContentPanel>
          </AnimatedSection>
        </div>
      </PageSection>

      <PageSection tone="muted">
        <ImageTextBlock
          label="Commercial Terms"
          title="Flexible Engagement Models"
          description="Fixed-price, time-and-materials, and volume-based pricing with transparent quotations, milestone payments, and comprehensive warranty support."
          image="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&q=80"
          reverse
        />
        <div className="mt-10 grid md:grid-cols-3 gap-6">
          {commercialTerms.timelines.map((t) => (
            <ContentPanel key={t} className="text-sm text-kinetic-on-surface-variant">{t}</ContentPanel>
          ))}
        </div>
      </PageSection>

      <PageSection>
        <div className="h-80 border border-kinetic-outline-variant overflow-hidden">
          <iframe
            title="Flux Corp Location"
            src="https://maps.google.com/maps?q=Chikhali+Pune&t=&z=13&ie=UTF8&iwloc=&output=embed"
            className="w-full h-full border-0"
            loading="lazy"
          />
        </div>
      </PageSection>
    </>
  );
}
