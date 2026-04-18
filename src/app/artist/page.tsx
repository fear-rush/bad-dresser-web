import type { Metadata } from "next";
import { ComingSoonPage } from "@/components/coming-soon-page";

export const metadata: Metadata = {
  title: "Artist",
};

export default function ArtistPage() {
  return <ComingSoonPage currentPath="/artist" />;
}
