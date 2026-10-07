"use client";

import { useLayoutEffect, useRef } from "react";
import { resume } from "@/data/resume";
import { LuArrowUpRight, LuDownload, LuLinkedin } from "react-icons/lu";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { onReveal } from "@/lib/intro";
import { GlowCard } from "@/components/GlowCard";
import { HeroName } from "@/components/HeroName";

export function Hero() {
  const rootRef = useRef<HTMLElement>(null);
  const phraseRef = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const lines = root.querySelectorAll<HTMLElement>("[data-reveal]");
    const reduced = prefersReducedMotion();

    const play = () => {
      if (reduced) {
        gsap.set(lines, { yPercent: 0, autoAlpha: 1 });
        return;
      }
      gsap.set(lines, { yPercent: 110 });
      gsap.to(lines, {
        yPercent: 0,
        duration: 1.05,
        ease: "power4.out",
        stagger: 0.08,
      });
    };

    const unsubscribe = onReveal(play);
    return () => {
      unsubscribe();
    };
  }, []);

  useLayoutEffect(() => {
    const node = phraseRef.current;
    if (!node || prefersReducedMotion()) return;
    const phrases = resume.personal.heroPhrases;
    let index = 0;
    let timer = 0;
    let started = false;

    const swap = () => {
      const next = phrases[(index + 1) % phrases.length];
      const timeline = gsap.timeline({
        onComplete: () => {
          index = (index + 1) % phrases.length;
        },
      });
      timeline.to(node, { yPercent: -110, autoAlpha: 0, duration: 0.45, ease: "power3.in" });
      timeline.add(() => {
        node.textContent = next;
      });
      timeline.fromTo(node, { yPercent: 110, autoAlpha: 0 }, { yPercent: 0, autoAlpha: 1, duration: 0.55, ease: "power3.out" });
    };

    const stop = onReveal(() => {
      if (started) return;
      started = true;
      timer = window.setInterval(swap, 2400);
    });
    return () => {
      stop();
      window.clearInterval(timer);
    };
  }, []);

  const { personal } = resume;

  return (
    <section id="home" ref={rootRef} className="relative flex min-h-[100dvh] items-center overflow-x-clip pb-16 pt-28">
        <div className="mx-auto grid w-full max-w-6xl items-center gap-10 px-4 sm:px-6 md:grid-cols-[minmax(0,1.15fr)_minmax(240px,0.85fr)] lg:px-12">
        <div className="min-w-0 [container-type:inline-size]">
          <p className="mb-4 text-sm uppercase tracking-[0.28em]">
            <span className="shiny-text">{personal.role}</span>
          </p>
          <div className="overflow-hidden">
            <div data-reveal className="relative">
              <h1 className="hero-name text-foreground">
                {personal.firstName}
                <br />
                {personal.lastName}
              </h1>
              <HeroName />
            </div>
          </div>
          <div className="mt-5 overflow-hidden">
            <p data-reveal className="hero-line text-muted/80">
              {personal.heroLead}
            </p>
          </div>
          <div className="relative mt-1 overflow-hidden">
            <p className="hero-line invisible" aria-hidden="true">
              {personal.heroPhrases.reduce((longest, phrase) => (phrase.length > longest.length ? phrase : longest))}
            </p>
            <p className="hero-line absolute inset-x-0 top-0">
              <span ref={phraseRef} data-reveal className="gradient-text inline-block">
                {personal.heroPhrases[0]}
              </span>
            </p>
          </div>
          <div className="mt-8 max-w-xl overflow-hidden">
            <p data-reveal className="text-sm leading-relaxed text-white/80 md:text-base">
              {personal.heroSummary}
            </p>
          </div>
          <div data-reveal className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <a className="btn btn-primary w-full sm:w-auto" href="#experience" data-cursor="button">
              Explore Experience
            </a>
            <a
              className="btn btn-ghost w-full sm:w-auto"
              href="/resume.pdf"
              download="Abhiram-Kalathur-Resume.pdf"
              data-cursor="button"
            >
              <LuDownload aria-hidden="true" />
              Download Resume
            </a>
            <a className="btn btn-ghost w-full sm:w-auto" href="#contact" data-cursor="button">
              {personal.availability}
              <LuArrowUpRight aria-hidden="true" />
            </a>
            <a className="text-center font-mono text-sm text-muted transition-colors hover:text-white sm:text-left" href={personal.phoneHref} data-cursor="link">
              {personal.phone}
            </a>
            <a
              className="inline-flex items-center justify-center gap-2 font-mono text-sm text-muted transition-colors hover:text-white"
              href={personal.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="link"
            >
              <LuLinkedin aria-hidden="true" className="h-4 w-4" />
              LinkedIn
            </a>
          </div>
        </div>

        <GlowCard className="overflow-hidden" cursor="project">
          <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
            <span className="h-2.5 w-2.5 rounded-full bg-[#e7a83e]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#8cae96]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#d7d5ca]" />
            <span className="flex-1 text-center font-mono text-xs text-muted/70">abhiram@portfolio:~</span>
          </div>
          <div className="space-y-3 px-5 py-5 font-mono text-sm leading-relaxed">
            <p>
              <span className="text-accent">$</span> whoami
            </p>
            <p className="pl-4 text-muted">{personal.fullName}</p>
            <p>
              <span className="text-accent">$</span> cat role.md
            </p>
            <p className="pl-4 text-muted">{personal.role}</p>
            <p>
              <span className="text-accent">$</span> ls ./status
            </p>
            <p className="pl-4 text-muted">wichita_ks.location</p>
            <p className="pl-4 text-muted">{personal.phone}</p>
            <p>
              <span className="text-accent">$</span> <span className="inline-block h-4 w-2 translate-y-0.5 animate-pulse bg-white/80" />
            </p>
          </div>
        </GlowCard>
      </div>
    </section>
  );
}
