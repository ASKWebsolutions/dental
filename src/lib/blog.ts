import { prisma } from './db';
import { BlogPost, BlogCategory } from '@/types/blog';
import { fallbackBlogPosts } from '@/data/blogs';

/** Rough reading speed: 200 words per minute. */
export function estimateReadTime(content: string): number {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

interface BlogRow {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  coverImageId: string | null;
  coverImageUrl: string | null;
  coverImageAlt: string | null;
  author: string | null;
  featured: boolean;
  status: string;
  displayOrder: number;
  publishedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export function mapBlogRow(row: BlogRow): BlogPost {
  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    excerpt: row.excerpt,
    content: row.content,
    category: row.category as BlogCategory,
    tags: row.tags || [],
    coverImage: row.coverImageUrl
      ? {
          publicId: row.coverImageId || '',
          url: row.coverImageUrl,
          altText: row.coverImageAlt || row.title,
        }
      : null,
    author: row.author,
    featured: row.featured,
    status: row.status === 'published' ? 'published' : 'draft',
    readTimeMins: estimateReadTime(row.content),
    displayOrder: row.displayOrder,
    publishedAt: row.publishedAt ? row.publishedAt.toISOString() : null,
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),
  };
}

/**
 * Returns published blog posts for the public site (featured first, then newest).
 * Falls back to static sample posts if the database query fails.
 */
export async function getPublishedBlogs(): Promise<BlogPost[]> {
  try {
    const rows = await prisma.blogPost.findMany({
      where: { status: 'published' },
      orderBy: [{ publishedAt: 'desc' }],
    });

    const mapped = rows.map(mapBlogRow);
    // Keep featured posts pinned to the top of the listing
    return mapped.sort((a, b) => Number(b.featured) - Number(a.featured));
  } catch (error) {
    console.error('getPublishedBlogs database fetch failed, using fallback:', error);
    return fallbackBlogPosts;
  }
}

/** Returns a single published post by slug, or null. */
export async function getBlogBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const row = await prisma.blogPost.findUnique({ where: { slug } });
    if (row && row.status === 'published') {
      return mapBlogRow(row);
    }
    return null;
  } catch (error) {
    console.error(`getBlogBySlug(${slug}) database fetch failed:`, error);
    return fallbackBlogPosts.find((p) => p.slug === slug) || null;
  }
}

/** Returns other published posts (optionally same category) for the "keep reading" section. */
export async function getRelatedBlogs(currentSlug: string, category?: string, limit = 3): Promise<BlogPost[]> {
  try {
    const rows = await prisma.blogPost.findMany({
      where: {
        status: 'published',
        slug: { not: currentSlug },
        ...(category ? { category } : {}),
      },
      orderBy: [{ publishedAt: 'desc' }],
      take: limit,
    });

    if (rows.length > 0) return rows.map(mapBlogRow);

    // Fall back to any other published post (different category)
    const anyRows = await prisma.blogPost.findMany({
      where: { status: 'published', slug: { not: currentSlug } },
      orderBy: [{ publishedAt: 'desc' }],
      take: limit,
    });
    return anyRows.map(mapBlogRow);
  } catch (error) {
    console.error('getRelatedBlogs database fetch failed:', error);
    return fallbackBlogPosts.filter((p) => p.slug !== currentSlug).slice(0, limit);
  }
}
