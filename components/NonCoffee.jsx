// NonCoffee.jsx

import Section from "@/components/Section";
import CoffeeCard from "@/components/CoffeeCard";
import { RunningText, TitlePage } from "@/components/TypingText";
import { NonCoffee } from "@/constant"; // Import NonCoffee data
import { useState } from "react";

const NonCoffee = () => {
  const [active, setActive] = useState("NonCoffee2");

  return (
    <Section id="noncoffee">
      <RunningText />
      <TitlePage title="Non-Coffee Drinks" />

      <div id="noncoffee" style={{ overflowX: 'auto' }}>
        <div className="mt-[50px] flex flex-row min-h-[70vh] gap-2">
          {NonCoffee.map((drink, index) => (
            <CoffeeCard key={drink.id} {...drink} active={active} handleClick={setActive} />
          ))}
        </div>
      </div>
    </Section>
  );
};

export default NonCoffee;