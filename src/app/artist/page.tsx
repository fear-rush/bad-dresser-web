import type { Metadata } from "next";
import { ComingSoonPage } from "@/components/coming-soon-page";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site";

export const dynamic = "force-static";
export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Artist",
  description: `Artist page for ${SITE_NAME}. ${SITE_DESCRIPTION}`,
  alternates: {
    canonical: `${SITE_URL}/artist`,
  },
  openGraph: {
    title: `Artist | ${SITE_NAME}`,
    description: SITE_DESCRIPTION,
    url: `${SITE_URL}/artist`,
  },
  twitter: {
    title: `Artist | ${SITE_NAME}`,
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function ArtistPage() {
  return <ComingSoonPage currentPath="/artist" />;
}
