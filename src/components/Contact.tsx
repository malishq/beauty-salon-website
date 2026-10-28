import Image from "next/image";
import { ContactForm } from "@/components/ContactForm";
import { ChoiceSummary } from "@/components/ChoiceSummary";
import { asset } from "@/lib/asset";
import { SITE } from "@/lib/site";

const ROWS = [
  { text: "Студия красоты Атлас", photo: true },
  { text: SITE.street },
  { text: SITE.city },
  { text: SITE.hours },
  { text: SITE.phone, href: SITE.phoneHref },
];

export function Contact() {
  return (
    <section id="contact" className="scroll-mt-20 pt-24 sm:pt-32 lg:pt-40">
      <div className="wrap">
        <div className="grid-12 gap-y-12">
          <div className="col-span-12 lg:col-span-5">
            <h2 data-reveal className="t-l">
              Запись
            </h2>
            <p data-reveal className="t-m measure mt-6">
              Заполните форму или позвоните: администратор подтвердит время в течение часа в рабочие часы. Для сложного окрашивания
              приложите фото в мессенджер после звонка.
            </p>
            <ChoiceSummary />
          </div>
          <div data-reveal className="col-span-12 lg:col-span-6 lg:col-start-7">
            <ContactForm />
          </div>
        </div>
      </div>

      <ul className="mt-24 lg:mt-32" aria-label="Адрес и часы работы">
        {ROWS.map((row) => (
          <li key={row.text} className="rows-band">
            <div className="wrap flex min-h-[5.25rem] items-end justify-between gap-6 pb-3 pl-[calc(var(--margin)+1.25rem)] lg:min-h-[9.4rem] lg:pb-5">
              {row.href ? (
                <a href={row.href} className="t-xl underline-offset-[0.12em] transition hover:underline">
                  {row.text}
                </a>
              ) : (
                <span className="t-xl">{row.text}</span>
              )}
              {row.photo && (
                <Image src={asset("/images/manicure-set.jpg")} alt="Серебряный маникюрный набор начала XX века: пилка, щётка и полировщик" width={900} height={900} loading="lazy" className="round-photo h-[4.5rem] w-[4.5rem] shrink-0 object-cover lg:h-[7.5rem] lg:w-[7.5rem]" />
              )}
            </div>
          </li>
        ))}
        <li className="rows-band bg-accent text-on-accent lg:bg-transparent lg:text-ink">
          <div className="wrap flex min-h-[5.25rem] items-center justify-between gap-6 pl-[calc(var(--margin)+1.25rem)] lg:min-h-[9.4rem] lg:items-end lg:justify-start lg:pb-5">
            <span className="t-xl">До встречи</span>
            <a
              href={SITE.phoneHref}
              aria-label={`Позвонить: ${SITE.phone}`}
              className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-bg text-ink transition hover:bg-surface active:scale-[0.96] lg:mb-[0.08em] lg:ml-6 lg:h-[0.9em] lg:w-[0.9em] lg:bg-accent lg:text-on-accent lg:hover:bg-accent-strong"
              style={{ fontSize: "var(--step-xl)" }}
            >
              <svg viewBox="0 0 24 24" className="h-[0.4em] w-[0.4em]" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M4 12h16m-6-6 6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>
        </li>
      </ul>
    </section>
  );
}
