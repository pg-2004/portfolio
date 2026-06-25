"use client";

import { experience } from "@/lib/content";

export default function ExperiencePanel() {
  return (
    <div className="space-y-1">
      {experience.map((job, idx) => (
        <div key={job.company} className="grid grid-cols-[44px_1fr] gap-4 sm:gap-5">
          {/* rail */}
          <div className="relative flex flex-col items-center">
            <span className="z-[1] grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-[var(--hair)] bg-white/70 font-mono text-[13px] font-semibold tracking-tight text-[var(--text)] shadow-[0_10px_24px_-16px_rgba(17,17,17,0.6)]">
              {job.initials}
            </span>
            {idx < experience.length - 1 && (
              <span
                className="mt-2 w-px flex-1"
                style={{ background: "linear-gradient(to bottom, var(--hair), transparent)" }}
              />
            )}
          </div>

          {/* content */}
          <div className="pb-7">
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <h3 className="text-[19px] font-semibold tracking-tight text-[var(--text)]">
                {job.role}
              </h3>
              <span className="font-mono text-[12.5px] tracking-wide text-[var(--muted)]">
                {job.period}
              </span>
            </div>
            <div className="mt-1 text-[14.5px] text-[#3a3a3d]">
              {job.company} <span className="text-[var(--muted)]">· {job.location}</span>
            </div>

            <ul className="mt-3 space-y-2">
              {job.highlights.map((h, i) => (
                <li
                  key={i}
                  className="relative pl-4 text-[14.5px] leading-relaxed text-[#2b2b2e]"
                >
                  <span className="absolute left-0 top-[9px] h-1 w-1 rounded-full bg-[var(--text)] opacity-50" />
                  {h}
                </li>
              ))}
            </ul>

            <div className="mt-3.5 flex flex-wrap gap-2">
              {job.tech.map((t) => (
                <span key={t} className="pill">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
