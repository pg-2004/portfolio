"use client";

import { Award, GraduationCap, MapPin } from "lucide-react";
import { about, siteConfig } from "@/lib/content";
import { GithubIcon, LeetcodeIcon, LinkedinIcon } from "../icons";

const FACT_ICONS = {
  map: MapPin,
  cap: GraduationCap,
  award: Award,
  leetcode: LeetcodeIcon,
} as const;

export default function AboutPanel() {
  return (
    <div className="grid gap-8 md:grid-cols-[190px_1fr]">
      {/* portrait + socials */}
      <div className="flex flex-row items-center gap-5 md:flex-col md:items-stretch">
        <div
          className="relative aspect-square w-[120px] shrink-0 overflow-hidden rounded-2xl md:w-full"
          style={{
            background: "linear-gradient(145deg,#fafaf8 0%,#ececE7 55%,#deded7 100%)",
            border: "1px solid var(--hair)",
            boxShadow:
              "inset 0 1px 0 rgba(255,255,255,0.85), 0 24px 50px -30px rgba(17,17,17,0.6)",
          }}
        >
          {siteConfig.photo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={siteConfig.photo}
              alt={siteConfig.name}
              className="h-full w-full object-cover"
            />
          ) : (
            <span className="absolute inset-0 grid place-items-center text-[46px] font-semibold tracking-tight text-[var(--text)]">
              {siteConfig.monogram}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-3">
          <span className="eyebrow">Connect</span>
          <div className="flex gap-2.5">
            <a className="social-link" style={{ padding: 12 }} href={siteConfig.socials.github} target="_blank" rel="noreferrer" aria-label="GitHub">
              <GithubIcon />
            </a>
            <a className="social-link" style={{ padding: 12 }} href={siteConfig.socials.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
              <LinkedinIcon />
            </a>
            <a className="social-link" style={{ padding: 12 }} href={siteConfig.socials.leetcode} target="_blank" rel="noreferrer" aria-label="LeetCode">
              <LeetcodeIcon />
            </a>
          </div>
        </div>
      </div>

      {/* bio */}
      <div>
        <span className="eyebrow mb-3 inline-block">The maker</span>
        <div className="space-y-4">
          {about.intro.map((p, i) => (
            <p key={i} className="text-[17px] leading-relaxed text-[#2b2b2e]">
              {p}
            </p>
          ))}
        </div>

        <div className="mt-7 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
          {about.funFacts.map((f) => {
            const Icon = FACT_ICONS[f.icon as keyof typeof FACT_ICONS];
            return (
              <div
                key={f.text}
                className="flex items-center gap-3 rounded-xl border border-[var(--hair)] bg-white/50 px-3.5 py-3"
              >
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-[rgba(17,17,17,0.05)] [&>svg]:h-[17px] [&>svg]:w-[17px]">
                  <Icon />
                </span>
                <span className="text-[13.5px] text-[#2b2b2e]">{f.text}</span>
              </div>
            );
          })}
        </div>

        <div className="mt-8">
          <span className="eyebrow mb-4 inline-block">Journey</span>
          <ul className="tl">
            {about.timeline.map((t) => (
              <li key={t.year} className="tl__item">
                <span className="tl__dot" />
                <div className="flex flex-wrap items-baseline gap-x-3">
                  <span className="font-mono text-[12px] tracking-wider text-[var(--muted)]">
                    {t.year}
                  </span>
                  <span className="text-[15px] font-medium text-[var(--text)]">{t.title}</span>
                </div>
                <div className="mt-0.5 text-[13.5px] text-[var(--muted)]">{t.place}</div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
