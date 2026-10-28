export type LocationCardKey = 'address' | 'phone' | 'whatsapp' | 'email';

export interface LocationDetailCard {
  key: LocationCardKey;
  label: string;
}

export interface LocationGalleryImage {
  src: string;
  alt: string;
  caption: string;
  className: string;
}

export const ourLocation = {
  eyebrow: 'Find Us',
  title: 'Our Location',
  highlightedText: 'Location',
  subtitle:
    'Located in I-8 Markaz, our clinic is easy to reach from anywhere in Islamabad. Find our address, contact details, opening hours, and directions all in one place.',
  chips: [
    { label: 'Map & Directions', href: '#map' },
    { label: 'Opening Hours', href: '#hours' },
    { label: 'Clinic Gallery', href: '#gallery' },
  ],
  map: {
    eyebrow: 'Getting Here',
    title: 'Map & Directions',
    highlightedText: 'Directions',
    subtitle:
      'Plan your route with the interactive map below, or open directions in Google Maps to navigate straight to our clinic.',
    mapQuery: 'Zaki Centre, I-8 Markaz, Islamabad',
    directionsLabel: 'Get Directions',
    openMapsLabel: 'Open in Google Maps',
    mapTitle: 'Google Map showing the clinic location at Zaki Centre, I-8 Markaz Islamabad',
    addressLabel: 'Clinic Address',
    tags: ['Zaki Centre', 'I-8 Markaz', 'Islamabad'],
    pinLabel: 'Zaki Centre, I-8 Markaz',
  },
  details: {
    title: 'Clinic Information',
    highlightedText: 'Information',
    subtitle:
      'Everything you need to reach us — address, phone, WhatsApp, email, and our weekly opening hours.',
    cards: [
      { key: 'address', label: 'Clinic Address' },
      { key: 'phone', label: 'Call Us' },
      { key: 'whatsapp', label: 'WhatsApp' },
      { key: 'email', label: 'Email Us' },
    ] as LocationDetailCard[],
    openInMaps: 'Open in Maps',
    hoursTitle: 'Opening Hours',
  },
  gallery: {
    eyebrow: 'Our Space',
    title: 'Inside Our Clinic',
    highlightedText: 'Clinic',
    subtitle: 'A calm, modern environment designed to keep every visit comfortable.',
    images: [
      {
        src: '/images/home/dental-implants.png',
        alt: 'Dentist treating a patient in the clinic treatment room',
        caption: 'Treatment in progress',
        className: 'sm:col-span-2 lg:col-span-2 h-[280px] sm:h-[340px] lg:h-[420px]',
      },
      {
        src: '/images/services/filling.jpg',
        alt: 'Dentist performing a precise dental procedure with magnification loupes',
        caption: 'Chair-side care',
        className: 'h-[280px] sm:h-[340px] lg:h-[420px]',
      },
      {
        src: '/images/home/dental-tech.png',
        alt: 'Modern dental equipment used for precision treatment planning',
        caption: 'Modern equipment',
        className: 'sm:col-span-2 lg:col-span-3 h-[220px] sm:h-[260px] lg:h-[300px]',
      },
    ] as LocationGalleryImage[],
  },
  cta: {
    eyebrow: 'Plan Your Visit',
    title: 'We look forward to welcoming you.',
    subtitle:
      'Have a question before you visit? Call us or send a WhatsApp message and our team will be happy to help.',
    primaryLabel: 'Book an Appointment',
    primaryHref: '/book-appointment',
    secondaryLabel: 'Call the Clinic',
  },
};
