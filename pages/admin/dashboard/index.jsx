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
import Head from "next/head";

const Dashboard = () => {
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalStocks, setTotalStocks] = useState(0);
  const [chartData, setChartData] = useState([]);
  const [selectedSort, setSelectedSort] = useState("year");
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedWeek, setSelectedWeek] = useState(1);

  const getChartData = () => {
    const purchaseData = JSON.parse(localStorage.getItem("purchaseData")) || [];
    const aggregatedData = {};

    purchaseData.forEach((purchase) => {
      const purchaseDate = new Date(purchase.userInfo.date);
      const purchaseMonth = purchaseDate.getMonth() + 1;

      if (!aggregatedData[purchaseMonth]) {
        aggregatedData[purchaseMonth] = { ItemSold: 0 };
      }

      aggregatedData[purchaseMonth].ItemSold += purchase.ItemSold;
    });

    const chartData = [];
    for (let month = 1; month <= 12; month++) {
      const monthLabel = getMonthLabel(month);
      chartData.push({
        name: monthLabel,
        ItemSold: aggregatedData[month] ? aggregatedData[month].ItemSold : 0,
      });
    }

    console.log("dasdasd", chartData);

    return chartData;
  };

  const getWeekData = (month, week) => {
    const purchaseData = JSON.parse(localStorage.getItem("purchaseData")) || [];
    const startDate = getStartDateOfWeek(month, week);
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 6);

    const aggregatedData = {};

    purchaseData.forEach((purchase) => {
      const purchaseDate = new Date(purchase.userInfo.date);
      if (purchaseDate >= startDate && purchaseDate <= endDate) {
        const day = purchaseDate.getDay();
        if (!aggregatedData[day]) {
          aggregatedData[day] = { ItemSold: 0 };
        }
        aggregatedData[day].ItemSold += purchase.ItemSold;
      }
    });

    const chartData = [];

    for (let day = 0; day < 7; day++) {
      const dayLabel = getDayLabel(day);
      chartData.push({
        name: dayLabel,
        ItemSold: aggregatedData[day] ? aggregatedData[day].ItemSold : 0,
      });
    }

    return chartData;
  };

  const getStartDateOfWeek = (month, week) => {
    const year = new Date().getFullYear();
    const firstDayOfMonth = new Date(year, month - 1, 1);
    const firstDayOfWeek = firstDayOfMonth.getDay();
    const startDate = new Date(
      firstDayOfMonth.setDate((week - 1) * 7 - firstDayOfWeek + 1)
    );
    return startDate;
  };

  const getDayLabel = (day) => {
    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
    return dayNames[day];
  };

  const handleMonthChange = (e) => {
    setSelectedMonth(parseInt(e.target.value));
  };

  const handleWeekChange = (e) => {
    setSelectedWeek(parseInt(e.target.value));
  };

  const handleSortChange = (e) => {
    setSelectedSort(e.target.value);
  };

  useEffect(() => {
    if (selectedSort === "year") {
      const data = getChartData();
      setChartData(data);
    } else if (selectedSort === "week") {
      const data = getWeekData(selectedMonth, selectedWeek);
      setChartData(data);
    }
  }, [selectedSort, selectedMonth, selectedWeek]);

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

    if (!Array.isArray(existingPurchaseData)) {
      return 0;
    }

    const totalRevenue = existingPurchaseData.reduce((total, purchase) => {
      return total + (parseFloat(purchase.total) || 0);
    }, 0);

    return totalRevenue;
  };

  const getTotalStocks = () => {
    let existingStocksData = JSON.parse(localStorage.getItem("StocksIneha"));

    if (!Array.isArray(existingStocksData)) {
      return 0;
    }

    const totalStocks = existingStocksData.reduce((total, stock) => {
      return total + (parseInt(stock.stocks) || 0);
    }, 0);

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
    <>
      <Head>
        <title>Coffee First - Admin Dashboard</title>
        <meta name="description" content="freshcoffee website" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" alt="icon" href="/BASTAfavicon.png" />
      </Head>
      <div className="bg-sidebarcolor pb-[27px]">
        <div className="flex">
          <Sidebar />
          <Header />

          <div className="ml-[210px] pt-6 mt-[70px] grid grid-cols-1 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
            <div className="flex-grow bg-adminbg text-tahiti ml-5 mr-16 p-4 flex justify-between flex-col items-center">
              <Image
                src={"/STOCKS.png"}
                alt="icon"
                width={60}
                height={60}
              ></Image>
              <p className="font-semibold text-[20px]">{totalStocks}</p>
              <p className="text-sm">Stocks</p>
            </div>
            <div className="flex-grow bg-adminbg text-tahiti mr-16 p-4 flex justify-between flex-col items-center">
              <Image
                src={"/TOTALrev.png"}
                alt="icon"
                width={60}
                height={60}
              ></Image>
              <p className="font-semibold text-[20px]">₱{totalRevenue}</p>
              <p>Total Revenue</p>
            </div>
            <div className="flex-grow bg-adminbg text-tahiti mr-16 p-4 flex justify-between flex-col items-center">
              <Image src="/SOLD-Icon.png" width={60} height={60} />
              <p className="font-semibold text-[20px]">{totalQuantity}</p>
              <p>Total Item Sold</p>
            </div>
          </div>
        </div>

        <div className="bg-adminbg ml-[230px] pt-6 mt-[40px] max-w-[11.5in] relative">
          <div className=" pl-[630px] pb-2 ml-[10px] z-10 flex space-x-2">
            <select
              value={selectedSort}
              onChange={handleSortChange}
              className="px-4 py-2 bg-tahiti rounded-lg border border-gray-300"
            >
              <option value="year">Sort by Year</option>
              <option value="week">Sort by Week</option>
            </select>
            {selectedSort === "week" && (
              <>
                <select
                  value={selectedMonth}
                  onChange={handleMonthChange}
                  className="px-4 py-2 bg-white rounded-lg border border-gray-300"
                >
                  {Array.from({ length: 12 }, (_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {getMonthLabel(i + 1)}
                    </option>
                  ))}
                </select>
                <select
                  value={selectedWeek}
                  onChange={handleWeekChange}
                  className="px-4 py-2 bg-white rounded-lg border border-gray-300"
                >
                  {Array.from({ length: 5 }, (_, i) => (
                    <option key={i + 1} value={i + 1}>
                      Week {i + 1}
                    </option>
                  ))}
                </select>
              </>
            )}
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart
              data={chartData}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="ItemSold"
                stroke="#8884d8"
                fill="#8884d8"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  );
};

const getMonthLabel = (month) => {
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  return monthNames[month - 1];
};

export default Dashboard;
