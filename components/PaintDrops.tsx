import type { CSSProperties } from "react";

type PaintDropsProps = {
  /** Alpha-mask image with the drops, e.g. "/splashes/portrait-1.png" */
  mask: string;
  color: string;
  /** Positioning / sizing classes for the layer */
  className?: string;
  style?: CSSProperties;
};

/** Coloured paint splatter painted through an alpha mask. Decorative only. */
export default function PaintDrops({ mask, color, className = "", style }: PaintDropsProps) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute ${className}`}
      style={{
        backgroundColor: color,
        maskImage: `url(${mask})`,
        WebkitMaskImage: `url(${mask})`,
        maskSize: "100% 100%",
        WebkitMaskSize: "100% 100%",
        maskRepeat: "no-repeat",
        WebkitMaskRepeat: "no-repeat",
        ...style,
      }}
    />
  );
}
