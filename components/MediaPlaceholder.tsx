import type { ReactNode } from "react";

type MediaPlaceholderProps = {
  /** Small pill in the top-left corner, e.g. "Photo" or "Photo / clip" */
  tag: string;
  /** What the final image/video should show */
  title?: string;
  note?: string;
  dark?: boolean;
  className?: string;
  children?: ReactNode;
};

/**
 * Labelled stand-in for a photo or clip. Swap for <Image> / <video> once real media exists.
 * `children` are rendered at the bottom (used for card titles laid over the media).
 */
export default function MediaPlaceholder({
  tag,
  title,
  note,
  dark = false,
  className = "",
  children,
}: MediaPlaceholderProps) {
  return (
    <div
      className={`relative flex flex-col justify-end gap-1 overflow-hidden p-5 md:p-[22px] ${
        dark ? "media-placeholder-dark text-cream" : "media-placeholder text-ink"
      } ${className}`}
    >
      <span className="absolute top-4 left-4 rounded-full bg-cream/90 px-2.5 py-1.5 text-xs font-semibold tracking-[0.16em] text-ink uppercase">
        {tag}
      </span>
      {title && <p className="text-lg leading-tight font-semibold tracking-[-0.02em] md:text-[22px]">{title}</p>}
      {note && (
        <p className={`text-sm leading-snug ${dark ? "text-[#cfc7c0]" : "text-muted"}`}>{note}</p>
      )}
      {children}
    </div>
  );
}
