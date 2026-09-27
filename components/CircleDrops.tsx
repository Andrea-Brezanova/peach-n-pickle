import type { Drop } from "@/components/dropSets";

type CircleDropsProps = {
  drops: Drop[];
  color: string;
  className?: string;
};

/** Round paint drops scattered around a frame (400×500 design box, scales with the frame). Decorative only. */
export default function CircleDrops({ drops, color, className = "" }: CircleDropsProps) {
  return (
    <svg
      viewBox="0 0 400 500"
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 size-full overflow-visible ${className}`}
    >
      {drops.map(([cx, cy, r, opacity], i) => (
        <circle key={i} cx={cx} cy={cy} r={r} fill={color} opacity={opacity} />
      ))}
    </svg>
  );
}
