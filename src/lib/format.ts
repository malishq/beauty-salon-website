const NBSP = " ";

export function formatPrice(value: number, from = true) {
  const digits = String(value);
  const grouped = digits.replace(/\B(?=(\d{3})+(?!\d))/g, NBSP);
  return `${from ? `от${NBSP}` : ""}${grouped}${NBSP}₽`;
}

export function formatDuration(minutes: number) {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (h === 0) return `${m}${NBSP}мин`;
  if (m === 0) return `${h}${NBSP}ч`;
  return `${h}${NBSP}ч${NBSP}${m}${NBSP}мин`;
}

const WEEKDAYS_SHORT = ["вс", "пн", "вт", "ср", "чт", "пт", "сб"];
const WEEKDAYS_LONG = ["воскресенье", "понедельник", "вторник", "среда", "четверг", "пятница", "суббота"];
const MONTHS_SHORT = ["янв", "фев", "мар", "апр", "мая", "июн", "июл", "авг", "сен", "окт", "ноя", "дек"];
const MONTHS_LONG = ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"];

export function formatDayShort(d: Date) {
  return `${WEEKDAYS_SHORT[d.getDay()]}, ${d.getDate()}${NBSP}${MONTHS_SHORT[d.getMonth()]}`;
}

export function formatDayLong(d: Date) {
  return `${WEEKDAYS_LONG[d.getDay()]}, ${d.getDate()}${NBSP}${MONTHS_LONG[d.getMonth()]}`;
}

export function weekdayShort(d: Date) {
  return WEEKDAYS_SHORT[d.getDay()];
}

export function dayNumber(d: Date) {
  return `${d.getDate()}${NBSP}${MONTHS_SHORT[d.getMonth()]}`;
}
