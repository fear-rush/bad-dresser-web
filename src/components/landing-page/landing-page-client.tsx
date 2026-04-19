"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { LANDING_PAGE_ASSETS } from "@/lib/landing-page-assets";
import { NavLinks, getNavItems } from "@/components/nav-links";
import { InstagramSlider } from "./instagram-slider";

const navItems = getNavItems("/");
const SpotifyPlayer = dynamic(
  () => import("./spotify-player").then((mod) => mod.SpotifyPlayer),
  { ssr: false }
);

let globalMaxZ = 10;

function DraggableCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className: string;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const drag = useRef({
    active: false,
    dragging: false,
    startX: 0,
    startY: 0,
    prevX: 0,
    prevY: 0,
  });

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    if ((e.target as HTMLElement).closest("button, a")) return;
    globalMaxZ++;
    if (cardRef.current) cardRef.current.style.zIndex = String(globalMaxZ);
    const d = drag.current;
    d.active = true;
    d.dragging = false;
    d.startX = e.clientX;
    d.startY = e.clientY;
  }, []);

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    const d = drag.current;
    if (!d.active) return;
    const moveX = e.clientX - d.startX;
    const moveY = e.clientY - d.startY;
    if (!d.dragging) {
      if (Math.abs(moveX) < 5 && Math.abs(moveY) < 5) return;
      d.dragging = true;
      cardRef.current?.setPointerCapture(e.pointerId);
    }
    const x = d.prevX + moveX;
    const y = d.prevY + moveY;
    if (cardRef.current)
      cardRef.current.style.transform = `translate(${x}px, ${y}px)`;
  }, []);

  const onPointerUp = useCallback((e: React.PointerEvent) => {
    const d = drag.current;
    if (d.dragging) {
      d.prevX += e.clientX - d.startX;
      d.prevY += e.clientY - d.startY;
    }
    d.active = false;
    d.dragging = false;
  }, []);

  return (
    <div
      ref={cardRef}
      className={`${className} cursor-grab select-none active:cursor-grabbing`}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      style={{ zIndex: 10 }}
    >
      {children}
    </div>
  );
}

export function LandingPageClient() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isDesktopViewport, setIsDesktopViewport] = useState<boolean | null>(
    null
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)");
    const syncViewport = () => setIsDesktopViewport(mediaQuery.matches);

    syncViewport();
    mediaQuery.addEventListener("change", syncViewport);

    return () => mediaQuery.removeEventListener("change", syncViewport);
  }, []);

  return (
    <>
      <DesktopLanding enableSpotify={isDesktopViewport === true} />
      <MobileLanding
        menuOpen={menuOpen}
        onToggleMenu={() => setMenuOpen((open) => !open)}
        enableSpotify={isDesktopViewport === false}
      />
    </>
  );
}

function DesktopLanding({ enableSpotify }: { enableSpotify: boolean }) {
  const [spotifyVisible, setSpotifyVisible] = useState(true);

  return (
    <section className="relative hidden h-screen w-full overflow-hidden md:block">
      <Image
        src={LANDING_PAGE_ASSETS.background}
        alt="Bad Dresser textured wall background"
        fill
        className="object-cover"
        priority
        quality={82}
        sizes="(min-width: 768px) 100vw, 0px"
      />

      <div className="absolute inset-0 bg-black/15" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_52%,rgba(0,0,0,0.72)_100%)]" />

      <NavLinks
        items={navItems}
        className="absolute left-[77.08%] top-[4.17%] z-20 flex gap-11"
        linkClassName="cursor-pointer font-[family-name:var(--font-space-mono)] text-[22px] font-normal text-white underline underline-offset-4 transition-opacity duration-200 hover:opacity-60"
      />

      <DraggableCard className="absolute left-[3.75%] top-[21.76%] h-[24.91%] w-[28.13%]">
        <CardImage
          src={LANDING_PAGE_ASSETS.aboutCard}
          alt="About section card"
          className="card-shine h-full w-full overflow-hidden rounded-[23px]"
          sizes="28vw"
        />
      </DraggableCard>

      <DraggableCard className="absolute left-[3.75%] top-[49.07%] h-[41.57%] w-[28.13%]">
        <InstagramSlider
          slides={LANDING_PAGE_ASSETS.instagramSlides}
          title="Instagram"
          cardClassName="card-shine h-full w-full overflow-hidden rounded-[23px] bg-black"
          headerHeight={40}
          footerHeight={49}
          buttonSize={48}
          titleClassName="font-[family-name:var(--font-space-mono)] text-[20px] font-bold text-white"
          sizes="28vw"
        />
      </DraggableCard>

      <DraggableCard className="absolute left-[36.41%] top-[9.26%] h-[68.89%] w-[33.80%]">
        <CardImage
          src={LANDING_PAGE_ASSETS.newDropCard}
          alt="New drop card"
          className="card-shine h-full w-full overflow-hidden rounded-[23px]"
          sizes="34vw"
          priority
        />
      </DraggableCard>

      {enableSpotify && spotifyVisible && (
        <DraggableCard className="absolute left-[42.66%] top-[82.31%] h-[12.5%] w-[21.09%]">
          <SpotifyPlayer
            className="h-full w-full"
            draggable
            onUnavailable={() => setSpotifyVisible(false)}
          />
        </DraggableCard>
      )}

      <DraggableCard className="absolute left-[75.26%] top-[31.67%] h-[55.83%] w-[21.09%]">
        <CardImage
          src={LANDING_PAGE_ASSETS.previewCard}
          alt="How bad a dresser are you preview card"
          className="card-shine h-full w-full overflow-hidden rounded-[23px]"
          sizes="21vw"
        />
      </DraggableCard>
    </section>
  );
}

function MobileLanding({
  menuOpen,
  onToggleMenu,
  enableSpotify,
}: {
  menuOpen: boolean;
  onToggleMenu: () => void;
  enableSpotify: boolean;
}) {
  const [spotifyVisible, setSpotifyVisible] = useState(true);

  return (
    <section className="relative min-h-[100dvh] md:hidden">
      {/* Background — clipped separately so sticky works */}
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src={LANDING_PAGE_ASSETS.background}
          alt="Bad Dresser mobile background"
          fill
          className="object-cover main-bg-mobile"
          priority
          quality={78}
          sizes="(max-width: 767px) 100vw, 0px"
        />
      </div>
      <div className="absolute inset-0 bg-black/28" />

      {/* Full-screen menu overlay with animation */}
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
          linkClassName="cursor-pointer font-[family-name:var(--font-space-mono)] text-[22px] font-normal text-white"
          onClick={onToggleMenu}
        />
      </div>

      {/* Fixed top bar with logo and hamburger */}
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
          onClick={onToggleMenu}
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

      {/* Content — constrained width, pt-14 offsets fixed header */}
      <div className="relative z-10 mx-auto w-full max-w-[390px] pt-14">
        <div className="pointer-events-none absolute inset-0 bg-black/30" />

        <div className="relative z-20 flex flex-col gap-[14px] px-4 pb-4 pt-[14px]">
          <CardImage
            src={LANDING_PAGE_ASSETS.newDropCard}
            alt="New drop card mobile"
            className="relative h-[411px] w-full overflow-hidden rounded-2xl"
            sizes="(max-width: 768px) calc(100vw - 32px), 358px"
            priority
          />

          <InstagramSlider
            slides={LANDING_PAGE_ASSETS.instagramSlides}
            title="Instagram"
            cardClassName="relative h-[312px] w-full overflow-hidden rounded-2xl bg-black"
            headerHeight={34}
            footerHeight={38}
            buttonSize={40}
            titleClassName="font-[family-name:var(--font-space-mono)] text-[18px] font-bold text-white"
            sizes="(max-width: 768px) calc(100vw - 32px), 358px"
          />

          <CardImage
            src={LANDING_PAGE_ASSETS.previewCard}
            alt="Preview card mobile"
            className="relative h-[533px] w-full overflow-hidden rounded-2xl"
            sizes="(max-width: 768px) calc(100vw - 32px), 358px"
          />

          <CardImage
            src={LANDING_PAGE_ASSETS.aboutCard}
            alt="About card mobile"
            className="relative h-[179px] w-full overflow-hidden rounded-2xl"
            sizes="(max-width: 768px) calc(100vw - 32px), 358px"
          />

          {enableSpotify && spotifyVisible && (
            <SpotifyPlayer
              className="relative h-[120px] w-full"
              onUnavailable={() => setSpotifyVisible(false)}
            />
          )}
        </div>
      </div>
    </section>
  );
}

function CardImage({
  src,
  alt,
  className,
  sizes,
  priority,
}: {
  src: string;
  alt: string;
  className: string;
  sizes: string;
  priority?: boolean;
}) {
  return (
    <div className={className}>
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        sizes={sizes}
        quality={80}
        priority={priority}
      />
    </div>
  );
}
