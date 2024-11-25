'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { useCartStore } from '@/store'
import { currencyFormat } from '@/utils'

export const ProductsInCart = () => {
  const [loaded, setLoaded] = useState(false)
  const cartProducts = useCartStore(state => state.cart)

  useEffect(() => {
    setLoaded(true)
  }, [])
  

  if (!loaded) {
    return <p>Cargando...</p>
  }

  return (
    <>
      {
        cartProducts.map(product => (
          <div key={`${product.slug}-${product.size}`} className="flex mb-5">
            <Image
              src={`/products/${product.image}`}
              width={100}
              height={100}
              style={{
                width: '100px',
                height: '100px'
              }}
              alt={product.title}
              className="mr-5 rounded"
            />
            <div>
              <span>
                {`${product.size} - ${product.title}`} ({ product.quantity })
              </span>
              <p className="font-bold">{ currencyFormat(product.price * product.quantity) }</p>
            </div>
          </div>
        ))
      }
    </>
  )
}