import { Atlas } from "@/components/Atlas";
import { Booking } from "@/components/Booking";
import { Contact } from "@/components/Contact";
import { Faq } from "@/components/Faq";
import { Hero } from "@/components/Hero";
import { Masters } from "@/components/Masters";
import { PriceList } from "@/components/PriceList";
import { Process } from "@/components/Process";
import { Reveal } from "@/components/Reveal";

export default function Home() {
  return (
    <>
      <Hero />
      <Reveal>
        <PriceList />
        <Atlas />
        <Booking />
        <Masters />
        <Process />
        <Faq />
        <Contact />
      </Reveal>
    </>
  );
}
