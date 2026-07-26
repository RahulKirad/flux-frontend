export interface User {
  id: number;
  name: string;
  email: string;
  role_id: number;
  role_slug: string;
  role_name?: string;
  permissions?: string[];
}

export interface Service {
  id: number;
  parent_id: number | null;
  title: string;
  slug: string;
  banner?: string;
  icon?: string;
  short_description?: string;
  description?: string;
  benefits?: string[];
  process_flow?: { step: number; title: string; description: string }[];
  technologies?: string[];
  brochure_url?: string;
  is_featured?: boolean;
  sub_services?: Service[];
}

export interface Project {
  id: number;
  title: string;
  slug: string;
  industry_id?: number;
  industry_name?: string;
  category?: string;
  client_name?: string;
  banner?: string;
  short_description?: string;
  description?: string;
  challenge?: string;
  solution?: string;
  technologies?: string[];
  results?: string;
  pdf_url?: string;
  is_featured?: boolean;
  gallery?: GalleryItem[];
}

export interface GalleryItem {
  id: number;
  url: string;
  caption?: string;
  media_type: 'image' | 'video';
}

export interface Industry {
  id: number;
  title: string;
  slug: string;
  banner?: string;
  short_description?: string;
  description?: string;
  challenges?: string[];
  solutions?: string[];
  projects?: Project[];
  case_studies?: CaseStudy[];
}

export interface CaseStudy {
  id: number;
  title: string;
  slug: string;
  industry_name?: string;
  banner?: string;
  challenge?: string;
  solution?: string;
  outcome?: string;
  pdf_url?: string;
  is_featured?: boolean;
}

export interface Blog {
  id: number;
  title: string;
  slug: string;
  banner?: string;
  excerpt?: string;
  content?: string;
  category_name?: string;
  category_slug?: string;
  author_name?: string;
  tags?: string[];
  read_time?: number;
  views?: number;
  published_at?: string;
}

export interface Certification {
  id: number;
  title: string;
  slug: string;
  category: string;
  description?: string;
  certificate_image?: string;
  pdf_url?: string;
  issued_by?: string;
  issued_date?: string;
}

export interface Facility {
  id: number;
  name: string;
  slug: string;
  location?: string;
  address?: string;
  description?: string;
  capacity_details?: Record<string, string>;
  machinery_listing?: string[];
  banner?: string;
  video_url?: string;
  gallery?: GalleryItem[];
}

export interface Career {
  id: number;
  title: string;
  slug: string;
  department?: string;
  location?: string;
  employment_type?: string;
  experience?: string;
  description?: string;
  requirements?: string;
}

export interface Lead {
  id: number;
  source: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message?: string;
  status: string;
  service_title?: string;
  created_at: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  total?: number;
}
