"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let registered = false;

export function registerGsap() {
  if (registered || typeof window === "undefined") return gsap;
  gsap.registerPlugin(ScrollTrigger);
  registered = true;
  return gsap;
}

export function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function playScrollReveal(
  targets: gsap.TweenTarget,
  trigger: Element,
  from: gsap.TweenVars,
  to: gsap.TweenVars,
) {
  registerGsap();
  const tween = gsap.fromTo(targets, from, {
    ...to,
    scrollTrigger: {
      trigger,
      start: "top 88%",
      once: true,
    },
  });

  return () => {
    tween.scrollTrigger?.kill();
    tween.kill();
    gsap.set(targets, { clearProps: "opacity,visibility,transform,clipPath" });
  };
}

export { gsap, ScrollTrigger };
