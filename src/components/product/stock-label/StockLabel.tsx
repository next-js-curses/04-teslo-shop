'use client'

import { useEffect, useState } from 'react'
import { getStockBySlug } from '@/actions'
import { titleFont } from '@/config/fonts'

interface Props {
  slug: string
}

export const StockLabel = ({ slug }: Props) => {

  const [stock, setStock] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  
  useEffect(() => {
    getStock(slug)
  }, [slug])
  
  const getStock = async(slug: string) => {
    const stock = await getStockBySlug(slug)
    setStock(stock)
    setIsLoading(false)
  }

  return (
    <>
      {
        isLoading
        ? (
          <h1 className={`${titleFont.className} bg-gray-200 animate-pulse`}>
            &nbsp;
          </h1>
        )
        : (
          <h1 className={`${titleFont.className} antialiased font-bold text-lg`}>
            Stock: { isLoading ? 'Cargando...' : stock }
          </h1>
        )
      }
    </>
  )
}
