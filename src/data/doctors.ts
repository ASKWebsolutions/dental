import { Doctor } from '@/types';
import prisma from '@/lib/prisma';

export const doctors: Doctor[] = [
  {
    id: 'doc-elena-sterling',
    name: 'Dr. Elena Sterling',
    title: 'Lead Cosmetic Surgeon',
    bio: 'Specializing in full-mouth rehabilitation and smile design with over 25 years of experience.',
    quote:
      'True dental art is invisible — the most beautiful smile is one that looks entirely your own.',
    experience: '25+ Years Clinical Excellence',
    imagePath: '/images/home/doctor-elena.png',
    specialties: ['Smile Design', 'Full-Mouth Rehabilitation', 'Porcelain Veneers'],
    education: ['Advanced Fellowship in Cosmetic Dentistry', 'Board-Certified Restorative Specialist'],
    displayOrder: 1,
    isFounder: true,
  },
  {
    id: 'doc-marcus-vance',
    name: 'Dr. Marcus Vance',
    title: 'Chief Implantologist',
    bio: 'A pioneer in robotic-assisted dental implants and bone grafting procedures.',
    quote: 'A strong foundation is everything — in implants, as in life.',
    experience: 'Advanced Implant Surgery & Grafting',
    imagePath: '/images/home/doctor-marcus.png',
    specialties: ['Robotic-Assisted Implants', 'Bone Grafting', 'Full-Arch Restoration'],
    education: ['Implantology Fellowship', 'Certified in Digital Guided Surgery'],
    displayOrder: 2,
  },
  {
    id: 'doc-sarah-chen',
    name: 'Dr. Sarah Chen',
    title: 'Orthodontic Specialist',
    bio: 'Expert in invisible alignment systems and adult aesthetic orthodontics.',
    quote: 'Alignment is quiet confidence — we move teeth so you can move through life freely.',
    experience: 'Invisible Alignment & Adult Orthodontics',
    imagePath: '/images/home/doctor-sarah.png',
    specialties: ['Clear Aligners', 'Adult Orthodontics', 'Bite Correction'],
    education: ['Orthodontics & Dentofacial Fellowship', 'Certified Aligner Therapy'],
    displayOrder: 3,
  },
  {
    id: 'doc-mark-wright',
    name: 'Dr. Mark Wright',
    title: 'Implantology Specialist',
    bio: 'Expert in reconstructive surgery and complex implant positioning utilizing advanced 3D diagnostic guides.',
    quote: 'Precision planning turns complex cases into predictable outcomes.',
    experience: 'Reconstructive & 3D-Guided Surgery',
    imagePath: '/images/home/doctor-marcus.png',
    specialties: ['Reconstructive Surgery', 'Complex Implant Positioning', '3D Diagnostics'],
    education: ['Reconstructive Surgery Fellowship', 'Advanced 3D Planning Certification'],
    displayOrder: 4,
  },
  {
    id: 'doc-jane-cooper',
    name: 'Dr. Jane Cooper',
    title: 'Lead Cosmetic Surgeon',
    bio: 'Renowned cosmetic surgeon specializing in porcelain veneers, bonding, and full-smile designs.',
    quote: 'The finest cosmetic dentistry never announces itself — it only changes how people smile.',
    experience: 'Porcelain Veneers & Smile Design',
    imagePath: '/images/home/doctor-elena.png',
    specialties: ['Porcelain Veneers', 'Composite Bonding', 'Full Smile Design'],
    education: ['Cosmetic Dentistry Fellowship', 'Advanced Esthetic Certification'],
    displayOrder: 5,
  },
  {
    id: 'doc-emily-wilson',
    name: 'Dr. Emily Wilson',
    title: 'Orthodontic Specialist',
    bio: 'Leader in digital orthodontic alignments, Invisalign protocols, and biomechanical optimization.',
    quote: 'Great orthodontics is invisible engineering — subtle work with a profound result.',
    experience: 'Digital Orthodontics & Invisalign',
    imagePath: '/images/home/doctor-sarah.png',
    specialties: ['Invisalign Protocols', 'Digital Alignments', 'Biomechanics'],
    education: ['Digital Orthodontics Fellowship', 'Invisalign Provider Certification'],
    displayOrder: 6,
  },
  {
    id: 'doc-theresa-webb',
    name: 'Dr. Theresa Webb',
    title: 'Periodontist',
    bio: 'Specializing in soft tissue grafts, bone regeneration, and the treatment of periodontal diseases.',
    quote: 'Healthy gums are the quiet foundation of every lasting smile.',
    experience: 'Soft Tissue & Bone Regeneration',
    imagePath: '/images/home/doctor-marcus.png',
    specialties: ['Soft Tissue Grafts', 'Bone Regeneration', 'Periodontal Therapy'],
    education: ['Periodontology Residency', 'Certified in Regenerative Techniques'],
    displayOrder: 7,
  },
  {
    id: 'doc-brooklyn-simmons',
    name: 'Dr. Brooklyn Simmons',
    title: 'Oral Surgeon',
    bio: 'Performing wisdom teeth extractions, maxillofacial procedures, and emergency trauma operations.',
    quote: 'Surgical skill is measured in gentleness as much as precision.',
    experience: 'Oral & Maxillofacial Surgery',
    imagePath: '/images/home/doctor-elena.png',
    specialties: ['Wisdom Tooth Surgery', 'Maxillofacial Procedures', 'Trauma Care'],
    education: ['Oral & Maxillofacial Surgery Residency', 'Advanced Sedation Certification'],
    displayOrder: 8,
  },
  {
    id: 'doc-adelaida-smith',
    name: 'Dr. Adelaida Smith',
    title: 'Endodontist',
    bio: 'Specialist in microscopic root canal therapies, pulpal diagnostics, and biological tooth preservation.',
    quote: 'Saving a tooth is an act of preservation — nature did the hard part first.',
    experience: 'Microscopic Endodontics',
    imagePath: '/images/home/doctor-sarah.png',
    specialties: ['Microscopic Root Canal Therapy', 'Pulpal Diagnostics', 'Biological Preservation'],
    education: ['Endodontics Residency', 'Certified in Microscopic Dentistry'],
    displayOrder: 9,
  },
];

export async function getDoctors(): Promise<Doctor[]> {
  try {
    const dbDoctors = await prisma.doctor.findMany({
      orderBy: { displayOrder: 'asc' },
    });

    if (dbDoctors.length > 0) {
      return dbDoctors.map((doc) => ({
        id: doc.id,
        name: doc.name,
        title: doc.title,
        bio: doc.bio,
        quote: doc.quote ?? undefined,
        experience: doc.experience ?? undefined,
        imagePath: doc.imagePath,
        specialties: Array.isArray(doc.specialties) ? doc.specialties : [],
        education: Array.isArray(doc.education) ? doc.education : [],
        displayOrder: doc.displayOrder,
        featured: doc.featured ?? false,
        isFounder: doc.isFounder ?? false,
        isAvailable: doc.isAvailable ?? true,
      }));
    }
  } catch (error) {
    console.warn('Database fetch failed in getDoctors, falling back to static data:', error);
  }

  return doctors;
}

export const getAllDoctors = getDoctors;
