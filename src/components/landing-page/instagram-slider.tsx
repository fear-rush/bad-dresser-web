"use client";

import Image from "next/image";
import { useCallback, useRef, useState } from "react";

type InstagramSliderProps = {
  slides: readonly string[];
  cardClassName: string;
  title: string;
  headerHeight: number;
  footerHeight: number;
  buttonSize: number;
  titleClassName: string;
  sizes: string;
};

export function InstagramSlider({
  slides,
  cardClassName,
  title,
  headerHeight,
  footerHeight,
  buttonSize,
  titleClassName,
  sizes,
}: InstagramSliderProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const touchStartX = useRef(0);

  const prev = useCallback(() => {
    setActiveIndex((current) => (current - 1 + slides.length) % slides.length);
  }, [slides.length]);

  const next = useCallback(() => {
    setActiveIndex((current) => (current + 1) % slides.length);
  }, [slides.length]);

  const onTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  }, []);

  const onTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      const delta = e.changedTouches[0].clientX - touchStartX.current;
      if (delta > 50) prev();
      else if (delta < -50) next();
    },
    [prev, next]
  );

  const viewportHeight = `calc(100% - ${headerHeight + footerHeight}px)`;

  return (
    <section className={cardClassName}>
      <header
        className="flex items-center justify-center bg-black/85"
        style={{ height: headerHeight }}
      >
        <h3 className={titleClassName}>{title}</h3>
      </header>

      <div
        className="relative overflow-hidden bg-[#0c0c0c]"
        style={{ height: viewportHeight }}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <div
          className="flex h-full transition-transform duration-300 ease-out"
          style={{
            width: `${slides.length * 100}%`,
            transform: `translateX(-${activeIndex * (100 / slides.length)}%)`,
          }}
        >
          {slides.map((src, index) => (
            <div key={src} className="relative h-full shrink-0" style={{ width: `${100 / slides.length}%` }}>
              <Image
                src={src}
                alt={`Instagram slide ${index + 1}`}
                fill
                className="object-contain"
                sizes={sizes}
                priority={index === 0}
                quality={78}
              />
              <a
                href="https://www.instagram.com/b.a.d_dresser/"
                target="_blank"
                rel="noopener noreferrer"
                className="absolute inset-0 z-10 cursor-pointer"
                aria-label={`View on Instagram - slide ${index + 1}`}
              />
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={prev}
          aria-label="Previous slide"
          className="absolute left-3 top-1/2 -translate-y-1/2 cursor-pointer rounded-full bg-black/60 text-white/95"
          style={{ width: buttonSize, height: buttonSize }}
        >
          <span aria-hidden className="text-2xl leading-none">
            ‹
          </span>
        </button>
        <button
          type="button"
          onClick={next}
          aria-label="Next slide"
          className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer rounded-full bg-black/60 text-white/95"
          style={{ width: buttonSize, height: buttonSize }}
        >
          <span aria-hidden className="text-2xl leading-none">
            ›
          </span>
        </button>
      </div>

      <footer
        className="flex items-center justify-center gap-2.5 bg-black/85"
        style={{ height: footerHeight }}
      >
        {slides.map((src, index) => (
          <button
            key={`${src}-indicator`}
            type="button"
            aria-label={`Go to slide ${index + 1}`}
            aria-current={activeIndex === index}
            onClick={() => setActiveIndex(index)}
            className={`h-1 cursor-pointer rounded-full transition-colors ${
              activeIndex === index ? "bg-zinc-100" : "bg-zinc-500"
            }`}
            style={{ width: 42 }}
          />
        ))}
      </footer>
    </section>
  );
}

