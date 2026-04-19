"use client";

import Image from "next/image";
import { useState } from "react";
import { LANDING_PAGE_ASSETS } from "@/lib/landing-page-assets";
import { NavLinks, getNavItems } from "@/components/nav-links";

export function ComingSoonPage({ currentPath }: { currentPath: string }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const navItems = getNavItems(currentPath);

  const desktopLinkClass =
    "cursor-pointer font-[family-name:var(--font-space-mono)] text-[22px] font-normal text-white underline underline-offset-4 transition-opacity duration-200 hover:opacity-60";
  const mobileLinkClass =
    "cursor-pointer font-[family-name:var(--font-space-mono)] text-[22px] font-normal text-white";

  return (
    <>
      {/* Desktop */}
      <section className="relative hidden h-screen w-full overflow-hidden md:flex items-center justify-center">
        <Image
          src={LANDING_PAGE_ASSETS.background}
          alt="Background"
          fill
          className="object-cover"
          priority
          quality={82}
          sizes="(min-width: 768px) 100vw, 0px"
        />
        <div className="absolute inset-0 bg-black/40" />

        <NavLinks
          items={navItems}
          className="absolute left-[77.08%] top-[4.17%] z-20 flex gap-11"
          linkClassName={desktopLinkClass}
        />

        <h1 className="relative z-10 font-[family-name:var(--font-space-mono)] text-[72px] font-bold tracking-wider text-white">
          COMING SOON
        </h1>
      </section>

      {/* Mobile */}
      <section className="relative min-h-[100dvh] md:hidden">
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src={LANDING_PAGE_ASSETS.background}
            alt="Background"
            fill
            className="object-cover"
            priority
            quality={78}
            sizes="(max-width: 767px) 100vw, 0px"
          />
        </div>
        <div className="absolute inset-0 bg-black/40" />

        {/* Full-screen menu overlay */}
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center bg-black transition-all duration-300 ease-in-out md:hidden ${
            menuOpen
              ? "visible scale-100 opacity-100"
              : "invisible scale-95 opacity-0"
          }`}
        >
          <NavLinks
            items={navItems}
            className="flex flex-col items-center gap-7"
            linkClassName={mobileLinkClass}
            onClick={() => setMenuOpen(false)}
          />
        </div>

        {/* Fixed top bar */}
        <header className="fixed left-0 right-0 top-0 z-[55] h-14 bg-black md:hidden">
          <div className="absolute left-1/2 top-3 h-9 w-[93px] -translate-x-1/2 overflow-hidden">
            <Image
              src={LANDING_PAGE_ASSETS.mobileLogo}
              alt="Bad Dresser logo"
              fill
              className="object-cover"
              sizes="93px"
              quality={85}
            />
          </div>
          <button
            type="button"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            className="absolute right-3 top-2 z-[60] flex h-10 w-10 flex-col items-center justify-center gap-[5px]"
          >
            <span
              className={`h-0.5 w-[18px] rounded-full bg-white transition-transform duration-300 ${
                menuOpen ? "translate-y-[7px] rotate-45" : ""
              }`}
            />
            <span
              className={`h-0.5 w-[18px] rounded-full bg-white transition-opacity duration-300 ${
                menuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`h-0.5 w-[18px] rounded-full bg-white transition-transform duration-300 ${
                menuOpen ? "-translate-y-[7px] -rotate-45" : ""
              }`}
            />
          </button>
        </header>

        {/* Centered content */}
        <div className="relative z-10 flex min-h-[100dvh] items-center justify-center pt-14">
          <h1 className="font-[family-name:var(--font-space-mono)] text-[36px] font-bold tracking-wider text-white">
            COMING SOON
          </h1>
        </div>
      </section>
    </>
  );
}
