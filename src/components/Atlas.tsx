import Image from "next/image";
import { ShadeFan } from "@/components/Swatches";
import { asset } from "@/lib/asset";
import { SHADE_FAMILIES } from "@/lib/catalog";

const BASES = [
  {
    src: "/images/base-light.jpg",
    alt: "Светлые волосы крупным планом",
    title: "Светлая база",
    text: "Тонирование или окрашивание в один тон, полтора-два часа. Балаяж без осветления.",
  },
  {
    src: "/images/base-mid.jpg",
    alt: "Каштановые волосы, заплетённые в косу, крупным планом",
    title: "Средняя база",
    text: "Балаяж и airtouch с осветлением на два-три тона, три-четыре часа в кресле.",
  },
  {
    src: "/images/base-dark.jpg",
    alt: "Тёмные прямые волосы крупным планом",
    title: "Тёмная база",
    text: "Осветление в несколько визитов с уходом между ними, затем тонирование в выбранный оттенок.",
  },
];

export function Atlas() {
  return (
    <section id="shades" className="scroll-mt-20 bg-surface py-24 sm:py-32 lg:py-40">
      <div className="wrap">
        <div className="grid-12 gap-y-12">
          <div className="col-span-12 lg:col-span-5">
            <h2 data-reveal className="t-l">
              Атлас оттенков
            </h2>
            <p data-reveal className="t-m measure mt-6">
              Двадцать оттенков в пяти семьях, от платины до чёрного кофе. Колорист подбирает оттенок по исходной базе и истории
              окрашиваний, поэтому сложное окрашивание начинается с фото.
            </p>
            <dl data-reveal-group className="mt-10 grid gap-4">
              {SHADE_FAMILIES.map((family) => (
                <div key={family.id} className="grid grid-cols-[8.5rem_1fr] items-baseline gap-4">
                  <dt className="t-m font-display font-medium italic">{family.title}</dt>
                  <dd>{family.shades.map((s) => s.name).join(", ")}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div data-reveal className="col-span-12 flex items-end justify-center lg:col-span-7 lg:justify-end">
            <ShadeFan className="relative h-[clamp(200px,27vw,400px)] w-full max-w-[820px]" strandWidth="clamp(48px, 7vw, 104px)" />
          </div>
        </div>

        <div className="grid-12 mt-24 gap-y-8 lg:mt-32">
          <h3 data-reveal className="t-l col-span-12 lg:col-span-5">
            Три исходные базы
          </h3>
          <p data-reveal className="t-m measure col-span-12 lg:col-span-5 lg:col-start-8">
            Цена и время окрашивания зависят от базы, длины и того, чем волосы красили раньше. Точную сумму колорист называет после
            консультации по фото.
          </p>
          <div data-reveal-group className="col-span-12 grid gap-6 sm:grid-cols-3">
            {BASES.map((b) => (
              <figure key={b.src}>
                <Image src={asset(b.src)} alt={b.alt} width={1000} height={1250} loading="lazy" className="aspect-[4/5] h-auto w-full object-cover" />
                <figcaption className="mt-4">
                  <span className="t-m block font-medium">{b.title}</span>
                  <span className="mt-1 block max-w-[34ch]">{b.text}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
