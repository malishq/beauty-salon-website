"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import Link from "next/link";
import { Marquee } from "@/components/Marquee";
import { ShadeFan } from "@/components/Swatches";
import { ButtonLink } from "@/components/ui";
import { asset } from "@/lib/asset";
import { SITE } from "@/lib/site";

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

const FAN = ["platinum", "wheat", "honey", "caramel", "copper", "chestnut", "garnet", "espresso", "plum"];
const LINE = ["Стрижки", "Укладки", "Окрашивание", "Балаяж", "Airtouch", "Уход для волос", "Маникюр", "Педикюр", "Брови", "Ресницы", "Уход за лицом"];

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const h1 = nameRef.current;
      const box = boxRef.current;
      const section = ref.current;
      if (!h1 || !box || !section) return;

      const fit = () => {
        h1.style.fontSize = "100px";
        const natural = h1.scrollWidth || 1;
        h1.style.fontSize = `${Math.floor(((100 * box.clientWidth) / natural) * 0.995)}px`;
      };

      fit();
      document.fonts.ready.then(fit);
      document.fonts.addEventListener("loadingdone", fit);
      const ro = new ResizeObserver(() => fit());
      ro.observe(box);
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      const split = SplitText.create(h1, {
        type: "chars",
        mask: "chars",
        autoSplit: true,
        onSplit: (self) => {
          gsap.set(h1, { visibility: "visible" });
          if (reduce) return;
          return gsap.from(self.chars, { yPercent: 108, duration: 0.9, ease: "expo.out", stagger: 0.04 });
        },
      });

      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from("[data-hero-fade]", { y: 22, autoAlpha: 0, duration: 0.9, ease: "power3.out", stagger: 0.1, delay: 0.4 });
        gsap.utils.toArray<HTMLElement>(".fan-strand").forEach((el, i) => {
          const base = Number(el.dataset.angle);
          gsap.to(el, {
            rotation: base + gsap.utils.random(-3, 3),
            y: gsap.utils.random(-10, 6),
            duration: gsap.utils.random(6, 11),
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
            delay: -i * 0.7,
          });
        });
        const scroll = { trigger: section, start: "top top", end: "bottom top", scrub: true };
        gsap.to("[data-fan]", { yPercent: -26, ease: "none", scrollTrigger: scroll });
        gsap.to("[data-photo]", { yPercent: -8, ease: "none", scrollTrigger: scroll });
        gsap.to("[data-name-wrap]", { yPercent: 10, ease: "none", scrollTrigger: scroll });
      });
      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(h1, { visibility: "visible" });
      });

      return () => {
        ro.disconnect();
        document.fonts.removeEventListener("loadingdone", fit);
        split.revert();
        mm.revert();
      };
    },
    { scope: ref },
  );

  return (
    <section ref={ref} className="relative isolate flex flex-col overflow-hidden pb-2 lg:min-h-[calc(100svh-4.5rem)]">
      <div className="wrap grid-12 gap-y-10 pt-6 sm:pt-8 lg:pt-6">
        <div className="col-span-12 flex flex-col justify-start lg:col-span-5">
          <p data-hero-fade className="t-m max-w-[34ch]">
            Студия красоты на Примерной, 7: парикмахерский зал, ногтевой сервис, брови и ресницы, уход за лицом. Восемь мастеров,
            ежедневно с 10 до 22.
          </p>
          <div data-hero-fade className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
            <ButtonLink href={SITE.cta.href}>{SITE.cta.label}</ButtonLink>
            <Link href="#services" className="font-medium underline-offset-4 transition hover:underline">
              Смотреть прайс
            </Link>
          </div>
        </div>
        <div className="col-span-12 lg:col-span-6 lg:col-start-7">
          <div className="relative aspect-[12/5] w-full">
            <Image
              data-photo
              src={asset("/images/hair-satin.jpg")}
              alt="Тёмные прямые волосы крупным планом, блестящие как атлас"
              width={1800}
              height={1354}
              priority
              sizes="(min-width: 1024px) 48vw, 100vw"
              className="h-full w-full object-cover object-[50%_60%]"
            />
            <ShadeFan ids={FAN} spread={46} animated className="absolute inset-x-0 bottom-0 h-[60%]" strandWidth="clamp(38px, 4.6vw, 66px)" />
          </div>
        </div>
      </div>

      <div data-hero-fade className="mt-auto pt-6 lg:pt-6">
        <Marquee items={LINE} label="Услуги студии" />
      </div>

      <div data-name-wrap className="wrap mt-3 lg:mt-4">
        <div ref={boxRef} className="w-full">
          <h1 ref={nameRef} className="hero-name">
            Атлас
          </h1>
        </div>
      </div>
    </section>
  );
}
