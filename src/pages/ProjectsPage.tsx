import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import { AnimatedSection, PageHero, CmsPageHero, SectionHeading, SEOHead, LoadingSpinner } from '../components/common';
import ProjectGridCard from '../components/common/ProjectGridCard';
import { BulletList, ContentPanel, ImageTextBlock, PageSection } from '../components/layout/ContentBlocks';
import { assignProjectCardSlides } from '../data/projectCardImages';
import {
  enrichProject,
  getProjectLayout,
  getProjectVisuals,
  getStaticProjectBySlug,
  getStaticProjects,
} from '../data/projectsContent';
import { industriesContent, marketTrends } from '../data/companyContent';
import { projectsApi, industriesApi } from '../services/api';
import type { Project, Industry } from '../types';

export default function ProjectsPage() {
  const { slug } = useParams();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');

  const { data, isLoading } = useQuery({
    queryKey: ['projects', search, category],
    queryFn: () => projectsApi.getAll({ search, category, limit: '20' }),
    enabled: !slug,
  });

  const { data: detailRes, isLoading: detailLoading } = useQuery({
    queryKey: ['project', slug],
    queryFn: () => projectsApi.getBySlug(slug!),
    enabled: !!slug,
    retry: false,
  });

  const staticProject = slug ? getStaticProjectBySlug(slug) : undefined;

  const apiProjects: Project[] | undefined = data?.data?.data;
  const hasFilters = Boolean(search || category);

  const displayProjects = useMemo(() => {
    if (apiProjects?.length) {
      return apiProjects.map((project) => enrichProject(project));
    }
    if (!hasFilters) {
      return getStaticProjects();
    }
    return [];
  }, [apiProjects, hasFilters]);

  const projectSlides = useMemo(
    () => assignProjectCardSlides(displayProjects),
    [displayProjects],
  );

  if (slug) {
    const apiProject: Project | undefined = detailRes?.data?.data;
    const project = apiProject ? enrichProject(apiProject) : staticProject;

    if (!project && detailLoading) return <LoadingSpinner />;
    if (!project) return <div className="stitch-section text-center py-20">Project not found</div>;

    const visuals = getProjectVisuals(project.slug);
    const galleryImages = project.gallery?.length
      ? project.gallery
      : (visuals?.slides ?? (project.banner ? [project.banner] : [])).map((url, id) => ({
          id,
          url,
          media_type: 'image' as const,
        }));

    return (
      <>
        <SEOHead title={`${project.title} | Flux Corp Projects`} description={project.short_description} />
        <PageHero label="Project" title={project.title} subtitle={project.short_description} />

        <PageSection>
          <div className="max-w-4xl space-y-12">
            {project.challenge && (
              <AnimatedSection>
                <h2 className="text-xl font-bold uppercase text-kinetic-primary mb-4">Challenge</h2>
                <p className="text-kinetic-on-surface-variant leading-relaxed">{project.challenge}</p>
              </AnimatedSection>
            )}
            {project.solution && (
              <AnimatedSection>
                <h2 className="text-xl font-bold uppercase text-kinetic-primary mb-4">Solution</h2>
                <p className="text-kinetic-on-surface-variant leading-relaxed">{project.solution}</p>
              </AnimatedSection>
            )}
            {project.results && (
              <AnimatedSection>
                <h2 className="text-xl font-bold uppercase text-kinetic-primary mb-4">Results</h2>
                <p className="text-kinetic-on-surface-variant leading-relaxed">{project.results}</p>
              </AnimatedSection>
            )}
            {galleryImages.length > 0 && (
              <AnimatedSection>
                <h2 className="text-xl font-bold uppercase text-kinetic-primary mb-4">Gallery</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {galleryImages.map((item) => (
                    <div key={item.id} className="h-64 border border-kinetic-outline-variant overflow-hidden">
                      <img src={item.url} alt={'caption' in item ? item.caption || project.title : project.title} className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              </AnimatedSection>
            )}
          </div>
        </PageSection>
      </>
    );
  }

  if (isLoading) return <LoadingSpinner />;

  return (
    <>
      <SEOHead title="Projects | Flux Corp Portfolio" description="Engineering projects across bus body, railway, automotive, and industrial sectors." />
      <CmsPageHero pageId="projects" />

      <PageSection>
        <div className="flex flex-col md:flex-row gap-4 mb-10">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-kinetic-outline" size={20} />
            <input
              type="text"
              placeholder="Search projects..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="stitch-input pl-10"
            />
          </div>
          <select value={category} onChange={(e) => setCategory(e.target.value)} className="stitch-input w-full md:w-56">
            <option value="">All Categories</option>
            <option value="Automotive Styling">Automotive Styling</option>
            <option value="Bus Manufacturing">Bus Manufacturing</option>
            <option value="Railway">Railway</option>
            <option value="Industrial">Industrial</option>
            <option value="Tool & Die">Tool & Die</option>
          </select>
        </div>

        {displayProjects.length > 0 ? (
          <div className="grid grid-cols-12 gap-6 lg:gap-8">
            {displayProjects.map((project, i) => (
              <ProjectGridCard
                key={project.id}
                to={`/projects/${project.slug}`}
                title={project.title}
                category={project.category ?? 'Engineering'}
                description={project.short_description ?? ''}
                images={projectSlides.get(project.id) ?? (project.banner ? [project.banner] : [])}
                layout={getProjectLayout(project.slug, i, project.is_featured)}
                imagePosition={i % 2 === 0 ? 'left' : 'right'}
                delay={i * 0.05}
              />
            ))}
          </div>
        ) : (
          <p className="text-center text-kinetic-on-surface-variant py-16">
            No projects match your search. Try a different keyword or category.
          </p>
        )}
      </PageSection>

      <PageSection tone="muted">
        <SectionHeading label="Market Trends" title="Industry Opportunities" description="Flux Corp is well-positioned to capitalize on growth in bus body and railway manufacturing." />
        <div className="grid md:grid-cols-2 gap-8">
          <ContentPanel>
            <h3 className="text-lg font-semibold uppercase text-kinetic-primary mb-4">Bus Body Manufacturing</h3>
            <BulletList items={marketTrends.bus} />
          </ContentPanel>
          <ContentPanel>
            <h3 className="text-lg font-semibold uppercase text-kinetic-primary mb-4">Railway Parts</h3>
            <BulletList items={marketTrends.railway} />
          </ContentPanel>
        </div>
      </PageSection>
    </>
  );
}

export function IndustriesPage() {
  const { slug } = useParams();

  const { data: allRes, isLoading: allLoading } = useQuery({
    queryKey: ['industries'],
    queryFn: () => industriesApi.getAll(),
    enabled: !slug,
  });

  const { data: detailRes, isLoading: detailLoading } = useQuery({
    queryKey: ['industry', slug],
    queryFn: () => industriesApi.getBySlug(slug!),
    enabled: !!slug,
  });

  const staticIndustry = industriesContent.find((i) => i.slug === slug);

  if (slug) {
    if (detailLoading) return <LoadingSpinner />;
    const industry: Industry | undefined = detailRes?.data?.data;
    const title = industry?.title || staticIndustry?.title || slug;
    const description = industry?.description || staticIndustry?.description || '';
    const items = staticIndustry?.items || [];

    if (!industry && !staticIndustry) return <div className="stitch-section text-center py-20">Industry not found</div>;

    return (
      <>
        <SEOHead title={`${title} | Flux Corp Industries`} description={description} />
        <PageHero label="Industry" title={title} subtitle={industry?.short_description || staticIndustry?.description} />

        <PageSection>
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <AnimatedSection>
              <p className="text-kinetic-on-surface-variant text-lg leading-relaxed mb-8">{description}</p>
              {items.length > 0 && (
                <>
                  <h3 className="text-lg font-semibold uppercase text-kinetic-primary mb-4">Applications</h3>
                  <BulletList items={items} />
                </>
              )}
            </AnimatedSection>
            {staticIndustry?.image && (
              <AnimatedSection delay={0.15}>
                <div className="h-[360px] border border-kinetic-outline-variant overflow-hidden">
                  <img src={staticIndustry.image} alt={title} className="w-full h-full object-cover" />
                </div>
              </AnimatedSection>
            )}
          </div>
        </PageSection>
      </>
    );
  }

  if (allLoading) return <LoadingSpinner />;
  const industries: Industry[] = allRes?.data?.data || [];
  const displayIndustries = industries.length > 0
    ? industries
    : industriesContent.map((i, id) => ({ id, slug: i.slug, title: i.title, short_description: i.description } as Industry));

  return (
    <>
      <SEOHead title="Industries | Flux Corp" description="Automotive, railways, commercial vehicles, EV, and industrial engineering solutions." />
      <CmsPageHero pageId="industries" />

      <PageSection>
        <div className="grid md:grid-cols-2 gap-8">
          {displayIndustries.map((industry, i) => {
            const staticData = industriesContent.find((s) => s.slug === industry.slug);
            const image = staticData?.image;
            return (
              <AnimatedSection key={industry.id} delay={i * 0.08}>
                <Link to={`/industries/${industry.slug}`} className="group block border border-kinetic-outline-variant overflow-hidden bg-white hover:border-kinetic-primary transition h-full">
                  {image && (
                    <div className="h-48 overflow-hidden">
                      <img src={image} alt={industry.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                    </div>
                  )}
                  <div className="p-8">
                    <h3 className="text-xl font-semibold uppercase text-kinetic-primary mb-3">{industry.title}</h3>
                    <p className="text-kinetic-on-surface-variant">{industry.short_description}</p>
                  </div>
                </Link>
              </AnimatedSection>
            );
          })}
        </div>
      </PageSection>

      <PageSection tone="muted">
        <ImageTextBlock
          label="Partner Ecosystem"
          title="Collaborative Innovation"
          description="Flux Corp collaborates with suppliers, technology partners, and industry experts to access the latest materials, processes, and regulatory insights — ensuring clients benefit from cutting-edge innovation."
          image="https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1200&q=80"
          reverse
          link={{ label: 'Become a Partner', href: '/contact' }}
        />
      </PageSection>
    </>
  );
}
