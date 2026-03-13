import Image from "next/image";
import { BrandCard } from "@/components/brand-card";
import { JournalCard } from "@/components/journal-card";
import { FeatureCard } from "@/components/feature-card";
import { LookbookCard } from "@/components/lookbook-card";
import { QuizCard } from "@/components/quiz-card";
import { CollectionsCard } from "@/components/collections-card";

export default function Home() {
  return (
    <main className="relative w-full min-h-screen overflow-hidden">
      {/* Background */}
      <div className="fixed inset-0 z-0">
        <Image
          src="/images/main-bg.jpg"
          alt="Bad Dresser background"
          fill
          className="object-cover"
          priority
          quality={75}
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Desktop Layout — overlapping cards on single viewport */}
      <div className="relative z-10 hidden md:block w-full h-screen p-5">
        <BrandCard />
        <JournalCard />
        <FeatureCard />
        <LookbookCard />
        <QuizCard />
        <CollectionsCard />
      </div>

      {/* Mobile Layout — scrollable grid */}
      <div className="relative z-10 md:hidden w-full min-h-screen">
        {/* Oversized brand text — cropped overflow matching Pencil design */}
        <div className="overflow-hidden h-[75px] relative">
          <p
            className="font-[family-name:var(--font-space-grotesk)] text-[96px] font-extrabold leading-none text-white whitespace-nowrap"
            style={{ letterSpacing: '-2px', marginLeft: '-5px', marginTop: '-55px' }}
          >
            Bad Dresser
          </p>
        </div>

        <div className="px-5 pb-8 flex flex-col gap-5">
          {/* Feature card first on mobile */}
          <FeatureCard mobile />

          {/* 2-column grid matching Pencil design layout */}
          <div className="grid grid-cols-2 gap-5">
            <MobileThumb
              src="/images/lookbook.jpg"
              label="Lookbook"
              alt="Bad Dresser lookbook"
            />
            <MobileThumb
              src="/images/collage-2.jpg"
              label="Collections"
              alt="Bad Dresser collections"
            />
            <QuizCard mobile />
            <MobileThumb
              src="/images/collage-1.jpg"
              label="Journal"
              alt="Bad Dresser journal"
            />
          </div>
        </div>
      </div>
    </main>
  );
}

function MobileThumb({
  src,
  label,
  alt,
}: {
  src: string;
  label: string;
  alt: string;
}) {
  return (
    <div className="relative aspect-square rounded-lg overflow-hidden">
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 50vw, 25vw"
        quality={70}
      />
      <div className="absolute bottom-2.5 left-2.5">
        <span className="px-3 py-1 rounded-full bg-black/50 backdrop-blur-sm text-[11px] font-semibold font-[family-name:var(--font-space-grotesk)] text-white">
          {label}
        </span>
      </div>
    </div>
  );
}
