import type { Metadata } from "next";
import { ComingSoonPage } from "@/components/coming-soon-page";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site";

export const dynamic = "force-static";
export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Catalogue",
  description: `Catalogue page for ${SITE_NAME}. ${SITE_DESCRIPTION}`,
  alternates: {
    canonical: `${SITE_URL}/catalogue`,
  },
  openGraph: {
    title: `Catalogue | ${SITE_NAME}`,
    description: SITE_DESCRIPTION,
    url: `${SITE_URL}/catalogue`,
  },
  twitter: {
    title: `Catalogue | ${SITE_NAME}`,
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function CataloguePage() {
  return <ComingSoonPage currentPath="/catalogue" />;
}
