import React, { Suspense } from 'react';
import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { mapBlogRow } from '@/lib/blog';
import { BlogPost } from '@/types/blog';
import BlogsAdminContent from '@/components/sections/admin/BlogsAdminContent';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Blog Management - Admin Panel',
  description: 'Write, publish, and manage clinic blog articles.',
};

export default async function AdminBlogsPage() {
  const session = await getSession();
  if (!session) {
    redirect('/admin/login');
  }

  let posts: BlogPost[] = [];
  try {
    const dbPosts = await prisma.blogPost.findMany({
      orderBy: [{ displayOrder: 'asc' }, { createdAt: 'desc' }],
    });
    posts = dbPosts.map(mapBlogRow);
  } catch (err) {
    console.error('Error fetching admin blog posts:', err);
  }

  return (
    <Suspense fallback={<div className="p-6 text-slate-500 font-sans">Loading blog workspace...</div>}>
      <BlogsAdminContent initialPosts={posts} />
    </Suspense>
  );
}
