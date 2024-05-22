// menu.jsx

import Section from "@/components/Section";
import CoffeeCard from "@/components/CoffeeCard";
import { RunningText, TitlePage } from "@/components/TypingText";

import { HotCoffee } from "@/constant"; //HotCoffee

import { IcedCoffee } from "@/constant";
import { CreationSeries } from "@/constant"; //CreationSeries
import { NonCoffee } from "@/constant"; //Non - Coffee
import { Frappes } from "@/constant"; //Frappes
import { Pastries } from "@/constant"; //Pastries


import React from "react";
import { useState } from "react"; 
import IcedCoffeeCard from "@/components/IcedCoffeeCard";
import CookiesCard from "@/components/CookiesCard";
import HotcoffeeCard from "@/components/HotcoffeeCard";


const OurMenu = ({setTotalQuantity}) => {
  const [icedcoffeeActive, seticedcoffeeActive] = useState("icedcoffee4"); 
  const [hotcoffeeActive, sethotcoffeeActive] = useState("hotcoffee5"); 
  const [creationseriesActive, setcreastionseriesActive] = useState("CreationSeries3"); 
  const [noncoffeeActive, setnoncoffeeActive] = useState("NonCoffee2"); 
  const [frappesActive, setfrappesActive] = useState("Frappes2"); 
  const [pastriesActive, setpastriesActive] = useState(""); 

  return (
    <>
        

      <Section id="Icedcoffee">
        <RunningText />
        <TitlePage title="Iced Coffee" />

        <div id="IcedCoffee" style={{ overflowX: 'auto'}}>
          <div className="mt-[50px] flex flex-row min-h-[70vh] gap-2">
            {IcedCoffee.map((coffee, index) => (
              <IcedCoffeeCard key={coffee.id} {...coffee} active={icedcoffeeActive} handleClick={seticedcoffeeActive} setTotalQuantity={setTotalQuantity} />
            ))}
          </div>
        </div>
      </Section>


      <Section id="hotcoffee">
        <RunningText/>
        <TitlePage title="Hot Coffee" />

        <div id="hotcoffee" style={{ overflowX: 'auto' }}>
          <div className="mt-[50px] flex flex-row min-h-[70vh] gap-2">
            {HotCoffee.map((coffee, index) => (
              <HotcoffeeCard key={coffee.id} {...coffee} active={hotcoffeeActive} handleClick={sethotcoffeeActive} setTotalQuantity={setTotalQuantity}/>
            ))}
          </div>
        </div>
      </Section>


      <Section id="creationseries">
        <RunningText />
        <TitlePage title="Creation Series" />

        <div id="creationseries">
          <div className="mt-[50px] flex flex-row min-h-[70vh] gap-2">
            {CreationSeries.map((coffee, index) => (
              <CoffeeCard key={coffee.id} {...coffee} active={creationseriesActive} handleClick={setcreastionseriesActive} setTotalQuantity={setTotalQuantity}/>
            ))}
          </div>
        </div>
      </Section>


      <Section id="noncoffee">
        <RunningText />
        <TitlePage title="Non-Coffee" />

        <div id="noncoffee">
          <div className="mt-[50px] flex flex-row min-h-[70vh] gap-2">
            {NonCoffee.map((item, index) => (
              <CoffeeCard key={item.id} {...item} active={noncoffeeActive} handleClick={setnoncoffeeActive} setTotalQuantity={setTotalQuantity}/>
            ))}
          </div>
        </div>
      </Section>
      

      <Section id="frappes">
        <RunningText />
        <TitlePage title="Frappes" />

        <div id="frappes">
          <div className="mt-[50px] flex flex-row min-h-[70vh] gap-2">
            {Frappes.map((item, index) => (
              <CoffeeCard key={item.id} {...item} active={frappesActive} handleClick={setfrappesActive} setTotalQuantity={setTotalQuantity} />
            ))}
          </div>
        </div>
      </Section>

      <Section id="pastries">
        <RunningText />
        <TitlePage title="Pastries" />

        <div id="pastries">
          <div className="mt-[50px] flex flex-row min-h-[70vh] gap-2">
            {Pastries.map((item, index) => (
              <CookiesCard key={item.id} {...item} active={pastriesActive} handleClick={setpastriesActive} setTotalQuantity={setTotalQuantity}/>
            ))}
          </div>
        </div>
      </Section>


    </>
  );
};

export default OurMenu;