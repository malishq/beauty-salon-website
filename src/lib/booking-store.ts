import { useSyncExternalStore } from "react";

export type BookingChoice = {
  serviceId: string;
  masterId: string;
  dayKey: string;
  dayLabel: string;
  time: string;
};

let current: BookingChoice | null = null;
const listeners = new Set<() => void>();

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function setBooking(choice: BookingChoice | null) {
  current = choice;
  listeners.forEach((l) => l());
}

export function useBooking() {
  return useSyncExternalStore(
    subscribe,
    () => current,
    () => null,
  );
}
