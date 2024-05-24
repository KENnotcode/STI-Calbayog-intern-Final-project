// Frappes.jsx

import Section from "@/components/Section";
import CoffeeCard from "@/components/CoffeeCard";
import { RunningText, TitlePage } from "@/components/TypingText";
import { Frappes } from "@/constant";
import { useState } from "react";

<<<<<<< HEAD
const Frappes = () => {
=======
const Frappes = ({ frappes }) => {
>>>>>>> d29a7c6ef8c0a7e9f9862a66175d2839855235d2
  const [active, setActive] = useState("Frappes2");

  return (
    <Section id="frappes">
      <RunningText />
      <TitlePage title="Frappes" />

      <div id="frappes">
        <div className="mt-[50px] flex flex-row min-h-[70vh] gap-2">
<<<<<<< HEAD
          {Frappes.map((coffee, index) => (
            <CoffeeCard
              key={coffee.id}
              {...coffee}
              active={active}
              handleClick={setActive}
            />
=======
          {frappes.map((coffee, index) => (
            <CoffeeCard key={coffee.id} {...coffee} active={active} handleClick={setActive} />
>>>>>>> d29a7c6ef8c0a7e9f9862a66175d2839855235d2
          ))}
        </div>
      </div>
    </Section>
  );
};

export default Frappes;
