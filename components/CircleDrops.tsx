import type { Drop } from "@/components/dropSets";

type CircleDropsProps = {
  drops: Drop[];
  color: string;
  /** Varies the paint texture; also keeps the SVG filter id unique on the page */
  seed?: number;
  className?: string;
};

// Deterministic pseudo-random so server and client render the same splatter
const rand = (seed: number, i: number) => {
  const x = Math.sin(seed * 997 + i * 12.9898) * 43758.5453;
  return x - Math.floor(x);
};
// Round so the markup is identical whichever JS engine computed it
const r2 = (n: number) => Math.round(n * 100) / 100;

/**
 * Paint drops scattered around a frame (400×500 design box, scales with the frame). Drops are
 * slightly oval with rough, uneven edges, and bigger ones throw off a few tiny flecks. Decorative only.
 */
export default function CircleDrops({ drops, color, seed = 1, className = "" }: CircleDropsProps) {
  const filterId = `paint-drops-${seed}`;
  return (
    <svg
      viewBox="0 0 400 500"
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 size-full overflow-visible ${className}`}
    >
      <defs>
        {/* Roughen the edges so drops look splattered, not stamped */}
        <filter id={filterId} x="-50%" y="-50%" width="200%" height="200%">
          <feTurbulence type="fractalNoise" baseFrequency="0.45" numOctaves="2" seed={seed} result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="2.6" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </defs>
      <g filter={`url(#${filterId})`} fill={color}>
        {drops.map(([cx, cy, r, opacity], i) => {
          const stretch = r > 2.5 ? r2(rand(seed, i) * 0.35) : 0;
          const angle = Math.round(rand(seed, i + 50) * 180);
          // Paint density varies a little from drop to drop
          const alpha = r2(Math.max(0.55, opacity - rand(seed, i + 100) * 0.25));
          const flecks =
            r > 4
              ? Array.from({ length: 1 + Math.floor(rand(seed, i + 150) * 2) }, (_, k) => {
                  const a = rand(seed, i * 3 + k + 200) * Math.PI * 2;
                  const d = r * (1.6 + rand(seed, i * 3 + k + 250) * 1.2);
                  return { x: r2(cx + Math.cos(a) * d), y: r2(cy + Math.sin(a) * d), r: r2(0.5 + rand(seed, i * 3 + k + 300) * 0.9) };
                })
              : [];
          return (
            <g key={i} opacity={alpha}>
              <ellipse
                cx={cx}
                cy={cy}
                rx={r2(r * (1 + stretch))}
                ry={r2(r * (1 - stretch * 0.5))}
                transform={`rotate(${angle} ${cx} ${cy})`}
              />
              {flecks.map((f, k) => (
                <circle key={k} cx={f.x} cy={f.y} r={f.r} />
              ))}
            </g>
          );
        })}
      </g>
    </svg>
  );
}
