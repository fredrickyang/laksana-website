import type { Metadata } from "next";
import { Manrope, Montserrat } from "next/font/google";
import Menu from "../components/Menu";
import { getSettings } from "@/lib/payload";
import { locales, type Locale } from "@/i18n.config";
import { notFound } from "next/navigation";
import Script from "next/script";

import "../../globals.css";
import "../../style-component.css";
import "../../style-menu.css";
import JsonLd from "@/components/JsonLd";
import Analytics from "../components/Analytics";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Laksana Business Park - Solusi Gudang & Properti Strategis",
  description: "Kawasan industri dan komersial terintegrasi di Tangerang Utara",
  icons: {
    icon: "/images/logo/logo.svg",
    shortcut: "/images/logo/logo.svg",
    apple: "/images/logo/logo.svg",
  },
};

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export const revalidate = 3600; // Revalidate every 1 hour

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;

  // Validate locale
  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  const settings = await getSettings(locale as Locale);

  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Laksana Business Park",
    "url": process.env.NEXT_PUBLIC_SERVER_URL || "https://laksanabusinesspark.id",
    "logo": `${process.env.NEXT_PUBLIC_SERVER_URL || "https://laksanabusinesspark.id"}/images/logo/logo.svg`,
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": settings?.contactInformation?.phoneNumbers?.[0]?.number || "+62-818-0588-6000",
      "contactType": "customer service",
      "areaServed": "ID",
      "availableLanguage": ["Indonesian", "English", "Chinese"]
    },
    "sameAs": [
      settings?.socialMedia?.instagram,
      settings?.socialMedia?.facebook,
      settings?.socialMedia?.linkedin
    ].filter(Boolean)
  };

  return (
    <html lang={locale}>
      <body className={`${manrope.variable} ${montserrat.variable} antialiased font-sans mb-0`}>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=4053114351634743&ev=PageView&noscript=1"
            alt="facebook-pixel-noscript"
          />
        </noscript>
        <Script id="qontak-webchat" strategy="afterInteractive">
          {`
            (function() {
              // Custom embed instead of Qontak's stock app.js: their script sends
              // window.location.origin ("https://www.laksanabusinesspark.id") as
              // the widget domain, but Qontak validates it with an exact string
              // match against the registered domain ("laksanabusinesspark.id" —
              // no protocol, no www), so the widget never passes validation and
              // stays hidden. We build the same iframe ourselves and pass the
              // bare apex hostname.
              const QONTAK_ORIGIN = "https://webchat.qontak.com";
              const params = new URLSearchParams({
                c: "4R4_LMmTyb6UGmMPnkM45w",
                i: "05730d05-a4b9-4fe1-9237-c68f0b561a79",
                d: window.location.hostname.replace(/^www\./, ""),
                w: window.innerWidth,
                h: window.innerHeight,
                u: "null"
              });
              const ifrm = document.createElement('iframe');
              ifrm.setAttribute('src', QONTAK_ORIGIN + '/?' + params.toString());
              ifrm.setAttribute('id', 'qontak-webchat-widget');
              ifrm.setAttribute('frameborder', '0');
              ifrm.setAttribute('allowfullscreen', 'true');
              ifrm.style.position = 'fixed';
              ifrm.style.bottom = '0';
              ifrm.style.right = '0';
              ifrm.style.zIndex = '999999';
              ifrm.style.maxHeight = '100%';
              ifrm.style.overflow = 'auto';
              ifrm.width = '94px';
              ifrm.height = '94px';
              document.body.appendChild(ifrm);
              window.addEventListener('message', function(e) {
                if (e.origin !== QONTAK_ORIGIN) return;
                const { eventName, data } = e.data || {};
                if (eventName === 'setFrameSize' && data) {
                  ifrm.height = data.height;
                  ifrm.width = data.width;
                }
              }, false);
            })();
          `}
        </Script>
        <Analytics />
        <JsonLd data={organizationJsonLd} />
        <Menu settings={settings} locale={locale} />
        {children}
      </body>
    </html>
  );
}


