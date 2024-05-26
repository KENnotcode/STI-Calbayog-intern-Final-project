import { Menu } from "antd";
import { DashboardOutlined } from "@ant-design/icons";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/router";

const Sidebar = () => {
  const [ecommerceColor, setEcommerceColor] = useState("#fff"); // Initial color for eCommerce
  const [stocksColor, setStocksColor] = useState("#fff"); // Initial color for Stocks
  const router = useRouter();

  const handleEcommerceClick = () => {
    setEcommerceColor("#000"); // Change text color to black when eCommerce is clicked
    setStocksColor("#fff");

  };

  const handleStocksClick = () => {
    setStocksColor("#000"); // Change text color to black when Stocks is clicked
    setEcommerceColor("#fff"); // Reset text color for eCommerce
    router.replace("/admin/stocks")
  };

  const handleStocksClickSidebar = () => {
    handleStocksClick(); // Call the handleStocksClick function passed from the parent component
  };

  return (
    <div
      className="h-screen  text-tahiti flex flex-col absolute left-0 top-0"
      style={{ width: "200px" }}
    >
      <div className=" pt-2 flex items-center justify-center h-16">
        <div className="z-40 text-tahiti font-bold flex items-center space-x-2">
          <Image src="/BASTAlogo.png" alt="logo" width="50" height="50" />
          <p>Coffee First</p>
        </div>
      </div>
      <Menu
        mode="inline"
        defaultSelectedKeys={["dashboard"]}
        className="font-semibold flex-1 overflow-y-auto bg-adminbg" // Allow menu to scroll if needed
      >
        <Menu.SubMenu
          key="dashboard"
          icon={<DashboardOutlined style={{ color: "#fff" }} />}
          title={<span className="text-tahiti">Dashboard</span>}
        >
          <Menu.Item key="ecommerce" onClick={handleEcommerceClick}>
            <span className="text-tahiti" style={{ color: ecommerceColor }}>eCommerce</span>
          </Menu.Item>

          <Menu.Item key="stocks" onClick={handleStocksClick}>
            <span className="text-tahiti" style={{ color: stocksColor }}>Stocks</span>
          </Menu.Item>
        </Menu.SubMenu>
      </Menu>
    </div>
  );
};

export default Sidebar;
