"use client";

import { useMemo, useState, useSyncExternalStore } from "react";
import { useLenis } from "lenis/react";
import { Button } from "@/components/ui";
import { setBooking } from "@/lib/booking-store";
import { DEPARTMENTS, MASTERS, mastersFor, serviceById, type Master } from "@/lib/catalog";
import { dayNumber, formatDayShort, formatDuration, formatPrice, weekdayShort } from "@/lib/format";
import { dayKey, freeCount, nextDays, slotsFor } from "@/lib/slots";
import { SITE } from "@/lib/site";

function Monogram({ master, selected }: { master: Master; selected: boolean }) {
  return (
    <span
      aria-hidden="true"
      className="grid h-8 w-8 shrink-0 place-items-center rounded-full font-display text-[0.95rem] font-medium italic leading-none"
      style={{ background: selected ? "var(--bg)" : master.tone, color: selected ? "var(--ink)" : master.light ? "var(--bg)" : "var(--ink)" }}
    >
      {master.initials}
    </span>
  );
}

const CLIENT_NOW = typeof window === "undefined" ? null : new Date();
const subscribeNoop = () => () => {};

export function Booking() {
  const now = useSyncExternalStore(subscribeNoop, () => CLIENT_NOW, () => null);
  const [serviceId, setServiceId] = useState("cut-w");
  const [masterId, setMasterId] = useState("marina");
  const [dayIndex, setDayIndex] = useState<number | null>(null);
  const [time, setTime] = useState("");
  const lenis = useLenis();

  const service = serviceId ? serviceById(serviceId) : undefined;
  const masters = useMemo(() => (serviceId ? mastersFor(serviceId) : []), [serviceId]);
  const master = masterId ? MASTERS.find((m) => m.id === masterId) : undefined;
  const days = useMemo(() => (now ? nextDays(now, 7) : []), [now]);
  const firstFree = useMemo(() => {
    if (!now || !service || !master) return null;
    const i = days.findIndex((d) => d.getDay() !== master.dayOff && freeCount(d, service.minutes, master.id, now) > 0);
    return i === -1 ? null : i;
  }, [now, service, master, days]);
  const activeDay = dayIndex ?? firstFree;
  const day = activeDay !== null ? days[activeDay] : undefined;
  const slots = useMemo(
    () => (now && day && service && master ? slotsFor(day, service.minutes, master.id, now) : []),
    [now, day, service, master],
  );

  function chooseService(id: string) {
    setServiceId(id);
    setMasterId("");
    setDayIndex(null);
    setTime("");
  }

  function chooseMaster(id: string) {
    setMasterId(id);
    setDayIndex(null);
    setTime("");
  }

  function chooseDay(i: number) {
    setDayIndex(i);
    setTime("");
  }

  const complete = Boolean(service && master && day && time);

  function submit() {
    if (!service || !master || !day || !time) return;
    setBooking({ serviceId: service.id, masterId: master.id, dayKey: dayKey(day), dayLabel: formatDayShort(day), time });
    if (lenis) lenis.scrollTo("#contact", { offset: -72 });
    else document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  }

  const missing = !service ? "Выберите услугу" : !master ? "Выберите мастера" : !day ? "Выберите день" : !time ? "Выберите время" : "";

  return (
    <section id="booking" className="scroll-mt-20 py-24 sm:py-32 lg:py-40">
      <div className="wrap">
        <div className="grid-12 items-end gap-y-6">
          <h2 data-reveal className="t-l col-span-12 lg:col-span-5">
            Конструктор записи
          </h2>
          <p data-reveal className="t-m measure col-span-12 lg:col-span-5 lg:col-start-8">
            Услуга, мастер, день и время: итог считается сразу, а кнопка переносит выбор в форму записи. Окна показаны на семь дней
            вперёд.
          </p>
        </div>

        <div className="grid-12 mt-14 gap-y-12 lg:mt-20">
          <div className="col-span-12 grid gap-12 lg:col-span-7">
            <fieldset data-reveal>
              <legend className="t-m font-medium">Услуга</legend>
              <label className="field mt-4 lg:hidden">
                <span>Из прайса</span>
                <select value={serviceId} onChange={(e) => chooseService(e.target.value)} className="bg-surface">
                  <option value="">Выберите услугу</option>
                  {DEPARTMENTS.map((d) => (
                    <optgroup key={d.id} label={d.title}>
                      {d.services.map((s) => (
                        <option key={s.id} value={s.id}>
                          {s.name}
                        </option>
                      ))}
                    </optgroup>
                  ))}
                </select>
              </label>
              <div className="mt-4 hidden gap-5 lg:grid">
                {DEPARTMENTS.map((d) => (
                  <div key={d.id} className="grid grid-cols-[8.5rem_1fr] items-start gap-4">
                    <span className="t-m font-display font-medium italic leading-[2.75rem]">{d.title}</span>
                    <div className="flex flex-wrap gap-2">
                      {d.services.map((s) => (
                        <button key={s.id} type="button" className="chip" aria-pressed={serviceId === s.id} onClick={() => chooseService(s.id)}>
                          {s.name}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </fieldset>

            <fieldset data-reveal>
              <legend className="t-m font-medium">Мастер</legend>
              {service ? (
                <div className="mt-4 flex flex-wrap gap-2">
                  {masters.map((m) => (
                    <button key={m.id} type="button" className="chip" aria-pressed={masterId === m.id} onClick={() => chooseMaster(m.id)}>
                      <Monogram master={m} selected={masterId === m.id} />
                      <span>
                        {m.name.split(" ")[0]}
                        <span className="block text-[0.875rem] opacity-80">{m.role}</span>
                      </span>
                    </button>
                  ))}
                </div>
              ) : (
                <p className="mt-4 text-muted">Сначала выберите услугу: покажем только тех, кто её делает.</p>
              )}
            </fieldset>

            <fieldset data-reveal>
              <legend className="t-m font-medium">День</legend>
              {service && master && now ? (
                <div className="mt-4 flex flex-wrap gap-2">
                  {days.map((d, i) => {
                    const off = d.getDay() === master.dayOff;
                    const free = off ? 0 : freeCount(d, service.minutes, master.id, now);
                    const disabled = off || free === 0;
                    return (
                      <button
                        key={dayKey(d)}
                        type="button"
                        className="chip-day"
                        aria-pressed={activeDay === i}
                        disabled={disabled}
                        onClick={() => chooseDay(i)}
                        aria-label={`${formatDayShort(d)}${off ? ", выходной" : free === 0 ? ", окон нет" : `, свободных окон: ${free}`}`}
                      >
                        <span className="text-[0.875rem] opacity-80">{weekdayShort(d)}</span>
                        <span className="text-[1.0625rem] font-medium">{dayNumber(d)}</span>
                        <span className="text-[0.875rem] opacity-80">{off ? "выходной" : free === 0 ? "окон нет" : `окон: ${free}`}</span>
                      </button>
                    );
                  })}
                </div>
              ) : (
                <p className="mt-4 text-muted">После выбора мастера покажем семь ближайших дней с его выходными.</p>
              )}
            </fieldset>

            <fieldset data-reveal>
              <legend className="t-m font-medium">Время</legend>
              {day && service && master ? (
                <div className="mt-4 grid grid-cols-4 gap-2 sm:grid-cols-6 lg:grid-cols-8">
                  {slots.map((s) => (
                    <button
                      key={s.time}
                      type="button"
                      className="slot"
                      aria-pressed={time === s.time}
                      disabled={!s.free}
                      aria-label={s.free ? s.time : `${s.time}, занято`}
                      onClick={() => setTime(s.time)}
                    >
                      {s.time}
                    </button>
                  ))}
                </div>
              ) : (
                <p className="mt-4 text-muted">Окна по полчаса с {SITE.openHour}:00 до {SITE.closeHour}:00, длительность услуги учтена.</p>
              )}
            </fieldset>
          </div>

          <aside data-reveal className="col-span-12 self-start rounded-[1.5rem] bg-surface p-6 sm:p-8 lg:sticky lg:top-24 lg:col-span-4 lg:col-start-9" aria-live="polite">
            <h3 className="t-l">Итог</h3>
            <dl className="mt-6 grid gap-3">
              <div className="grid grid-cols-[7.5rem_1fr] gap-3">
                <dt className="text-muted">Услуга</dt>
                <dd className="font-medium">{service ? service.name : "не выбрана"}</dd>
              </div>
              <div className="grid grid-cols-[7.5rem_1fr] gap-3">
                <dt className="text-muted">Мастер</dt>
                <dd className="font-medium">{master ? `${master.name}, ${master.role.toLowerCase()}` : "не выбран"}</dd>
              </div>
              <div className="grid grid-cols-[7.5rem_1fr] gap-3">
                <dt className="text-muted">Когда</dt>
                <dd className="font-medium">{day ? `${formatDayShort(day)}${time ? `, ${time}` : ""}` : "не выбрано"}</dd>
              </div>
              <div className="grid grid-cols-[7.5rem_1fr] gap-3">
                <dt className="text-muted">Длительность</dt>
                <dd className="font-medium">{service ? formatDuration(service.minutes) : "зависит от услуги"}</dd>
              </div>
            </dl>
            <p className="summary-figure mt-8">{service ? formatPrice(service.price) : "от … ₽"}</p>
            <Button type="button" className="mt-6 w-full" disabled={!complete} onClick={submit}>
              Записаться
            </Button>
            <p className="mt-3 text-[0.875rem] text-muted">{complete ? "Перенесём выбор в форму ниже." : missing}</p>
          </aside>
        </div>
        <noscript>
          <p className="mt-8 max-w-[60ch]">
            Конструктор работает только с включённым JavaScript. Позвоните по номеру {SITE.phone}, администратор подберёт окно за минуту.
          </p>
        </noscript>
      </div>
    </section>
  );
}
