type RGB = [number, number, number];

type WaveformProps = {
  /** Number of bars */
  bars?: number;
  /** Tallest bar in px */
  height: number;
  /** Gradient from the first to the last bar */
  from: RGB;
  to: RGB;
  /** Varies the pattern so neighbouring waveforms don't look identical */
  seed?: number;
  barWidth?: number;
  gap?: number;
  /** Bars gently pulse (off for reduced motion). Lower duration = busier. */
  animated?: boolean;
  duration?: number;
  className?: string;
};

/** Small soundwave motif taken from the logo — decorative only. */
export default function Waveform({
  bars = 36,
  height,
  from,
  to,
  seed = 0,
  barWidth = 3,
  gap = 3,
  animated = false,
  duration = 1.3,
  className = "",
}: WaveformProps) {
  const items = Array.from({ length: bars }, (_, i) => {
    const t = bars > 1 ? i / (bars - 1) : 0;
    const envelope = Math.pow(Math.sin(Math.PI * (0.06 + 0.88 * t)), 0.5);
    const v = Math.abs(Math.sin(i * 0.61 + seed) * 0.6 + Math.sin(i * 0.23 + seed * 1.7) * 0.4);
    const color = from.map((c, k) => Math.round(c + (to[k] - c) * t));
    return {
      h: Math.max(3, Math.round(height * (0.25 + 0.75 * v) * envelope)),
      color: `rgb(${color.join(",")})`,
      delay: ((i * 37) % 100) / 100,
    };
  });

  return (
    <span aria-hidden="true" className={`flex items-center ${className}`} style={{ gap, height }}>
      {items.map((bar, i) => (
        <span
          key={i}
          className={`block shrink-0 rounded-full ${animated ? "motion-safe:animate-wave" : ""}`}
          style={{
            width: barWidth,
            height: bar.h,
            background: bar.color,
            animationDelay: animated ? `-${bar.delay}s` : undefined,
            animationDuration: animated ? `${duration}s` : undefined,
          }}
        />
      ))}
    </span>
  );
}
