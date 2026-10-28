import { BlogPost } from '@/types/blog';

/**
 * Static fallback blog posts — used when the database query fails
 * so the public blog section degrades gracefully instead of rendering empty.
 */
export const fallbackBlogPosts: BlogPost[] = [
  {
    id: 'fallback-veneers-confidence',
    title: 'How Porcelain Veneers Can Quietly Transform Your Confidence',
    slug: 'porcelain-veneers-transform-confidence',
    excerpt:
      'Veneers are not about chasing a perfect smile — they are about removing the small daily hesitations that come with chipped, stained, or uneven teeth.',
    content: `A smile is rarely about vanity. Most people who consider veneers tell us the same thing: they have spent years covering their mouth when they laugh, delaying photos, or rehearsing how to speak without drawing attention to a gap or a stubborn stain.

## What veneers actually correct

Porcelain veneers are thin, custom-shaded shells bonded to the front surface of your teeth. In a single design they can address:

- Chips, cracks, and visible wear
- Deep staining that whitening cannot lift
- Small gaps and mild crowding
- Uneven tooth lengths that disrupt the smile line

## The consultation comes first

No reputable clinic starts with drilling. A proper consultation maps your bite, gum health, and facial proportions before anything is prepared. If veneers are not the right route for you — say, if gum disease or heavy grinding is present — a good team will say so and offer an alternative.

## What recovery looks like

Most patients return to normal eating the same day, with mild sensitivity for a few days. The shade is chosen deliberately: bright enough to look cared for, natural enough that nobody asks whether you had "work done."

If you have been living with a smile you manage rather than enjoy, a consultation is a low-pressure way to find out what is realistic for your teeth.`,
    category: 'Cosmetic Dentistry',
    tags: ['Veneers', 'Smile Design'],
    coverImage: {
      publicId: 'fallback-veneers',
      url: '/images/home/cosmetic-smile.png',
      altText: 'Close-up of a bright, even smile after cosmetic dental treatment',
    },
    author: 'Clinical Team',
    featured: true,
    status: 'published',
    readTimeMins: 4,
    displayOrder: 1,
    publishedAt: '2026-09-12T00:00:00.000Z',
    createdAt: '2026-09-12T00:00:00.000Z',
    updatedAt: '2026-09-12T00:00:00.000Z',
  },
  {
    id: 'fallback-implant-aftercare',
    title: 'Dental Implants: The First 90 Days Matter Most',
    slug: 'dental-implants-first-90-days',
    excerpt:
      'Implant success is decided less in the operating chair and more in the weeks that follow — here is how osseointegration works and what protects it.',
    content: `A dental implant is placed in minutes, but the bond between implant and jawbone takes months. Understanding that timeline is the difference between a smooth recovery and an avoidable complication.

## Osseointegration, explained simply

After the titanium post is placed, your bone begins growing onto its surface — a process called osseointegration. It cannot be rushed, and during this window the implant must not be overloaded with chewing force.

## The first two weeks

- Stick to softer foods and chew on the opposite side
- Keep the site clean with the rinse protocol your clinic provides
- Avoid smoking — it constricts the blood supply the bone needs
- Take prescribed antibiotics and pain relief as directed

## Weeks three through twelve

Most discomfort resolves within the first week. The longer wait is structural: your bone is consolidating around the post. Follow-up visits during this period check stability before the final crown is fitted.

## When to call your clinic

Increasing swelling after day three, a bad taste that will not clear, or pain that worsens rather than eases are all reasons to call early. Implant complications are far easier to resolve when caught in the first fortnight.

The reward for this patience is a restoration that can last decades with ordinary hygiene and regular checkups.`,
    category: 'Dental Implants',
    tags: ['Implants', 'Aftercare'],
    coverImage: {
      publicId: 'fallback-implants',
      url: '/images/home/dental-implants.png',
      altText: 'Dental implant model showing the crown, abutment and titanium post',
    },
    author: 'Clinical Team',
    featured: false,
    status: 'published',
    readTimeMins: 4,
    displayOrder: 2,
    publishedAt: '2026-08-30T00:00:00.000Z',
    createdAt: '2026-08-30T00:00:00.000Z',
    updatedAt: '2026-08-30T00:00:00.000Z',
  },
  {
    id: 'fallback-gum-health',
    title: 'Bleeding Gums Are Not Normal — Here Is What They Are Telling You',
    slug: 'bleeding-gums-what-they-indicate',
    excerpt:
      'Bleeding when you brush is one of the earliest and most ignored signs of gum disease. Catching it early usually means a simple cleaning, not surgery.',
    content: `Almost everyone has seen a little blood on their toothbrush at some point. Almost everyone has also been told — wrongly — that it is normal. It is not.

## What bleeding gums mean

Healthy gum tissue does not bleed during ordinary brushing. Bleeding signals inflammation at the gumline, usually caused by plaque that has been left in place too long. In its earliest stage — gingivitis — the condition is fully reversible.

## The progression nobody sees

If plaque is not removed, inflammation extends below the gumline and begins attacking the bone that holds your teeth. This stage, periodontitis, is manageable but no longer curable: the goal becomes halting further loss rather than restoring what is gone.

## What actually helps

- Brush twice daily with a soft-bristled brush and fluoride toothpaste
- Clean between teeth daily — floss, interdental brushes, or a water flosser
- Keep six-monthly scaling appointments, even when nothing hurts
- Do not switch to a harder brush to "scrub the bleeding away"

## When to book

Bleeding that continues after two weeks of diligent home care, gums that look swollen or pull away from the teeth, or any change in how your bite feels should all be assessed promptly.

Early gum disease costs an hour of your year. Advanced gum disease costs teeth.`,
    category: 'Oral Health',
    tags: ['Gum Disease', 'Prevention'],
    coverImage: {
      publicId: 'fallback-gums',
      url: 'https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&w=1600&q=80',
      altText: 'Dentist examining a patient\u2019s teeth and gums with a mouth mirror',
    },
    author: 'Clinical Team',
    featured: false,
    status: 'published',
    readTimeMins: 4,
    displayOrder: 3,
    publishedAt: '2026-08-14T00:00:00.000Z',
    createdAt: '2026-08-14T00:00:00.000Z',
    updatedAt: '2026-08-14T00:00:00.000Z',
  },
];
