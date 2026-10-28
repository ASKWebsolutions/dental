import type { Metadata } from 'next';
import { Manrope, Libre_Caslon_Text } from 'next/font/google';
import { siteConfig } from '@/data/siteConfig';
import HeaderFooterWrapper from '@/components/layout/HeaderFooterWrapper';
import { getClinicSettings } from '@/lib/contact';
import './globals.css';

const sans = Manrope({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const serif = Libre_Caslon_Text({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    'Cosmetic Dentistry',
    'Dental Implants',
    'Smile Makeovers',
    'Porcelain Veneers',
    'Teeth Whitening',
    'Dental Clinic',
    'Implants Practice',
    'Dental Cosmetics',
  ],
  authors: [{ name: 'Dental Cosmetics & Implant Centre' }],
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getClinicSettings();

  const stripExtensionAttributes = `
(function () {
  var ATTRS = [
    'bis_skin_checked',
    'data-new-gr-c-s-check-loaded',
    'data-gr-ext-installed',
    'data-lt-installed',
    'data-lt-tmp-id',
    'data-google-query-id',
    'cz-shortcut-listen',
    'data-darkreader-theme',
    'data-darkreader-mode'
  ];
  function strip(el) {
    for (var i = 0; i < ATTRS.length; i++) el.removeAttribute(ATTRS[i]);
  }
  function scan(root) {
    if (root.nodeType !== 1) return;
    strip(root);
    var all = root.querySelectorAll('*');
    for (var i = 0; i < all.length; i++) strip(all[i]);
  }
  if (document.documentElement) scan(document.documentElement);
  var obs = new MutationObserver(function (muts) {
    for (var i = 0; i < muts.length; i++) {
      var m = muts[i];
      if (m.type === 'attributes') strip(m.target);
      else if (m.type === 'childList') {
        for (var j = 0; j < m.addedNodes.length; j++) scan(m.addedNodes[j]);
      }
    }
  });
  obs.observe(document.documentElement, {
    subtree: true,
    childList: true,
    attributes: true,
    attributeFilter: ATTRS
  });
  setTimeout(function () { obs.disconnect(); }, 5000);
})();
`;

  return (
    <html lang="en" suppressHydrationWarning className={`${sans.variable} ${serif.variable} h-full scroll-smooth`}>
      <body suppressHydrationWarning className="min-h-full flex flex-col antialiased text-foreground bg-bg font-sans">
        <script dangerouslySetInnerHTML={{ __html: stripExtensionAttributes }} />
        <HeaderFooterWrapper settings={settings}>{children}</HeaderFooterWrapper>
      </body>
    </html>
  );
}
