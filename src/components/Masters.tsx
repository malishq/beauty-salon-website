import { Strand } from "@/components/Swatches";
import { MASTERS, type Master } from "@/lib/catalog";

function Plate({ master }: { master: Master }) {
  const strand = { id: master.id, name: master.name, hex: master.light ? "#f4efe6" : "#17120f", sheen: master.tone };
  return (
    <li className="plate" data-reveal>
      <figure>
        <div className="plate-face" style={{ background: master.tone, color: master.light ? "var(--bg)" : "var(--ink)" }}>
          <span className="monogram" aria-hidden="true">
            {master.initials}
          </span>
          <Strand shade={strand} className="absolute top-[7%] right-[7%] w-[16%]" />
        </div>
        <figcaption className="mt-4">
          <span className="block font-medium">{master.name}</span>
          <span className="block text-[0.875rem] text-muted">{master.role}</span>
          <span className="mt-2 block max-w-[280px]">{master.about}</span>
        </figcaption>
      </figure>
    </li>
  );
}

export function Masters() {
  const left = [MASTERS[0], MASTERS[2], MASTERS[4]];
  const right = [MASTERS[1], MASTERS[3], MASTERS[5]];
  return (
    <section id="masters" className="scroll-mt-20 bg-surface pt-24 sm:pt-32 lg:bg-bg lg:pt-0">
      <div className="masters-stage wrap">
        <h2 className="t-xl t-xl-title">Мастера</h2>
        <p className="mt-6 max-w-[36ch]">
          Восемь мастеров, восемь рабочих мест. Шестеро ведут приём по записи, двое ассистируют колористам: смывают, тонируют, делают
          уход между этапами.
        </p>
      </div>
      <div className="masters-cols wrap pb-24 sm:pb-32 lg:pb-0">
        <ol className="masters-col left">
          {left.map((m) => (
            <Plate key={m.id} master={m} />
          ))}
        </ol>
        <div aria-hidden="true" />
        <ol className="masters-col right">
          {right.map((m) => (
            <Plate key={m.id} master={m} />
          ))}
        </ol>
      </div>
    </section>
  );
}
