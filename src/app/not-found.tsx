import Link from "next/link";
import Image from "next/image";
import { LANDING_PAGE_ASSETS } from "@/lib/landing-page-assets";

export default function NotFoundPage() {
  return (
    <main className="relative min-h-[100dvh] w-full overflow-hidden">
      <Image
        src={LANDING_PAGE_ASSETS.background}
        alt="Bad Dresser background"
        fill
        className="object-cover"
        priority
        quality={82}
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-black/55" />

      <div className="relative z-10 flex min-h-[100dvh] flex-col items-center justify-center px-6 text-center">
        <div className="relative h-[52px] w-[140px] overflow-hidden">
          <Image
            src={LANDING_PAGE_ASSETS.mobileLogo}
            alt="Bad Dresser logo"
            fill
            className="object-contain"
            sizes="140px"
            quality={90}
          />
        </div>

        <h1 className="mt-8 font-[family-name:var(--font-space-mono)] text-[44px] font-bold leading-none text-white md:text-[62px]">
          404 NOT FOUND
        </h1>

        <p className="mt-3 font-[family-name:var(--font-space-mono)] text-[16px] text-white/90 md:text-[18px]">
          This page entry does not exist.
        </p>

        <Link
          href="/"
          className="mt-8 inline-flex h-12 items-center justify-center border border-white px-6 font-[family-name:var(--font-space-mono)] text-[18px] font-bold text-white transition-opacity hover:opacity-80"
        >
          Back Home
        </Link>
      </div>
    </main>
  );
}
