// NonCoffee.jsx

import Section from "@/components/Section";
import CoffeeCard from "@/components/CoffeeCard";
import { RunningText, TitlePage } from "@/components/TypingText";
<<<<<<< HEAD
import { NonCoffee as NonCoffeeData } from "@/constant"; // Renamed import to avoid conflict
=======
import { NonCoffee } from "@/constant"; // Import NonCoffee data
>>>>>>> d29a7c6ef8c0a7e9f9862a66175d2839855235d2
import { useState } from "react";

const NonCoffee = () => {
  const [active, setActive] = useState("NonCoffee2");

  return (
    <Section id="noncoffee">
      <RunningText />
      <TitlePage title="Non-Coffee Drinks" />

<<<<<<< HEAD
      <div id="noncoffee" style={{ overflowX: "auto" }}>
        <div className="mt-[50px] flex flex-row min-h-[70vh] gap-2">
          {NonCoffeeData.map(
            (
              drink,
              index // Using NonCoffeeData instead of NonCoffee
            ) => (
              <CoffeeCard
                key={drink.id}
                {...drink}
                active={active}
                handleClick={setActive}
              />
            )
          )}
=======
      <div id="noncoffee" style={{ overflowX: 'auto' }}>
        <div className="mt-[50px] flex flex-row min-h-[70vh] gap-2">
          {NonCoffee.map((drink, index) => (
            <CoffeeCard key={drink.id} {...drink} active={active} handleClick={setActive} />
          ))}
>>>>>>> d29a7c6ef8c0a7e9f9862a66175d2839855235d2
        </div>
      </div>
    </Section>
  );
};

export default NonCoffee;
