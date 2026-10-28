export type BlogStatus = 'draft' | 'published';

export type BlogCategory =
  | 'Oral Health'
  | 'Cosmetic Dentistry'
  | 'Dental Implants'
  | 'Orthodontics'
  | 'General Care'
  | 'Clinic News';

export const BLOG_CATEGORIES: BlogCategory[] = [
  'Oral Health',
  'Cosmetic Dentistry',
  'Dental Implants',
  'Orthodontics',
  'General Care',
  'Clinic News',
];

export interface BlogImage {
  publicId: string;
  url: string;
  altText: string;
}

/** A heading extracted from a blog's plain-text content (for the article outline / TOC). */
export interface BlogHeading {
  id: string;
  text: string;
  level: 2 | 3;
}

/** Alias used by the detail-page sidebar for the table of contents. */
export type TocHeading = BlogHeading;

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: BlogCategory;
  tags: string[];
  coverImage?: BlogImage | null;
  author?: string | null;
  featured: boolean;
  status: BlogStatus;
  readTimeMins: number;
  displayOrder: number;
  publishedAt?: string | null;
  createdAt: string;
  updatedAt: string;
}

/** Payload shape sent to the admin blogs API on create/update. */
export interface BlogPostPayload {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: BlogCategory;
  tags: string[];
  coverImage?: BlogImage;
  author?: string | null;
  featured: boolean;
  status: BlogStatus;
}

/** Raw blog row as returned by the admin blogs API (dates as ISO strings). */
export interface BlogApiRow {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  tags?: string[];
  coverImageId?: string | null;
  coverImageUrl?: string | null;
  coverImageAlt?: string | null;
  author?: string | null;
  featured?: boolean;
  status: string;
  readTimeMins?: number;
  displayOrder?: number;
  publishedAt?: string | null;
  createdAt: string;
  updatedAt: string;
}
