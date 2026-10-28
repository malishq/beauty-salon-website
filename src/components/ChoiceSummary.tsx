"use client";

import { useBooking } from "@/lib/booking-store";
import { masterById, serviceById } from "@/lib/catalog";
import { formatDuration, formatPrice } from "@/lib/format";

export function ChoiceSummary() {
  const booking = useBooking();
  const service = booking ? serviceById(booking.serviceId) : undefined;
  const master = booking ? masterById(booking.masterId) : undefined;

  return (
    <div className="mt-10 rounded-[1.5rem] bg-surface p-6" aria-live="polite">
      {booking && service && master ? (
        <>
          <p className="text-muted">Из конструктора</p>
          <p className="summary-figure mt-2">
            {service.name}, {formatPrice(service.price)}
          </p>
          <p className="mt-3">
            {master.name}, {master.role.toLowerCase()}. {booking.dayLabel}, {booking.time}, {formatDuration(service.minutes)}. Всё уже
            в форме, осталось имя и телефон.
          </p>
        </>
      ) : (
        <>
          <p className="text-muted">Из конструктора</p>
          <p className="mt-2">
            Пока ничего не выбрано. Соберите запись в конструкторе выше или укажите услугу прямо в форме.
          </p>
        </>
      )}
    </div>
  );
}
