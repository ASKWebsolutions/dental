'use client';

import React, { useState } from 'react';
import { X, AlertCircle } from 'lucide-react';
import {
  BlogPost,
  BlogPostPayload,
  BlogCategory,
  BLOG_CATEGORIES,
  BlogImage,
} from '@/types/blog';
import ImageUploadField from '@/components/admin/ImageUploadField';

interface BlogDrawerProps {
  isOpen: boolean;
  post: BlogPost | null;
  onClose: () => void;
  onSave: (payload: BlogPostPayload) => Promise<void>;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

/**
 * Inner form — remounted via `key` when the target post changes, so state
 * initializes straight from props (no reset effect needed).
 */
const BlogDrawerForm: React.FC<{
  post: BlogPost | null;
  onClose: () => void;
  onSave: (payload: BlogPostPayload) => Promise<void>;
}> = ({ post, onClose, onSave }) => {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Form states — initialized directly from the post being edited
  const [title, setTitle] = useState(post?.title || '');
  const [slug, setSlug] = useState(post?.slug || '');
  const [slugTouched, setSlugTouched] = useState(!!post);
  const [excerpt, setExcerpt] = useState(post?.excerpt || '');
  const [content, setContent] = useState(post?.content || '');
  const [category, setCategory] = useState<BlogCategory>(post?.category || 'Oral Health');
  const [tags, setTags] = useState<string[]>(post?.tags || []);
  const [tagInput, setTagInput] = useState('');
  const [author, setAuthor] = useState(post?.author || '');
  const [featured, setFeatured] = useState(!!post?.featured);
  const [isPublished, setIsPublished] = useState(post ? post.status === 'published' : true);

  // Cover image state
  const [coverImage, setCoverImage] = useState<BlogImage>(
    post?.coverImage || { publicId: '', url: '', altText: '' }
  );

  // Auto-generate slug from title until the admin edits it manually
  const handleTitleChange = (value: string) => {
    setTitle(value);
    if (!slugTouched) {
      setSlug(slugify(value));
    }
  };

  const handleAddTag = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const val = tagInput.trim().replace(/#/g, '');
      if (val && !tags.includes(val)) {
        setTags([...tags, val]);
      }
      setTagInput('');
    }
  };

  const handleRemoveTag = (t: string) => {
    setTags(tags.filter((tag) => tag !== t));
  };

  const contentWordCount = content.trim() ? content.trim().split(/\s+/).length : 0;
  const contentReadMins = Math.max(1, Math.round(contentWordCount / 200));

  const isFormValid = () => {
    if (!title.trim() || title.length > 120) return false;
    if (!slug.trim() || !/^[a-z0-9]+(-[a-z0-9]+)*$/.test(slug)) return false;
    if (!excerpt.trim() || excerpt.length > 300) return false;
    if (content.trim().length < 50) return false;
    if (!category) return false;
    if (isPublished && !coverImage.url) return false;
    if (coverImage.url && coverImage.altText.trim().length < 10) return false;
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!isFormValid()) {
      setErrorMsg(
        'Please fill all required fields. A cover image (with alt text) is required to publish.'
      );
      return;
    }

    setLoading(true);

    const payload: BlogPostPayload = {
      title: title.trim(),
      slug: slug.trim(),
      excerpt: excerpt.trim(),
      content,
      category,
      tags,
      author: author.trim() || null,
      featured,
      status: isPublished ? 'published' : 'draft',
      coverImage: coverImage.url
        ? {
            publicId: coverImage.publicId,
            url: coverImage.url,
            altText: coverImage.altText.trim() || title.trim(),
          }
        : undefined,
    };

    try {
      await onSave(payload);
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Failed to save blog post');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex justify-end font-sans text-dark-text">
      {/* Click backdrop to close */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Drawer Card */}
      <div className="relative w-full max-w-xl bg-white h-screen flex flex-col shadow-2xl overflow-hidden animate-slide-in-right z-10">
        <header className="p-6 border-b border-slate-100 flex justify-between items-center">
          <div>
            <h3 className="font-bold text-lg font-sans">
              {post ? 'Edit Article' : 'Write New Article'}
            </h3>
            <p className="text-xs text-body-text mt-0.5">
              {post ? 'Update article content and visibility' : 'Compose a new journal post'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:bg-slate-50 hover:text-dark-text cursor-pointer transition-colors"
            aria-label="Close editor"
          >
            <X className="w-5 h-5" />
          </button>
        </header>

        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 flex flex-col gap-6 text-sm">
          {errorMsg && (
            <div className="p-4 rounded-xl bg-accent-soft text-accent-dark font-semibold border border-accent/15 flex items-start gap-2.5">
              <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* 1. COVER IMAGE UPLOAD */}
          <div className="flex flex-col gap-2 p-4 bg-bg-alt border border-slate-200 rounded-2xl relative w-full">
            <ImageUploadField
              label="Cover Image"
              folder="blogs"
              accept="image/*"
              value={coverImage.url ? coverImage : null}
              placeholder="Paste hosted image URL e.g. https://..."
              onChange={(val) =>
                setCoverImage({
                  publicId: val?.publicId || '',
                  url: val?.url || '',
                  altText: coverImage.altText,
                })
              }
            />
            <input
              type="text"
              value={coverImage.altText}
              onChange={(e) => setCoverImage({ ...coverImage, altText: e.target.value })}
              placeholder="Alt text description (required to publish, min 10 chars)"
              className="w-full px-3 py-2 rounded-xl border bg-white text-xs text-dark-text placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-primary"
            />
            {isPublished && !coverImage.url && (
              <p className="text-[11px] font-semibold text-accent">
                Cover image is required when the article is published.
              </p>
            )}
          </div>

          {/* 2. TITLE */}
          <div className="flex flex-col gap-1.5">
            <div className="flex justify-between items-center text-xs">
              <label className="font-bold text-dark-text tracking-wide uppercase">Title *</label>
              <span className={`font-semibold ${title.length > 120 ? 'text-accent' : 'text-slate-400'}`}>
                {title.length}/120
              </span>
            </div>
            <input
              type="text"
              required
              maxLength={130}
              value={title}
              onChange={(e) => handleTitleChange(e.target.value)}
              className="px-4 py-2.5 bg-bg-alt border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="e.g. How to care for your teeth after an implant"
            />
          </div>

          {/* 3. SLUG */}
          <div className="flex flex-col gap-1.5">
            <label className="font-bold text-dark-text tracking-wide uppercase text-xs">
              URL Slug *
            </label>
            <div className="flex items-center gap-2 px-4 py-2.5 bg-bg-alt border rounded-xl focus-within:ring-2 focus-within:ring-primary">
              <span className="text-xs text-slate-400 shrink-0 font-semibold">/blogs/</span>
              <input
                type="text"
                required
                value={slug}
                onChange={(e) => {
                  setSlugTouched(true);
                  setSlug(slugify(e.target.value));
                }}
                className="flex-1 bg-transparent text-sm text-dark-text focus:outline-none min-w-0"
                placeholder="auto-generated-from-title"
              />
            </div>
          </div>

          {/* 4. EXCERPT */}
          <div className="flex flex-col gap-1.5">
            <div className="flex justify-between items-center text-xs">
              <label className="font-bold text-dark-text tracking-wide uppercase">
                Excerpt *
              </label>
              <span className={`font-semibold ${excerpt.length > 300 ? 'text-accent' : 'text-slate-400'}`}>
                {excerpt.length}/300
              </span>
            </div>
            <textarea
              required
              rows={2}
              maxLength={320}
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              className="px-4 py-2.5 bg-bg-alt border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary resize-none"
              placeholder="1-2 sentence summary shown on the listing cards..."
            />
          </div>

          {/* 5. CONTENT */}
          <div className="flex flex-col gap-1.5">
            <div className="flex justify-between items-center text-xs">
              <label className="font-bold text-dark-text tracking-wide uppercase">
                Article Body *
              </label>
              <span className="font-semibold text-slate-400">
                {contentWordCount} words · ~{contentReadMins} min read
              </span>
            </div>
            <textarea
              required
              rows={12}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="px-4 py-3 bg-bg-alt border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary font-mono text-xs leading-relaxed resize-y"
              placeholder={
                'Write your article...\n\n## Section Heading\n\nParagraph of text here.\n\n- Bullet point one\n- Bullet point two\n\n> Optional pull quote'
              }
            />
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Formatting: blank line = new paragraph · <code className="font-bold">## Heading</code>{' '}
              · <code className="font-bold">- bullet</code> · <code className="font-bold">&gt; quote</code>
            </p>
          </div>

          {/* 6. CATEGORY + AUTHOR */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="font-bold text-dark-text tracking-wide uppercase text-xs">
                Category *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as BlogCategory)}
                className="px-4 py-2.5 bg-bg-alt border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary font-semibold"
              >
                {BLOG_CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="font-bold text-dark-text tracking-wide uppercase text-xs">
                Author (optional)
              </label>
              <input
                type="text"
                maxLength={80}
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="px-4 py-2.5 bg-bg-alt border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="e.g. Dr. Elena Sterling"
              />
            </div>
          </div>

          {/* 7. TAGS */}
          <div className="flex flex-col gap-2">
            <label className="font-bold text-dark-text tracking-wide uppercase text-xs">
              Tags (optional)
            </label>
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={handleAddTag}
              className="px-4 py-2.5 bg-bg-alt border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Press Enter or Comma to add tag"
            />
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-1.5">
                {tags.map((t) => (
                  <span
                    key={t}
                    className="inline-flex items-center gap-1.5 pl-3 pr-2 py-1 bg-slate-100 hover:bg-slate-200 border rounded-full text-xs font-semibold"
                  >
                    #{t}
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(t)}
                      className="text-slate-400 hover:text-accent font-bold cursor-pointer text-[10px]"
                    >
                      ✕
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* 8. SETTINGS TOGGLES */}
          <div className="flex flex-col gap-3.5 border-t border-slate-100 pt-5">
            <div className="flex items-center gap-2.5">
              <input
                type="checkbox"
                id="blog-featured-checkbox"
                checked={featured}
                onChange={(e) => setFeatured(e.target.checked)}
                className="w-4 h-4 text-primary focus:ring-primary border-slate-300 rounded cursor-pointer"
              />
              <label
                htmlFor="blog-featured-checkbox"
                className="font-semibold text-xs text-dark-text uppercase tracking-wide cursor-pointer"
              >
                Featured (pin to top of listing)
              </label>
            </div>
            <div className="flex items-center gap-2.5">
              <input
                type="checkbox"
                id="blog-published-checkbox"
                checked={isPublished}
                onChange={(e) => setIsPublished(e.target.checked)}
                className="w-4 h-4 text-primary focus:ring-primary border-slate-300 rounded cursor-pointer"
              />
              <label
                htmlFor="blog-published-checkbox"
                className="font-semibold text-xs text-dark-text uppercase tracking-wide cursor-pointer"
              >
                Published (visible to patients instantly)
              </label>
            </div>
          </div>

          {/* Actions */}
          <footer className="pt-6 border-t border-slate-100 flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-full border border-slate-200 hover:bg-slate-50 transition cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || !isFormValid()}
              className="px-6 py-2.5 rounded-full bg-primary text-white hover:bg-primary-hover disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed transition cursor-pointer font-bold shadow-sm"
            >
              {loading ? 'Saving...' : post ? 'Update Article' : 'Publish Article'}
            </button>
          </footer>
        </form>
      </div>
    </div>
  );
};

export const BlogDrawer: React.FC<BlogDrawerProps> = ({ isOpen, post, onClose, onSave }) => {
  if (!isOpen) return null;

  // Key forces a fresh mount (and fresh initial state) whenever the target changes
  return <BlogDrawerForm key={post?.id || 'new'} post={post} onClose={onClose} onSave={onSave} />;
};

export default BlogDrawer;
