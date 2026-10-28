import { DEPARTMENTS } from "@/lib/catalog";
import { formatDuration, formatPrice } from "@/lib/format";

export function PriceList() {
  return (
    <section id="services" className="scroll-mt-20 py-24 sm:py-32 lg:py-40">
      <div className="wrap">
        <div className="grid-12 items-end gap-y-6">
          <h2 data-reveal className="t-l col-span-12 lg:col-span-5">
            Услуги и цены
          </h2>
          <p data-reveal className="t-m measure col-span-12 lg:col-span-5 lg:col-start-8">
            Цены примерные, «от»: точную назовёт мастер после консультации. В стрижку входят мытьё и укладка, в окрашивание входит уход
            после процедуры.
          </p>
        </div>
        <table className="price-table mt-14 lg:mt-20">
          <colgroup>
            <col style={{ width: "33%" }} />
            <col style={{ width: "33%" }} />
            <col style={{ width: "16%" }} />
            <col />
          </colgroup>
          {DEPARTMENTS.map((dept) => (
            <tbody key={dept.id} data-reveal-group>
              <tr>
                <th scope="rowgroup" colSpan={4} className="dept">
                  {dept.title}
                </th>
              </tr>
              {dept.services.map((s) => (
                <tr key={s.id} className="row">
                  <td className="name">{s.name}</td>
                  <td className="note">{s.note}</td>
                  <td className="dur">{formatDuration(s.minutes)}</td>
                  <td className="price">{formatPrice(s.price)}</td>
                </tr>
              ))}
            </tbody>
          ))}
        </table>
      </div>
    </section>
  );
}
