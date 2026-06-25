"use client";

import { Award, Download, ExternalLink, GraduationCap } from "lucide-react";
import { certifications, education, siteConfig } from "@/lib/content";

export default function ResumePanel() {
  return (
    <div className="grid gap-7 md:grid-cols-[1fr_300px]">
      {/* preview + actions */}
      <div className="order-2 md:order-1">
        <div className="relative overflow-hidden rounded-xl border border-[var(--hair)] bg-white shadow-[0_30px_60px_-40px_rgba(17,17,17,0.6)]">
          <object
            data={`${siteConfig.resumeUrl}#view=FitH&toolbar=0`}
            type="application/pdf"
            className="h-[430px] w-full"
            aria-label="Résumé preview"
          >
            <div className="grid h-[430px] place-items-center p-6 text-center text-[14px] text-[var(--muted)]">
              Preview isn&apos;t supported here — use “Open PDF”.
            </div>
          </object>
        </div>
        <div className="mt-4 flex flex-wrap gap-2.5">
          <a className="btn" href={siteConfig.resumeUrl} download={siteConfig.resumeFileName}>
            <Download size={16} /> Download Résumé
          </a>
          <a className="btn btn--ghost" href={siteConfig.resumeUrl} target="_blank" rel="noreferrer">
            <ExternalLink size={16} /> Open PDF
          </a>
        </div>
      </div>

      {/* highlights */}
      <div className="order-1 space-y-6 md:order-2">
        <div>
          <span className="eyebrow mb-3 flex items-center gap-2">
            <GraduationCap size={14} /> Education
          </span>
          <div className="space-y-3">
            {education.map((e) => (
              <div key={e.school} className="card p-3.5">
                <div className="text-[14.5px] font-medium text-[var(--text)]">{e.school}</div>
                <div className="mt-0.5 text-[13px] text-[#3a3a3d]">{e.detail}</div>
                <div className="mt-1 font-mono text-[11.5px] tracking-wide text-[var(--muted)]">
                  {e.period}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <span className="eyebrow mb-3 flex items-center gap-2">
            <Award size={14} /> Certifications
          </span>
          <ul className="space-y-2">
            {certifications.map((c) => (
              <li key={c} className="flex gap-2.5 text-[13px] leading-snug text-[#2b2b2e]">
                <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-[var(--text)] opacity-50" />
                {c}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
