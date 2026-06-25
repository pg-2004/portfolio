import type { SVGProps } from "react";

/**
 * Brand glyphs. Modern lucide-react no longer ships brand icons, so the three
 * social marks are hand-rolled here. They inherit colour (`currentColor`) and
 * size (`1em`) so they drop in beside lucide icons without fuss.
 */

const base: SVGProps<SVGSVGElement> = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em",
  fill: "currentColor",
  "aria-hidden": true,
  focusable: false,
};

export function GithubIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M12 .5C5.73.5.5 5.74.5 12.02c0 5.1 3.29 9.43 7.86 10.96.58.1.79-.25.79-.56 0-.28-.01-1.18-.02-2.13-3.2.7-3.88-1.36-3.88-1.36-.52-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.2 1.77 1.2 1.03 1.77 2.71 1.26 3.37.96.1-.75.4-1.26.73-1.55-2.56-.29-5.26-1.29-5.26-5.72 0-1.27.45-2.3 1.19-3.11-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.19a11 11 0 0 1 5.8 0c2.2-1.5 3.17-1.19 3.17-1.19.63 1.59.23 2.76.12 3.05.74.81 1.19 1.84 1.19 3.11 0 4.44-2.71 5.42-5.28 5.71.42.36.79 1.07.79 2.16 0 1.56-.02 2.81-.02 3.19 0 .31.21.67.8.56A11.53 11.53 0 0 0 23.5 12.02C23.5 5.74 18.27.5 12 .5Z" />
    </svg>
  );
}

export function LinkedinIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.86-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29ZM5.34 7.43a2.07 2.07 0 1 1 0-4.13 2.07 2.07 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.8 0 0 .78 0 1.73v20.54C0 23.22.8 24 1.77 24h20.45C23.2 24 24 23.22 24 22.27V1.73C24 .78 23.2 0 22.22 0Z" />
    </svg>
  );
}

export function LeetcodeIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M13.48 2.27a1.3 1.3 0 0 1 1.86 0 1.36 1.36 0 0 1 0 1.9l-4.6 4.7a2 2 0 0 0 0 2.78l4.6 4.7a1.36 1.36 0 0 1 0 1.9 1.3 1.3 0 0 1-1.86 0l-4.6-4.7a4.7 4.7 0 0 1 0-6.58l4.6-4.7Z" />
      <path d="M9.1 12.02a1.32 1.32 0 0 1 1.32-1.33h9.26a1.33 1.33 0 0 1 0 2.66h-9.26A1.32 1.32 0 0 1 9.1 12.02Z" />
      <path d="M16.36 18.95a1.3 1.3 0 0 1 1.86 0l2.4 2.45a1.36 1.36 0 0 1 0 1.9 1.3 1.3 0 0 1-1.86 0l-2.4-2.45a1.36 1.36 0 0 1 0-1.9Z" opacity="0" />
    </svg>
  );
}
