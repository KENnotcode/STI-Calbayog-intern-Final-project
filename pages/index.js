import Head from 'next/head'
import Homepage from "../sections/home.jsx"
import OurMenu from '@/sections/menu.jsx'
import About from '@/sections/about.jsx'
import Footer from '@/sections/footer.jsx'
import { CartProvider } from '@/components/CartContext.jsx'
import { useEffect, useState } from 'react'

export default function Home() {
  const [cardLength, setCardLength] = useState(0);
  
  useEffect(() => {
    if(window !== "undefined"){
      const getter = localStorage.getItem("data")
      const parseData = JSON.parse(getter)
      setCardLength(parseData?.length || 0)
    }
  }, [])
  return (
    <CartProvider>
    <div className='relative'>
      <Head>
        <title>Coffee First - Calbayog</title>
        <meta name="description" content="freshcoffee website" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/BASTAfavicon.png" />

        <link href="https://fonts.googleapis.com/css2?family=Comic+Neue:ital,wght@0,300;0,400;0,700;1,300;1,400;1,700&display=swap" rel="stylesheet" />
      </Head>
      <Homepage cardLength={cardLength} />
      <OurMenu setCardLength={setCardLength} />
      <About />
      <Footer />
    </div>
    </CartProvider>
  )
}
