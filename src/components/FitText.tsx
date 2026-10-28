"use client";

import { useEffect, useRef, type ReactNode } from "react";

export function FitText({ children, className = "" }: { children: ReactNode; className?: string }) {
  const boxRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const box = boxRef.current;
    const text = textRef.current;
    if (!box || !text) return;
    const fit = () => {
      text.style.fontSize = "100px";
      const natural = text.scrollWidth || 1;
      text.style.fontSize = `${Math.floor(((100 * box.clientWidth) / natural) * 0.995)}px`;
    };
    fit();
    document.fonts.ready.then(fit);
    document.fonts.addEventListener("loadingdone", fit);
    const ro = new ResizeObserver(fit);
    ro.observe(box);
    return () => {
      ro.disconnect();
      document.fonts.removeEventListener("loadingdone", fit);
    };
  }, []);

  return (
    <div ref={boxRef} className={className}>
      <span ref={textRef} className="footer-name block">
        {children}
      </span>
    </div>
  );
}
