import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './store/AuthContext';
import MainLayout from './layouts/MainLayout';
import AdminGate from './layouts/AdminLayout';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import ProjectsPage, { IndustriesPage } from './pages/ProjectsPage';
import ProductGalleryPage from './pages/ProductGalleryPage';
import {
  CaseStudiesPage, BlogPage, CertificationsPage,
  FacilitiesPage, CareersPage, ContactPage,
} from './pages/ContentPages';
import AdminDashboard, { AdminLeadsPage } from './pages/admin/AdminPages';
import AdminServicesPage from './pages/admin/AdminServicesPage';
import AdminProjectsPage from './pages/admin/AdminProjectsPage';
import AdminBlogsPage from './pages/admin/AdminBlogsPage';
import AdminMediaPage from './pages/admin/AdminMediaPage';
import AdminSettingsPage from './pages/admin/AdminSettingsPage';
import AdminSiteContentPage from './pages/admin/AdminSiteContentPage';
import AdminWebsitePagesHub, { AdminWebsitePageEditor } from './pages/admin/AdminWebsitePages';
import {
  AdminCaseStudiesPage, AdminCertificationsPage,
  AdminFacilitiesPage, AdminCareersPage,
} from './pages/admin/AdminCrudPages';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 5 * 60 * 1000,
      refetchOnWindowFocus: false,
    },
  },
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* Public website */}
            <Route element={<MainLayout />}>
              <Route index element={<HomePage />} />
              <Route path="about" element={<AboutPage />} />
              <Route path="services" element={<ServicesPage />} />
              <Route path="services/:slug" element={<ServicesPage />} />
              <Route path="industries" element={<IndustriesPage />} />
              <Route path="industries/:slug" element={<IndustriesPage />} />
              <Route path="projects" element={<ProjectsPage />} />
              <Route path="projects/:slug" element={<ProjectsPage />} />
              <Route path="product-gallery" element={<ProductGalleryPage />} />
              <Route path="case-studies" element={<CaseStudiesPage />} />
              <Route path="case-studies/:slug" element={<CaseStudiesPage />} />
              <Route path="certifications" element={<CertificationsPage />} />
              <Route path="facilities" element={<FacilitiesPage />} />
              <Route path="facilities/:slug" element={<FacilitiesPage />} />
              <Route path="blog" element={<BlogPage />} />
              <Route path="blog/:slug" element={<BlogPage />} />
              <Route path="careers" element={<CareersPage />} />
              <Route path="careers/:slug" element={<CareersPage />} />
              <Route path="contact" element={<ContactPage />} />
            </Route>

            {/* Admin portal — /admin shows login or dashboard */}
            <Route path="admin" element={<AdminGate />}>
              <Route index element={<AdminDashboard />} />
              <Route path="services" element={<AdminServicesPage />} />
              <Route path="projects" element={<AdminProjectsPage />} />
              <Route path="case-studies" element={<AdminCaseStudiesPage />} />
              <Route path="blogs" element={<AdminBlogsPage />} />
              <Route path="certifications" element={<AdminCertificationsPage />} />
              <Route path="facilities" element={<AdminFacilitiesPage />} />
              <Route path="careers" element={<AdminCareersPage />} />
              <Route path="leads" element={<AdminLeadsPage />} />
              <Route path="pages" element={<AdminWebsitePagesHub />} />
              <Route path="pages/:pageId" element={<AdminWebsitePageEditor />} />
              <Route path="site-content" element={<AdminSiteContentPage />} />
              <Route path="media" element={<AdminMediaPage />} />
              <Route path="settings" element={<AdminSettingsPage />} />
            </Route>

            {/* Legacy redirect */}
            <Route path="admin/login" element={<Navigate to="/admin" replace />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  );
}
