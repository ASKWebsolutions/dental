'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Plus,
  Search,
  Trash,
  CheckCircle,
  XCircle,
  Edit,
  Loader,
  Eye,
  Star,
} from 'lucide-react';
import { BlogPost, BlogPostPayload, BlogApiRow, BLOG_CATEGORIES } from '@/types/blog';
import { resolveThumbnailUrl } from '@/lib/media';
import BlogDrawer from './BlogDrawer';

interface BlogsAdminContentProps {
  initialPosts: BlogPost[];
}

function formatDate(iso?: string | null): string {
  if (!iso) return '—';
  try {
    return new Date(iso).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  } catch {
    return '—';
  }
}

export const BlogsAdminContent: React.FC<BlogsAdminContentProps> = ({ initialPosts }) => {
  const router = useRouter();
  const [posts, setPosts] = useState<BlogPost[]>(initialPosts);

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'published' | 'draft'>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  // Drawer states
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);

  // Loading indicator for network updates
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  // Filter posts
  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' ? true : post.status === statusFilter;
    const matchesCategory = categoryFilter === 'all' ? true : post.category === categoryFilter;
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const publishedCount = posts.filter((p) => p.status === 'published').length;
  const draftCount = posts.length - publishedCount;

  // Inline Publish/Draft Toggle
  const handleToggleStatus = async (post: BlogPost) => {
    setUpdatingId(post.id);
    const targetStatus = post.status === 'published' ? 'draft' : 'published';
    const previousPosts = [...posts];

    // Optimistic update
    setPosts(posts.map((x) => (x.id === post.id ? { ...x, status: targetStatus } : x)));

    try {
      const res = await fetch(`/api/admin/blogs/${post.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...post, status: targetStatus }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Failed to toggle status');
      }
      const updated = await res.json();
      setPosts(posts.map((x) => (x.id === post.id ? { ...x, ...mapUpdated(updated) } : x)));
      router.refresh();
    } catch (err) {
      console.error(err);
      setPosts(previousPosts);
      alert(
        err instanceof Error
          ? err.message
          : 'Failed to update visibility. A cover image is required to publish.'
      );
    } finally {
      setUpdatingId(null);
    }
  };

  // Form Save Actions
  const handleSavePost = async (payload: BlogPostPayload) => {
    try {
      if (editingPost) {
        const res = await fetch(`/api/admin/blogs/${editingPost.id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });

        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.error || 'Failed to update article');
        }

        const updated = await res.json();
        setPosts(posts.map((x) => (x.id === editingPost.id ? mapUpdated(updated) : x)));
        router.refresh();
      } else {
        const res = await fetch('/api/admin/blogs', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });

        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.error || 'Failed to create article');
        }

        const created = await res.json();
        setPosts([...posts, mapUpdated(created)]);
        router.refresh();
      }
      setIsDrawerOpen(false);
      setEditingPost(null);
    } catch (err) {
      throw err;
    }
  };

  // Single post delete
  const handleDeleteOne = async (id: string) => {
    if (!confirm('Are you sure you want to permanently delete this article?')) return;
    try {
      const res = await fetch(`/api/admin/blogs/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete article');
      setPosts(posts.filter((x) => x.id !== id));
      router.refresh();
    } catch {
      alert('Delete failed');
    }
  };

  return (
    <div className="flex-1 flex flex-col font-sans p-6 text-sm">
      {/* Top action header bar */}
      <header className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold font-sans tracking-tight text-slate-900">
            Blog Management
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            {publishedCount} published · {draftCount} draft{draftCount === 1 ? '' : 's'} — write and
            manage the clinic journal.
          </p>
        </div>
        <button
          onClick={() => {
            setEditingPost(null);
            setIsDrawerOpen(true);
          }}
          className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-primary hover:bg-primary-hover text-white font-bold transition shadow-sm cursor-pointer"
        >
          <Plus className="w-4 h-4" /> Write New Article
        </button>
      </header>

      {/* Filter panel options */}
      <div className="bg-white rounded-2xl border border-slate-100 p-4 mb-6 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="flex flex-1 flex-col sm:flex-row items-center gap-3 w-full">
          {/* Title search */}
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search articles..."
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-primary text-xs"
            />
          </div>

          {/* Category drop down */}
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="w-full sm:w-48 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-primary font-semibold text-xs text-slate-600"
          >
            <option value="all">All Categories</option>
            {BLOG_CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          {/* Status drop down */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as 'all' | 'published' | 'draft')}
            className="w-full sm:w-36 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-primary font-semibold text-xs text-slate-600"
          >
            <option value="all">All Statuses</option>
            <option value="published">Published</option>
            <option value="draft">Drafts</option>
          </select>
        </div>
      </div>

      {/* Articles table */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden flex flex-col flex-1 w-full">
        <div className="overflow-x-auto w-full">
          <div className="min-w-[900px]">
            {/* Table Headings */}
            <div className="grid grid-cols-12 gap-4 px-6 py-4 bg-slate-50/75 border-b border-slate-100 font-bold text-xs text-slate-500 uppercase tracking-wider select-none text-left">
              <div className="col-span-1">Cover</div>
              <div className="col-span-4">Title / Excerpt</div>
              <div className="col-span-2">Category</div>
              <div className="col-span-1">Published</div>
              <div className="col-span-1 text-center">Visibility</div>
              <div className="col-span-1 text-center">Featured</div>
              <div className="col-span-2 text-right">Actions</div>
            </div>

            {/* Rows */}
            <div className="divide-y divide-slate-50 max-h-[60vh] overflow-y-auto flex flex-col text-left">
              {filteredPosts.map((post) => {
                const thumbUrl = post.coverImage ? resolveThumbnailUrl(post.coverImage) : '';

                return (
                  <div
                    key={post.id}
                    className={`grid grid-cols-12 gap-4 px-6 py-4 items-center bg-white hover:bg-slate-50/50 transition-colors ${
                      post.status === 'draft' ? 'opacity-85' : ''
                    }`}
                  >
                    {/* Cover thumbnail */}
                    <div className="col-span-1">
                      <div className="w-14 h-10 rounded-lg bg-slate-50 border overflow-hidden relative">
                        {thumbUrl ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={thumbUrl}
                            className="object-cover w-full h-full"
                            alt={post.coverImage?.altText || post.title}
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-[9px] text-slate-300">
                            No image
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Title / Excerpt */}
                    <div className="col-span-4 flex flex-col gap-0.5 min-w-0">
                      <div className="font-bold text-slate-900 leading-tight flex items-center gap-1.5">
                        <span className="truncate">{post.title}</span>
                        {post.status === 'draft' && (
                          <span className="text-[9px] uppercase bg-amber-50 text-amber-600 border border-amber-200/60 px-1.5 py-0.2 rounded font-bold shrink-0">
                            Draft
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-slate-500 font-sans line-clamp-1">
                        {post.excerpt}
                      </div>
                    </div>

                    {/* Category */}
                    <div className="col-span-2">
                      <span className="inline-flex px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 font-semibold text-[10px]">
                        {post.category}
                      </span>
                    </div>

                    {/* Published date */}
                    <div className="col-span-1 text-xs text-slate-500 font-semibold">
                      {formatDate(post.publishedAt || (post.status === 'published' ? post.createdAt : null))}
                    </div>

                    {/* Publish Toggle */}
                    <div className="col-span-1 flex justify-center">
                      <button
                        onClick={() => handleToggleStatus(post)}
                        disabled={updatingId === post.id}
                        className="cursor-pointer disabled:cursor-wait"
                        title={post.status === 'published' ? 'Unpublish' : 'Publish'}
                      >
                        {updatingId === post.id ? (
                          <Loader className="w-4 h-4 animate-spin text-slate-400" />
                        ) : post.status === 'published' ? (
                          <CheckCircle className="w-5 h-5 text-green-500 fill-green-50" />
                        ) : (
                          <XCircle className="w-5 h-5 text-slate-300 fill-slate-50" />
                        )}
                      </button>
                    </div>

                    {/* Featured star */}
                    <div className="col-span-1 flex justify-center">
                      <span
                        title={post.featured ? 'Featured article' : 'Not featured'}
                        className={post.featured ? '' : 'opacity-25'}
                      >
                        <Star
                          className={`w-4 h-4 ${
                            post.featured ? 'text-amber-400 fill-amber-100' : 'text-slate-400'
                          }`}
                        />
                      </span>
                    </div>

                    {/* Actions */}
                    <div className="col-span-2 text-right flex justify-end gap-1.5">
                      <a
                        href={`/blogs/${post.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg cursor-pointer"
                        title="View live article"
                      >
                        <Eye className="w-4 h-4" />
                      </a>
                      <button
                        onClick={() => {
                          setEditingPost(post);
                          setIsDrawerOpen(true);
                        }}
                        className="p-1.5 text-slate-400 hover:text-primary hover:bg-slate-100 rounded-lg cursor-pointer"
                        title="Edit article"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteOne(post.id)}
                        className="p-1.5 text-slate-400 hover:text-accent hover:bg-slate-100 rounded-lg cursor-pointer"
                        title="Delete article"
                      >
                        <Trash className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {filteredPosts.length === 0 && (
              <div className="py-24 text-center text-slate-400 font-sans">
                No articles found matching filters.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Editor Drawer */}
      <BlogDrawer
        isOpen={isDrawerOpen}
        post={editingPost}
        onClose={() => {
          setIsDrawerOpen(false);
          setEditingPost(null);
        }}
        onSave={handleSavePost}
      />
    </div>
  );
};

/** Normalizes an API response into the BlogPost shape used by the table. */
function mapUpdated(apiPost: BlogApiRow): BlogPost {
  return {
    id: apiPost.id,
    title: apiPost.title,
    slug: apiPost.slug,
    excerpt: apiPost.excerpt,
    content: apiPost.content,
    category: apiPost.category as BlogPost['category'],
    tags: apiPost.tags || [],
    coverImage: apiPost.coverImageUrl
      ? {
          publicId: apiPost.coverImageId || '',
          url: apiPost.coverImageUrl,
          altText: apiPost.coverImageAlt || apiPost.title,
        }
      : null,
    author: apiPost.author,
    featured: !!apiPost.featured,
    status: apiPost.status === 'published' ? 'published' : 'draft',
    readTimeMins: Math.max(
      1,
      Math.round((apiPost.content.trim().split(/\s+/).filter(Boolean).length || 0) / 200)
    ),
    displayOrder: apiPost.displayOrder ?? 0,
    publishedAt: apiPost.publishedAt || null,
    createdAt: apiPost.createdAt,
    updatedAt: apiPost.updatedAt,
  };
}

export default BlogsAdminContent;
