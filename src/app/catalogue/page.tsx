import type { Metadata } from "next";
import { ComingSoonPage } from "@/components/coming-soon-page";

export const metadata: Metadata = {
  title: "Catalogue",
};

export default function CataloguePage() {
  return <ComingSoonPage currentPath="/catalogue" />;
}
