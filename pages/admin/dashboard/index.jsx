import React, { useState, useEffect } from "react";
import Sidebar from "@/components/sidebar/Sidebar";
import Header from "@/components/header/Header";
import Image from "next/image";
import { StockOutlined, MoneyCollectOutlined } from "@ant-design/icons";

const Dashboard = () => {
  const [handleStocksClick, sethandleStocksClick] = useState(true);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalStocks, setTotalStocks] = useState(0);

  const handleUpdateTotalStocks = (totalStocks) => {
    setTotalStocks(totalStocks);
  };

  const getTotalQuantity = () => {
    let existingPurchaseData = JSON.parse(localStorage.getItem("purchaseData"));

    if (!Array.isArray(existingPurchaseData)) {
      return 0;
    }

    const totalQuantity = existingPurchaseData.reduce((total, purchase) => {
      return total + (purchase.quantity || 0);
    }, 0);
    return totalQuantity;
  };

  const getTotalRevenue = () => {
    let existingPurchaseData = JSON.parse(localStorage.getItem("purchaseData"));
    console.log("Existing purchase data (revenue):", existingPurchaseData);

    if (!Array.isArray(existingPurchaseData)) {
      return 0;
    }

    const totalRevenue = existingPurchaseData.reduce((total, purchase) => {
      return total + (parseFloat(purchase.total) || 0);
    }, 0);

    console.log("Total revenue:", totalRevenue);
    return totalRevenue;
  };

  const getTotalStocks = () => {
    let existingStocksData = JSON.parse(localStorage.getItem("StocksIneha"));
    console.log("Existing stocks data:", existingStocksData);

    if (!Array.isArray(existingStocksData)) {
      return 0;
    }

    const totalStocks = existingStocksData.reduce((total, stock) => {
      return total + (parseInt(stock.stocks) || 0);
    }, 0);

    console.log("Total stocks:", totalStocks);
    return totalStocks;
  };

  useEffect(() => {
    const quantity = getTotalQuantity();
    setTotalQuantity(quantity);

    const revenue = getTotalRevenue();
    setTotalRevenue(Math.floor(revenue));

    const stocks = getTotalStocks();
    setTotalStocks(stocks);
  }, []);

  useEffect(() => {
    // Listen for the custom event to update total stocks
    const updateTotalStocks = () => {
      let existingStocksData = JSON.parse(localStorage.getItem("StocksIneha"));
      if (!Array.isArray(existingStocksData)) {
        return 0;
      }
      const totalStocks = existingStocksData.reduce((total, stock) => {
        return total + (stock.Stocks || 0);
      }, 0);
      setTotalStocks(totalStocks);
    };
    document.addEventListener("updateTotalStocks", updateTotalStocks);

    return () => {
      document.removeEventListener("updateTotalStocks", updateTotalStocks);
    };
  }, []);

  return (
    <div>
      <div className="flex">
        <Sidebar />
        <Header />

        <div className="ml-[254px] pl-6 pt-6 mt-[70px] grid grid-cols-1 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
          <div className="text-white ml-5 mr-16 p-4 flex justify-between flex-col items-center">
            <StockOutlined className="mr-2 text-[60px]" />
            <p className="font-semibold text-[20px]">{totalStocks}</p>
            <p className="text-sm">Stocks</p>
          </div>
          <div className="text-white mr-16 p-4 flex justify-between flex-col items-center">
            <MoneyCollectOutlined className="mr-2 text-[60px]" />
            <p className="font-semibold text-[20px]">P{totalRevenue}</p>
            <p>Total Revenue</p>
          </div>
          <div className="text-white mr-16 p-4 flex justify-between flex-col items-center">
            <Image src="/SOLDicon.png" width={60} height={60} />
            <p className="font-semibold text-[20px]">{totalQuantity}</p>
            <p>Total Item Sold</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
