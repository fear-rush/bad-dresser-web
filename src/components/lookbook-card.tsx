import Image from "next/image";
import { CardShell } from "./card-shell";

export function LookbookCard() {
  return (
    <CardShell>
      <Image
        src="/images/lookbook.jpg"
        alt="Bad Dresser lookbook"
        fill
        className="object-cover"
        sizes="28vw"
        quality={70}
      />
      {/* Top label — also drag handle */}
      <div className="absolute inset-x-0 top-0 flex justify-center py-2.5 bg-gradient-to-b from-black/60 to-transparent rounded-t-lg z-10 select-none">
        <span className="font-[family-name:var(--font-space-grotesk)] text-[13px] font-semibold text-white">
          Lookbook
        </span>
      </div>
      {/* Bottom info */}
      <div className="absolute inset-x-0 bottom-0 p-5 pt-16 bg-gradient-to-t from-black/80 to-transparent z-10">
        <h3 className="font-[family-name:var(--font-space-grotesk)] text-2xl font-bold text-white leading-tight">
          The Anti-Fashion
          <br />
          Statement
        </h3>
        <p className="font-[family-name:var(--font-space-mono)] text-[11px] text-white/60 mt-1">
          Spring/Summer 2026
        </p>
      </div>
    </CardShell>
  );
}
