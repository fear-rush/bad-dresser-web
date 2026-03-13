export function DragHandle({ label }: { label: string }) {
  return (
    <div className="flex justify-center items-center py-2 bg-white/5 select-none">
      <span className="font-[family-name:var(--font-space-grotesk)] text-[13px] font-semibold text-white">
        {label}
      </span>
    </div>
  );
}
