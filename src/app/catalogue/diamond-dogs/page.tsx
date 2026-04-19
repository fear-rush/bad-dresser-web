import type { Metadata } from "next";
import { DiamondDogsPageClient } from "@/components/catalogue/diamond-dogs-page";
import { DIAMOND_DOGS_CATALOGUE } from "@/lib/catalogue-assets";
import { SITE_NAME, SITE_URL } from "@/lib/site";

export const dynamic = "force-static";
export const revalidate = 3600;

const routePath = `/catalogue/${DIAMOND_DOGS_CATALOGUE.slug}`;
const title = `${DIAMOND_DOGS_CATALOGUE.name} | ${SITE_NAME} Catalogue`;
const description = DIAMOND_DOGS_CATALOGUE.description;
const previewImage = `${SITE_URL}${DIAMOND_DOGS_CATALOGUE.slides[0]}`;

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: `${SITE_URL}${routePath}`,
  },
  openGraph: {
    type: "website",
    url: `${SITE_URL}${routePath}`,
    title,
    description,
    images: [
      {
        url: previewImage,
        width: 660,
        height: 825,
        alt: `${DIAMOND_DOGS_CATALOGUE.name} preview`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [previewImage],
  },
  robots: {
    index: true,
    follow: true,
  },
  keywords: [
    "Bad Dresser catalogue",
    "Diamond Dogs",
    "Bad Dresser Diamond Dogs",
    "streetwear catalogue",
    "graphic t-shirt",
  ],
};

const productJsonLd = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: DIAMOND_DOGS_CATALOGUE.name,
  description: DIAMOND_DOGS_CATALOGUE.description,
  image: DIAMOND_DOGS_CATALOGUE.slides.map((slide) => `${SITE_URL}${slide}`),
  brand: {
    "@type": "Brand",
    name: SITE_NAME,
  },
  offers: {
    "@type": "Offer",
    priceCurrency: "IDR",
    price: "180000",
    availability: "https://schema.org/InStock",
    url: `${SITE_URL}${routePath}`,
  },
};

export default function DiamondDogsCataloguePage() {
  return (
    <main className="relative w-full min-h-[100dvh] overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <DiamondDogsPageClient />
    </main>
  );
}
