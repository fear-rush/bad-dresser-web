import { LandingPageClient } from "@/components/landing-page/landing-page-client";
import { LANDING_PAGE_ASSETS } from "@/lib/landing-page-assets";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Bad Dresser",
  url: "https://bad-dresser-web.vercel.app",
  logo: `https://bad-dresser-web.vercel.app${LANDING_PAGE_ASSETS.mobileLogo}`,
  description:
    "A small study of culture, memory, and bad decisions in clothing.",
  sameAs: [],
};

export default function Home() {
  return (
    <main className="relative w-full min-h-[100dvh] overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <LandingPageClient />
    </main>
  );
}
