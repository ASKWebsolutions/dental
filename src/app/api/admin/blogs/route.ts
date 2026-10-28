import { NextResponse } from 'next/server';
import { z } from 'zod';
import prisma from '@/lib/prisma';
import { getSession } from '@/lib/auth';

const coverImageSchema = z.object({
  publicId: z.string().min(1, 'Cover image asset is required'),
  url: z.string().min(1, 'Cover image URL is required'),
  altText: z.string().min(10, 'Alt text must be at least 10 characters long'),
});

const blogPostSchema = z.object({
  title: z.string().min(1, 'Title is required').max(120, 'Title cannot exceed 120 characters'),
  slug: z
    .string()
    .max(140, 'Slug cannot exceed 140 characters')
    .regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, 'Slug must be lowercase letters, numbers, and hyphens')
    .optional()
    .or(z.literal('')),
  excerpt: z.string().min(1, 'Excerpt is required').max(300, 'Excerpt cannot exceed 300 characters'),
  content: z.string().min(50, 'Content must be at least 50 characters'),
  category: z.string().min(1, 'Category is required'),
  tags: z.array(z.string()).optional(),
  coverImage: coverImageSchema.optional(),
  author: z.string().max(80, 'Author name cannot exceed 80 characters').optional().nullable(),
  featured: z.boolean().optional(),
  status: z.enum(['published', 'draft']),
  displayOrder: z.number().int().optional(),
});

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

async function ensureUniqueSlug(base: string, excludeId?: string): Promise<string> {
  let slug = base || 'post';
  let counter = 2;
  for (;;) {
    const existing = await prisma.blogPost.findUnique({ where: { slug } });
    if (!existing || existing.id === excludeId) return slug;
    slug = `${base}-${counter}`;
    counter += 1;
  }
}

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const posts = await prisma.blogPost.findMany({
      orderBy: [{ displayOrder: 'asc' }, { createdAt: 'desc' }],
    });
    return NextResponse.json(posts.map((p) => ({ ...p, createdAt: p.createdAt.toISOString(), updatedAt: p.updatedAt.toISOString(), publishedAt: p.publishedAt ? p.publishedAt.toISOString() : null })));
  } catch (error) {
    console.error('Fetch admin blogs error:', error);
    return NextResponse.json({ error: 'Failed to fetch blog posts' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const result = blogPostSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json({ error: result.error.issues[0].message }, { status: 400 });
    }

    const data = result.data;

    if (data.status === 'published' && !data.coverImage) {
      return NextResponse.json(
        { error: 'A cover image is required to publish a post.' },
        { status: 400 }
      );
    }

    const baseSlug = data.slug ? slugify(data.slug) : slugify(data.title);
    const slug = await ensureUniqueSlug(baseSlug || 'post');

    // Auto displayOrder: append at the end
    let nextOrder = 1;
    const lastPost = await prisma.blogPost.findFirst({ orderBy: { displayOrder: 'desc' } });
    if (lastPost) nextOrder = lastPost.displayOrder + 1;

    const now = new Date();
    const created = await prisma.blogPost.create({
      data: {
        title: data.title,
        slug,
        excerpt: data.excerpt,
        content: data.content,
        category: data.category,
        tags: data.tags || [],
        coverImageId: data.coverImage?.publicId || null,
        coverImageUrl: data.coverImage?.url || null,
        coverImageAlt: data.coverImage?.altText || null,
        author: data.author || null,
        featured: !!data.featured,
        status: data.status,
        displayOrder: data.displayOrder ?? nextOrder,
        publishedAt: data.status === 'published' ? now : null,
      },
    });

    return NextResponse.json({
      ...created,
      createdAt: created.createdAt.toISOString(),
      updatedAt: created.updatedAt.toISOString(),
      publishedAt: created.publishedAt ? created.publishedAt.toISOString() : null,
    });
  } catch (error) {
    console.error('Create blog post error:', error);
    return NextResponse.json({ error: 'Failed to create blog post' }, { status: 500 });
  }
}
