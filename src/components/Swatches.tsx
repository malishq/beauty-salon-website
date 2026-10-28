import type { CSSProperties } from "react";
import { SHADES, type Shade } from "@/lib/catalog";

export function Strand({ shade, className = "", title }: { shade: Shade; className?: string; title?: string }) {
  return (
    <svg className={`strand ${className}`} viewBox="0 0 60 220" aria-hidden={title ? undefined : true} role={title ? "img" : undefined} focusable="false">
      {title && <title>{title}</title>}
      <path d="M30 6C45 6 52 22 50 48L46 152C45 192 37 216 30 216C23 216 15 192 14 152L10 48C8 22 15 6 30 6Z" fill={shade.hex} />
      <path d="M24 34C21 80 22 140 27 196" stroke={shade.sheen} strokeWidth="5" strokeLinecap="round" fill="none" opacity="0.7" />
      <path d="M37 42C39 92 38 150 34 198" stroke={shade.sheen} strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.45" />
      <circle cx="30" cy="20" r="5" fill="var(--bg)" />
    </svg>
  );
}

export function ShadeFan({
  ids,
  spread = 57,
  className = "",
  strandWidth = "clamp(44px, 5.6vw, 84px)",
  animated = false,
}: {
  ids?: string[];
  spread?: number;
  className?: string;
  strandWidth?: string;
  animated?: boolean;
}) {
  const list = ids ? ids.map((id) => SHADES.find((s) => s.id === id)).filter((s): s is Shade => Boolean(s)) : SHADES;
  const step = list.length > 1 ? (spread * 2) / (list.length - 1) : 0;
  return (
    <div className={`fan ${animated ? "" : "fan-static"} ${className}`} style={{ "--strand-w": strandWidth } as CSSProperties} data-fan={animated ? "" : undefined}>
      {list.map((shade, i) => {
        const angle = -spread + step * i;
        return (
          <div key={shade.id} className="fan-strand" data-angle={angle} style={{ "--a": `${angle}deg`, zIndex: i } as CSSProperties}>
            <Strand shade={shade} title={shade.name} />
          </div>
        );
      })}
    </div>
  );
}
