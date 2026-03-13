import Image from "next/image";
import { CardShell } from "./card-shell";

export function BrandCard() {
  return (
    <CardShell style={{ left: '2.36%', top: '3.22%', width: '22.92%', height: '13.78%' }}>
      <Image
        src="/images/collage-1.jpg"
        alt="Brand pattern"
        fill
        className="object-cover opacity-80"
        sizes="23vw"
        quality={60}
      />
      <div className="relative z-10 flex items-center gap-4 p-5 h-full">
        <div className="relative w-[60px] h-[60px] shrink-0 rounded-lg overflow-hidden">
          <Image
            src="/images/logo.png"
            alt="Bad Dresser logo"
            fill
            className="object-contain"
            sizes="60px"
            priority
          />
        </div>
        <div>
          <h1 className="font-[family-name:var(--font-space-grotesk)] text-[26px] font-extrabold text-white leading-tight">
            Bad Dresser
          </h1>
          <p className="font-[family-name:var(--font-space-mono)] text-[10px] text-white/80 tracking-wide">
            good education, bad dresser.
          </p>
        </div>
      </div>
    </CardShell>
  );
}
