// Frappes.jsx

import Section from "@/components/Section";
import CoffeeCard from "@/components/CoffeeCard";
import { RunningText, TitlePage } from "@/components/TypingText";
import { Frappes } from "@/constant";
import { useState } from "react";

const Frappes = ({ frappes }) => {
  const [active, setActive] = useState("Frappes2");

  return (
    <Section id="frappes">
      <RunningText />
      <TitlePage title="Frappes" />

      <div id="frappes">
        <div className="mt-[50px] flex flex-row min-h-[70vh] gap-2">
          {frappes.map((coffee, index) => (
            <CoffeeCard key={coffee.id} {...coffee} active={active} handleClick={setActive} />
          ))}
        </div>
      </div>
    </Section>
  );
};

export default Frappes;
