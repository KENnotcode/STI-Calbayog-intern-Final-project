import Navbar from "@/components/Navbar";
import React, { useState, useEffect } from "react";
import { Table } from "antd";
import { DeleteOutlined } from '@ant-design/icons';
import { IcedCoffee, HotCoffee, CreationSeries, NonCoffee, Frappes, Pastries } from "@/constant";

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [subTotal, setSubTotal] = useState(0);
    const [shippingCharge, setShippingCharge] = useState(10000); // Example shipping charge
    const total = subTotal + shippingCharge;

    useEffect(() => {
        const storedCartItems = JSON.parse(localStorage.getItem("data")) || [];
        setCartItems(storedCartItems.map(item => ({
          ...item,
          quantity: item.quantity || 1,
          subTotal: item.subTotal || 1 * parseFloat(item.price.replace('₱', '')),
        })));
        calculateSubTotal(storedCartItems);
      }, []);

    const removeFromCart = (index) => {
        const updatedCartItems = [...cartItems];
        updatedCartItems.splice(index, 1);
        setCartItems(updatedCartItems);
        localStorage.setItem("data", JSON.stringify(updatedCartItems));
        calculateSubTotal(updatedCartItems);
    };

    const calculateSubTotal = (items) => {
        const total = items.reduce((acc, item) => acc + item.subTotal, 0);
        setSubTotal(total);
    };

    const updateQuantity = (index, quantity) => {
        const updatedCartItems = [...cartItems];
        const item = updatedCartItems[index];
        item.quantity = quantity;
        item.subTotal = quantity * parseFloat(item.price.replace('₱', ''));
        setCartItems(updatedCartItems);
        localStorage.setItem("data", JSON.stringify(updatedCartItems));
        calculateSubTotal(updatedCartItems);
        // Update cart count in localStorage
        const updatedCount = updatedCartItems.reduce((acc, item) => acc + item.quantity, 0);
        localStorage.setItem("cartCount", updatedCount);
    };
    

    const getProductImage = (productId) => {
        const allProducts = [...IcedCoffee, ...HotCoffee, ...CreationSeries, ...NonCoffee, ...Frappes, ...Pastries];
        const product = allProducts.find((item) => item.id === productId);
        return product ? product.imgUrl : '';
    };

    const columns = [
        {
            title: "Product",
            dataIndex: "title",
            key: "title",
            render: (text, record, index) => (
                <div className="flex gap-5 text-[15px]">
                    <DeleteOutlined onClick={() => removeFromCart(index)} style={{ fontSize: '25px', cursor: 'pointer' }} className="duration-300 hover:scale-150 hover:text-red" />
                    <img src={getProductImage(record.id)} alt={text} style={{ width: 100, height: 80 }} />
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
            render: (text, record, index) => (
                <div className=" flex justify-center items-center">
                    <button className="text-[35px] pb-[11px] pr-[7px] hover:scale-150 duration-300" onClick={() => updateQuantity(index, record.quantity - 1)} disabled={record.quantity <= 1}>-</button>
                    <span className="text-[15px]">{text || 0}</span>
                    <button className="text-[24px] pb-[7px] pl-[6px] hover:scale-150 duration-300" onClick={() => updateQuantity(index, record.quantity + 1)}>+</button>
                </div>
            ),
        },
        {
            title: "Sub Total",
            dataIndex: "subTotal",
            key: "subTotal",
            align: "center",
            render: (text) => <span className="text-[15px]">₱{text.toFixed(2) || 0}</span>,
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
            render: (text) => `₱${text}`,
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
                    dataSource={cartItems}
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

            <div className="flex justify-center gap-4 bg-tahiti pl-5 pr-5 w-full text-center" style={{ position: "fixed", bottom: "7px" }}>
                <p className="">You have {cartItems.length} item(s) in your cart</p>
                <div href="/" className="outline-none">
                    <p className="px-2 rounded-sm hover:bg-addtocartcolor hover:text-tahiti">Continue Shopping</p>
                </div>
            </div>
        </div>
    );
};

export default Cart;
