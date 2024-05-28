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
    console.log(
      "Product image for ID:",
      productId,
      "is",
      product ? product.imgUrl : "not found"
    );
    return product ? product.imgUrl : ""; // Ensure that product.imgUrl is returned
  };

  const parsePrice = (price) => {
    const numericPrice = parseFloat(price.replace("₱", ""));
    return isNaN(numericPrice) ? 0 : numericPrice;
  };

  const handleAddStock = (record) => {
    const updatedStocks = stocks.map((item) =>
      item.product === record.product
        ? { ...item, stocks: Number(item.stocks) + 1 }
        : item
    );
    setStocks(updatedStocks);

    localStorage.setItem("StocksIneha", JSON.stringify(updatedStocks));
    console.log("Dispatching event...");
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
        // Check if price is a string and contains the currency symbol "₱"
        if (typeof price === "string" && price.includes("₱")) {
          const numericPrice = parseFloat(price.replace("₱", ""));
          if (!isNaN(numericPrice)) {
            return `₱ adsfasdasd${numericPrice.toFixed(2)}`;
          }
        }
        // If price is not in the expected format, return it as is
        return price;
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
      >
        <Input
          type="number"
          value={newStock}
          onChange={(e) => setNewStock(e.target.value)}
        />
      </Modal>
    </div>
  );
};

export default Stocks;
