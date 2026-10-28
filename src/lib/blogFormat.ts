import { BlogHeading, TocHeading } from '@/types/blog';

/**
 * Shared formatting + outline helpers for the public blog section.
 * Pure utilities (no Prisma imports) so they are safe to use in client components.
 */

/** Renders an ISO date as "September 12, 2026" (long) or "Sep 12, 2026" (short). */
export function formatBlogDate(
  iso?: string | null,
  style: 'long' | 'short' = 'short'
): string {
  if (!iso) return '';
  try {
    return new Date(iso).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      ...(style === 'short' ? { month: 'short' as const } : {}),
    });
  } catch {
    return '';
  }
}

/** URL-safe slug for a heading, used as its in-page anchor id. */
export function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

/**
 * Extracts the article outline (## and ### headings) from the plain-text blog format.
 * Ids are de-duplicated in document order so they match what BlogContent renders.
 */
export function extractToc(content: string): TocHeading[] {
  const blocks = content.replace(/\r\n/g, '\n').split(/\n{2,}/);
  const seen = new Map<string, number>();
  const headings: BlogHeading[] = [];

  for (const block of blocks) {
    const trimmed = block.trim();
    let level: 2 | 3 | null = null;
    let text = '';

    if (trimmed.startsWith('### ')) {
      level = 3;
      text = trimmed.slice(4).split('\n')[0].trim();
    } else if (trimmed.startsWith('## ')) {
      level = 2;
      text = trimmed.slice(3).split('\n')[0].trim();
    }

    if (!level || !text) continue;

    const base = slugifyHeading(text) || 'section';
    const count = (seen.get(base) ?? 0) + 1;
    seen.set(base, count);

    headings.push({ id: count > 1 ? `${base}-${count}` : base, text, level });
  }

  return headings;
}
