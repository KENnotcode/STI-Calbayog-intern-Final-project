import Navbar from "@/components/Navbar";
import React, { useState, useEffect } from "react";
import { Table } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import {
  IcedCoffee,
  HotCoffee,
  CreationSeries,
  NonCoffee,
  Frappes,
  Pastries,
} from "@/constant";
import { useRouter } from "next/router";

const Cart = () => {
  const router = useRouter();
  const [cartItemsMap, setCartItemsMap] = useState({});
  const [subTotal, setSubTotal] = useState(0);
  const [shippingCharge, setShippingCharge] = useState(25); // Example shipping charge

  const total = parseFloat(subTotal) + parseFloat(shippingCharge);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedCartItems = JSON.parse(localStorage.getItem("data")) || [];
      const newCartItemsMap = storedCartItems.reduce((acc, item) => {
        const existingItem = acc[item.id];
        if (existingItem) {
          existingItem.quantity += item.quantity || 1;
          existingItem.subTotal +=
            (item.quantity || 1) * parseFloat(item.price.replace("₱", ""));
        } else {
          acc[item.id] = {
            ...item,
            quantity: item.quantity || 1,
            subTotal:
              (item.quantity || 1) * parseFloat(item.price.replace("₱", "")),
          };
        }
        return acc;
      }, {});
      setCartItemsMap(newCartItemsMap);
      calculateSubTotal(Object.values(newCartItemsMap));
    }
  }, [typeof window !== "undefined" ? localStorage.getItem("data") : null]);

  const removeFromCart = (id) => {
    const updatedCartItemsMap = { ...cartItemsMap };
    delete updatedCartItemsMap[id];
    setCartItemsMap(updatedCartItemsMap);
    calculateSubTotal(Object.values(updatedCartItemsMap));

    localStorage.setItem("data", JSON.stringify(Object.values(updatedCartItemsMap)));


    console.log("Removed item with id:", id);
  };

  const calculateSubTotal = (items) => {
    // Ensure items is an array
    const itemsArray = Array.isArray(items) ? items : [];

    // Calculate subtotal
    const total = itemsArray.reduce(
      (acc, item) => acc + parseFloat(item.subTotal),
      0
    );
    setSubTotal(total);
  };

  const updateQuantity = (id, newQuantity) => {
    try {
      // Log the inputs
      console.log("Updating item:", id, "with quantity:", newQuantity);

      // Retrieve cart data from localStorage or initialize to an empty array if not present
      const cartData = JSON.parse(localStorage.getItem("data")) || [];

      // Check if cartData is an array
      if (!Array.isArray(cartData)) {
        throw new Error("Cart data is not an array");
      }

      // Update the cart data with the new quantity and calculate the new subtotal
      const updatedCartData = cartData.map((item) => {
        if (item.id === id) {
          // Ensure the quantity is not less than 1
          const updatedQuantity = newQuantity >= 1 ? newQuantity : 0;

          // Calculate the updated subtotal, removing the currency symbol and converting to a number
          const updatedSubTotal = updatedQuantity * parseFloat(item.price.replace("₱", ""));

          // Return the updated item
          return {
            ...item,
            quantity: updatedQuantity,
            subTotal: updatedSubTotal,
          };
        }
        // Return the item unchanged if the id doesn't match
        return item;
      }).filter(item => item.quantity > 0); // Remove items with quantity 0

      // Save the updated cart data back to localStorage
      localStorage.setItem("data", JSON.stringify(updatedCartData));

      // Update the cart items map for state management
      if (typeof setCartItemsMap === 'function') {
        setCartItemsMap(updatedCartData.reduce((acc, item) => ({ ...acc, [item.id]: item }), {}));
      } else {
        console.error("setCartItemsMap is not defined or not a function");
      }

      // Recalculate the subtotal for the cart
      if (typeof calculateSubTotal === 'function') {
        calculateSubTotal(updatedCartData);
      } else {
        console.error("calculateSubTotal is not defined or not a function");
      }

      // Calculate the total quantity of items in the cart
      const updatedCount = updatedCartData.reduce((acc, item) => acc + item.quantity, 0);

      // Save the updated cart count back to localStorage
      localStorage.setItem("cartCount", updatedCount);

      // Log the updated cart data for debugging
      console.log("Updated cart data:", updatedCartData);
    } catch (error) {
      console.error("An error occurred while updating the quantity:", error);
    }
  };

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

  const columns = [
    {
      title: "Product",
      dataIndex: "title",
      key: "title",
      render: (text, record) => (
        <div className="flex gap-5 text-[15px]">
          <DeleteOutlined
            onClick={() => removeFromCart(record.id)}
            style={{ fontSize: "25px", cursor: "pointer" }}
            className="duration-300 hover:scale-150 hover:text-red"
          />
          <img
            src={getProductImage(record.id)}
            alt={text}
            style={{ width: 100, height: 80 }}
          />
          <p className="pt-[30px]">{text}</p>
        </div>
      ),
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      align: "center",
      render: (text) => <span className="text-[15px]">{text}</span>,
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      align: "center",
      render: (text, record) => (
        <div className="flex justify-center items-center">
          <button
            className="text-[35px] pb-[11px] pr-[7px] hover:text-red hover:scale-150 duration-300"
            onClick={() => updateQuantity(record.id, record.quantity - 1)}
            disabled={record.quantity <= 1}
          >
            -
          </button>
          <span className="text-[15px]">{text || 0}</span>
          <button
            className="text-[24px] pb-[7px] pl-[6px] hover:text-[#008000] hover:scale-150 duration-300"
            onClick={() => updateQuantity(record.id, record.quantity + 1)}
          >
            +
          </button>
        </div>
      ),
    },
    {
      title: "Sub Total",
      dataIndex: "subTotal",
      key: "subTotal",
      align: "center",
      render: (text) => (
        <span className="text-[15px]">₱{parseFloat(text).toFixed(2) || 0}</span>
      ),
    },
  ];

  const totalColumns = [
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (text) => `₱${parseFloat(text).toFixed(2)}`,
    },
  ];

  const totalData = [
    {
      description: "Sub Total",
      amount: subTotal.toFixed(2),
    },
    {
      description: "Shipping Charge",
      amount: shippingCharge.toFixed(2),
    },
    {
      description: "Total",
      amount: total.toFixed(2),
    },
  ];

  return (
    <div className="bg-tahiti pb-24 text-[15px]">
      <Navbar />
      <div className="pl-[90px] pr-[50px] pt-[82px]">
        <Table
          columns={columns}
          dataSource={Object.values(cartItemsMap)}
          pagination={false}
          bordered
          size="small"
        />
      </div>

      <div className="flex justify-end pl-32">
        <Table
          columns={totalColumns}
          dataSource={totalData}
          pagination={false}
          size="large"
          showHeader={false}
          style={{ width: 200, borderStyle: "solid", border: "2px solid #000" }}
          className="mt-10 mr-24"
        />
      </div>

      <div
        className="flex justify-center gap-4 bg-tahiti pl-5 pr-5 w-full text-center"
        style={{ position: "fixed", bottom: "7px" }}
      >
        <p>
          You have {Object.values(cartItemsMap).length} item(s) in your cart
        </p>
        <button onClick={() => router.push("/")}>
          <p className="px-2 duration-500 rounded-sm hover:bg-addtocartcolor hover:text-tahiti">
            Continue Shopping
          </p>
        </button>
      </div>
    </div>
  );
};

export default Cart;
