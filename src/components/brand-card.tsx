import Image from "next/image";
import { CardShell } from "./card-shell";
import { DragHandle } from "./drag-handle";

export function BrandCard() {
  return (
    <CardShell>
      <Image
        src="/images/collage-1.jpg"
        alt="Brand pattern"
        fill
        className="object-cover opacity-80"
        sizes="23vw"
        quality={60}
      />
      <DragHandle label="Bad Dresser" />
      <div className="relative z-10 flex items-center gap-4 p-4">
        <div className="relative w-[50px] h-[50px] shrink-0 rounded-lg overflow-hidden">
          <Image
            src="/images/logo.png"
            alt="Bad Dresser logo"
            fill
            className="object-contain"
            sizes="50px"
            priority
          />
        </div>
        <div>
          <h1 className="font-[family-name:var(--font-space-grotesk)] text-[20px] font-extrabold text-white leading-tight">
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
