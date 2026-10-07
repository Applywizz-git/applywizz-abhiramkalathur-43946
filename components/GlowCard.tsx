"use client";

import type { PointerEvent, ReactNode } from "react";

type GlowCardProps = {
  children: ReactNode;
  className?: string;
  cursor?: "project" | "button" | "link" | "normal";
};

function canTilt() {
  return window.matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)").matches;
}

export function GlowCard({ children, className = "", cursor = "project" }: GlowCardProps) {
  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const card = event.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    card.style.setProperty("--glow-x", `${x}px`);
    card.style.setProperty("--glow-y", `${y}px`);
    if (!canTilt()) return;

    const px = x / rect.width - 0.5;
    const py = y / rect.height - 0.5;
    card.style.setProperty("--ry", `${px * 8}deg`);
    card.style.setProperty("--rx", `${py * -8}deg`);
    card.classList.add("is-tilting");
  };

  const reset = (event: PointerEvent<HTMLDivElement>) => {
    const card = event.currentTarget;
    card.classList.remove("is-tilting");
    card.style.setProperty("--rx", "0deg");
    card.style.setProperty("--ry", "0deg");
  };

  return (
    <div className="card-stage">
      <div
        className={`glow-card group ${className}`}
        data-cursor={cursor}
        onPointerMove={onPointerMove}
        onPointerLeave={reset}
        onPointerCancel={reset}
      >
        <span className="card-glare" aria-hidden="true" />
        <div className="relative z-[3] flex h-full flex-col">{children}</div>
      </div>
    </div>
  );
}
