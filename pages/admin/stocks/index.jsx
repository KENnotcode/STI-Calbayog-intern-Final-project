import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Input } from "antd";
import Header from "@/components/header/Header";
import Sidebar from "@/components/sidebar/Sidebar";
import {
  IcedCoffee,
  HotCoffee,
  CreationSeries,
  NonCoffee,
  Frappes,
  Pastries,
} from "@/constant";
import Image from "next/image";
import Head from "next/head";

const Stocks = () => {
  const [stocks, setStocks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newStock, setNewStock] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const getProductImage = (productId) => {
    const allProducts = [
      ...IcedCoffee,
      ...HotCoffee,
      ...CreationSeries,
      ...NonCoffee,
      ...Frappes,
      ...Pastries,
    ];
    const product = allProducts.find((item) => item.id === productId);
    return product ? product.imgUrl : "";
  };

  const parsePrice = (price) => {
    const numericPrice = parseFloat(price.replace("₱", ""));
    return isNaN(numericPrice) ? 0.0 : numericPrice.toFixed(2);
  };

  const handleAddStock = (record) => {
    const updatedStocks = stocks.map((item) =>
      item.product === record.product
        ? { ...item, stocks: Number(item.stocks) + 1 }
        : item
    );
    setStocks(updatedStocks);
    localStorage.setItem("StocksIneha", JSON.stringify(updatedStocks));
  };

  const handleSubtractStock = (record) => {
    const updatedStocks = stocks.map((item) =>
      item.product === record.product && item.stocks > 0
        ? { ...item, stocks: item.stocks - 1 }
        : item
    );
    setStocks(updatedStocks);
    localStorage.setItem("StocksIneha", JSON.stringify(updatedStocks));
  };

  const handleOutOfStock = (record) => {
    const updatedStocks = stocks.map((item) =>
      item.product === record.product
        ? { ...item, stocks: "Out of Stock" }
        : item
    );
    setStocks(updatedStocks);
    localStorage.setItem("StocksIneha", JSON.stringify(updatedStocks));
  };

  const handleBackOnStock = (record) => {
    setIsModalOpen(true);
    setSelectedProduct(record);
  };

  const handleModalOk = () => {
    const updatedStocks = stocks.map((item) =>
      item.product === selectedProduct.product
        ? { ...item, stocks: newStock }
        : item
    );
    setStocks(updatedStocks);
    localStorage.setItem("StocksIneha", JSON.stringify(updatedStocks));
    setIsModalOpen(false);
  };

  const handleModalCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const storedStocks = JSON.parse(localStorage.getItem("StocksIneha")) || [];
    if (storedStocks.length === 0) {
      const initialStocks = [
        ...IcedCoffee,
        ...HotCoffee,
        ...CreationSeries,
        ...NonCoffee,
        ...Frappes,
        ...Pastries,
      ].map((item) => ({
        id: item.id,
        product: item.title,
        price: parsePrice(item.price),
        stocks: item.Stocks,
        imgUrl: item.imgUrl,
      }));
      localStorage.setItem("StocksIneha", JSON.stringify(initialStocks));
      setStocks(stocks);
    } else {
      setStocks(storedStocks);
    }
  }, []);

  const columns = [
    {
      title: "Product",
      dataIndex: "product",
      key: "product",
      render: (text, record) => (
        <div className="flex items-center">
          <Image
            src={getProductImage(record.id)}
            alt={text}
            width={100}
            height={100}
          />
          <p>{text}</p>
        </div>
      ),
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price) => {
        console.log("Rendering price:", price);
        const numericPrice = parseFloat(price);
        if (!isNaN(numericPrice)) {
          return `₱${numericPrice.toFixed(0)}`;
        }
        return; // If price is not a number, return default value
      },
    },
    {
      title: "Stocks",
      dataIndex: "stocks",
      key: "stocks",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      render: (_, record) => (
        <div className="grid grid-cols-2 gap-2">
          <Button className="w-full" onClick={() => handleAddStock(record)}>
            Add
          </Button>
          <Button className="w-full" onClick={() => handleOutOfStock(record)}>
            Out of Stock
          </Button>
          <Button
            className="w-full"
            onClick={() => handleSubtractStock(record)}
          >
            Subtract
          </Button>
          <Button className="w-full" onClick={() => handleBackOnStock(record)}>
            Back on Stock
          </Button>
        </div>
      ),
    },
  ];

  return (
    <>
      <Head>
        <title>Coffee First - Admim Stocks</title>
        <meta name="description" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" alt="icon" href="/BASTAfavicon.png" />
      </Head>

      <div className="flex ">
        <div className="flex flex-col w-full">
          <Header />
          <div className="flex">
            <Sidebar />
            <div className=" ml-[200px]">
              <div className="p-6 mt-[70px]">
                <Table
                  columns={columns}
                  dataSource={stocks}
                  rowKey="id"
                  scroll={{ y: 500 }}
                  pagination={false}
                />
              </div>
            </div>
          </div>
        </div>
        <Modal
          title="Back on Stock"
          open={isModalOpen}
          onOk={handleModalOk}
          onCancel={handleModalCancel}
          okButtonProps={{
            style: {
              border: "0.5px solid black",
              borderColor: "rgba(0,0,0,0.2)",
              color: "black"
            },
          }}
        >
          <Input
            type="number"
            value={newStock}
            onChange={(e) => setNewStock(e.target.value)}
          />
        </Modal>
      </div>
    </>
  );
};

export default Stocks;