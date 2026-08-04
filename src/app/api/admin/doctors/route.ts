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

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const doctors = await prisma.doctor.findMany({
      orderBy: { displayOrder: 'asc' },
    });
    return NextResponse.json(doctors);
  } catch (error) {
    console.error('Fetch doctors error:', error);
    return NextResponse.json({ error: 'Failed to fetch doctors' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const result = doctorSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json({ error: result.error.issues[0].message }, { status: 400 });
    }

    const data = result.data;
    const specialties = data.specialties || [];
    const education = data.education || [];

    const newDoctor = await prisma.doctor.create({
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

    return NextResponse.json(newDoctor);
  } catch (error) {
    console.error('Create doctor error:', error);
    return NextResponse.json({ error: 'Failed to create doctor' }, { status: 500 });
  }
}
