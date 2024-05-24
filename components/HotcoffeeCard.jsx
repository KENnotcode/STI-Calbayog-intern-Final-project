import {motion} from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";

const HotcoffeeCard = ({id,imgUrl,title,price, quantity, active,handleClick, setTotalQuantity }) => {

    const getCount = () => {
        const prevData = localStorage.getItem("data") || "[]"
        const countData = JSON.parse(prevData)
        return countData.length
    }

    
    const handleAddToCart = (id, title, price, quantity) => {
        const prevData = localStorage.getItem("data") || "[]";
        let parsedData = JSON.parse(prevData);
    
        // Check if item with the same ID already exists
        const existingItemIndex = parsedData.findIndex(item => item.id === id);
    
        if (existingItemIndex !== -1) {
          // Item already exists, increment its quantity
          parsedData[existingItemIndex].quantity += 1;
        } else {
          // Item doesn't exist, add it to the local storage
          parsedData.push({ id: id, title: title, price: price, quantity: 1 });
        }
    
        // Update local storage with modified or new data
        localStorage.setItem("data", JSON.stringify(parsedData));
        setTotalQuantity(getCount());
      };

    // const [cartCount, setCartCount] = useState(0);
    
  
    // const handleAddToCart = () => {
    //   setCartCount(cartCount + 1);
    //   localStorage.setItem("cartCount", cartCount + 1);
    // };

    // useEffect(() => {
    //     const storedCartCount = localStorage.getItem("cartCount");
    //     if (storedCartCount) {
    //       setCartCount(parseInt(storedCartCount));
    //     }
    //   }, [handleAddToCart]);

  return (
    <motion.div className={`${active === id ? 'flex-[10]' : 'flex-[2]'} relative flex items-center justify-center min-w-[140px] h-[450px] cursor-pointer transition-[flex] ease-in-out duration-700 overflow-hidden  w-auto  `} onClick={() => handleClick(id)}>
        <Image src={imgUrl} alt="coffee" fill className="rounded-xl object-cover" />
        {active !== id ?(
            <div className="absolute bottom-0 w-24 h-36 text-black text-2xl font-medium rotate-[-90deg]">
                {title}
            </div>
        ) : (
            <div className="absolute p-6 w-full h-36 bottom-0 left-0 rounded-b-xl bg-[rgba(0,0,0,0.5)] ">
                <h2 className="text-3xl font-semibold text-tahiti">{title}</h2>
                
                <div className="flex justify-between mb-2">
                    <p className="text-2xl font-medium text-tahiti">{price}</p>
                    

                    <button className="flex justify-between mb-2 gap-3 items-center bg-addtocartcolor px-3 py-2 rounded-lg" onClick={() => handleAddToCart(id, title, price, quantity)}>
                        <Image className=" translate-x-" src={"/ADDTUCARTicon.png"} width={35} height={35} justify-end></Image>
                        <p className=" hover:text-tahiti text-right">Add to cart</p>
                    </button>
                </div>
                
            </div>
        )}
    </motion.div>
  )
}

export default HotcoffeeCard