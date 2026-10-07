"use client";

import { useState } from "react";
import { resume } from "@/data/resume";
import { GlowCard } from "@/components/GlowCard";
import { Icon3D } from "@/components/Icon3D";
import { SectionHeading } from "@/components/SectionHeading";
import { LuBriefcase, LuCode, LuHeadset, LuLandmark } from "react-icons/lu";

const roleIcons = [LuCode, LuLandmark, LuBriefcase, LuHeadset, LuBriefcase] as const;

export function Experience() {
  const [open, setOpen] = useState(0);
  const job = resume.experience[open] ?? resume.experience[0];
  const RoleIcon = roleIcons[open] ?? LuBriefcase;

  return (
    <section id="experience" className="relative py-20 md:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-12">
        <SectionHeading index="03" title="Experience" label="Professional Experience" />
        <div className="grid items-start gap-4 lg:grid-cols-12">
          <div className="grid gap-3 lg:col-span-4" role="tablist" aria-label="Roles">
            {resume.experience.map((item, index) => {
              const selected = open === index;
              return (
                <button
                  key={`${item.company}-${item.dates}`}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  data-cursor="button"
                  className="w-full text-left"
                  onClick={() => setOpen(index)}
                >
                  <GlowCard className={`p-4 sm:p-5 ${selected ? "ring-1 ring-accent" : ""}`}>
                    <span className="flex items-start gap-3">
                      <Icon3D icon={roleIcons[index] ?? LuBriefcase} className="icon-3d-sm" />
                      <span className="min-w-0">
                        <span className="font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-accent sm:tracking-[0.18em]">
                          {String(index + 1).padStart(2, "0")} / {item.dates}
                        </span>
                        <span className="mt-1 block font-bold">{item.role}</span>
                        <span className="mt-1 flex flex-wrap gap-x-1.5 text-sm text-muted">
                          <span>{item.company}</span>
                          <span className="text-white/20" aria-hidden="true">|</span>
                          <span>{item.location}</span>
                        </span>
                      </span>
                    </span>
                  </GlowCard>
                </button>
              );
            })}
          </div>
          <div className="lg:col-span-8 lg:sticky lg:top-24" role="tabpanel">
            <GlowCard key={job.dates} className="p-6 sm:p-8">
              <div className="panel-swap">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-accent">
                    {String(open + 1).padStart(2, "0")} / {job.dates}
                  </p>
                  <h3 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">{job.role}</h3>
                  <p className="mt-2 text-sm text-muted">
                    {job.company}
                    <span className="px-2 text-white/20">|</span>
                    {job.location}
                  </p>
                </div>
                <span className="hidden shrink-0 sm:block">
                  <Icon3D icon={RoleIcon} />
                </span>
              </div>
              <ul className="mt-6 space-y-3 border-t border-white/10 pt-6">
                {job.highlights.map((item) => (
                  <li key={item} className="point flex gap-3 text-sm leading-relaxed text-white/75">
                    <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              </div>
            </GlowCard>
          </div>
        </div>
      </div>
    </section>
  );
}
