import Image from "next/image";
import { Dropdown, Space, Badge, Menu } from "antd";
import { DownOutlined } from "@ant-design/icons";
import Navlink from "./Navlink";
import { CoffeTypes, linkList } from "@/utils/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

import { ShoppingCartOutlined } from "@ant-design/icons";

const Navbar = ({ cardLength }) => {
  const router = useRouter();
  const [navbar, setNavbar] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const [localStorageData, setLocalStorageData] = useState(0);

  useEffect(() => {
    const changeBackground = () => {
      setNavbar(window.scrollY >= 100);
    };

    window.addEventListener("scroll", changeBackground);

    return () => {
      window.removeEventListener("scroll", changeBackground);
    };
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const data = JSON.parse(localStorage.getItem("data")) || [];
      setLocalStorageData(data);
    }
  }, [cardLength]);

  const handleAddToCart = (item) => {
    const updatedCartItems = [...cartItems, item];
    setCartItems(updatedCartItems);
    setCartCount(updatedCartItems.length);
    setCardLength(new Set(updatedCartItems.map((item) => item.title)).size);

    localStorage.setItem("cartCount", updatedCartItems.length);
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
  };

  const cartMenu = (
    <Menu>
      <div className=" max-h-80 overflow-y-scroll" id="mouse">
        {localStorageData.length > 0 ? (
          Object.entries(
            localStorageData.reduce((acc, item) => {
              acc[item.title] = (acc[item.title] || 0) + 1;
              return acc;
            }, {})
          ).map(([title, count], index) => (
            <Menu.Item>
              <div className="flex gap-2 justify-between" key={index}>
                <p>{title}</p>{" "}
                <div className=" flex gap-1 bg-[#b77b2e] rounded-md p-1">
                  {" "}
                  <p className="flex justify-end">{count}</p>
                  <p className=""> quantity</p>
                </div>
              </div>
            </Menu.Item>
          ))
        ) : (
          <Menu.Item>No items in cart</Menu.Item>
        )}
      </div>
    </Menu>
  );

  return (
    <>
      <div
        className={` ${
          navbar ? "bg-dark" : "bg-opacity-0"
        } duration-700 backdrop-blur-md bg-opacity-60 fixed z-[10] font-semibold  text-tahiti mt-4-600 w-[94.6%] pr-12 pl-4 pt-1 pb-1`}
      >
        <div className="flex justify-between items-center">
          <div className="pl-3">
            <Image src="/BASTAlogo.png" alt="logo" width={70} height={70} />
          </div>
          <div>
            <ul className="flex gap-4 text-lg text-white">
              {linkList.map((link) => {
                if (link.title === "Menu") {
                  return (
                    <Dropdown
                      arrow
                      menu={{
                        items: CoffeTypes.map((data) => ({
                          key: data.id,
                          label: (
                            <Navlink
                              key={data.id}
                              href={data.href}
                              title={data.title}
                            />
                          ),
                        })),
                      }}
                    >
                      <a onClick={(e) => e.preventDefault()}>
                        <Space className="cursor-pointer text-white hover:text-menuitemcolor">
                          Menu
                          <DownOutlined />
                        </Space>
                      </a>
                    </Dropdown>
                  );
                }
                return (
                  <Navlink key={link.id} href={link.href} title={link.title} />
                );
              })}
              <Dropdown overlay={cartMenu}>
                <Badge
                  className="duration-300 hover:scale-150"
                  count={cardLength}
                  offset={[10, 0]}
                >
                  <ShoppingCartOutlined
                    style={{ fontSize: 24, color: "white" }}
                  />
                </Badge>
              </Dropdown>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
