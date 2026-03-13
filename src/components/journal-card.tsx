import { CardShell } from "./card-shell";

const items = [
  { cat: "New Drop", title: "'Overthink' Capsule Collection Now Live" },
  { cat: "Editorial", title: "Why the Smartest People Dress the Worst" },
  { cat: "Brand News", title: "Bad Dresser x University of Arts London" },
];

export function JournalCard() {
  return (
    <CardShell style={{ left: '6.25%', top: '18.89%', width: '18.40%', height: '28.89%' }}>
      <div className="flex flex-col h-full">
        <div className="flex justify-center py-2.5">
          <span className="font-[family-name:var(--font-space-grotesk)] text-sm font-semibold text-white">
            Journal
          </span>
        </div>
        {items.map((item) => (
          <div
            key={item.title}
            className="border-t border-white/10 px-4 py-2.5"
          >
            <p className="font-[family-name:var(--font-space-mono)] text-[9px] text-white/60 tracking-wider uppercase">
              {item.cat}
            </p>
            <p className="font-[family-name:var(--font-space-grotesk)] text-[13px] font-semibold text-white leading-snug mt-0.5">
              {item.title}
            </p>
          </div>
        ))}
      </div>
    </CardShell>
  );
}
