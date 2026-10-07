"use client";

import { useEffect } from "react";

const ZONES = new Set(["normal", "link", "button", "project"]);

export function CustomCursor() {
  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const root = document.documentElement;
    if (!fine) {
      root.dataset.cursor = "normal";
      return;
    }

    let frame = 0;
    let x = 0;
    let y = 0;
    let zone = "normal";

    const paint = () => {
      frame = 0;
      root.style.setProperty("--pointer-x", `${x}px`);
      root.style.setProperty("--pointer-y", `${y}px`);
      if (root.dataset.cursor !== zone) root.dataset.cursor = zone;
    };

    const onMove = (event: PointerEvent) => {
      x = event.clientX;
      y = event.clientY;
      const target = event.target instanceof Element ? event.target : null;
      const next = target?.closest("[data-cursor]")?.getAttribute("data-cursor") ?? "normal";
      zone = ZONES.has(next) ? next : "normal";
      if (!frame) frame = requestAnimationFrame(paint);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(frame);
      delete root.dataset.cursor;
    };
  }, []);

  return null;
}
