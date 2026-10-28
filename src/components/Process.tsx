"use client";

import Image from "next/image";
import { useState, type CSSProperties } from "react";
import { HallPlan } from "@/components/HallPlan";
import { asset } from "@/lib/asset";

const STAGES = [
  {
    id: "book",
    name: "Запись",
    text: "Стрижку, маникюр, брови или уход можно записать на ближайшее окно: в конструкторе на сайте или по телефону. Администратор подтверждает время в рабочие часы.",
    color: "#4b2238",
    light: true,
    src: "/images/plate-lautrec.jpg",
    alt: "Литография Тулуз-Лотрека «La Coiffure», 1896: женщина расчёсывает волосы",
  },
  {
    id: "photo",
    name: "Фото",
    text: "Для окрашивания пришлите два снимка при дневном свете: волосы сейчас и желаемый результат. Так колорист видит базу, длину и историю окрашиваний до визита.",
    color: "#6a3a52",
    light: true,
    src: "/images/plate-photo.jpg",
    alt: "Рыжевато-светлые волосы крупным планом",
  },
  {
    id: "consult",
    name: "Консультация",
    text: "Колорист отвечает в тот же день: техника, оттенки из атласа, количество этапов, точная цена и время. Если нужно, встречаемся на десять минут в студии.",
    color: "#8d6478",
    light: true,
    src: "/images/plate-engraving.jpg",
    alt: "Раскрашенная гравюра XIX века: парикмахер укладывает волосы сидящей женщине",
  },
  {
    id: "studio",
    name: "В студии",
    text: "Диагностика, мытьё, работа мастера, уход после процедуры и укладка. Между этапами сложного окрашивания можно выпить кофе у окна.",
    color: "#b393a3",
    light: false,
    plan: true,
  },
  {
    id: "home",
    name: "Дома",
    text: "Мастер подбирает домашний уход из профессиональной линии и называет срок следующего визита: тонирование через четыре-шесть недель, коррекция ногтей через три-четыре.",
    color: "#d6c5cc",
    light: false,
    src: "/images/plate-vanity.jpg",
    alt: "Туалетный набор из целлулоида цвета слоновой кости: зеркало, щётка, расчёска",
  },
];

export function Process() {
  const [open, setOpen] = useState(0);
  const sliver = `${42 / (STAGES.length - 1)}%`;

  return (
    <section id="process" className="scroll-mt-20 py-24 sm:py-32 lg:py-40">
      <div className="wrap">
        <div className="grid-12 items-end gap-y-6">
          <h2 data-reveal className="t-l col-span-12 lg:col-span-5">
            Как проходит визит
          </h2>
          <p data-reveal className="t-m measure col-span-12 lg:col-span-5 lg:col-start-8">
            Пять этапов от записи до домашнего ухода. Сложное окрашивание начинается с фото: колорист заранее знает базу и считает
            точное время.
          </p>
        </div>

        <div data-reveal className="stage mt-14 lg:mt-20" role="group" aria-label="Этапы визита">
          {STAGES.map((stage, i) => {
            const isOpen = i === open;
            return (
              <div
                key={stage.id}
                className="stage-panel"
                style={{ "--basis": isOpen ? "58%" : sliver, background: stage.color, color: stage.light ? "var(--bg)" : "var(--ink)" } as CSSProperties}
              >
                {isOpen ? (
                  <div id={`stage-${stage.id}`} className="grid h-full grid-cols-1 gap-6 p-6 sm:p-8 lg:grid-cols-[1fr_minmax(0,42%)]">
                    <div className="flex flex-col justify-between gap-8">
                      <h3 className="t-l">{stage.name}</h3>
                      <p className="max-w-[36ch]">{stage.text}</p>
                    </div>
                    <figure className="relative aspect-[4/5] w-full max-h-full self-end lg:w-auto lg:h-full">
                      {"plan" in stage ? (
                        <HallPlan />
                      ) : (
                        <Image src={asset(stage.src)} alt={stage.alt} fill loading="eager" sizes="(min-width: 1024px) 340px, 90vw" className="object-cover" />
                      )}
                    </figure>
                  </div>
                ) : (
                  <button type="button" className="stage-sliver" aria-expanded={false} aria-controls={`stage-${stage.id}`} onClick={() => setOpen(i)}>
                    <span>{stage.name}</span>
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
