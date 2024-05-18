// HotCoffee.jsx

import Section from "@/components/Section";
import { RunningText, TitlePage } from "@/components/TypingText";
import { useState } from "react";
import IcedCoffeeCard from "./IcedCoffeeCard";

const IcedCoffee = ({ hotCoffee }) => {
  const [active, setActive] = useState("hotcoffee1");

  return (
    <Section id="icedcoffee">
      <RunningText />
      <TitlePage title="Hot Coffee" />

      <div id="icedcoffee" style={{ overflowX: 'auto' }}>
        <div className="mt-[50px] flex flex-row min-h-[70vh] gap-2">
          {IcedCoffee.map((coffee, index) => (
            <IcedCoffeeCard key={coffee.id} {...coffee} active={active} handleClick={setActive} />
          ))}
        </div>
      </div>
    </Section>
  );
};

export default IcedCoffee;
