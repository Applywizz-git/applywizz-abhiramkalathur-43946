"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { markRevealed } from "@/lib/intro";

const WAVE =
  "M 0 100 Q 250 50 500 100 T 1000 100 T 1500 100 T 2000 100 L 2000 800 L 0 800 Z";

function LoaderName({
  fill,
  firstY,
  secondY,
  firstSize,
  secondSize,
}: {
  fill: string;
  firstY: string;
  secondY: string;
  firstSize: string;
  secondSize: string;
}) {
  const shared = {
    x: "50%",
    textAnchor: "middle" as const,
    fill,
    fontWeight: 900,
    fontFamily: "var(--font-geist), system-ui, sans-serif",
  };

  return (
    <>
      <text {...shared} y={firstY} fontSize={firstSize} textLength="620" lengthAdjust="spacingAndGlyphs">
        ABHIRAM
      </text>
      <text {...shared} y={secondY} fontSize={secondSize} textLength="760" lengthAdjust="spacingAndGlyphs">
        KALATHUR
      </text>
    </>
  );
}

export function LoadingScreen() {
  const rootRef = useRef<HTMLDivElement>(null);
  const countRef = useRef<HTMLSpanElement>(null);
  const labelRef = useRef<HTMLParagraphElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    const waves = root?.querySelectorAll<SVGPathElement>("[data-wave]") ?? [];
    if (!root || waves.length === 0) return;

    if (prefersReducedMotion()) {
      markRevealed();
      root.style.display = "none";
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.scrollTo(0, 0);

    const motion = { x: 0, progress: 0 };
    const paint = () => {
      waves.forEach((wave) => {
        const start = Number(wave.dataset.waveStart);
        const travel = Number(wave.dataset.waveTravel);
        wave.setAttribute("transform", `translate(${motion.x} ${start - travel * motion.progress})`);
      });
      if (countRef.current) countRef.current.textContent = String(Math.floor(motion.progress));
    };
    paint();

    const waveSlide = gsap.to(motion, {
      x: -1000,
      duration: 2,
      ease: "none",
      repeat: -1,
      onUpdate: paint,
    });

    const timeline = gsap.timeline({
      onComplete: () => {
        waveSlide.kill();
        document.body.style.overflow = previousOverflow;
        root.style.display = "none";
      },
    });

    timeline.to(motion, {
      progress: 100,
      duration: 2.5,
      ease: "power2.out",
      onUpdate: paint,
    });
    timeline.to(labelRef.current, { autoAlpha: 0, duration: 0.1 }, "+=0.3");
    timeline.add(() => markRevealed());
    timeline.to(
      root,
      {
        scale: 60,
        duration: 1.2,
        ease: "power4.inOut",
        transformOrigin: "50% 50%",
      },
      "<",
    );
    timeline.to(
      root,
      {
        autoAlpha: 0,
        duration: 0.6,
        ease: "power1.inOut",
      },
      "<0.4",
    );

    return () => {
      timeline.kill();
      waveSlide.kill();
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  return (
    <div
      ref={rootRef}
      className="loader-screen pointer-events-none fixed inset-0 z-40 flex select-none items-center justify-center overflow-hidden bg-black"
      role="status"
      aria-live="polite"
      aria-label="Loading portfolio"
    >
      <div className="loader-frame relative mx-auto w-full min-w-0 max-w-5xl">
        <div className="relative w-full min-w-0 aspect-[1000/560] md:aspect-[5/1]">
          <svg
            className="loader-svg loader-stack"
            viewBox="0 0 1000 560"
            width="100%"
            height="100%"
            preserveAspectRatio="xMidYMid meet"
            overflow="hidden"
            aria-hidden="true"
          >
            <defs>
              <clipPath id="loader-liquid-clip-mobile">
                <path data-wave data-wave-start="500" data-wave-travel="5.2" d={WAVE} transform="translate(0 500)" />
              </clipPath>
              <linearGradient id="loader-liquid-grad-mobile" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#e7a83e" />
                <stop offset="100%" stopColor="#8cae96" />
              </linearGradient>
            </defs>
            <LoaderName
              fill="rgba(255,255,255,0.22)"
              firstY="200"
              secondY="400"
              firstSize="108"
              secondSize="72"
            />
            <g clipPath="url(#loader-liquid-clip-mobile)">
              <LoaderName
                fill="url(#loader-liquid-grad-mobile)"
                firstY="200"
                secondY="400"
                firstSize="108"
                secondSize="72"
              />
            </g>
          </svg>
          <svg
            className="loader-svg loader-wide"
            viewBox="0 0 1000 200"
            width="100%"
            height="100%"
            preserveAspectRatio="xMidYMid meet"
            overflow="hidden"
            aria-hidden="true"
          >
            <defs>
              <clipPath id="loader-liquid-clip">
                <path data-wave data-wave-start="110" data-wave-travel="1.6" d={WAVE} transform="translate(0 110)" />
              </clipPath>
              <linearGradient id="loader-liquid-grad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#e7a83e" />
                <stop offset="100%" stopColor="#8cae96" />
              </linearGradient>
            </defs>
            <text
              x="50%"
              y="50%"
              dy=".35em"
              textAnchor="middle"
              fill="rgba(255,255,255,0.05)"
              fontSize="72"
              fontWeight="900"
              textLength="940"
              lengthAdjust="spacing"
              fontFamily="var(--font-geist), system-ui, sans-serif"
            >
              ABHIRAM KALATHUR
            </text>
            <g clipPath="url(#loader-liquid-clip)">
              <text
                x="50%"
                y="50%"
                dy=".35em"
                textAnchor="middle"
                fill="url(#loader-liquid-grad)"
                fontSize="72"
                fontWeight="900"
                textLength="940"
                lengthAdjust="spacing"
                fontFamily="var(--font-geist), system-ui, sans-serif"
              >
                ABHIRAM KALATHUR
              </text>
            </g>
          </svg>
          <p
            ref={labelRef}
            className="absolute right-1 bottom-0 max-w-full font-mono text-[10px] font-medium tracking-wider text-white/60 sm:text-xs md:text-sm"
          >
            loading... <span ref={countRef} className="inline-block w-[3ch] text-right">0</span>%
          </p>
        </div>
      </div>
    </div>
  );
}
