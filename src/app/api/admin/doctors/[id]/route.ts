import { NextResponse } from 'next/server';
import { z } from 'zod';
import prisma from '@/lib/prisma';
import { getSession } from '@/lib/auth';

const doctorSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  title: z.string().min(1, 'Title is required'),
  bio: z.string().min(1, 'Bio is required'),
  imagePath: z.string().min(1, 'Image path is required'),
  quote: z.string().optional(),
  experience: z.string().optional(),
  specialties: z.array(z.string()).optional(),
  education: z.array(z.string()).optional(),
  displayOrder: z.number().optional(),
  featured: z.boolean().optional(),
  isFounder: z.boolean().optional(),
  isAvailable: z.boolean().optional(),
});

type Params = Promise<{ id: string }>;

export async function PATCH(request: Request, segmentData: { params: Params }) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await segmentData.params;

  try {
    const body = await request.json();
    const result = doctorSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json({ error: result.error.issues[0].message }, { status: 400 });
    }

    const data = result.data;
    const specialties = data.specialties || [];
    const education = data.education || [];

    const updatedDoctor = await prisma.doctor.update({
      where: { id },
      data: {
        name: data.name,
        title: data.title,
        bio: data.bio,
        quote: data.quote || null,
        experience: data.experience || null,
        imagePath: data.imagePath,
        specialties,
        education,
        displayOrder: data.displayOrder ?? 0,
        featured: data.featured ?? false,
        isFounder: data.isFounder ?? false,
        isAvailable: data.isAvailable ?? true,
      },
    });

    return NextResponse.json(updatedDoctor);
  } catch (error) {
    console.error('Update doctor error:', error);
    return NextResponse.json({ error: 'Failed to update doctor' }, { status: 500 });
  }
}

export async function DELETE(request: Request, segmentData: { params: Params }) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await segmentData.params;

  try {
    await prisma.doctor.delete({
      where: { id },
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete doctor error:', error);
    return NextResponse.json({ error: 'Failed to delete doctor' }, { status: 500 });
  }
}
