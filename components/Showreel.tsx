"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";

const VIDEO_ID = "yQZKB6inr90";
const VIDEO_TITLE = "Peach & Pickle — live teaser";
// A pause longer than this brings the poster back (short pauses happen while scrubbing)
const POSTER_AFTER_PAUSE_MS = 20_000;

// Minimal typing for the bits of the YouTube IFrame Player API we use
type YTPlayer = {
  playVideo(): void;
  pauseVideo(): void;
  seekTo(seconds: number, allowSeekAhead: boolean): void;
  getPlayerState(): number;
  destroy(): void;
};
type YTNamespace = {
  Player: new (
    el: HTMLElement,
    options: {
      host?: string;
      videoId: string;
      playerVars?: Record<string, number>;
      events?: { onReady?: () => void; onStateChange?: (e: { data: number }) => void };
    },
  ) => YTPlayer;
  PlayerState: { ENDED: number; PLAYING: number; PAUSED: number };
};
declare global {
  interface Window {
    YT?: YTNamespace;
    onYouTubeIframeAPIReady?: () => void;
  }
}

// Load YouTube's player script once, only when someone presses play
let apiPromise: Promise<YTNamespace> | null = null;
function loadYouTubeApi() {
  if (window.YT?.Player) return Promise.resolve(window.YT);
  apiPromise ??= new Promise((resolve) => {
    const previous = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      previous?.();
      resolve(window.YT!);
    };
    const script = document.createElement("script");
    script.src = "https://www.youtube.com/iframe_api";
    script.async = true;
    document.head.appendChild(script);
  });
  return apiPromise;
}

/**
 * One featured performance video. Shows a poster first and only loads the YouTube player
 * (privacy-enhanced) when the visitor presses play. The poster comes back when the video ends
 * or stays paused for a while; it keeps playing while the visitor scrolls.
 */
export default function Showreel() {
  const [started, setStarted] = useState(false); // player has been loaded
  const [showPoster, setShowPoster] = useState(true);
  const mountRef = useRef<HTMLDivElement>(null);
  const holderRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<YTPlayer | null>(null);
  const endedRef = useRef(false);
  const pauseTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const onStateChange = useCallback((state: number) => {
    const S = window.YT?.PlayerState;
    if (!S) return;
    clearTimeout(pauseTimer.current);
    if (state === S.PLAYING) {
      endedRef.current = false;
      setShowPoster(false);
    } else if (state === S.ENDED) {
      endedRef.current = true;
      setShowPoster(true);
    } else if (state === S.PAUSED) {
      pauseTimer.current = setTimeout(() => setShowPoster(true), POSTER_AFTER_PAUSE_MS);
    }
  }, []);

  const play = async () => {
    setShowPoster(false);
    const player = playerRef.current;
    if (player) {
      if (endedRef.current) player.seekTo(0, true);
      player.playVideo();
      return;
    }
    setStarted(true);
    const YT = await loadYouTubeApi();
    if (!mountRef.current || playerRef.current) return;
    playerRef.current = new YT.Player(mountRef.current, {
      host: "https://www.youtube-nocookie.com",
      videoId: VIDEO_ID,
      playerVars: { autoplay: 1, rel: 0, playsinline: 1 },
      events: {
        onReady: () => {
          holderRef.current?.querySelector("iframe")?.setAttribute("title", VIDEO_TITLE);
          playerRef.current?.playVideo();
        },
        onStateChange: (e) => onStateChange(e.data),
      },
    });
  };

  const restart = () => {
    const player = playerRef.current;
    if (!player) return;
    endedRef.current = false;
    setShowPoster(false);
    player.seekTo(0, true);
    player.playVideo();
  };

  useEffect(
    () => () => {
      clearTimeout(pauseTimer.current);
      playerRef.current?.destroy();
      playerRef.current = null;
    },
    [],
  );

  return (
    <section
      id="showreel"
      aria-label="See us in action"
      className="relative scroll-mt-4 bg-sand px-5 py-14 sm:px-10 md:py-20 lg:px-16 lg:py-24"
    >
      <div className="mx-auto flex max-w-[1312px] flex-col items-center">
        <div className="relative w-full shadow-[0_30px_60px_-35px_rgb(70_45_35/0.45)]">
          <div className="relative aspect-video overflow-hidden bg-ink">
            {/* YouTube swaps this div for its player iframe */}
            {started && (
              <div ref={holderRef} className="absolute inset-0 [&>iframe]:size-full">
                <div ref={mountRef} />
              </div>
            )}

            <button
              type="button"
              onClick={play}
              aria-label={`Play video: ${VIDEO_TITLE}`}
              tabIndex={showPoster ? 0 : -1}
              aria-hidden={!showPoster}
              className={`group absolute inset-0 z-10 size-full cursor-pointer transition-opacity duration-500 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink ${
                showPoster ? "opacity-100" : "pointer-events-none opacity-0"
              }`}
            >
              <Image
                src="/videos/showreel-poster-simona.jpg"
                alt=""
                fill
                sizes="(min-width: 1440px) 1312px, 100vw"
                className="object-cover"
              />
              <span className="absolute top-1/2 left-1/2 flex size-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-ink/45 text-cream ring-1 ring-cream/40 backdrop-blur-sm transition group-hover:scale-105 group-hover:bg-ink/65 md:size-[72px]">
                <svg viewBox="0 0 14 14" aria-hidden="true" className="ml-0.5 size-4 md:size-6">
                  <path d="M3 1 L13 7 L3 13 Z" fill="currentColor" />
                </svg>
              </span>
            </button>
          </div>

          {/* Jump back to the beginning — floats in the bottom spacing so top and bottom margins stay equal */}
          {started && (
            <button
              type="button"
              onClick={restart}
              className="absolute top-full left-1/2 mt-1.5 inline-flex min-h-11 -translate-x-1/2 items-center gap-2 rounded-full px-3 text-sm font-medium whitespace-nowrap text-muted transition hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink md:mt-4"
            >
              <svg viewBox="0 0 16 16" aria-hidden="true" className="size-4">
                <path
                  d="M3.5 8a4.5 4.5 0 1 0 1.4-3.3M4.2 1.8v3.1h3.1"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Play from the start
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
