// CreationSeries.jsx

import Section from "@/components/Section"
import CoffeeCard from "@/components/CoffeeCard"
import { RunningText, TitlePage } from "@/components/TypingText"

import { useState } from "react"

const CreationSeries = ({ creationSeries }) => {
  const [active, setActive] = useState("CreationSeries3") //ig edit pa dapat an best seller an naka usestate

  return (
    <Section id="creation-series">
      <RunningText />
      <TitlePage title="Creation Series" />

      <div className="mt-[50px] flex flex-row min-h-[70vh] gap-2">
        {creationSeries.map((coffee, index) => (
          <CoffeeCard key={coffee.id} {...coffee} active={active} handleClick={setActive} />
        ))}
      </div>
    </Section>
  )
}

export default CreationSeries
