// Header.js
import React from "react";
import { SearchOutlined, BellOutlined, StockOutlined, MoneyCollectOutlined } from "@ant-design/icons";
import Image from "next/image";
import { useState, useEffect } from "react";

const Header = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("loggedInUser");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error("Failed to parse user data from localStorage:", error);
      }
    }
  }, []);

  return (
    <>
      <div className="fixed pt-2 h-[70px] w-full flex items-center justify-center bg-adminbg">
        <SearchOutlined className=" pl-14 text-tahiti" />
        <input
          type="Text"
          placeholder="Type here to search"
          className=" bg-nocolor w-[500px] pl-4"
        />
        <BellOutlined className=" pl-56 pr-3 text-tahiti" />
        <div className="flex flex-col pr-2">
          {user ? (
            <>
              <p className="font-bold text-gray-700 text-tahiti">
                {user.username}
              </p>
              <p className="text-[13px] text-gray-500 text-center text-tahiti">
                {user.role}
              </p>
            </>
          ) : (
            <p className="font-bold text-gray-700">Guest</p>
          )}
        </div>
        <Image
          src="/BASTAnawong.png"
          alt="logo"
          width="50"
          height="50"
          className="rounded-sm"
        />
      </div>
    </>
  );
};

export default Header;
