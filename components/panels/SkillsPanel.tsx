"use client";

import { skillGroups } from "@/lib/content";

export default function SkillsPanel() {
  return (
    <div className="space-y-7">
      {skillGroups.map((g) => (
        <div key={g.label}>
          <div className="mb-3 flex items-center gap-3">
            <span className="eyebrow">{g.label}</span>
            <span className="h-px flex-1 bg-[var(--hair)]" />
            <span className="font-mono text-[11px] text-[var(--muted)]">
              {String(g.items.length).padStart(2, "0")}
            </span>
          </div>
          <div className="flex flex-wrap gap-2.5">
            {g.items.map((s) => (
              <span key={s} className="chip">
                {s}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
