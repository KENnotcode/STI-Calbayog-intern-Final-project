import React, { useState } from "react";
import Sidebar from "@/components/sidebar/Sidebar";
import Header from "@/components/header/Header";
import Image from "next/image";

import {StockOutlined, MoneyCollectOutlined } from "@ant-design/icons";

const Dashboard = () => {
  const [handleStocksClick, sethandleStocksClick] = useState(true);

  
  return (
    <div>
      <div className="flex">
      <Sidebar handleStocksClick={handleStocksClick}/>
      <Header handleStocksClick={handleStocksClick}/>

      <div className="ml-[254px] pl-6 pt-6 mt-[70px]  grid grid-cols-1 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
          <div className="text-white ml-5 mr-16 p-4 flex justify-between flex-col items-center">
            <StockOutlined className="mr-2 text-[60px]" />
            <p className="font-semibold text-[20px]">1237</p>
            <p className="text-sm">Stocks</p>
          </div>
          <div className="text-white mr-16 p-4 flex justify-between flex-col items-center">
            <MoneyCollectOutlined className="mr-2 text-[60px]" />
            <p className="font-semibold text-[20px]">$45,2K</p>
            <p>Total Revenue</p>
          </div>
          <div className="text-white mr-16 p-4 flex justify-between flex-col items-center">
            <Image src="/SOLDicon.png" width={60} height={60} />
            <p className="font-semibold text-[20px]">10.5k</p>
            <p>Total Item Sold</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
