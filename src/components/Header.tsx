"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useLenis } from "lenis/react";
import { SITE } from "@/lib/site";

export function Header() {
  const [open, setOpen] = useState(false);
  const lenis = useLenis();

  useEffect(() => {
    if (open) lenis?.stop();
    else lenis?.start();
  }, [open, lenis]);

  useEffect(() => {
    const onResize = () => window.innerWidth >= 1024 && setOpen(false);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <header className="sticky top-0 z-40 bg-bg">
      <div className="wrap flex h-18 w-full items-center justify-between gap-4">
        <Link href="/" className="font-display text-[1.75rem] font-medium leading-none tracking-tight text-ink" aria-label={`${SITE.name}, на главную`}>
          {SITE.name}
        </Link>

        <nav aria-label="Основная навигация" className="hidden items-center gap-7 lg:flex">
          {SITE.nav.map((link) => (
            <Link key={link.href} href={link.href} className="text-[1.0625rem] font-medium text-ink underline-offset-4 transition hover:underline">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Link
            href={SITE.cta.href}
            className="inline-flex min-h-11 items-center rounded-full bg-accent px-5 py-2.5 text-[1.0625rem] font-medium text-on-accent transition hover:bg-accent-strong active:scale-[0.97]"
          >
            {SITE.cta.label}
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Закрыть меню" : "Открыть меню"}
          className="grid h-11 w-11 place-items-center rounded-full bg-surface text-ink lg:hidden"
        >
          <span className="relative block h-3 w-5">
            <span className={`absolute left-0 block h-0.5 w-5 rounded bg-current transition duration-300 ${open ? "top-1.5 rotate-45" : "top-0"}`} />
            <span className={`absolute left-0 block h-0.5 w-5 rounded bg-current transition duration-300 ${open ? "top-1.5 -rotate-45" : "top-2.5"}`} />
          </span>
        </button>
      </div>

      <div
        id="mobile-menu"
        className={`fixed inset-x-0 top-18 z-40 h-[calc(100dvh-4.5rem)] bg-bg transition duration-300 lg:hidden ${open ? "visible opacity-100" : "invisible opacity-0"}`}
      >
        <nav aria-label="Мобильное меню" className="wrap flex h-full flex-col gap-1 overflow-y-auto py-6" data-lenis-prevent>
          {SITE.nav.map((link) => (
            <Link key={link.href} href={link.href} onClick={() => setOpen(false)} className="t-l rounded-2xl px-2 py-3 text-ink transition hover:bg-surface">
              {link.label}
            </Link>
          ))}
          <Link
            href={SITE.cta.href}
            onClick={() => setOpen(false)}
            className="mt-6 inline-flex min-h-12 items-center justify-center rounded-full bg-accent px-6 py-4 text-[1.0625rem] font-medium text-on-accent"
          >
            {SITE.cta.label}
          </Link>
        </nav>
      </div>
    </header>
  );
}
