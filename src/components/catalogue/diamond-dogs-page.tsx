"use client";

import Image from "next/image";
import { useCallback, useRef, useState } from "react";
import { NavLinks, getNavItems } from "@/components/nav-links";
import { LANDING_PAGE_ASSETS } from "@/lib/landing-page-assets";
import { DIAMOND_DOGS_CATALOGUE } from "@/lib/catalogue-assets";

const navItems = getNavItems(`/catalogue/${DIAMOND_DOGS_CATALOGUE.slug}`);
const whatsappCheckoutUrl = `https://wa.me/6285111212383?text=${encodeURIComponent(
  `Hi, I'm interested in the ${DIAMOND_DOGS_CATALOGUE.name} article.`
)}`;

export function DiamondDogsPageClient() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [mobileZoom, setMobileZoom] = useState(1);
  const touchStartX = useRef(0);

  const prev = useCallback(() => {
    setMobileZoom(1);
    setActiveIndex(
      (current) =>
        (current - 1 + DIAMOND_DOGS_CATALOGUE.slides.length) %
        DIAMOND_DOGS_CATALOGUE.slides.length
    );
  }, []);

  const next = useCallback(() => {
    setMobileZoom(1);
    setActiveIndex(
      (current) => (current + 1) % DIAMOND_DOGS_CATALOGUE.slides.length
    );
  }, []);

  const onTouchStart = useCallback((e: React.TouchEvent<HTMLDivElement>) => {
    touchStartX.current = e.touches[0].clientX;
  }, []);

  const onTouchEnd = useCallback(
    (e: React.TouchEvent<HTMLDivElement>) => {
      const delta = e.changedTouches[0].clientX - touchStartX.current;
      if (delta > 50) prev();
      else if (delta < -50) next();
    },
    [prev, next]
  );

  const zoomIn = useCallback(() => {
    setMobileZoom((current) => Math.min(2.5, Number((current + 0.25).toFixed(2))));
  }, []);

  const zoomOut = useCallback(() => {
    setMobileZoom((current) => Math.max(1, Number((current - 0.25).toFixed(2))));
  }, []);

  return (
    <>
      <DesktopCatalogue activeIndex={activeIndex} onPrev={prev} onNext={next} />
      <MobileCatalogue
        activeIndex={activeIndex}
        menuOpen={menuOpen}
        onPrev={prev}
        onNext={next}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        mobileZoom={mobileZoom}
        onToggleMenu={() => setMenuOpen((open) => !open)}
        onCloseMenu={() => setMenuOpen(false)}
        onZoomIn={zoomIn}
        onZoomOut={zoomOut}
      />
    </>
  );
}

function DesktopCatalogue({
  activeIndex,
  onPrev,
  onNext,
}: {
  activeIndex: number;
  onPrev: () => void;
  onNext: () => void;
}) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const [lensVisible, setLensVisible] = useState(false);
  const [lensBlocked, setLensBlocked] = useState(false);
  const [lensPosition, setLensPosition] = useState({ x: 0, y: 0 });
  const [lensViewportSize, setLensViewportSize] = useState({
    width: 660,
    height: 779,
  });
  const lensSize = 168;
  const lensZoom = 2;

  const onLensMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (lensBlocked) {
      setLensVisible(false);
      return;
    }

    const viewport = viewportRef.current;
    if (!viewport) return;

    const rect = viewport.getBoundingClientRect();
    const x = Math.max(0, Math.min(rect.width, e.clientX - rect.left));
    const y = Math.max(0, Math.min(rect.height, e.clientY - rect.top));

    setLensViewportSize((current) =>
      current.width === rect.width && current.height === rect.height
        ? current
        : { width: rect.width, height: rect.height }
    );
    setLensVisible(true);
    setLensPosition({ x, y });
  }, [lensBlocked]);

  const onLensLeave = useCallback(() => {
    setLensVisible(false);
  }, []);

  return (
    <section className="relative hidden h-screen w-full overflow-hidden md:block">
      <Image
        src={DIAMOND_DOGS_CATALOGUE.background}
        alt="Diamond Dogs catalogue background"
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
        linkClassName="cursor-pointer font-[family-name:var(--font-space-mono)] text-[22px] font-normal text-white underline underline-offset-4 transition-opacity duration-200 hover:opacity-60"
      />

      <div className="absolute left-[4.79%] top-[11.85%] h-[76.39%] w-[34.38%] overflow-hidden rounded-[10px] bg-black">
        <div
          ref={viewportRef}
          className="relative h-[calc(100%-46px)] overflow-hidden cursor-zoom-in"
          onMouseMove={onLensMove}
          onMouseEnter={onLensMove}
          onMouseLeave={onLensLeave}
        >
          <div
            className="flex h-full transition-transform duration-300 ease-out"
            style={{
              width: `${DIAMOND_DOGS_CATALOGUE.slides.length * 100}%`,
              transform: `translateX(-${
                activeIndex * (100 / DIAMOND_DOGS_CATALOGUE.slides.length)
              }%)`,
            }}
          >
            {DIAMOND_DOGS_CATALOGUE.slides.map((src) => (
              <div
                key={src}
                className="relative h-full shrink-0"
                style={{
                  width: `${100 / DIAMOND_DOGS_CATALOGUE.slides.length}%`,
                }}
              >
                <Image
                  src={src}
                  alt={`${DIAMOND_DOGS_CATALOGUE.name} showcase`}
                  fill
                  className="object-cover"
                  sizes="34vw"
                  quality={80}
                  priority={src === DIAMOND_DOGS_CATALOGUE.slides[0]}
                />
              </div>
            ))}
          </div>

          {lensVisible && (
            <div
              className="pointer-events-none absolute z-20 rounded-full border-2 border-white/70 shadow-[0_0_0_1px_rgba(0,0,0,0.45)]"
              style={{
                width: lensSize,
                height: lensSize,
                left: lensPosition.x - lensSize / 2,
                top: lensPosition.y - lensSize / 2,
                backgroundImage: `url(${DIAMOND_DOGS_CATALOGUE.slides[activeIndex]})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: `${
                  lensViewportSize.width * lensZoom
                }px ${lensViewportSize.height * lensZoom}px`,
                backgroundPosition: `${
                  -lensPosition.x * lensZoom + lensSize / 2
                }px ${-lensPosition.y * lensZoom + lensSize / 2}px`,
              }}
            />
          )}

          <button
            type="button"
            onClick={onPrev}
            aria-label="Previous image"
            className="absolute left-3 top-1/2 z-30 flex h-12 w-12 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-black/60 text-white outline-none transition-colors hover:bg-black/75 hover:cursor-pointer focus-visible:ring-2 focus-visible:ring-white/80"
            onMouseEnter={() => {
              setLensBlocked(true);
              setLensVisible(false);
            }}
            onMouseLeave={() => setLensBlocked(false)}
          >
            <ChevronIcon direction="left" />
          </button>
          <button
            type="button"
            onClick={onNext}
            aria-label="Next image"
            className="absolute right-3 top-1/2 z-30 flex h-12 w-12 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-black/60 text-white outline-none transition-colors hover:bg-black/75 hover:cursor-pointer focus-visible:ring-2 focus-visible:ring-white/80"
            onMouseEnter={() => {
              setLensBlocked(true);
              setLensVisible(false);
            }}
            onMouseLeave={() => setLensBlocked(false)}
          >
            <ChevronIcon direction="right" />
          </button>
        </div>

        <footer className="absolute bottom-0 flex h-[46px] w-full items-center justify-center gap-3 bg-black/85">
          {DIAMOND_DOGS_CATALOGUE.slides.map((src, index) => (
            <span
              key={`${src}-dot`}
              className={`h-1 rounded-full ${
                activeIndex === index ? "bg-zinc-100" : "bg-zinc-500"
              }`}
              style={{ width: 42 }}
            />
          ))}
        </footer>
      </div>

      <div className="absolute left-[48.9%] top-[11.85%] z-10 w-[39.6%]">
        <p className="font-[family-name:var(--font-space-mono)] text-[30px] font-bold text-white">
          {DIAMOND_DOGS_CATALOGUE.articleLabel}
        </p>
        <h1 className="mt-2 font-[family-name:var(--font-space-mono)] text-[96px] font-bold leading-none text-white">
          {DIAMOND_DOGS_CATALOGUE.name}
        </h1>
        <p className="mt-7 max-w-[760px] font-[family-name:var(--font-space-mono)] text-[20px] font-normal leading-[1.4] text-white">
          {DIAMOND_DOGS_CATALOGUE.description}
        </p>

        <p className="mt-8 font-[family-name:var(--font-space-mono)] text-[26px] font-bold text-white">
          Available Size
        </p>
        <p className="mt-3 font-[family-name:var(--font-space-mono)] text-[76px] font-bold leading-none text-white">
          {DIAMOND_DOGS_CATALOGUE.sizes}
        </p>

        <p className="mt-10 font-[family-name:var(--font-space-mono)] text-[26px] font-bold text-white">
          Price
        </p>
        <p className="mt-3 font-[family-name:var(--font-space-mono)] text-[78px] font-bold leading-none text-white">
          {DIAMOND_DOGS_CATALOGUE.price}
        </p>

        <a
          href={whatsappCheckoutUrl}
          className="mt-8 inline-flex h-[88px] w-[330px] cursor-pointer items-center justify-center bg-white font-[family-name:var(--font-space-mono)] text-[54px] font-bold leading-none text-black no-underline outline-none transition-colors hover:bg-zinc-300 focus-visible:ring-2 focus-visible:ring-white/90"
          aria-label={`Buy ${DIAMOND_DOGS_CATALOGUE.name} on WhatsApp`}
        >
          Buy Now
        </a>
        <p className="mt-3 max-w-[430px] font-[family-name:var(--font-space-mono)] text-[14px] font-normal leading-[1.4] text-white/88">
          *You will be redirected to WhatsApp to complete your purchase.
        </p>
      </div>

      <BadLogoMark className="absolute bottom-[9.8%] right-[1.93%] z-10" />
    </section>
  );
}

function MobileCatalogue({
  activeIndex,
  menuOpen,
  onPrev,
  onNext,
  onTouchStart,
  onTouchEnd,
  mobileZoom,
  onToggleMenu,
  onCloseMenu,
  onZoomIn,
  onZoomOut,
}: {
  activeIndex: number;
  menuOpen: boolean;
  onPrev: () => void;
  onNext: () => void;
  onTouchStart: (e: React.TouchEvent<HTMLDivElement>) => void;
  onTouchEnd: (e: React.TouchEvent<HTMLDivElement>) => void;
  mobileZoom: number;
  onToggleMenu: () => void;
  onCloseMenu: () => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
}) {
  return (
    <section className="relative min-h-[100dvh] md:hidden">
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src={DIAMOND_DOGS_CATALOGUE.background}
          alt="Diamond Dogs catalogue background mobile"
          fill
          className="object-cover"
          priority
          quality={78}
          sizes="(max-width: 767px) 100vw, 0px"
        />
      </div>
      <div className="absolute inset-0 bg-black/38" />

      <div
        className={`fixed inset-0 z-50 flex items-center justify-center bg-black transition-all duration-300 ease-in-out md:hidden ${
          menuOpen ? "visible scale-100 opacity-100" : "invisible scale-95 opacity-0"
        }`}
      >
        <NavLinks
          items={navItems}
          className="flex flex-col items-center gap-7"
          linkClassName="cursor-pointer font-[family-name:var(--font-space-mono)] text-[22px] font-normal text-white"
          onClick={onCloseMenu}
        />
      </div>

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

      <div className="relative z-10 mx-auto w-full max-w-[390px] pt-14">
        <div className="pointer-events-none absolute inset-0 bg-black/22" />

        <div className="relative z-20 flex flex-col gap-4 px-4 pb-4 pt-4">
          <div className="relative h-[478px] w-full overflow-hidden rounded-2xl bg-black">
            <div
              className="relative h-[430px] overflow-hidden"
              onTouchStart={onTouchStart}
              onTouchEnd={onTouchEnd}
            >
              <div className="absolute right-3 top-3 z-20 flex gap-2">
                <button
                  type="button"
                  aria-label="Zoom out"
                  onClick={onZoomOut}
                  className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-black/65 text-white outline-none transition-colors hover:bg-black/80 hover:cursor-pointer focus-visible:ring-2 focus-visible:ring-white/80"
                >
                  <ZoomControlIcon type="out" />
                </button>
                <button
                  type="button"
                  aria-label="Zoom in"
                  onClick={onZoomIn}
                  className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-black/65 text-white outline-none transition-colors hover:bg-black/80 hover:cursor-pointer focus-visible:ring-2 focus-visible:ring-white/80"
                >
                  <ZoomControlIcon type="in" />
                </button>
              </div>

              <div
                className="flex h-full transition-transform duration-300 ease-out"
                style={{
                  width: `${DIAMOND_DOGS_CATALOGUE.slides.length * 100}%`,
                  transform: `translateX(-${
                    activeIndex * (100 / DIAMOND_DOGS_CATALOGUE.slides.length)
                  }%)`,
                }}
              >
                {DIAMOND_DOGS_CATALOGUE.slides.map((src) => (
                  <div
                    key={src}
                    className="relative h-full shrink-0 overflow-hidden"
                    style={{
                      width: `${100 / DIAMOND_DOGS_CATALOGUE.slides.length}%`,
                    }}
                  >
                    <Image
                      src={src}
                      alt={`${DIAMOND_DOGS_CATALOGUE.name} showcase mobile`}
                      fill
                      className="object-cover transition-transform duration-200"
                      sizes="(max-width: 768px) calc(100vw - 32px), 358px"
                      quality={78}
                      priority={src === DIAMOND_DOGS_CATALOGUE.slides[0]}
                      style={{
                        transform: `scale(${mobileZoom})`,
                        transformOrigin: "center center",
                      }}
                    />
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={onPrev}
                aria-label="Previous image"
                className="absolute left-3 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-black/60 text-white outline-none transition-colors hover:bg-black/75 hover:cursor-pointer focus-visible:ring-2 focus-visible:ring-white/80"
              >
                <ChevronIcon direction="left" />
              </button>
              <button
                type="button"
                onClick={onNext}
                aria-label="Next image"
                className="absolute right-3 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-black/60 text-white outline-none transition-colors hover:bg-black/75 hover:cursor-pointer focus-visible:ring-2 focus-visible:ring-white/80"
              >
                <ChevronIcon direction="right" />
              </button>
            </div>

            <footer className="absolute bottom-0 flex h-12 w-full items-center justify-center gap-2.5 bg-black/85">
              {DIAMOND_DOGS_CATALOGUE.slides.map((src, index) => (
                <span
                  key={`${src}-mobile-dot`}
                  className={`h-1 rounded-full ${
                    activeIndex === index ? "bg-zinc-100" : "bg-zinc-500"
                  }`}
                  style={{ width: 42 }}
                />
              ))}
            </footer>
          </div>

          <p className="font-[family-name:var(--font-space-mono)] text-[22px] font-bold text-white">
            {DIAMOND_DOGS_CATALOGUE.articleLabel}
          </p>
          <h1 className="font-[family-name:var(--font-space-mono)] text-[48px] font-bold leading-none text-white">
            {DIAMOND_DOGS_CATALOGUE.name}
          </h1>
          <p className="font-[family-name:var(--font-space-mono)] text-[16px] leading-[1.4] text-white">
            {DIAMOND_DOGS_CATALOGUE.description}
          </p>

          <p className="font-[family-name:var(--font-space-mono)] text-[24px] font-bold text-white">
            Available Size
          </p>
          <p className="font-[family-name:var(--font-space-mono)] text-[56px] font-bold leading-none text-white">
            {DIAMOND_DOGS_CATALOGUE.sizes}
          </p>

          <p className="font-[family-name:var(--font-space-mono)] text-[24px] font-bold text-white">
            Price
          </p>
          <p className="font-[family-name:var(--font-space-mono)] text-[52px] font-bold leading-none text-white">
            {DIAMOND_DOGS_CATALOGUE.price}
          </p>

          <a
            href={whatsappCheckoutUrl}
            className="flex h-[72px] w-full cursor-pointer items-center justify-center bg-white font-[family-name:var(--font-space-mono)] text-[44px] font-bold leading-none text-black no-underline outline-none transition-colors hover:bg-zinc-300 focus-visible:ring-2 focus-visible:ring-white/90"
            aria-label={`Buy ${DIAMOND_DOGS_CATALOGUE.name} on WhatsApp`}
          >
            Buy Now
          </a>
          <p className="font-[family-name:var(--font-space-mono)] text-[12px] font-normal leading-[1.35] text-white/88">
            *You will be redirected to WhatsApp to complete your purchase.
          </p>
        </div>
      </div>
    </section>
  );
}

function ChevronIcon({ direction }: { direction: "left" | "right" }) {
  const points =
    direction === "left" ? "15 6.5 9 12 15 17.5" : "9 6.5 15 12 9 17.5";

  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden
      className={`h-7 w-7 shrink-0 pointer-events-none ${
        direction === "left" ? "-translate-x-px" : "translate-x-px"
      }`}
      fill="none"
      stroke="currentColor"
      strokeWidth={2.75}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points={points} />
    </svg>
  );
}

function ZoomControlIcon({ type }: { type: "in" | "out" }) {
  return (
    <svg
      viewBox="0 0 16 16"
      aria-hidden
      className="h-4 w-4 shrink-0 pointer-events-none"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.2}
      strokeLinecap="round"
    >
      <line x1="3.2" y1="8" x2="12.8" y2="8" />
      {type === "in" && <line x1="8" y1="3.2" x2="8" y2="12.8" />}
    </svg>
  );
}

function BadLogoMark({ className }: { className?: string }) {
  return (
    <div className={`flex gap-[10px] ${className ?? ""}`}>
      {["B", "A", "D"].map((letter) => (
        <div
          key={letter}
          className="flex h-[55px] w-[55px] items-center justify-center rounded-full border-[5px] border-white"
        >
          <span className="font-[family-name:var(--font-space-mono)] text-[34px] font-bold leading-none text-white">
            {letter}
          </span>
        </div>
      ))}
    </div>
  );
}
