export function CardShell({
  children,
  className = "",
  style,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      className={`rounded-lg overflow-hidden bg-white/15 backdrop-blur-xl border border-white/[0.08] group w-full h-full relative ${className}`}
      style={style}
    >
      {children}
      {/* Hover darkening overlay */}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 z-30 pointer-events-none" />
    </div>
  );
}
