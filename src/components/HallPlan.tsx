const INK = "var(--ink)";
const PAPER = "var(--surface)";
const LABEL = { fontFamily: "var(--font-onest)", fontSize: 36, fill: INK } as const;
const MARK = { fontFamily: "var(--font-cormorant)", fontStyle: "italic", fontSize: 50, fill: INK, textAnchor: "middle" } as const;

function Chair({ x, y, mark }: { x: number; y: number; mark: string }) {
  return (
    <g>
      <rect x={x - 70} y={y - 95} width={140} height={14} fill={INK} />
      <circle cx={x} cy={y} r={38} fill="none" stroke={INK} strokeWidth={8} />
      <text x={x} y={y + 16} {...MARK}>
        {mark}
      </text>
    </g>
  );
}

export function HallPlan() {
  return (
    <svg viewBox="0 0 800 1000" className="block h-full w-full" role="img" aria-labelledby="hall-title">
      <title id="hall-title">План зала студии: восемь рабочих мест</title>
      <rect width="800" height="1000" fill={PAPER} />
      <path d="M60 60H740V940H60Z" fill="none" stroke={INK} strokeWidth={12} />
      <path d="M60 300H740" stroke={INK} strokeWidth={10} />
      <path d="M420 300V940" stroke={INK} strokeWidth={10} />
      <path d="M420 620H740" stroke={INK} strokeWidth={10} />
      <path d="M60 740H420" stroke={INK} strokeWidth={10} />
      <rect x={330} y={54} width={140} height={12} fill={PAPER} />
      <path d="M330 60C330 20 470 20 470 60" fill="none" stroke={INK} strokeWidth={8} />
      <text x={90} y={110} {...LABEL}>
        Ресепшен
      </text>
      <rect x={90} y={140} width={200} height={70} rx={8} fill={INK} />
      <rect x={520} y={110} width={190} height={60} rx={30} fill="none" stroke={INK} strokeWidth={8} />
      <text x={525} y={200} {...LABEL}>
        Мойка
      </text>
      <circle cx={565} cy={250} r={24} fill="none" stroke={INK} strokeWidth={8} />
      <circle cx={660} cy={250} r={24} fill="none" stroke={INK} strokeWidth={8} />

      <text x={90} y={350} {...LABEL}>
        Парикмахерский зал
      </text>
      <Chair x={150} y={480} mark="МЕ" />
      <Chair x={330} y={480} mark="ТГ" />
      <Chair x={150} y={660} mark="АС" />
      <Chair x={330} y={660} mark="асс." />

      <text x={450} y={350} {...LABEL}>
        Ногтевой сервис
      </text>
      <rect x={455} y={390} width={140} height={90} rx={8} fill="none" stroke={INK} strokeWidth={8} />
      <text x={525} y={450} {...MARK}>
        КО
      </text>
      <rect x={630} y={390} width={80} height={130} rx={20} fill={INK} />
      <text x={450} y={580} {...LABEL}>
        стол маникюра, педикюрное кресло
      </text>

      <text x={450} y={670} {...LABEL}>
        Брови и ресницы
      </text>
      <rect x={455} y={700} width={250} height={90} rx={30} fill="none" stroke={INK} strokeWidth={8} />
      <text x={580} y={760} {...MARK}>
        ПШ
      </text>

      <text x={450} y={870} {...LABEL}>
        Уход за лицом
      </text>
      <rect x={455} y={885} width={250} height={36} rx={18} fill={INK} />
      <text x={740} y={915} {...MARK} textAnchor="end">
        ВИ
      </text>

      <text x={90} y={790} {...LABEL}>
        Окно, диван для гостей
      </text>
      <rect x={90} y={810} width={300} height={90} rx={20} fill="none" stroke={INK} strokeWidth={8} />
    </svg>
  );
}
