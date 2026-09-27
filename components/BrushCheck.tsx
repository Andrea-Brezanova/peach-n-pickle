type BrushCheckProps = {
  color: string;
  /** Varies the tilt and edge texture; also keeps the SVG filter id unique */
  seed?: number;
  className?: string;
};

// Checkmark centre line: short down-stroke, then the long flick up to the right
const CHECK = "M12 33 Q18 38 25 47 Q36 27 55 12";
// Dry-brush streaks running along the stroke (paper showing through / bristle marks)
const STREAKS = [
  { d: "M13 31.5 Q19 36.5 25.5 44.5 Q36.5 25.5 54 10.5", dash: "10 4 16 3", w: 1 },
  { d: "M12.5 35 Q18.5 40 24.5 49.5 Q36 29.5 56 14", dash: "6 5 12 2", w: 0.9 },
  { d: "M14 33.5 Q20 38.5 25.5 47 Q37 28 53 13.5", dash: "18 3 5 6", w: 0.8 },
];

/** Hand-painted checkmark: a rough-edged brush stroke with dry streaks and a tapered tail. Decorative. */
export default function BrushCheck({ color, seed = 1, className = "" }: BrushCheckProps) {
  const id = `brush-${seed}`;
  const tilt = ((seed * 37) % 13) - 6; // -6° … 6°
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" className={`overflow-visible ${className}`}>
      <defs>
        <filter id={id} x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed={seed} result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="3.2" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </defs>
      <g filter={`url(#${id})`} transform={`rotate(${tilt} 32 32)`} strokeLinecap="round" strokeLinejoin="round" fill="none">
        {/* body of the stroke */}
        <path d={CHECK} stroke={color} strokeWidth="8.5" opacity="0.92" />
        {/* thinning tail as the brush lifts off */}
        <path d="M49 17 Q53 13.5 58.5 9.5" stroke={color} strokeWidth="4" opacity="0.85" />
        <path d="M55 12.5 Q58 10 61 8" stroke={color} strokeWidth="1.8" opacity="0.7" />
        {/* heavier paint where the brush lands */}
        <path d="M11.5 32.5 Q14 34 16 36" stroke={color} strokeWidth="10" opacity="0.55" />
        {/* dry-brush streaks: paper showing through */}
        {STREAKS.map((s, i) => (
          <path key={i} d={s.d} stroke="#faf7f2" strokeWidth={s.w} strokeDasharray={s.dash} opacity="0.45" />
        ))}
      </g>
    </svg>
  );
}
