import React, { useState, useEffect } from "react";
import Sidebar from "@/components/sidebar/Sidebar";
import Header from "@/components/header/Header";
import Image from "next/image";
import { StockOutlined, MoneyCollectOutlined } from "@ant-design/icons";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const Dashboard = () => {
  const [handleStocksClick, sethandleStocksClick] = useState(true);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalStocks, setTotalStocks] = useState(0);
  const [chartData, setChartData] = useState([]);

  const getChartData = () => {
    // Retrieve purchase data from local storage
    const purchaseData = JSON.parse(localStorage.getItem("purchaseData")) || [];

    // Initialize an object to hold aggregated data by month
    const aggregatedData = {};

    // Iterate over each purchase entry
    purchaseData.forEach((purchase) => {
      // Extract the date from the purchase entry
      const purchaseDate = new Date(purchase.userInfo.date);
      const purchaseMonth = purchaseDate.getMonth() + 1;

      // Initialize the month if it doesn't exist in the aggregated data
      if (!aggregatedData[purchaseMonth]) {
        aggregatedData[purchaseMonth] = { ItemSold: 0 };
      }

      // Add the quantity and total to the corresponding month
      aggregatedData[purchaseMonth].ItemSold += purchase.ItemSold;
    });

    // Initialize an array to hold the chart data
    const chartData = [];

    // Iterate over the months from January to December
    for (let month = 1; month <= 12; month++) {
      // Format the month key
      const monthLabel = getMonthLabel(month);

      // Initialize the data entry for the current month
      const dataEntry = {
        name: monthLabel,
        month,
      };

      // Add the aggregated quantity to the data entry
      dataEntry.ItemSold = aggregatedData[month]
        ? aggregatedData[month].ItemSold
        : 0;

      // Add the aggregated total to the data entry
      dataEntry.total = aggregatedData[month] ? aggregatedData[month].total : 0;

      // Add the data entry to the chart data
      chartData.push(dataEntry);
    }

    return chartData;
  };

  // Function to get the label for the month
  const getMonthLabel = (month) => {
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return monthNames[month - 1];
  };

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

    const data = getChartData();
    setChartData(data);
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
    <div className="bg-sidebarcolor pb-20">
      <div className="flex">
        <Sidebar />
        <Header />

        <div className="ml-[210px] pt-6 mt-[70px] grid grid-cols-1 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
          <div className="flex-grow bg-adminbg text-tahiti ml-5 mr-16 p-4 flex justify-between flex-col items-center">
            <StockOutlined className="mr-2 text-[60px]" />
            <p className="font-semibold text-[20px]">{totalStocks}</p>
            <p className="text-sm">Stocks</p>
          </div>
          <div className="flex-grow bg-adminbg text-tahiti mr-16 p-4 flex justify-between flex-col items-center">
            <MoneyCollectOutlined className="mr-2 text-[60px]" />
            <p className="font-semibold text-[20px]">P{totalRevenue}</p>
            <p>Total Revenue</p>
          </div>
          <div className="flex-grow bg-adminbg text-tahiti mr-16 p-4 flex justify-between flex-col items-center">
            <Image src="/SOLD-Icon.png" width={60} height={60} />
            <p className="font-semibold text-[20px]">{totalQuantity}</p>
            <p>Total Item Sold</p>
          </div>
        </div>
      </div>

      <div className="bg-adminbg ml-[230px] pt-6 mt-[40px] max-w-[11.5in]">
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart
            data={chartData}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" className="text-[14px]" />
            <YAxis
              type="number"
              domain={[0, Math.max(...chartData.map((item) => item.ItemSold))]}
              allowDecimals={false}
            />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="ItemSold"
              stackId="1"
              stroke={"#8884d8"} // Change stroke color
              fill={"#008000"} // Change fill color
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Dashboard;
