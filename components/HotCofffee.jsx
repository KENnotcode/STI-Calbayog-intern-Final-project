// HotCoffee.jsx

import Section from "@/components/Section";
import CoffeeCard from "@/components/CoffeeCard";
import { RunningText, TitlePage } from "@/components/TypingText";
import { useState } from "react";

const HotCoffee = ({ hotCoffee }) => {
  const [active, setActive] = useState("hotcoffee1");

  return (
    <Section id="hotcoffee">
      <RunningText />
      <TitlePage title="Hot Coffee" />

      <div id="hotcoffee" style={{ overflowX: 'auto' }}>
        <div className="mt-[50px] flex flex-row min-h-[70vh] gap-2">
          {hotCoffee.map((coffee, index) => (
            <CoffeeCard key={coffee.id} {...coffee} active={active} handleClick={setActive} />
          ))}
        </div>
      </div>
    </Section>
  );
};

export default HotCoffee;
