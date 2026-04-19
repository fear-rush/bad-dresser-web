import { LandingPageClient } from "@/components/landing-page/landing-page-client";
import { LANDING_PAGE_ASSETS } from "@/lib/landing-page-assets";
import {
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_SOCIALS,
  SITE_URL,
} from "@/lib/site";

export const dynamic = "force-static";
export const revalidate = 3600;

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}${LANDING_PAGE_ASSETS.mobileLogo}`,
  description: SITE_DESCRIPTION,
  sameAs: SITE_SOCIALS,
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  url: SITE_URL,
  description: SITE_DESCRIPTION,
};

export default function Home() {
  return (
    <main className="relative w-full min-h-[100dvh] overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      <LandingPageClient />
    </main>
  );
}
