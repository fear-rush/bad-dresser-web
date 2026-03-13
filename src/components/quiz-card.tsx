import Image from "next/image";
import { CardShell } from "./card-shell";

export function QuizCard({ mobile = false }: { mobile?: boolean }) {
  if (mobile) {
    return (
      <div className="relative aspect-square rounded-lg overflow-hidden">
        <Image
          src="/images/quiz.jpg"
          alt="Style quiz"
          fill
          className="object-cover"
          sizes="(max-width: 768px) 50vw, 365px"
          quality={70}
        />
        <div className="absolute bottom-2.5 left-2.5">
          <span className="px-3 py-1 rounded-full bg-black/50 backdrop-blur-sm text-[11px] font-semibold font-[family-name:var(--font-space-grotesk)] text-white">
            Are you a bad dresser?
          </span>
        </div>
      </div>
    );
  }

  return (
    <CardShell>
      <Image
        src="/images/quiz.jpg"
        alt="Style quiz background"
        fill
        className="object-cover"
        sizes="25vw"
        quality={70}
      />
      {/* Top label — also drag handle */}
      <div className="drag-handle cursor-grab active:cursor-grabbing absolute inset-x-0 top-0 flex justify-center py-2 bg-gradient-to-b from-black/60 to-transparent rounded-t-lg z-10 select-none">
        <span className="font-[family-name:var(--font-space-grotesk)] text-[13px] font-semibold text-white">
          Are you a bad dresser?
        </span>
      </div>
      {/* Center content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-6 z-10">
        <h3 className="font-[family-name:var(--font-space-grotesk)] text-[42px] font-extrabold text-[#C4F82A] leading-none text-center">
          HOW BAD
          <br />
          A DRESSER
          <br />
          ARE YOU?
        </h3>
        <button className="px-8 py-3.5 rounded-full bg-white font-[family-name:var(--font-space-grotesk)] text-sm font-semibold text-black hover:bg-white/90 transition-colors">
          Take the Quiz
        </button>
      </div>
    </CardShell>
  );
}
