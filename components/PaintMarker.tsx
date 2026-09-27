type PaintMarkerProps = {
  color: string;
  size?: number;
  /** Changes the splatter pattern */
  seed?: number;
  /** Optional text in the middle (e.g. a number) */
  label?: string;
};

// Deterministic pseudo-random so server and client render the same splatter
const rand = (seed: number, i: number) => {
  const x = Math.sin(seed * 999 + i * 12.9898) * 43758.5453;
  return x - Math.floor(x);
};

/** Small paint splash: one blob with a few flicked drops around it. Decorative. */
export default function PaintMarker({ color, size = 64, seed = 1, label }: PaintMarkerProps) {
  const c = size / 2;
  const drops = Array.from({ length: 9 }, (_, i) => {
    const a = rand(seed, i) * Math.PI * 2;
    const d = size * (0.36 + rand(seed, i + 20) * 0.14);
    return { x: c + Math.cos(a) * d, y: c + Math.sin(a) * d, r: 1.5 + rand(seed, i + 40) * (size * 0.07 - 1.5) };
  });
  return (
    <span className="relative inline-flex shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden="true" className="overflow-visible">
        <circle cx={c} cy={c} r={size * 0.3} fill={color} />
        {drops.map((dr, i) => (
          <circle key={i} cx={dr.x} cy={dr.y} r={dr.r} fill={color} opacity={0.85} />
        ))}
      </svg>
      {label && (
        <span className="absolute inset-0 flex items-center justify-center text-[21px] font-semibold tracking-[-0.03em] md:text-2xl">
          {label}
        </span>
      )}
    </span>
  );
}
