import { SITE } from "@/lib/site";

export const STEP_MINUTES = 30;

export type Slot = { minutes: number; time: string; free: boolean };

export function dayKey(d: Date) {
  return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
}

export function startOfDay(d: Date) {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
}

export function nextDays(from: Date, count = 7) {
  const first = startOfDay(from);
  return Array.from({ length: count }, (_, i) => {
    const d = new Date(first);
    d.setDate(first.getDate() + i);
    return d;
  });
}

function hash(input: string) {
  let h = 2166136261;
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function busyRanges(masterId: string, key: string) {
  const seed = hash(`${masterId}|${key}`);
  const count = 3 + (seed % 4);
  const open = SITE.openHour * 60;
  const close = SITE.closeHour * 60;
  const ranges: [number, number][] = [];
  for (let i = 0; i < count; i++) {
    const h = hash(`${masterId}|${key}|${i}`);
    const start = open + (h % 22) * STEP_MINUTES;
    const length = STEP_MINUTES * (1 + ((h >>> 8) % 4));
    ranges.push([start, Math.min(close, start + length)]);
  }
  return ranges;
}

export function slotsFor(day: Date, serviceMinutes: number, masterId: string, now: Date): Slot[] {
  const key = dayKey(day);
  const open = SITE.openHour * 60;
  const close = SITE.closeHour * 60;
  const busy = busyRanges(masterId, key);
  const sameDay = dayKey(now) === key;
  const earliest = sameDay ? now.getHours() * 60 + now.getMinutes() + 60 : 0;
  const list: Slot[] = [];
  for (let t = open; t + serviceMinutes <= close; t += STEP_MINUTES) {
    const overlaps = busy.some(([a, b]) => t < b && t + serviceMinutes > a);
    const past = t < earliest;
    const hh = String(Math.floor(t / 60)).padStart(2, "0");
    const mm = String(t % 60).padStart(2, "0");
    list.push({ minutes: t, time: `${hh}:${mm}`, free: !overlaps && !past });
  }
  return list;
}

export function freeCount(day: Date, serviceMinutes: number, masterId: string, now: Date) {
  return slotsFor(day, serviceMinutes, masterId, now).filter((s) => s.free).length;
}
