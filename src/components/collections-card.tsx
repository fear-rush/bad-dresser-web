import Image from "next/image";
import { CardShell } from "./card-shell";

const collections = [
  { src: "/images/collage-1.jpg", name: "Overthink", desc: "Capsule Collection" },
  { src: "/images/collage-2.jpg", name: "Semester Abroad", desc: "SS26" },
];

export function CollectionsCard() {
  return (
    <CardShell style={{ left: '2.36%', top: '61.11%', width: '31.25%', height: '36.67%' }}>
      {/* Header */}
      <div className="flex justify-center py-2.5 bg-white/5">
        <span className="font-[family-name:var(--font-space-grotesk)] text-[13px] font-semibold text-white">
          Current Collections
        </span>
      </div>
      {/* Grid */}
      <div className="flex h-[294px]">
        {collections.map((col) => (
          <div key={col.name} className="relative flex-1 overflow-hidden">
            <Image
              src={col.src}
              alt={col.name}
              fill
              className="object-cover"
              sizes="16vw"
              quality={65}
            />
            <div className="absolute inset-x-0 bottom-0 p-3 pt-12 bg-gradient-to-t from-black/80 to-transparent">
              <p className="font-[family-name:var(--font-space-grotesk)] text-base font-bold text-white">
                {col.name}
              </p>
              <p className="font-[family-name:var(--font-manrope)] text-[11px] text-white/60">
                {col.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </CardShell>
  );
}
