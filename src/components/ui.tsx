import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

const base =
  "inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 py-3 text-[1.0625rem] font-medium transition duration-200 ease-out disabled:cursor-not-allowed disabled:opacity-60 active:scale-[0.97]";

const variants = {
  primary: "bg-accent text-on-accent hover:bg-accent-strong",
  ghost: "bg-surface text-ink hover:bg-surface-2",
  inverse: "bg-bg text-ink hover:bg-surface",
};

type Variant = keyof typeof variants;

export function ButtonLink({ variant = "primary", className = "", ...props }: ComponentProps<typeof Link> & { variant?: Variant }) {
  return <Link {...props} className={`${base} ${variants[variant]} ${className}`} />;
}

export function Button({ variant = "primary", className = "", ...props }: ComponentProps<"button"> & { variant?: Variant }) {
  return <button {...props} className={`${base} ${variants[variant]} ${className}`} />;
}

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`wrap w-full ${className}`}>{children}</div>;
}

export function Section({ id, children, className = "" }: { id?: string; children: ReactNode; className?: string }) {
  return (
    <section id={id} className={`scroll-mt-20 py-24 sm:py-32 lg:py-40 ${className}`}>
      <Container>{children}</Container>
    </section>
  );
}
