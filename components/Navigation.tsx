"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { navItems, resume } from "@/data/resume";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { LuDownload, LuLinkedin } from "react-icons/lu";

export function Navigation() {
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");
  const [commandOpen, setCommandOpen] = useState(false);
  const [query, setQuery] = useState("");
  const panelRef = useRef<HTMLDivElement>(null);
  const layersRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const wasOpen = useRef(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const sections = navItems
      .map((item) => document.getElementById(item.id))
      .filter((section): section is HTMLElement => Boolean(section));

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActive(visible.target.id);
      },
      { rootMargin: "-40% 0px -45% 0px", threshold: [0.15, 0.4] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setCommandOpen((value) => !value);
      }
      if (event.key === "Escape") {
        setOpen(false);
        setCommandOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    const onResize = () => {
      if (window.matchMedia("(min-width: 1280px)").matches) setOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    const panel = panelRef.current;
    const layers = layersRef.current;
    const list = listRef.current;
    if (!panel || !layers || !list) return;

    const layerNodes = Array.from(layers.children);
    const labels = list.querySelectorAll<HTMLElement>("[data-menu-label]");
    const reduced = prefersReducedMotion();

    if (!open && !wasOpen.current) {
      gsap.set(panel, { xPercent: 100, autoAlpha: 0, visibility: "hidden" });
      gsap.set(layerNodes, { xPercent: 100, visibility: "hidden" });
      return;
    }

    wasOpen.current = open;
    document.body.style.overflow = open ? "hidden" : "";

    if (reduced) {
      gsap.set(panel, {
        xPercent: open ? 0 : 100,
        autoAlpha: open ? 1 : 0,
        visibility: open ? "visible" : "hidden",
      });
      gsap.set(layerNodes, {
        xPercent: open ? 0 : 100,
        visibility: open ? "visible" : "hidden",
      });
      gsap.set(labels, { yPercent: 0 });
      if (open) closeRef.current?.focus();
      return () => {
        document.body.style.overflow = "";
      };
    }

    const timeline = gsap.timeline({ defaults: { ease: "power4.inOut" } });
    if (open) {
      timeline.set([panel, ...layerNodes], { visibility: "visible" });
      timeline.set(panel, { autoAlpha: 1 });
      timeline.fromTo(layerNodes, { xPercent: 100 }, { xPercent: 0, stagger: 0.06, duration: 0.55 });
      timeline.fromTo(panel, { xPercent: 100 }, { xPercent: 0, duration: 0.6 }, "-=0.4");
      timeline.fromTo(labels, { yPercent: 120 }, { yPercent: 0, stagger: 0.045, duration: 0.5 }, "-=0.35");
      closeRef.current?.focus();
    } else {
      timeline.to(labels, { yPercent: 120, stagger: 0.02, duration: 0.25 });
      timeline.to(panel, { xPercent: 100, duration: 0.4 }, "-=0.1");
      timeline.to(layerNodes, { xPercent: 100, stagger: 0.04, duration: 0.35 }, "-=0.3");
      timeline.set(panel, { autoAlpha: 0, visibility: "hidden" });
      timeline.set(layerNodes, { visibility: "hidden" });
    }

    return () => {
      timeline.kill();
      gsap.set(labels, { clearProps: "transform" });
      document.body.style.overflow = "";
    };
  }, [open]);

  const close = () => setOpen(false);
  const filtered = navItems.filter((item) => item.label.toLowerCase().includes(query.toLowerCase()));
  const initials = `${resume.personal.firstName[0]}${resume.personal.lastName[0]}`;

  const chrome = (
    <>
      <header className="site-header">
        <div className="border-b border-white/10 bg-[#171b19] px-3 py-2.5 pt-[max(0.6rem,env(safe-area-inset-top))] pl-[max(0.75rem,env(safe-area-inset-left))] pr-[max(0.75rem,env(safe-area-inset-right))] xl:border-b-0 xl:bg-transparent xl:px-4 xl:pt-4">
          <nav
            aria-label="Primary"
            className="mx-auto flex max-w-6xl items-center justify-between gap-2 xl:grid xl:grid-cols-[auto_1fr_auto] xl:gap-4 xl:rounded-xl xl:border xl:border-white/10 xl:bg-[#171b19]/95 xl:px-3 xl:py-2 xl:shadow-[0_12px_40px_rgba(0,0,0,0.35)] xl:backdrop-blur-2xl"
          >
            <a
              href="#home"
              className="flex shrink-0 items-center gap-2 pr-1"
              aria-label={`${resume.personal.fullName}, home`}
              data-cursor="link"
            >
              <span className="grid h-11 w-11 place-items-center rounded-lg bg-[#e7a83e] text-xs font-bold text-[#17130c] xl:h-9 xl:w-9">
                {initials}
              </span>
              <span className="hidden font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-white/80 xl:inline">
                {resume.personal.firstName}
              </span>
            </a>

            <div className="hidden min-w-0 flex-nowrap items-center justify-center gap-0.5 xl:flex">
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className="nav-link"
                  data-active={active === item.id}
                  data-cursor="link"
                >
                  {item.label}
                </a>
              ))}
            </div>

            <div className="flex min-w-0 items-center gap-1.5 xl:gap-2">
              <a
                className="grid h-11 w-11 shrink-0 place-items-center rounded-lg border border-white/15 text-white transition-colors hover:border-accent hover:text-accent xl:h-9 xl:w-9"
                href={resume.personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                data-cursor="link"
              >
                <LuLinkedin aria-hidden="true" className="h-4 w-4" />
              </a>
              <a
                className="btn btn-primary btn-sm h-11 w-11 shrink-0 px-0 xl:h-auto xl:w-auto xl:px-3"
                href="/resume.pdf"
                download="Abhiram-Kalathur-Resume.pdf"
                aria-label="Download resume"
                data-cursor="button"
              >
                <LuDownload aria-hidden="true" />
                <span className="hidden sm:inline">Resume</span>
              </a>
              <button
                ref={closeRef}
                type="button"
                className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-lg border border-accent/35 bg-accent/10 px-3 text-xs font-bold uppercase tracking-wide text-white xl:hidden"
                aria-expanded={open}
                aria-controls="mobile-menu"
                onClick={() => setOpen((value) => !value)}
                data-cursor="button"
              >
                <span className="flex w-4 flex-col gap-1" aria-hidden="true">
                  <span className={`block h-0.5 w-4 bg-white transition-transform ${open ? "translate-y-1.5 rotate-45" : ""}`} />
                  <span className={`block h-0.5 w-4 bg-white transition-opacity ${open ? "opacity-0" : ""}`} />
                  <span className={`block h-0.5 w-4 bg-white transition-transform ${open ? "-translate-y-1.5 -rotate-45" : ""}`} />
                </span>
                {open ? "Close" : "Menu"}
              </button>
            </div>
          </nav>
        </div>
      </header>

      <div className={`fixed inset-0 z-[9998] overflow-hidden xl:hidden ${open ? "" : "pointer-events-none"}`} aria-hidden={!open}>
        <button
          type="button"
          className={`absolute inset-0 bg-black/50 transition-opacity ${open ? "opacity-100" : "opacity-0"}`}
          aria-label="Close menu"
          onClick={close}
        />
        <div ref={layersRef} className="pointer-events-none invisible absolute inset-y-0 right-0 w-full sm:w-[420px]">
          <div className="absolute inset-0 bg-[#171b19]" />
          <div className="absolute inset-0 bg-accent" />
          <div className="absolute inset-0 bg-secondary" />
        </div>
        <div
          id="mobile-menu"
          ref={panelRef}
          className="invisible absolute inset-y-0 right-0 flex w-full max-w-full flex-col overflow-x-hidden overflow-y-auto border-l border-white/10 bg-[#111514] px-5 pb-[max(2rem,env(safe-area-inset-bottom))] pt-24 sm:w-[420px] sm:px-8"
        >
          <p className="font-mono text-xs uppercase tracking-[0.28em] text-accent">Navigate</p>
          <ul ref={listRef} className="mt-6 flex flex-col gap-2">
            {navItems.map((item, index) => (
              <li key={item.id} className="overflow-hidden">
                <a href={`#${item.id}`} className="menu-link" data-menu-label onClick={close} data-cursor="link">
                  <span className="mr-3 font-mono text-xs tracking-widest text-accent">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            className="mt-8 inline-flex items-center gap-2 font-mono text-sm text-white/80"
            href={resume.personal.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="link"
          >
            <LuLinkedin aria-hidden="true" className="h-4 w-4" />
            LinkedIn
          </a>
        </div>
      </div>

      {commandOpen ? (
        <div className="fixed inset-0 z-[10000] grid place-items-start bg-black/60 px-4 pt-[18vh]" role="presentation" onClick={() => setCommandOpen(false)}>
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Jump to section"
            className="w-full max-w-lg rounded-xl border border-white/10 bg-[#1b201e] p-4 shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <input
              autoFocus
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Jump to a section"
              className="w-full bg-transparent px-2 py-3 font-mono text-sm outline-none placeholder:text-white/25"
              aria-label="Filter sections"
            />
            <ul className="mt-2 border-t border-white/10">
              {filtered.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className="block px-2 py-3 font-mono text-sm text-muted transition-colors hover:text-white"
                    onClick={() => setCommandOpen(false)}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : null}
    </>
  );

  if (!mounted) return null;
  return createPortal(chrome, document.body);
}
