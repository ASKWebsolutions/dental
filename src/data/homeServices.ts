import { HomeService } from '@/types';
import prisma from '@/lib/prisma';

export const homeServices: HomeService[] = [
  {
    id: 'porcelain-veneers',
    title: 'Porcelain Veneers',
    category: 'COSMETIC',
    description:
      'Ultra-thin, handcrafted shells bonded to the front of your teeth for an instant, natural-looking smile makeover.',
    image: '/images/home/cosmetic-smile.png',
    order: 1,
  },
  {
    id: 'dental-implants',
    title: 'Dental Implants',
    category: 'IMPLANTS',
    description:
      'Permanent, natural-looking replacements for missing teeth, anchored by titanium posts that feel like your own.',
    image: '/images/home/dental-implants.png',
    order: 2,
  },
  {
    id: 'laser-brightening',
    title: 'Laser Brightening',
    category: 'WHITENING',
    description:
      'Same-day, light-activated whitening that lifts years of stains and brightens your smile in a single visit.',
    image: '/images/home/dental-tech.png',
    order: 3,
  },
  {
    id: 'invisalign',
    title: 'Invisalign',
    category: 'ORTHODONTICS',
    description:
      'Discreet, removable clear aligners that gently straighten teeth without the look of traditional metal braces.',
    image: '/images/home/orthodontics.png',
    order: 4,
  },
];

export default homeServices;

function categoryFor(slug: string): string {
  const s = slug.toLowerCase();
  if (s.includes('implant')) return 'IMPLANTS';
  if (s.includes('veneer')) return 'COSMETIC';
  if (s.includes('whiten') || s.includes('brighten') || s.includes('bleach')) return 'WHITENING';
  if (s.includes('align') || s.includes('brace') || s.includes('ortho')) return 'ORTHODONTICS';
  return 'DENTAL';
}

export async function getHomeServices(): Promise<HomeService[]> {
  try {
    const dbServices = await prisma.service.findMany({
      where: { featured: true },
      orderBy: { createdAt: 'asc' },
    });

    if (dbServices.length > 0) {
      return dbServices.map((service, idx) => ({
        id: service.id,
        title: service.title,
        category: categoryFor(service.slug),
        description: service.shortDescription,
        image: service.imagePath || homeServices[0].image,
        order: idx + 1,
      }));
    }
  } catch (error) {
    console.warn('Database fetch failed in getHomeServices, falling back to static data:', error);
  }

  return homeServices;
}
