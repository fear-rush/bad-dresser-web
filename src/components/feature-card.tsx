import Image from "next/image";
import { CardShell } from "./card-shell";

export function FeatureCard({ mobile = false }: { mobile?: boolean }) {
  if (mobile) {
    return (
      <div className="relative w-full aspect-[3/4] rounded-lg overflow-hidden">
        <Image
          src="/images/feature.jpg"
          alt="Bad Dresser feature"
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 500px"
          priority
          quality={75}
        />
        {/* Greyhound stamp */}
        <div className="absolute bottom-20 right-4 w-[100px] h-[100px] rotate-12 opacity-90 z-20">
          <Image
            src="/images/overlay-greyhound.png"
            alt="Greyhound Till I Die"
            fill
            className="object-contain"
            sizes="100px"
          />
        </div>
        {/* Top gradient overlay with text */}
        <div className="absolute inset-x-0 top-0 p-5 pb-16 bg-gradient-to-b from-black/80 to-transparent">
          <h2 className="font-[family-name:var(--font-space-grotesk)] text-xl font-bold text-white">
            Welcome to Bad Dresser
          </h2>
          <p className="font-[family-name:var(--font-manrope)] text-[13px] text-white/80 leading-relaxed mt-2">
            A fashion label for the intellectually curious and sartorially
            rebellious.
          </p>
          <p className="font-[family-name:var(--font-manrope)] text-[13px] text-white/70 mt-1">
            Find out more here.
          </p>
        </div>
      </div>
    );
  }

  return (
    <CardShell>
      <Image
        src="/images/feature.jpg"
        alt="Bad Dresser feature"
        fill
        className="object-cover"
        sizes="35vw"
        priority
        quality={75}
      />
      {/* Drag handle — transparent bar at top */}
      <div className="drag-handle cursor-grab active:cursor-grabbing absolute inset-x-0 top-0 h-[30px] z-20" />
      {/* Greyhound stamp */}
      <div className="absolute bottom-32 right-6 w-[160px] h-[160px] rotate-12 opacity-90 z-20">
        <Image
          src="/images/overlay-greyhound.png"
          alt="Greyhound Till I Die"
          fill
          className="object-contain"
          sizes="160px"
        />
      </div>
      {/* Top gradient overlay */}
      <div className="absolute inset-x-0 top-0 rounded-t-lg p-5 pb-20 bg-gradient-to-b from-black/80 to-transparent z-10">
        <h2 className="font-[family-name:var(--font-space-grotesk)] text-[22px] font-bold text-white">
          Welcome to Bad Dresser
        </h2>
        <p className="font-[family-name:var(--font-manrope)] text-[13px] text-white/80 leading-relaxed mt-2 max-w-[400px]">
          A fashion label for the intellectually curious and sartorially
          rebellious.
        </p>
        <p className="font-[family-name:var(--font-manrope)] text-[13px] text-white/80 mt-1">
          Find out more here.
        </p>
      </div>
    </CardShell>
  );
}
