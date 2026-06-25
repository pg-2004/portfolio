"use client";

import { ArrowUpRight } from "lucide-react";
import { projects } from "@/lib/content";
import { GithubIcon } from "../icons";

export default function ProjectsPanel() {
  return (
    <div className="space-y-6">
      {projects.map((p) => (
        <article
          key={p.title}
          className="overflow-hidden rounded-2xl border border-[var(--hair)] bg-white/45"
        >
          <div className="grid md:grid-cols-[260px_1fr]">
            {/* placeholder artwork (kept neutral — swap in a screenshot anytime) */}
            <div
              className="relative min-h-[160px] overflow-hidden md:min-h-full"
              style={{ background: p.art }}
            >
              <span
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "repeating-linear-gradient(90deg, rgba(17,17,17,0.035) 0 1px, transparent 1px 28px)",
                }}
              />
              <span className="absolute left-5 top-4 font-mono text-[10.5px] tracking-[0.24em] text-[rgba(17,17,17,0.42)]">
                PREVIEW
              </span>
              <span className="absolute -bottom-2 right-4 text-[72px] font-semibold leading-none tracking-tight text-[rgba(17,17,17,0.1)]">
                {p.mark}
              </span>
            </div>

            {/* details */}
            <div className="p-5 sm:p-6">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h3 className="text-[19px] font-semibold tracking-tight text-[var(--text)]">
                  {p.title}
                </h3>
                <span className="font-mono text-[12px] tracking-wide text-[var(--muted)]">
                  {p.period}
                </span>
              </div>
              <div className="mt-1 text-[14px] text-[#5a5a5e]">{p.tagline}</div>
              <p className="mt-3 text-[14.5px] leading-relaxed text-[#2b2b2e]">{p.description}</p>

              <div className="mt-4 flex flex-wrap gap-2">
                {p.tech.map((t) => (
                  <span key={t} className="pill">
                    {t}
                  </span>
                ))}
              </div>

              <div className="mt-5 flex flex-wrap gap-2.5">
                {p.github && (
                  <a className="btn btn--ghost" href={p.github} target="_blank" rel="noreferrer">
                    <GithubIcon /> GitHub
                  </a>
                )}
                {p.demo && (
                  <a className="btn" href={p.demo} target="_blank" rel="noreferrer">
                    Live Demo <ArrowUpRight size={16} />
                  </a>
                )}
              </div>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
