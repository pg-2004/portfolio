"use client";

import { useState } from "react";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import { siteConfig } from "@/lib/content";
import { GithubIcon, LeetcodeIcon, LinkedinIcon } from "../icons";

export default function ContactPanel() {
  const [name, setName] = useState("");
  const [from, setFrom] = useState("");
  const [message, setMessage] = useState("");

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio enquiry — ${name || "Hello"}`);
    const body = encodeURIComponent(
      `${message}\n\n— ${name}${from ? ` (${from})` : ""}`,
    );
    window.location.href = `mailto:${siteConfig.email}?subject=${subject}&body=${body}`;
  };

  return (
    <div className="grid gap-8 md:grid-cols-[1fr_300px]">
      {/* left: big type + direct channels */}
      <div>
        <p className="text-[clamp(24px,3.4vw,34px)] font-semibold leading-[1.12] tracking-tight text-[var(--text)]">
          Let&apos;s build something
          <br />
          worth exhibiting.
        </p>
        <p className="mt-3 max-w-[42ch] text-[15px] leading-relaxed text-[var(--muted)]">
          Open to internships, freelance and collaborations. The fastest way to reach me is email —
          or pick a channel below.
        </p>

        <div className="mt-6 flex flex-col gap-2.5">
          <a className="social-link" href={`mailto:${siteConfig.email}`}>
            <Mail size={18} /> {siteConfig.email}
          </a>
          <a className="social-link" href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}>
            <Phone size={18} /> {siteConfig.phone}
          </a>
          <div className="social-link" style={{ cursor: "default" }}>
            <MapPin size={18} /> {siteConfig.location}
          </div>
        </div>

        <div className="mt-4 flex gap-2.5">
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

      {/* right: message form (composes a mailto) */}
      <form onSubmit={onSubmit} className="card flex flex-col gap-3 p-4">
        <span className="eyebrow">Send a message</span>
        <input
          className="field"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          className="field"
          type="email"
          placeholder="Your email"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
        />
        <textarea
          className="field min-h-[110px] resize-none"
          placeholder="Your message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />
        <button type="submit" className="btn justify-center">
          <Send size={16} /> Send via email
        </button>
        <p className="text-center text-[11.5px] text-[var(--muted)]">
          Opens your mail app, pre-filled.
        </p>
      </form>
    </div>
  );
}
