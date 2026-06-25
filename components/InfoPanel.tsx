"use client";

import type { ComponentType } from "react";
import { AnimatePresence, motion, type Transition } from "framer-motion";
import { X } from "lucide-react";
import type { SectionId } from "@/lib/content";
import AboutPanel from "./panels/AboutPanel";
import ExperiencePanel from "./panels/ExperiencePanel";
import ProjectsPanel from "./panels/ProjectsPanel";
import SkillsPanel from "./panels/SkillsPanel";
import ResumePanel from "./panels/ResumePanel";
import ContactPanel from "./panels/ContactPanel";

const REGISTRY: Record<
  SectionId,
  { eyebrow: string; title: string; Body: ComponentType }
> = {
  about: { eyebrow: "Exhibit 01", title: "About", Body: AboutPanel },
  experience: { eyebrow: "Exhibit 02", title: "Experience", Body: ExperiencePanel },
  projects: { eyebrow: "Exhibit 03", title: "Projects", Body: ProjectsPanel },
  skills: { eyebrow: "Exhibit 04", title: "Skills", Body: SkillsPanel },
  resume: { eyebrow: "Exhibit 05", title: "Résumé", Body: ResumePanel },
  contact: { eyebrow: "Exhibit 06", title: "Contact", Body: ContactPanel },
};

const panelT: Transition = { type: "spring", stiffness: 180, damping: 26, mass: 0.9 };

export default function InfoPanel({
  active,
  onClose,
}: {
  active: SectionId | null;
  onClose: () => void;
}) {
  const entry = active ? REGISTRY[active] : null;

  return (
    <AnimatePresence>
      {active && entry && (
        <motion.div
          key="scrim"
          className="scrim"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              className="panel"
              role="dialog"
              aria-modal="true"
              aria-label={entry.title}
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, y: 26, scale: 0.965, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: 16, scale: 0.98, filter: "blur(6px)" }}
              transition={panelT}
            >
              <div className="panel__head">
                <div>
                  <div className="panel__eyebrow">{entry.eyebrow}</div>
                  <h2 className="panel__title">{entry.title}</h2>
                </div>
                <button
                  type="button"
                  className="panel__close"
                  onClick={onClose}
                  aria-label="Close panel"
                >
                  <X size={19} strokeWidth={1.75} />
                </button>
              </div>

              <div className="panel__body">
                <entry.Body />
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
