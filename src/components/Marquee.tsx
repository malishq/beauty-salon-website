"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

export function Marquee({ items, label }: { items: string[]; label: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = ref.current;
      const track = root?.querySelector<HTMLElement>(".marquee-track");
      if (!root || !track) return;
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tween = gsap.to(track, { xPercent: -50, duration: 46, ease: "none", repeat: -1 });
        const pause = () => tween.pause();
        const play = () => tween.play();
        root.addEventListener("mouseenter", pause);
        root.addEventListener("mouseleave", play);
        root.addEventListener("focusin", pause);
        root.addEventListener("focusout", play);
        return () => {
          root.removeEventListener("mouseenter", pause);
          root.removeEventListener("mouseleave", play);
          root.removeEventListener("focusin", pause);
          root.removeEventListener("focusout", play);
        };
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className="marquee" role="marquee" aria-label={label}>
      <div className="marquee-track">
        {[0, 1].map((copy) => (
          <div key={copy} className="inline-flex" aria-hidden={copy === 1 ? true : undefined}>
            {items.map((item) => (
              <span key={item} className="marquee-item">
                <span>{item}</span>
                <span className="marquee-dot" aria-hidden="true" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
