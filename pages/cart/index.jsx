import Navbar from "@/components/Navbar";
import React, { useState, useEffect } from "react";
import { Table, Modal, Input, Button, notification } from "antd";
import { DeleteOutlined, LeftOutlined, RightOutlined } from "@ant-design/icons";
import {
  IcedCoffee,
  HotCoffee,
  CreationSeries,
  NonCoffee,
  Frappes,
  Pastries,
} from "@/constant";
import { useRouter } from "next/router";
import Image from "next/image";
import dayjs from "dayjs";
import Head from "next/head";

const Cart = () => {
  const currentDate = dayjs().format("YYYY-MM-DD");
  console.log("current ine ", currentDate);
  const [stocks, setStocks] = useState([]);
  const router = useRouter();
  const [cartItemsMap, setCartItemsMap] = useState({});
  const [subTotal, setSubTotal] = useState(0);
  const [shippingCharge, setShippingCharge] = useState(25); // Example shipping charge
  const [isCheckoutVisible, setIsCheckoutVisible] = useState(false);
  const [isUserInfoVisible, setIsUserInfoVisible] = useState(false);
  const [userInfo, setUserInfo] = useState({
    firstName: "",
    lastName: "",
    date: currentDate,
  });

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
        stocks: item.Stocks,
        imgUrl: item.imgUrl,
      }));
      localStorage.setItem("StocksIneha", JSON.stringify(initialStocks));
      setStocks(stocks);
    } else {
      setStocks(storedStocks);
    }
  }, []);

  const [formErrors, setFormErrors] = useState({});

  const total = parseFloat(subTotal) + parseFloat(shippingCharge);

  // Function to get today's date in the format "Month Day, Year"
  const getTodayDate = () => {
    const months = [
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

    const today = new Date();
    const monthIndex = today.getMonth();
    const month = months[monthIndex];
    const day = today.getDate();
    const year = today.getFullYear();

    return `${month} ${day}, ${year}`;
  };
  const storedData =
    typeof window !== "undefined" ? localStorage.getItem("data") : null;

  const updateStocksAfterCheckout = (cartItems) => {
    let existingStocksData = JSON.parse(localStorage.getItem("StocksIneha"));

    if (!Array.isArray(existingStocksData)) {
      console.error("Stock data not found in local storage.");
      return;
    }

    // Iterate through each item in the cart
    cartItems.forEach((cartItem) => {
      // Find the corresponding item in the existing stocks data
      const existingItem = existingStocksData.find(
        (item) => item.id === cartItem.id
      );

      if (existingItem) {
        // Update the stock count for the item
        existingItem.stocks -= cartItem.quantity;
      } else {
        console.warn(
          `Item with ID ${cartItem.id} not found in existing stocks data.`
        );
      }
    });

    // Update the local storage with the modified stocks data
    localStorage.setItem("StocksIneha", JSON.stringify(existingStocksData));
  };

  useEffect(() => {
    if (storedData) {
      const parsedData = JSON.parse(storedData) || [];
      const newCartItemsMap = parsedData.reduce((acc, item) => {
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
  }, [storedData]);

  const removeFromCart = (id) => {
    const updatedCartItemsMap = { ...cartItemsMap };
    delete updatedCartItemsMap[id];
    setCartItemsMap(updatedCartItemsMap);
    calculateSubTotal(Object.values(updatedCartItemsMap));

    localStorage.setItem(
      "data",
      JSON.stringify(Object.values(updatedCartItemsMap))
    );

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
      const updatedCartData = cartData
        .map((item) => {
          if (item.id === id) {
            // Ensure the quantity is not less than 1
            const updatedQuantity = newQuantity >= 1 ? newQuantity : 0;

            // Calculate the updated subtotal, removing the currency symbol and converting to a number
            const updatedSubTotal =
              updatedQuantity * parseFloat(item.price.replace("₱", ""));

            // Return the updated item
            return {
              ...item,
              quantity: updatedQuantity,
              subTotal: updatedSubTotal,
            };
          }
          // Return the item unchanged if the id doesn't match
          return item;
        })
        .filter((item) => item.quantity > 0); // Remove items with quantity 0

      // Save the updated cart data back to localStorage
      localStorage.setItem("data", JSON.stringify(updatedCartData));

      // Update the cart items map for state management
      if (typeof setCartItemsMap === "function") {
        setCartItemsMap(
          updatedCartData.reduce(
            (acc, item) => ({ ...acc, [item.id]: item }),
            {}
          )
        );
      } else {
        console.error("setCartItemsMap is not defined or not a function");
      }

      // Recalculate the subtotal for the cart
      if (typeof calculateSubTotal === "function") {
        calculateSubTotal(updatedCartData);
      } else {
        console.error("calculateSubTotal is not defined or not a function");
      }

      // Calculate the total quantity of items in the cart
      const updatedCount = updatedCartData.reduce(
        (acc, item) => acc + item.quantity,
        0
      );

      // Save the updated cart count back to localStorage
      // localStorage.setItem("cartCount", updatedCount);

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
            e
            style={{ fontSize: "25px", cursor: "pointer" }}
            className="duration-300 hover:scale-150 hover:text-red"
          />
          <Image
            src={getProductImage(record.id)}
            alt={text}
            width={100}
            height={80}
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

  const handleCheckoutClick = () => {
    // Check if cart is empty
    const storedCartItems = JSON.parse(localStorage.getItem("data")) || [];
    if (storedCartItems.length === 0) {
      // If cart is empty, display notification and provide option to continue shopping
      notification.error({
        message: "Empty Cart",
        description: "You don't have items in your cart.",
        duration: 5,
      });
      return;
    }

    // If cart is not empty, proceed to checkout
    setIsCheckoutVisible(true);
  };

  const handleContinueClick = () => {
    setIsCheckoutVisible(false);
    setIsUserInfoVisible(true);
  };

  const handleBackClick = () => {
    setIsUserInfoVisible(false);
    setIsCheckoutVisible(true);
  };

  const handleUserInfoChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const errors = {};
    if (!userInfo.firstName) {
      errors.firstName = "First name is required";
    }
    if (!userInfo.lastName) {
      errors.lastName = "Last name is required";
    }
    if (!userInfo.date) {
      errors.date = "Date is required";
    }
    return errors;
  };

  // const handleCheckout = () => {
  //   const errors = validateForm();
  //   if (Object.keys(errors).length === 0) {
  //     setIsUserInfoVisible(false);
  //     setIsCheckoutVisible(true);
  //   } else {
  //     setFormErrors(errors);
  //     notification.error({
  //       message: "Form Error",
  //       description: "Please fill out all required fields.",
  //       duration: 3,
  //     });
  //   }
  // };

  const getTotalQuantityFromData = () => {
    const data = JSON.parse(localStorage.getItem("data")) || [];
    return data.reduce((total, item) => {
      const itemQuantity = item.quantity ? Number(item.quantity) : 0;
      return total + itemQuantity;
    }, 0);
  };

  const handleFinalCheckout = () => {
    const errors = validateForm();
    if (Object.keys(errors).length === 0) {
      let existingPurchaseData = JSON.parse(
        localStorage.getItem("purchaseData")
      );

      // Check if existingPurchaseData is an array, if not initialize it as an empty array
      if (!Array.isArray(existingPurchaseData)) {
        existingPurchaseData = [];
      }

      // Retrieve cart data including quantity and unique IDs
      const cartData = JSON.parse(localStorage.getItem("data"));

      // Calculate total quantity from cartData
      const totalQuantity = cartData
        ? cartData.reduce(
            (acc, item) => acc + (item.quantity ? Number(item.quantity) : 0),
            0
          )
        : 0;

      const ItemSold = getTotalQuantityFromData();

      // Create a new purchase object with user information, total, additional data, unique IDs, and quantities
      const newPurchase = {
        userInfo: {
          firstName: userInfo.firstName,
          lastName: userInfo.lastName,
          date: userInfo.date,
        },
        total: total.toFixed(2),
        quantity: totalQuantity, // Include total quantity from cartData
        // Add unique IDs and quantities from
        ItemSold: ItemSold,
        cartItems: cartData.map((item) => ({
          id: item.id,
          title: item.title,
          quantity: item.quantity,
        })),
      };

      // Push the new purchase data to the existing array
      existingPurchaseData.push(newPurchase);

      // Save the updated array back to local storage
      localStorage.setItem(
        "purchaseData",
        JSON.stringify(existingPurchaseData)
      );

      updateStocksAfterCheckout(Object.values(cartItemsMap));

      // Clear the cart data from local storage
      localStorage.removeItem("data");

      notification.success({
        message: "Purchase Successful",
        description:
          "Thank you for your purchase at Coffee First Calbayog! We’re thrilled to have you as a customer.",
        duration: 3,
      });
      setIsCheckoutVisible(false);

      // After clicking the checkout button, it will redirect to parent home page
      router.push("/#home");
    } else {
      setFormErrors(errors);
      notification.error({
        message: "Form Error",
        description: "Please fill out all required fields.",
        duration: 3,
      });
    }
  };

  const checkoutColumns = [
    {
      title: "Product",
      dataIndex: "title",
      key: "title",
      render: (text, record) => (
        <div className="flex gap-5 text-[15px]">
          <Image
            src={getProductImage(record.id)}
            alt={text}
            width={100}
            height={80}
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
      render: (text) => <span className="text-[15px]">{text}</span>,
    },
    {
      title: "Total",
      dataIndex: "subTotal",
      key: "subTotal",
      align: "center",
      render: (text) => (
        <span className="text-[15px]">₱{parseFloat(text).toFixed(0) || 0}</span>
      ),
    },
  ];

  return (
    <>
      <Head>
        <title>Coffee First - Cart</title>
        <meta name="description" content="freshcoffee website" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" alt="icon" href="/BASTAfavicon.png" />
      </Head>
      <div className="bg-tahiti pb-24 text-[15px]">
        <Navbar />
        <div className="pl-[90px] pr-[50px] pt-[82px]">
          <Table
            columns={columns}
            dataSource={Object.values(cartItemsMap).map((item, index) => ({
              ...item,
              key: index.cartems, // Provide a unique key for each row
            }))}
            pagination={false}
            bordered
            size="small"
          />
        </div>

        <div className="flex justify-end  pl-32">
          <Table
            columns={totalColumns}
            dataSource={totalData.map((item, index) => ({
              ...item,
              key: index.datas, // Provide a unique key for each row
            }))}
            pagination={false}
            size="large"
            showHeader={false}
            width={100}
            height={80}
            bordered={{
              border: "2px solid #000",
              borderRadius: "5px",
            }}
            className="mt-10 mr-24"
          />
        </div>

        <div className=" flex justify-end pr-28 pt-3">
          <button
            className=" bg-addtocartcolor pt-[5px] pb-1 px-[5px] pl-[7px] pr-[7px] rounded-md hover:text-tahiti"
            onClick={handleCheckoutClick}
          >
            Checkout
          </button>
        </div>

        <div
          className="flex justify-center gap-4 bg-tahiti pl-5 pr-5 pb-9 w-full text-center"
          style={{ position: "fixed", bottom: "0px", height: "7px" }}
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

        <Modal
          title={<span className="checkout-title">Checkout</span>}
          open={isCheckoutVisible}
          onCancel={() => setIsCheckoutVisible(false)}
          footer={[
            <Button
              className="text-dark  px-5"
              key="continue"
              onClick={handleContinueClick}
            >
              <div>
                Continue <RightOutlined />
              </div>
            </Button>,
          ]}
        >
          <h2 className=" pt-3">Order Summary</h2>
          <Table
            columns={checkoutColumns}
            dataSource={Object.values(cartItemsMap)}
            pagination={false}
            bordered
            size="small"
          />
          <Table
            columns={totalColumns}
            dataSource={totalData}
            pagination={false}
            size="small"
            showHeader={false}
            width={100}
            height={80}
            bordered={{
              border: "2px solid #000",
              borderRadius: "5px",
            }}
            className="mt-10"
          />
        </Modal>

        <Modal
          title="User Information"
          open={isUserInfoVisible}
          onCancel={() => setIsUserInfoVisible(false)}
          footer={[
            <div className="flex  justify-between space-x-[5px]">
              <div>
                <Button
                  className=" justify-start"
                  key="back"
                  onClick={handleBackClick}
                >
                  <div>
                    <LeftOutlined /> Back
                  </div>
                </Button>
                ,
              </div>
              <div className="">
                <Button
                  className=""
                  key="Checkout"
                  onClick={handleFinalCheckout}
                >
                  <div>
                    Checkout <RightOutlined />
                  </div>
                </Button>
                ,
              </div>
            </div>,
          ]}
        >
          <Input
            placeholder="First Name"
            name="firstName"
            value={userInfo.firstName}
            onChange={handleUserInfoChange}
            className="mb-2"
            status={formErrors.firstName ? "error" : ""}
          />
          <Input
            placeholder="Last Name"
            name="lastName"
            value={userInfo.lastName}
            onChange={handleUserInfoChange}
            className="mb-2"
            status={formErrors.lastName ? "error" : ""}
          />
          <Input
            placeholder="Date"
            type="date"
            name="date"
            defaultValue={currentDate}
            onChange={handleUserInfoChange}
          />
        </Modal>
      </div>
    </>
  );
};

export default Cart;
