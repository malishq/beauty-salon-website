export type Service = {
  id: string;
  name: string;
  note: string;
  minutes: number;
  price: number;
};

export type Department = {
  id: string;
  title: string;
  services: Service[];
};

export const DEPARTMENTS: Department[] = [
  {
    id: "cuts",
    title: "Стрижки",
    services: [
      { id: "cut-w", name: "Женская стрижка", note: "мытьё и укладка входят", minutes: 60, price: 2500 },
      { id: "cut-m", name: "Мужская стрижка", note: "с укладкой", minutes: 45, price: 1800 },
      { id: "cut-kid", name: "Детская стрижка", note: "до 10 лет", minutes: 30, price: 1200 },
      { id: "bangs", name: "Чёлка", note: "коррекция или новая", minutes: 15, price: 600 },
    ],
  },
  {
    id: "styling",
    title: "Укладки",
    services: [
      { id: "style-day", name: "Повседневная укладка", note: "брашинг или утюжок", minutes: 45, price: 1500 },
      { id: "style-eve", name: "Вечерняя укладка", note: "локоны, объём, сбор", minutes: 75, price: 2800 },
    ],
  },
  {
    id: "color",
    title: "Окрашивание",
    services: [
      { id: "color-roots", name: "Окрашивание корней", note: "до 2 см отросших", minutes: 90, price: 3000 },
      { id: "color-one", name: "Окрашивание в один тон", note: "вся длина", minutes: 120, price: 4500 },
      { id: "toning", name: "Тонирование", note: "освежить оттенок, убрать желтизну", minutes: 90, price: 3500 },
      { id: "balayage", name: "Балаяж", note: "после консультации по фото", minutes: 210, price: 9000 },
      { id: "airtouch", name: "Airtouch", note: "после консультации по фото", minutes: 270, price: 11000 },
    ],
  },
  {
    id: "care",
    title: "Уход для волос",
    services: [
      { id: "care-restore", name: "Восстанавливающий уход", note: "маска, ампулы, массаж", minutes: 60, price: 2500 },
      { id: "care-botox", name: "Ботокс для волос", note: "гладкость на 2–3 месяца", minutes: 90, price: 4500 },
    ],
  },
  {
    id: "manicure",
    title: "Маникюр",
    services: [
      { id: "mani-classic", name: "Классический маникюр", note: "обрезной", minutes: 60, price: 1500 },
      { id: "mani-hw", name: "Аппаратный маникюр", note: "без режущих инструментов", minutes: 60, price: 1800 },
      { id: "mani-gel", name: "Покрытие гель-лак", note: "к маникюру", minutes: 45, price: 1500 },
      { id: "mani-remove", name: "Снятие покрытия", note: "гель-лак или гель", minutes: 15, price: 400 },
    ],
  },
  {
    id: "pedicure",
    title: "Педикюр",
    services: [
      { id: "pedi-classic", name: "Классический педикюр", note: "обрезной", minutes: 75, price: 2500 },
      { id: "pedi-hw", name: "Аппаратный педикюр", note: "без режущих инструментов", minutes: 75, price: 2800 },
      { id: "pedi-gel", name: "Покрытие гель-лак", note: "к педикюру", minutes: 45, price: 1500 },
    ],
  },
  {
    id: "brows",
    title: "Брови",
    services: [
      { id: "brow-shape", name: "Коррекция бровей", note: "пинцет или воск", minutes: 30, price: 800 },
      { id: "brow-tint", name: "Окрашивание бровей", note: "краска или хна", minutes: 30, price: 900 },
      { id: "brow-lam", name: "Ламинирование бровей", note: "с окрашиванием", minutes: 60, price: 2500 },
    ],
  },
  {
    id: "lashes",
    title: "Ресницы",
    services: [
      { id: "lash-lam", name: "Ламинирование ресниц", note: "с окрашиванием", minutes: 75, price: 2800 },
      { id: "lash-ext", name: "Наращивание ресниц", note: "классика или 2D", minutes: 150, price: 3500 },
      { id: "lash-remove", name: "Снятие ресниц", note: "наращённых", minutes: 20, price: 500 },
    ],
  },
  {
    id: "face",
    title: "Уход за лицом",
    services: [
      { id: "face-clean", name: "Чистка лица", note: "комбинированная", minutes: 90, price: 3500 },
      { id: "face-massage", name: "Массаж лица", note: "классический", minutes: 60, price: 2500 },
      { id: "face-care", name: "Уход по типу кожи", note: "увлажнение или питание", minutes: 60, price: 3000 },
    ],
  },
];

export const SERVICES: Service[] = DEPARTMENTS.flatMap((d) => d.services);

export function serviceById(id: string) {
  return SERVICES.find((s) => s.id === id);
}

export function departmentOf(serviceId: string) {
  return DEPARTMENTS.find((d) => d.services.some((s) => s.id === serviceId));
}

export type Master = {
  id: string;
  name: string;
  role: string;
  initials: string;
  tone: string;
  light: boolean;
  dayOff: number;
  about: string;
  services: string[];
};

const HAIR = ["cut-w", "cut-m", "cut-kid", "bangs", "style-day", "style-eve"];
const COLOR = ["color-roots", "color-one", "toning", "balayage", "airtouch"];
const CARE = ["care-restore", "care-botox"];
const NAILS = ["mani-classic", "mani-hw", "mani-gel", "mani-remove", "pedi-classic", "pedi-hw", "pedi-gel"];
const BROWS = ["brow-shape", "brow-tint", "brow-lam", "lash-lam", "lash-ext", "lash-remove"];
const FACE = ["face-clean", "face-massage", "face-care"];

export const MASTERS: Master[] = [
  {
    id: "marina",
    name: "Марина Егорова",
    role: "Топ-стилист",
    initials: "МЕ",
    tone: "#2c1c15",
    light: true,
    dayOff: 1,
    about: "Женские стрижки на любую структуру волос, вечерние укладки и уход после окрашивания.",
    services: ["cut-w", "cut-m", "bangs", "style-day", "style-eve", ...CARE],
  },
  {
    id: "alena",
    name: "Алёна Соколова",
    role: "Колорист",
    initials: "АС",
    tone: "#c6943d",
    light: false,
    dayOff: 2,
    about: "Сложное окрашивание: балаяж, airtouch, тонирование. Консультирует по фото до записи.",
    services: [...COLOR, ...CARE],
  },
  {
    id: "timur",
    name: "Тимур Галиев",
    role: "Стилист",
    initials: "ТГ",
    tone: "#9a9088",
    light: false,
    dayOff: 3,
    about: "Мужские и детские стрижки, чёлка и быстрая повседневная укладка.",
    services: ["cut-w", "cut-m", "cut-kid", "bangs", "style-day"],
  },
  {
    id: "ksenia",
    name: "Ксения Орлова",
    role: "Мастер маникюра и педикюра",
    initials: "КО",
    tone: "#5f3b26",
    light: true,
    dayOff: 4,
    about: "Аппаратная техника, аккуратное покрытие и ровная форма на четыре недели.",
    services: NAILS,
  },
  {
    id: "polina",
    name: "Полина Шилова",
    role: "Бровист и мастер по ресницам",
    initials: "ПШ",
    tone: "#d4b574",
    light: false,
    dayOff: 0,
    about: "Коррекция и окрашивание бровей, ламинирование и наращивание ресниц.",
    services: BROWS,
  },
  {
    id: "vera",
    name: "Вера Ильина",
    role: "Косметолог",
    initials: "ВИ",
    tone: "#4b2238",
    light: true,
    dayOff: 5,
    about: "Чистка, массаж и уход по типу кожи на профессиональной косметике.",
    services: FACE,
  },
];

export const ALL_HAIR_SERVICES = [...HAIR, ...COLOR, ...CARE];

export function mastersFor(serviceId: string) {
  return MASTERS.filter((m) => m.services.includes(serviceId));
}

export function masterById(id: string) {
  return MASTERS.find((m) => m.id === id);
}

export type Shade = { id: string; name: string; hex: string; sheen: string };
export type ShadeFamily = { id: string; title: string; shades: Shade[] };

export const SHADE_FAMILIES: ShadeFamily[] = [
  {
    id: "blond",
    title: "Блонд",
    shades: [
      { id: "platinum", name: "Платиновый", hex: "#e6ddca", sheen: "#f7f2e8" },
      { id: "pearl", name: "Жемчужный", hex: "#d6ccc1", sheen: "#efe8e0" },
      { id: "wheat", name: "Пшеничный", hex: "#d4b574", sheen: "#ecd9a8" },
      { id: "honey", name: "Медовый", hex: "#c6943d", sheen: "#e4bd73" },
    ],
  },
  {
    id: "fair",
    title: "Русый",
    shades: [
      { id: "ash", name: "Пепельный", hex: "#9a9088", sheen: "#c2bab2" },
      { id: "sand", name: "Песочный", hex: "#b89b6c", sheen: "#d9c29a" },
      { id: "caramel", name: "Карамель", hex: "#a9773a", sheen: "#cf9f62" },
      { id: "hazel", name: "Ореховый", hex: "#7d5a3b", sheen: "#a98262" },
    ],
  },
  {
    id: "brown",
    title: "Шатен",
    shades: [
      { id: "cinnamon", name: "Корица", hex: "#8c4b2a", sheen: "#b8734e" },
      { id: "chestnut", name: "Каштановый", hex: "#5f3b26", sheen: "#8a5f45" },
      { id: "mocha", name: "Мокко", hex: "#4b3023", sheen: "#765443" },
      { id: "chocolate", name: "Шоколад", hex: "#3b2419", sheen: "#664739" },
    ],
  },
  {
    id: "red",
    title: "Рыжий и медный",
    shades: [
      { id: "copper", name: "Медь", hex: "#9c4a24", sheen: "#c97548" },
      { id: "ginger", name: "Имбирь", hex: "#c98a3a", sheen: "#e5b36a" },
      { id: "garnet", name: "Гранат", hex: "#6e2430", sheen: "#9a4a57" },
      { id: "cherry", name: "Вишня", hex: "#5a1f2c", sheen: "#86434f" },
    ],
  },
  {
    id: "dark",
    title: "Тёмный",
    shades: [
      { id: "graphite", name: "Графит", hex: "#3b3739", sheen: "#67626a" },
      { id: "espresso", name: "Эспрессо", hex: "#2c1c15", sheen: "#5a3f33" },
      { id: "coffee", name: "Чёрный кофе", hex: "#1c1512", sheen: "#4a3a33" },
      { id: "plum", name: "Слива", hex: "#4b2238", sheen: "#7a4a63" },
    ],
  },
];

export const SHADES: Shade[] = SHADE_FAMILIES.flatMap((f) => f.shades);
