import Header from '@/components/header/Header'
import Sidebar from '@/components/sidebar/Sidebar'
import React from 'react'
import { useState } from 'react'

const Stocks = () => {
  const [stocksColor, setStocksColor] = useState("#fff"); // Initial color for Stocks

  return (
    <div>
      <Sidebar  style={{ color: stocksColor }}/>
      <Header/>
    </div>
  )
}

export default Stocks