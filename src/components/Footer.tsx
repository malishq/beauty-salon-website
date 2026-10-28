import Link from "next/link";
import { FitText } from "@/components/FitText";
import { SITE } from "@/lib/site";

const CREDITS = [
  { text: "Nekoneko774, CC BY-SA 4.0", href: "https://commons.wikimedia.org/wiki/File:Southeast_Asian_straight_hair_close-up.jpg" },
  { text: "Ciell, CC BY-SA 4.0", href: "https://commons.wikimedia.org/wiki/File:Vlecht,_close-up.jpg" },
  { text: "Titus Tscharntke, public domain", href: "https://commons.wikimedia.org/wiki/File:Blonde_hair_detailed.jpg" },
  { text: "Daniel Christensen, CC BY 3.0", href: "https://commons.wikimedia.org/wiki/File:Blonde_hair.jpg" },
  { text: "Тулуз-Лотрек, Art Institute of Chicago, CC0", href: "https://www.artic.edu/artworks/36009" },
  { text: "Wellcome Collection, CC BY 4.0", href: "https://commons.wikimedia.org/wiki/File:A_man_dresses_a_woman%27s_hair._Coloured_engraving._Wellcome_V0019647EL.jpg" },
  { text: "DPLA, public domain", href: "https://commons.wikimedia.org/wiki/File:Pyralin_mirror,_hairbrush,_comb,_nail_buffer,_button_hook,_and_trinket_box_-_DPLA_-_aa580b893733758262457737ac140c69.jpg" },
  { text: "Auckland Museum, CC BY 2.0", href: "https://commons.wikimedia.org/wiki/File:Set,_manicure_(51360554084).jpg" },
];

export function Footer() {
  return (
    <footer className="bg-ink text-bg">
      <div className="wrap grid min-h-[70svh] grid-rows-[auto_1fr_auto] gap-y-16 py-10 lg:min-h-[100svh]">
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 text-[1.0625rem] leading-relaxed lg:grid-cols-4">
          <div>
            <p className="font-medium">{SITE.street}</p>
            <p className="opacity-80">{SITE.city}</p>
            <a href={SITE.phoneHref} className="opacity-80 transition hover:opacity-100">
              {SITE.phone}
            </a>
          </div>
          <nav aria-label="Разделы" className="flex flex-col">
            {SITE.nav.map((link) => (
              <Link key={link.href} href={link.href} className="opacity-80 transition first:font-medium first:opacity-100 hover:opacity-100">
                {link.label}
              </Link>
            ))}
          </nav>
          <div>
            <p className="font-medium">Ежедневно</p>
            <p className="opacity-80">10:00–22:00</p>
            <p className="opacity-80">Запись онлайн и по телефону</p>
          </div>
          <div>
            <p className="font-medium">Фотографии</p>
            <p className="text-[0.875rem] opacity-80">
              {CREDITS.map((c, i) => (
                <span key={c.href}>
                  <a href={c.href} className="transition hover:opacity-100 hover:underline" rel="noreferrer">
                    {c.text}
                  </a>
                  {i < CREDITS.length - 1 ? "; " : "."}
                </span>
              ))}
            </p>
          </div>
        </div>
        <div aria-hidden="true" />
        <div>
          <FitText>{SITE.name}</FitText>
          <p className="mt-5 text-[0.875rem] opacity-80">
            © {new Date().getFullYear()} Студия красоты «{SITE.name}», {SITE.address}
          </p>
        </div>
      </div>
    </footer>
  );
}
