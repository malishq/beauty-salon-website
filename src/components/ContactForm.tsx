"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { Button } from "@/components/ui";
import { useBooking, type BookingChoice } from "@/lib/booking-store";
import { DEPARTMENTS, MASTERS, masterById, mastersFor, serviceById } from "@/lib/catalog";
import { formatDuration, formatPrice } from "@/lib/format";

type Status = "idle" | "sending" | "sent" | "error";

const ENDPOINT = process.env.NEXT_PUBLIC_FORM_ENDPOINT;

type Sent = { name: string; service: string; master: string; when: string };

export function ContactForm() {
  const booking = useBooking();
  const key = booking ? `${booking.serviceId}-${booking.masterId}-${booking.dayKey}-${booking.time}` : "empty";
  return <BookingForm key={key} booking={booking} />;
}

function BookingForm({ booking }: { booking: BookingChoice | null }) {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [serviceId, setServiceId] = useState(booking?.serviceId ?? "");
  const [masterId, setMasterId] = useState(booking?.masterId ?? "");
  const [when, setWhen] = useState(booking ? `${booking.dayLabel}, ${booking.time}` : "");
  const [sent, setSent] = useState<Sent | null>(null);
  const nameRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!booking) return;
    const t = window.setTimeout(() => nameRef.current?.focus({ preventScroll: true }), 900);
    return () => window.clearTimeout(t);
  }, [booking]);

  const service = serviceId ? serviceById(serviceId) : undefined;
  const masters = serviceId ? mastersFor(serviceId) : MASTERS;

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries()) as Record<string, string>;
    const next: Record<string, string> = {};
    if (!data.name?.trim()) next.name = "Как к вам обращаться?";
    if (!/^\+?[\d\s()-]{10,18}$/.test(data.phone ?? "")) next.phone = "Введите номер телефона";
    setErrors(next);
    if (Object.keys(next).length) return;

    setStatus("sending");
    try {
      if (ENDPOINT) {
        const res = await fetch(ENDPOINT, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
        if (!res.ok) throw new Error(String(res.status));
      } else {
        await new Promise((r) => setTimeout(r, 700));
      }
      setSent({
        name: data.name.trim(),
        service: serviceById(data.service)?.name ?? "услуга не выбрана",
        master: masterById(data.master)?.name ?? "любой свободный мастер",
        when: data.when?.trim() || "время уточним по телефону",
      });
      setStatus("sent");
      form.reset();
      setServiceId("");
      setMasterId("");
      setWhen("");
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent" && sent) {
    return (
      <div className="rounded-[1.5rem] bg-surface p-6 sm:p-8" role="status">
        <p className="t-l">Заявка отправлена</p>
        <p className="mt-3">
          {sent.name}, записали: {sent.service}, {sent.master}, {sent.when}. Администратор перезвонит и подтвердит время.
        </p>
        <Button type="button" variant="inverse" className="mt-6" onClick={() => setStatus("idle")}>
          Отправить ещё одну
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="rounded-[1.5rem] bg-surface p-6 sm:p-8">
      <p className="t-l">Заявка на запись</p>
      <div className="mt-6 grid gap-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="field">
            <span>Имя</span>
            <input ref={nameRef} name="name" autoComplete="name" aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? "err-name" : undefined} />
            {errors.name && (
              <span id="err-name" className="text-[0.875rem] text-accent">
                {errors.name}
              </span>
            )}
          </label>
          <label className="field">
            <span>Телефон</span>
            <input name="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="+7" aria-invalid={Boolean(errors.phone)} aria-describedby={errors.phone ? "err-phone" : undefined} />
            {errors.phone && (
              <span id="err-phone" className="text-[0.875rem] text-accent">
                {errors.phone}
              </span>
            )}
          </label>
        </div>
        <label className="field">
          <span>Услуга</span>
          <select name="service" value={serviceId} onChange={(e) => { setServiceId(e.target.value); setMasterId(""); }}>
            <option value="">Подберите на месте</option>
            {DEPARTMENTS.map((d) => (
              <optgroup key={d.id} label={d.title}>
                {d.services.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name}, {formatDuration(s.minutes)}, {formatPrice(s.price)}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
        </label>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="field">
            <span>Мастер</span>
            <select name="master" value={masterId} onChange={(e) => setMasterId(e.target.value)}>
              <option value="">Любой свободный</option>
              {masters.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.name}, {m.role.toLowerCase()}
                </option>
              ))}
            </select>
          </label>
          <label className="field">
            <span>Дата и время</span>
            <input name="when" value={when} onChange={(e) => setWhen(e.target.value)} placeholder="например, пт после 18:00" />
          </label>
        </div>
        <label className="field">
          <span>Комментарий</span>
          <textarea name="comment" rows={3} placeholder={service ? `Что важно знать мастеру о ${service.name.toLowerCase()}` : "Длина, желаемый результат, аллергии"} />
        </label>
      </div>
      {status === "error" && (
        <p className="mt-4 text-[0.875rem] text-accent" role="alert">
          Не удалось отправить. Позвоните нам или попробуйте ещё раз.
        </p>
      )}
      <Button type="submit" className="mt-6 w-full sm:w-auto" disabled={status === "sending"}>
        {status === "sending" ? "Отправляем…" : "Записаться"}
      </Button>
      <p className="mt-3 text-[0.875rem] text-muted">Нажимая кнопку, вы соглашаетесь на обработку персональных данных.</p>
    </form>
  );
}
